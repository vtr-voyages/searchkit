import * as PropTypes from "prop-types";
import { SearchkitComponent, NumericOptionsAccessor, RenderComponentPropType, renderComponent } from "../../../../../core";
import { ItemList, Panel } from "../../../../ui";
const defaults = require("lodash/defaults");
const map = require("lodash/map");
export class NumericRefinementListFilter extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.toggleItem = this.toggleItem.bind(this);
        this.setItems = this.setItems.bind(this);
    }
    defineAccessor() {
        const { id, field, options, title, multiselect, fieldOptions } = this.props;
        return new NumericOptionsAccessor(id, {
            id, field, options, title, multiselect, fieldOptions
        });
    }
    toggleItem(key) {
        this.accessor.toggleOption(key);
    }
    setItems(keys) {
        this.accessor.setOptions(keys);
    }
    getSelectedItems() {
        const selectedOptions = this.accessor.getSelectedOrDefaultOptions() || [];
        return map(selectedOptions, "title");
    }
    hasOptions() {
        return this.accessor.getBuckets().length != 0;
    }
    render() {
        if (!this.accessor)
            return null;
        const { listComponent, containerComponent, itemComponent, showCount, title, id, mod, className, countFormatter } = this.props;
        return renderComponent(containerComponent, {
            title,
            className: id ? `filter--${id}` : undefined,
            disabled: !this.hasOptions()
        }, renderComponent(listComponent, {
            mod, className,
            items: this.accessor.getBuckets(),
            itemComponent,
            selectedItems: this.getSelectedItems(),
            toggleItem: this.toggleItem,
            setItems: this.setItems,
            docCount: this.accessor.getDocCount(),
            showCount,
            translate: this.translate,
            countFormatter
        }));
    }
}
NumericRefinementListFilter.propTypes = defaults({
    containerComponent: RenderComponentPropType,
    listComponent: RenderComponentPropType,
    itemComponent: RenderComponentPropType,
    field: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    multiselect: PropTypes.bool,
    showCount: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        from: PropTypes.number,
        to: PropTypes.number,
        key: PropTypes.string
    })),
    fieldOptions: PropTypes.shape({
        type: PropTypes.oneOf(["embedded", "nested", "children"]).isRequired,
        options: PropTypes.object
    }),
    countFormatter: PropTypes.func
}, SearchkitComponent.propTypes);
NumericRefinementListFilter.defaultProps = {
    listComponent: ItemList,
    containerComponent: Panel,
    multiselect: false,
    showCount: true
};
//# sourceMappingURL=NumericRefinementListFilter.js.map