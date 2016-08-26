import React from "react";
import { Link } from "react-router";

import gapiLoader from '../scripts/gapi';

import NavBar from "../components/navbar/NavBar";

export default class Layout extends React.Component {

    sayHelloCallback (response) {
        console.log(response.greeting);   
    }
    
    sayHello(){
        if( gapiLoader.apiLoaded() ){
            console.log("api loaded - making request");
            var request = gapi.client.tipsters.sayHello();
            request.execute(this.sayHelloCallback.bind(this));
        }
        else{
            setTimeout(() => { console.log("waiting for api load"); this.sayHello(); }, 500);
        }
    }

    render() {

        this.sayHello();

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
