import * as React from "react";
import { mount } from "enzyme";
import { HitsStats } from "../src/HitsStats";
import { SearchkitManager } from "../../../../core";
describe("HitsStats tests", () => {
    beforeEach(() => {
        this.searchkit = new SearchkitManager("localhost:9200", { useHistory: false });
        this.createWrapper = (props) => {
            this.wrapper = mount(React.createElement(HitsStats, Object.assign({ searchkit: this.searchkit }, props)));
        };
    });
    it('renders correctly', () => {
        this.searchkit.setResults({
            hits: {
                total: 10
            },
            took: 10
        });
        this.createWrapper({ translations: { "hitstats.results_found": "{hitCount} movies found" } });
        expect(this.wrapper.find(".sk-hits-stats__info").text()).toEqual("10 movies found");
        this.createWrapper({ countFormatter: (count) => "#" + count });
        expect(this.wrapper.find(".sk-hits-stats__info").text()).toEqual("#10 results found in 10ms");
    });
    it('renders correctly - override component', () => {
        this.searchkit.setResults({
            hits: {
                total: 10
            },
            took: 10
        });
        const overrideComponent = (props) => {
            return (React.createElement("div", null, props.hitsCount));
        };
        this.createWrapper({ component: overrideComponent });
        expect(this.wrapper.find("div").text()).toEqual("10");
    });
});
//# sourceMappingURL=HitsStatsSpec.js.map