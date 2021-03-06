const update = require("immutability-helper");
import { BoolMust } from "./query_dsl";
import { Utils } from "../support/Utils";
const omitBy = require("lodash/omitBy");
const omit = require("lodash/omit");
const values = require("lodash/values");
const pick = require("lodash/pick");
const merge = require("lodash/merge");
const isUndefined = require("lodash/isUndefined");
export class ImmutableQuery {
    constructor(index = ImmutableQuery.defaultIndex) {
        this.index = index;
        this.buildQuery();
    }
    buildQuery() {
        let query = {};
        if (this.index.queries.length > 0) {
            query.query = BoolMust(this.index.queries);
        }
        if (this.index.filters.length > 0) {
            query.post_filter = BoolMust(this.index.filters);
        }
        query.aggs = this.index.aggs;
        query.size = this.index.size;
        query.from = this.index.from;
        query.sort = this.index.sort;
        query.highlight = this.index.highlight;
        query.suggest = this.index.suggest;
        if (this.index._source) {
            query._source = this.index._source;
        }
        this.query = omitBy(query, isUndefined);
    }
    hasFilters() {
        return this.index.filters.length > 0;
    }
    hasFiltersOrQuery() {
        return (this.index.queries.length +
            this.index.filters.length) > 0 || !!this.index.sort;
    }
    addQuery(query) {
        if (!query) {
            return this;
        }
        return this.update({
            queries: { $push: [query] }
        });
    }
    setQueryString(queryString) {
        return this.update({ $merge: { queryString } });
    }
    getQueryString() {
        return this.index.queryString;
    }
    addSelectedFilter(selectedFilter) {
        return this.addSelectedFilters([selectedFilter]);
    }
    addSelectedFilters(selectedFilters) {
        return this.update({
            selectedFilters: { $push: selectedFilters }
        });
    }
    getSelectedFilters() {
        return this.index.selectedFilters;
    }
    addAnonymousFilter(bool) {
        return this.addFilter(Utils.guid(), bool);
    }
    addFilter(key, filter) {
        return this.update({
            filters: { $push: [filter] },
            filtersMap: { $merge: { [key]: filter } }
        });
    }
    setAggs(aggs) {
        return this.deepUpdate("aggs", aggs);
    }
    getFilters(keys = []) {
        return this.getFiltersWithoutKeys(keys);
    }
    _getFilters(keys, method) {
        keys = [].concat(keys);
        const filters = values(method(this.index.filtersMap || {}, keys));
        return BoolMust(filters);
    }
    getFiltersWithKeys(keys) {
        return this._getFilters(keys, pick);
    }
    getFiltersWithoutKeys(keys) {
        return this._getFilters(keys, omit);
    }
    setSize(size) {
        return this.update({ $merge: { size } });
    }
    setSort(sort) {
        return this.update({ $merge: { sort: sort } });
    }
    setSource(_source) {
        return this.update({ $merge: { _source } });
    }
    setHighlight(highlight) {
        return this.deepUpdate("highlight", highlight);
    }
    getSize() {
        return this.query.size;
    }
    setFrom(from) {
        return this.update({ $merge: { from } });
    }
    getFrom() {
        return this.query.from;
    }
    getPage() {
        return 1 + Math.floor((this.getFrom() || 0) / (this.getSize() || 10));
    }
    deepUpdate(key, ob) {
        return this.update({
            $merge: {
                [key]: merge({}, this.index[key] || {}, ob)
            }
        });
    }
    setSuggestions(suggestions) {
        return this.update({
            $merge: { suggest: suggestions }
        });
    }
    update(updateDef) {
        return new ImmutableQuery(update(this.index, updateDef));
    }
    getJSON() {
        return this.query;
    }
    printJSON() {
        console.log(JSON.stringify(this.getJSON(), null, 2));
    }
}
ImmutableQuery.defaultIndex = {
    queryString: "",
    filtersMap: {},
    selectedFilters: [],
    queries: [],
    filters: [],
    _source: null,
    size: 0
};
//# sourceMappingURL=ImmutableQuery.js.map