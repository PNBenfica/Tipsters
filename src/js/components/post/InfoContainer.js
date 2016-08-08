import React from "react";
import classNames from "classnames";

import TipsterForm from "./tipsterForm/TipsterForm";

export default class InfoContainer extends React.Component {

  render() {

    const { totalOdd, profit, wins, losses, lastTips} = this.props;

    return (
        <div class="col-xs-12 col-sm-4 feed-post-left-container">
            <div class="wrapper">
                <p class={classNames({totalOdd : 'hidden'})}>Total odd: {totalOdd}</p>
                <p class={classNames("divider", "hidden-xs", {totalOdd : 'hidden'})} ></p>
                <p>Tipster form:</p>

                <TipsterForm lastTips={lastTips}/>

                <p class="divider"></p>
                <p class="divider hidden-xs"></p>
                <p class="hidden-xs">Profit: {profit}</p>
                <p class="hidden-xs">Win-Loss: {wins} - {losses}</p>
            </div>
        </div>
    );
  }
}
