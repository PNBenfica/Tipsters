import React from "react"

export default class TipsterName extends React.Component {

    render() {

        const { name } = this.props

        return (        
            <a href="#/profile">{name}</a>
        )
    }
}
