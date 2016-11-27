import React from "react"
import ReactDOM from "react-dom"

import SuggestionsList from "./SuggestionsList"

export default class Body extends React.Component {

    constructor(args){
        super(...args)
        this.state = { name : ""}
    }

    handleChange(e){
        this.setState({name: e.target.value})
    }

    render() {
        // onClick={() => createNewMessage("Rui Silva")}
        const { createNewMessage } = this.props

        return (
            <div class="panel-body" >
                <div class="form-group row">
                    <div class="col-xs-12">
                        <input onChange={this.handleChange.bind(this)} class="form-control" type="text" placeholder="For: " id="example-text-input" />
                    </div>

                    <SuggestionsList input={this.state.name} createNewMessage={createNewMessage}/>
                </div>
            </div>
        )
    }
}
