import * as React from "react";
import { SearchkitComponent, SearchkitComponentProps, RenderComponentType } from "../../../../core";
export interface InitialViewDisplayProps {
    bemBlocks: any;
}
export interface InitialLoaderprops extends SearchkitComponentProps {
    component?: RenderComponentType<InitialViewDisplayProps>;
}
export declare class InitialLoader extends SearchkitComponent<InitialLoaderprops, any> {
    defineBEMBlocks(): {
        container: string;
    };
    render(): React.ReactElement<any>;
}
