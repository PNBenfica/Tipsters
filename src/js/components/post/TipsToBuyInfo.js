import React from "react";
import {Panel} from "react-bootstrap";


export default class TipsToBuyInfo extends React.Component {

    render() {

        const { totalOdd, selections, price} = this.props;

        return (        
            <div class="col-xs-12 col-sm-8 feed-post-right-container">
                <div class="panel-body post-content">
                
                    <Panel class="post-tips">
                        <p>Seleções: {selections}</p>
                        <p>Odd total: {totalOdd}</p>
                        <p>Preço: {price}€</p>
                    </Panel>

                    <button class="btn btn-block"><span class="glyphicon glyphicon-shopping-cart"></span> Comprar tip</button>
                </div>
            </div>
        );
    }
}
