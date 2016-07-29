import React from "react";
import {Panel} from "react-bootstrap";



export default class PopoverTipItem extends React.Component {

  render() {

    const { tipnumber , selection , event, odd} = this.props;

    return (
        <Panel>
            <p>{tipnumber}. {selection}</p>
            <p>{event}</p>
            <p>{odd}</p>
        </Panel>
    );
  }
}
