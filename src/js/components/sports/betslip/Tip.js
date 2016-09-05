import React from "react";
import {Panel} from "react-bootstrap";



export default class Tip extends React.Component {

  render() {

    const { tipnumber , eventURL, bet, choice} = this.props;

    return (
        <Panel class="post-tips">
            <p>{tipnumber}. {bet.name }: {choice.name} <a onClick={() => this.props.removeTip(eventURL, bet, choice)} class="cross pull-right">x</a></p>
            <p><a href={eventURL.renderPath()}>{eventURL.getMatchName()}</a></p>
            <p>{choice.odd}</p>
        </Panel>
    );
  }
}
