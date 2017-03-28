import React from "react";
import ReactDOM from 'react-dom';

import classNames from "classnames"

import Button from "./../../Button"
import SellingPrice from "./SellingPrice";
import Tip from "./Tip";
import TotalOdd from "./TotalOdd";

export default class BetSlipBody extends React.Component {

    handleCommentChange() {
        const { setBetSlipComment } = this.props;

        const input = ReactDOM.findDOMNode(this.refs.comment);
        const comment = input.value;

        setBetSlipComment(comment)
    }

    render() {

        const { tips, expanded, shareTip } = this.props;
        
        const totalOdd = tips.map(tip => tip.choice.odd).reduce((a,b) => a * b, 1).toFixed(2);

        const Tips = tips.map(({...tip}, i) => <Tip key={i} tipnumber={i+1} {...tip} removeTip={this.props.removeTip}/>);

        return (
            <div class="panel-body">

                <div class="bet-slip-tips-container">
                    {Tips}
                </div>

                <div class={classNames("bet-slip-actions", {expanded})}>

                    <TotalOdd totalOdd={totalOdd} />

                    <SellingPrice updateSellingPrice={this.props.updateSellingPrice}/>

                    <div class="form-group">
                        <textarea onChange={this.handleCommentChange.bind(this)} ref="comment" class="form-control" rows="3" id="bet-slip-comment" placeholder="Add comment"></textarea>
                    </div>


                    <div class="button-wrapper"><Button title="Share Tip" onClick={() => shareTip()} /></div>

                </div>
            </div>
        );
    }
}
