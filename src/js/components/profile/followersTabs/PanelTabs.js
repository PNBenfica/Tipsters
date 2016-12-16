import React from "react";

import {Tabs, Tab} from "react-bootstrap";

export default class PanelTabs extends React.Component {

    constructor(...args){
        super(...args);
        this.state = {key: 1};
    }

    handleSelect(key) {
        this.setState({key});
    }

    render() {
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect.bind(this)} id="controlled-tab-example">
                <Tab eventKey={1} title={"126 Followers"} >{this.props.children[0]}</Tab>
                <Tab eventKey={2} title={"325 Following"} >{this.props.children[1]}</Tab>
            </Tabs>
        );
    }
}
