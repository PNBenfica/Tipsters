import React from "react"
import Panel from "./../Panel"

import Header from "./../Header"
import TrendUser from "./TrendUser"

export default class TrendUsers extends React.Component {

    render() {

        let { users, fetching, followUser } = this.props

        users = users.map((tipster, i) => <TrendUser {...tipster} followUser={followUser} key={i}/>)

        return (
            <Panel title="Suggested Tipsters" fetching={fetching} >

                {users}                

            </Panel> 
        )
    }
}
