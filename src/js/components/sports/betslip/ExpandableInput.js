import React from "react"

import classNames from "classnames"

import SVG from "../../SVG"


export default class ExpandableInput extends React.Component {

    constructor(args){
        super(...args)
        this.state = { open : false }
    }

    openInput(){

        const { open } = this.state

        if (!open){
            this.setState({ open : true })
        }

    }

    render() {

    const { title } = this.props
    const { open } = this.state

    return (
        <div class={classNames("col-xs-12 expandable-input", { open })} >
            
            <header onClick={ this.openInput.bind(this) }>
                <SVG icon="plus"/>
                <p>{title}</p>
            </header>
            
            { open ? this.renderBody() : null }

        </div>
        )
    }

    renderBody(){
        return (
            <div class="col-xs-12 body">
                {this.props.children}
            </div>
        )
    }
}
