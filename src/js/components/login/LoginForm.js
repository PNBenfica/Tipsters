import React from "react"
import { connect } from "react-redux"
import classNames from "classnames"

import { authenticate } from "../../actions/loginActions"

import FormGroup from "./FormGroup"
import SVG from "./../SVG"
import LoadingGif from "./../LoadingGif"

@connect((store) => {
    return {
        fetched: store.auth.fetched,
        fetching: store.auth.fetching,
    }
})
export default class LoginForm extends React.Component {

	onSubmit(values){
		const { username, password } = values
        this.props.dispatch(authenticate( username, password ))
	}

    componentWillReceiveProps(nextProps){
        if (this.props.fetching && !nextProps.fetching){
            const { history } = this.props
            history.pushState(null, '')
        }
    }

    render() {

        return (
        	<div class="form login">

        		<FormGroup 
        			inputs={ [ { type : "text", name: "username", placeholder : "Username" },  { type : "password", name: "password",placeholder : "Password" } ] }
        			submitButton={ <SVG icon="edge-button-path" classes="arrow"/> }
        			onSubmit={this.onSubmit.bind(this)}
        		/>

        		<p class="register-link">Não tem conta? <a href="#/login/register" class="hover-underline">Registe-se aqui</a></p>

        		<div class={ classNames({hidden: !this.props.fetching}) } ><LoadingGif/></div>
        		
        	</div>
        )
    }
}
