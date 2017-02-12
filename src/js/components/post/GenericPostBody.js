import React from "react"

export default class GenericPostBody extends React.Component {

    render() {

        const { totalOdd, tipster, PostBody } = this.props;
        const { wins, losses, lastTips } = this.props.tipster;

        return (
            <div class="container-fluid">
                <div class= "row">

                    { PostBody }

                </div>
            </div>
        );
    }
}
