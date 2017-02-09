import React from "react";
import {Panel} from "react-bootstrap";



export default class Tip extends React.Component {

  render() {

    const { tipnumber , selection , event, odd} = this.props;

            // <p><a href="#/sports">{event}</a></p>
    return (
        <Panel class="post-tips">
            <p>{tipnumber}. {selection}</p>
            <p><a href="#/sports" class="event-name">America de Cali <img src="img/sports/arsenal.png"/> vs <img src="img/sports/liverpool.jpg"/> Rionegro Aguillas</a></p>
            <p>{odd}</p>
        </Panel>
    );
  }
}
