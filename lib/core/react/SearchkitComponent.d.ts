import * as React from "react";
import * as PropTypes from "prop-types";
import { SearchkitManager } from "../SearchkitManager";
import { ImmutableQuery } from "../query";
import { Accessor } from "../accessors/Accessor";
export interface SearchkitComponentProps {
    mod?: string;
    className?: string;
    translations?: Object;
    searchkit?: SearchkitManager;
    key?: string;
}
export declare class SearchkitComponent<P extends SearchkitComponentProps, S> extends React.Component<P, S> {
    _searchkit: SearchkitManager;
    accessor: Accessor;
    stateListenerUnsubscribe: Function;
    translations: Object;
    unmounted: boolean;
    static contextTypes: React.ValidationMap<any>;
    static translationsPropType: (translations: any) => PropTypes.Requireable<PropTypes.InferProps<any>>;
    static propTypes: any;
    constructor(props?: any);
    defineBEMBlocks(): any;
    defineAccessor(): Accessor;
    translate(key: any, interpolations?: any): any;
    readonly bemBlocks: any;
    searchkit: SearchkitManager;
    _getSearchkit(): SearchkitManager;
    componentDidMount(): void;
    _initAccessor(): boolean;
    componentWillUnmount(): void;
    getResults(): any;
    getHits(): any;
    getHitsCount(): any;
    hasHits(): boolean;
    hasHitsChanged(): any;
    getQuery(): ImmutableQuery;
    isInitialLoading(): boolean;
    isLoading(): boolean;
    getError(): any;
}