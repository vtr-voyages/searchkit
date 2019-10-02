import * as React from "react";
import * as PropTypes from "prop-types";

import {
	SearchkitComponent,
	SearchkitComponentProps,
	RenderComponentType,
  renderComponent
} from "../../../../core"

const defaults = require("lodash/defaults")

export interface InitialViewDisplayProps {
	bemBlocks:any
}

export interface InitialLoaderprops extends SearchkitComponentProps{
	component?: RenderComponentType<InitialViewDisplayProps>
}

export class InitialLoader extends SearchkitComponent<InitialLoaderprops, any> {
	defineBEMBlocks() {
		let block = (this.props.mod || "sk-initial-loader")
		return {
			container: block
		}
	}
  render(){
    if(this.isInitialLoading()){
      return renderComponent(this.props.component, {
				bemBlocks:this.bemBlocks
			})
    }
    return null
  }
}
