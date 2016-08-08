import React from "react";
import {Panel} from "react-bootstrap";

import Header from "./Header";
import TrendUserItem from "./TrendUserItem";

export default class TrendUsers extends React.Component {

  render() {

    const TrendUsers = [{tipsterName:"Paulo Teixeira", tipsterImage:"img/pauloteixeira.jpg", description:"Is on a 5 green tips streak!"},
                        {tipsterName:"João Almeida", tipsterImage:"img/joaoalmeida.jpg", description:"Is on a 27 loosing streak!"},
                        {tipsterName:"Paulo Teixeira", tipsterImage:"img/pauloteixeira.jpg", description:"Is on a 5 green tips streak!"}]
                        .map(({tipsterName, tipsterImage, description}, i) => <TrendUserItem tipsterName={tipsterName} tipsterImage={tipsterImage} description={description} key={i}/>);

    return (
        <Panel class="trend-bar-item">

            <Header title="Tipsters sugeridos" icon="fa-users" />

            <div class="panel-body">
                {TrendUsers}                
            </div>  

            <div class="panel-footer">
                <button type="button" class="btn btn-default btn-block">Find More</button>
            </div>
        </Panel> 
    );
  }
}
