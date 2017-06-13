import React from "react"

export default class BackgroundVideo extends React.Component {

    render() {

        return (
            <video autoPlay muted loop poster="video/beach-soccer.jpg">
                <source src="video/beach-soccer.mp4" type="video/mp4"/>
                <source src="video/beach-soccer.webm" type="video/webm"/>
                <source src="video/beach-soccer.ogv" type="video/ogg"/>
            </video>
        )
    }
}
