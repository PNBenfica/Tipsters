import React from "react"

import BackgroundVideo from './../components/login/BackgroundVideo'
import BrandName from './../components/login/BrandName'

export default class Login extends React.Component {

  	render() {
        
        return  (
            <section id="auth-page">

                <BackgroundVideo />

                <div class="form-container">

                    <BrandName />

                    { this.props.children }

                </div>
                
            </section>
	    )
  	}
}
