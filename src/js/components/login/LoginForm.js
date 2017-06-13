import React from "react"

import FormGroup from "./FormGroup"
import SVG from "./../SVG"

export default class LoginForm extends React.Component {

	onSubmit(values){
		const { username, password } = values
		console.log(username)
		console.log(password)
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

        	</div>
        )
    }
}
