import { ArrayState } from "../state";
import { FilterBasedAccessor } from "./FilterBasedAccessor";
import { TermQuery, TermsBucket, CardinalityMetric, BoolShould, BoolMust, FilterBucket, FieldContextFactory } from "../query";
const assign = require("lodash/assign");
const map = require("lodash/map");
const omitBy = require("lodash/omitBy");
const isUndefined = require("lodash/isUndefined");
const each = require("lodash/each");
export class FacetAccessor extends FilterBasedAccessor {
    constructor(key, options) {
        super(key, options.id);
        this.state = new ArrayState();
        this.translations = FacetAccessor.translations;
        this.options = options;
        this.defaultSize = options.size;
        this.options.facetsPerPage = this.options.facetsPerPage || 50;
        this.size = this.defaultSize;
        this.loadAggregations = isUndefined(this.options.loadAggregations) ? true : this.options.loadAggregations;
        if (options.translations) {
            this.translations = assign({}, this.translations, options.translations);
        }
        this.options.fieldOptions = this.options.fieldOptions || { type: "embedded" };
        this.options.fieldOptions.field = this.options.field;
        this.fieldContext = FieldContextFactory(this.options.fieldOptions);
    }
    getRawBuckets() {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            this.options.field, "buckets"
        ], []);
    }
    getBuckets() {
        let rawBuckets = this.getRawBuckets();
        let keyIndex = {};
        each(rawBuckets, (item) => {
            item.key = item.key_as_string || String(item.key);
            keyIndex[item.key] = item;
        });
        let missingFilters = [];
        each(this.state.getValue(), (filterKey) => {
            if (keyIndex[filterKey]) {
                const filter = keyIndex[filterKey];
                filter.selected = true;
            }
            else {
                missingFilters.push({
                    key: filterKey, missing: true, selected: true
                });
            }
        });
        let buckets = (missingFilters.length > 0) ?
            missingFilters.concat(rawBuckets) : rawBuckets;
        return buckets;
    }
    getDocCount() {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            "doc_count"
        ], 0);
    }
    getCount() {
        return this.getAggregations([
            this.uuid,
            this.fieldContext.getAggregationPath(),
            this.options.field + "_count", "value"
        ], 0);
    }
    setViewMoreOption(option) {
        this.size = option.size;
    }
    getMoreSizeOption() {
        var option = { size: 0, label: "" };
        var total = this.getCount();
        var facetsPerPage = this.options.facetsPerPage;
        if (total <= this.defaultSize)
            return null;
        if (total <= this.size) {
            option = { size: this.defaultSize, label: this.translate("facets.view_less") };
        }
        else if ((this.size + facetsPerPage) >= total) {
            option = { size: total, label: this.translate("facets.view_all") };
        }
        else if ((this.size + facetsPerPage) < total) {
            option = { size: this.size + facetsPerPage, label: this.translate("facets.view_more") };
        }
        else if (total) {
            option = null;
        }
        return option;
    }
    isOrOperator() {
        return this.options.operator === "OR";
    }
    getBoolBuilder() {
        return this.isOrOperator() ? BoolShould : BoolMust;
    }
    getOrder() {
        if (this.options.orderKey) {
            let orderDirection = this.options.orderDirection || "asc";
            return { [this.options.orderKey]: orderDirection };
        }
    }
    buildSharedQuery(query) {
        var filters = this.state.getValue();
        var filterTerms = map(filters, (filter) => {
            return this.fieldContext.wrapFilter(TermQuery(this.options.field, filter));
        });
        var selectedFilters = map(filters, (filter) => {
            return {
                name: this.options.title || this.translate(this.options.field),
                value: this.translate(filter),
                id: this.options.id,
                remove: () => this.state = this.state.remove(filter)
            };
        });
        var boolBuilder = this.getBoolBuilder();
        if (filterTerms.length > 0) {
            query = query.addFilter(this.uuid, boolBuilder(filterTerms))
                .addSelectedFilters(selectedFilters);
        }
        return query;
    }
    buildOwnQuery(query) {
        if (!this.loadAggregations) {
            return query;
        }
        else {
            let excludedKey = (this.isOrOperator()) ? this.uuid : undefined;
            return query
                .setAggs(FilterBucket(this.uuid, query.getFiltersWithoutKeys(excludedKey), ...this.fieldContext.wrapAggregations(TermsBucket(this.options.field, this.options.field, omitBy({
                size: this.size,
                order: this.getOrder(),
                include: this.options.include,
                exclude: this.options.exclude,
                min_doc_count: this.options.min_doc_count
            }, isUndefined)), CardinalityMetric(this.options.field + "_count", this.options.field))));
        }
    }
}
FacetAccessor.translations = {
    "facets.view_more": "View more",
    "facets.view_less": "View less",
    "facets.view_all": "View all"
};
//# sourceMappingURL=FacetAccessor.js.map