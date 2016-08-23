import React from "react";
import { Link } from "react-router";

import NavBar from "../components/navbar/NavBar";

export default class Layout extends React.Component {

loadCallback () {  
    console.log("ola");
    var request = gapi.client.conference.sayHello();
    request.execute(this.sayHelloCallback.bind(this));
}
sayHelloCallback (response) {
    alert(response.greeting);   
}

    render() {
setTimeout(() => { console.log("10sec"); this.loadCallback(); }, 10000);

        const { location } = this.props;

        return (
            <div id="wrapper">

                <NavBar location={location} />

                <div id="page-wrapper">
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}
