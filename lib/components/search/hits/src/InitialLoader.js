var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../../../../core");
var defaults = require("lodash/defaults");
var InitialLoader = /** @class */ (function (_super) {
    __extends(InitialLoader, _super);
    function InitialLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InitialLoader.prototype.defineBEMBlocks = function () {
        var block = (this.props.mod || "sk-initial-loader");
        return {
            container: block
        };
    };
    InitialLoader.prototype.render = function () {
        if (this.isInitialLoading()) {
            return core_1.renderComponent(this.props.component, {
                bemBlocks: this.bemBlocks
            });
        }
        return null;
    };
    return InitialLoader;
}(core_1.SearchkitComponent));
exports.InitialLoader = InitialLoader;
//# sourceMappingURL=InitialLoader.js.map