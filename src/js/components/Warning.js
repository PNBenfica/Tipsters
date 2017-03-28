import React from "react"

import classNames from "classnames"

export default class warning extends React.Component {



    render() {

    	const { active, dismiss } = this.props

        return (
            <div class={classNames("warning", { active })} onClick={() => dismiss()}>
            	<div class="panel">

            		<div class="panel-body">
            			{this.props.children}
            		</div>

            		<div class="dismiss">&#x2715;</div>
            	</div>
            </div>
        )
    }
}
