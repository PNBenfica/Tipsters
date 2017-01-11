import React from "react";

import InfoContainer from "./InfoContainer";
import TipsContainer from "./TipsContainer";
import Comment from "./Comment";

export default class PostBody extends React.Component {

    render() {

        const { tips, comment, totalOdd } = this.props;
        const { profit, wins, losses, lastTips } = this.props.tipster;

        return (
            <div class="container-fluid">
                <div class= "row">

                    <InfoContainer lastTips={lastTips} totalOdd={totalOdd} profit={profit} wins={wins} losses={losses} />

                    <TipsContainer tips={tips} />
                                        
                    <Comment comment={comment}/>   
                </div>
            </div>
    );
  }
}
