import React from "react";

import classNames from "classnames"
import onClickOutside from 'react-onclickoutside'

import Icon from "./Icon"
import Section from "../../Section"

export default onClickOutside( class FixedPagePanel extends React.Component {

    constructor(args){
        super(...args)
        this.state = { open : false }
    }

    onIconClick(){
        const open = !this.state.open
        this.setState( { open } )
    }

    handleClickOutside(event){
        this.closePanel()
    }

    closePanel(){
        const { open } = this.state
        if (open)
            this.setState( { open : false } )
    }
    
    render() {

        const { active, classes, icon, iconNumber, id, title } = this.props;
        const { open } = this.state

        return (
            <div id={id} class={ classNames("fixed-page-panel", classes, { active: active || open, open }) } >

                <Icon icon={icon} n={iconNumber} onClick={this.onIconClick.bind(this)} />

                <div class="page-panel">
                    <Section title={title}>
                        { this.props.children }
                    </Section>
                </div>

            </div>
        )
    }
})
