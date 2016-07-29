import React from "react";

import TipsterForm from "./TipsterForm";

export default class PostInfoContainer extends React.Component {

  render() {

    const { totalodd, profit, wins, losses} = this.props;

    return (
        <div class="col-xs-12 col-sm-4 feed-post-left-container">
            <div class="wrapper">
                <p>Total odd: {totalodd}</p>
                <p class="divider hidden-xs"></p>
                <p>Tipster form:</p>

                <TipsterForm />

                <p class="divider"></p>
                <p class="divider hidden-xs"></p>
                <p class="hidden-xs">Profit: {profit}</p>
                <p class="hidden-xs">Win-Loss: {wins}-{losses}</p>
            </div>
        </div>
    );
  }
}
