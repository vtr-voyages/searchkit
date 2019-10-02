import { SearchkitComponent, renderComponent } from "../../../../core";
const defaults = require("lodash/defaults");
export class InitialLoader extends SearchkitComponent {
    defineBEMBlocks() {
        let block = (this.props.mod || "sk-initial-loader");
        return {
            container: block
        };
    }
    render() {
        if (this.isInitialLoading()) {
            return renderComponent(this.props.component, {
                bemBlocks: this.bemBlocks
            });
        }
        return null;
    }
}
//# sourceMappingURL=InitialLoader.js.map