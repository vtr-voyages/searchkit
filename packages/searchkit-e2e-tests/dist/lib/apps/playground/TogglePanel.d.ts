import * as React from "react";
import * as PropTypes from "prop-types";
export interface TogglePanelProps extends React.Props<TogglePanel> {
    key?: any;
    title?: string;
    mod?: string;
    disabled?: boolean;
    className?: string;
    collapsable?: boolean;
    rightComponent: any;
}
export declare class TogglePanel extends React.Component<TogglePanelProps, {
    collapsed: boolean;
}> {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        mod: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        collapsable: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        disabled: boolean;
        collapsable: boolean;
        mod: string;
    };
    constructor(props: any);
    toggleCollapsed(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
