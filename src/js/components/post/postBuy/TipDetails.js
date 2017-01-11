import React from "react"
import {Panel} from "react-bootstrap"


export default class TipDetails extends React.Component {

    render() {

        const { totalOdd, selections, price} = this.props

        return (        
            <Panel class="post-tips">
                <p>Seleções: {selections}</p>
                <p>Odd total: {totalOdd}</p>
                <p>Preço: {price}€</p>
            </Panel>
        )
    }
}
