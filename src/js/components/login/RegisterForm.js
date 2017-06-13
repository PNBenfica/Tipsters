import React from "react"

import FormGroup from "./FormGroup"
import SVG from "./../SVG"

export default class RegisterForm extends React.Component {

	onSubmit(values){
		const { mail, username, password } = values
		console.log(mail)
		console.log(username)
		console.log(password)
	}

    render() {

        return (
        	<div class="form register">

        		<FormGroup 
        			inputs={ [ { type : "text", name: "mail", placeholder : "E-Mail" }, { type : "text", name: "username", placeholder : "Username" },  { type : "password", name: "password",placeholder : "Password" } ] }
        			submitButton={ <div class="button"><span>Register</span></div> }
        			onSubmit={this.onSubmit.bind(this)}
        		/>

        	</div>
        )
    }
}
