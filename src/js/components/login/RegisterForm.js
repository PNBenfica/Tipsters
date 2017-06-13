import React from "react"
import { connect } from "react-redux"
import classNames from "classnames"

import { register } from "../../actions/registerActions"

import FormGroup from "./FormGroup"
import LoadingGif from "./../LoadingGif"

@connect((store) => {
    return {
        fetched: store.register.fetched,
        fetching: store.register.fetching,
    }
})
export default class RegisterForm extends React.Component {

	onSubmit(values){
		const { mail, username, password } = values
        this.props.dispatch(register( username, mail, password ))
	}

	componentWillReceiveProps(nextProps){
		if (this.props.fetching && !nextProps.fetching){
            const { history } = this.props
            history.pushState(null, '/login')
		}
	}

    render() {

        return (
        	<div class="form register">

        		<FormGroup 
        			inputs={ [ { type : "text", name: "mail", placeholder : "E-Mail" }, { type : "text", name: "username", placeholder : "Username" },  { type : "password", name: "password",placeholder : "Password" } ] }
        			submitButton={ <div class="button"><span>Register</span></div> }
        			onSubmit={this.onSubmit.bind(this)}
        		/>

        		<div class={ classNames({hidden: !this.props.fetching}) } ><LoadingGif/></div>

        	</div>
        )
    }
}
