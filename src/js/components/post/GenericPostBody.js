import React from "react"

import TipsterInfo from "./TipsterInfo"

export default class GenericPostBody extends React.Component {

    render() {

        const { totalOdd, tipster, PostBody } = this.props;
        const { wins, losses, lastTips } = this.props.tipster;

        return (
            <div class="container-fluid">
                <div class= "row">

                    <TipsterInfo lastTips={lastTips} totalOdd={totalOdd} wins={wins} losses={losses} />

                    { PostBody }

                </div>
            </div>
        );
    }
}
