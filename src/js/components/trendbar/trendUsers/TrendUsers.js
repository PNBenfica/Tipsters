import React from "react"
import Panel from "./../Panel"

import Header from "./../Header"
import TrendUser from "./TrendUser"

export default class TrendUsers extends React.Component {

    render() {

        let { users } = this.props

        users = users.map((tipster, i) => <TrendUser {...tipster} key={i}/>)

        return (
            <Panel title="Tipsters Sugeridos">

                {users}                

            </Panel> 
        )
    }
}