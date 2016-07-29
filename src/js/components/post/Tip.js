import React from "react";
import {Panel} from "react-bootstrap";



export default class Tip extends React.Component {

  render() {

    const { tipnumber , selection , event, odd} = this.props;

    return (
        <Panel class="post-tips">
            <p>{tipnumber}. {selection}</p>
            <p><a href="#/sports">{event}</a></p>
            <p>{odd}</p>
        </Panel>
    );
  }
}
