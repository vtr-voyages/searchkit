import * as React from "react";
import { Panel, RangeSlider } from "searchkit";
export declare class MockRange extends React.Component<any, any> {
    constructor(props: any);
    static defaultProps: {
        rangeComponent: typeof RangeSlider;
        containerComponent: typeof Panel;
    };
    render(): React.ReactElement<any>;
}
