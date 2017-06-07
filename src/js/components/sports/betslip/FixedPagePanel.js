import React from "react";

import classNames from "classnames"

import Icon from "./Icon";

export default class FixedPagePanel extends React.Component {

    constructor(args){
        super(...args)
        this.state = { open : false }
    }

    onIconClick(){
        const open = !this.state.open
        this.setState( { open } )
    }
    
    render() {

        const { active, icon, iconNumber, id } = this.props;
        const { open } = this.state

        return (
            <div id={id} class={ classNames("fixed-page-panel", { active: active || open, open }) } >

                <Icon icon={icon} n={iconNumber} onClick={this.onIconClick.bind(this)} />

                <div class="page-panel">
                    { this.props.children }
                </div>

            </div>
        )
    }
}
