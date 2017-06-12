import React from "react";

export default class Login extends React.Component {

  	render() {

        return  (
            <section id="auth-page">
                <video poster="video/marques_poster.png" id="bgvid" playsinline autoPlay muted loop>
                    <source src="video/marques.mp4" type="video/webm"/>
                </video>

                <div class="form-container col-xs-12 col-md-4 col-md-push-4">
                    <a class="brand-name">
                        <p>t</p>
                        <small>ipsters</small>
                    </a>
                </div>
            </section>
	    )
  	}
}
