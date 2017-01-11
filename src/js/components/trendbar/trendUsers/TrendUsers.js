import React from "react"
import Panel from "./../Panel"

import Header from "./../Header"
import TrendUser from "./TrendUser"

export default class TrendUsers extends React.Component {

  render() {

    const TrendUsers = [{tipsterName:"Paulo Teixeira", tipsterImage:"img/pauloteixeira.jpg", description:"Is on a 5 green tips streak!"},
                        {tipsterName:"João Almeida", tipsterImage:"img/joaoalmeida.jpg", description:"Is on a 27 loosing streak!"},
                        {tipsterName:"Paulo Teixeira", tipsterImage:"img/pauloteixeira.jpg", description:"Is on a 5 green tips streak!"}]
                        .map((tipster, i) => <TrendUser {...tipster} key={i}/>)

    return (
        <Panel title="Tipsters Sugeridos">

            {TrendUsers}                

        </Panel> 
    )
  }
}
