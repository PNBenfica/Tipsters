import React from "react";

import ChoiceTD from "./ChoiceTD"
import Header from "./Header"

export default class ColumnsTable extends React.Component {

    render() {

        const { bet, filters, nCols } = this.props
        
        let betChoices = bet.choices
        if (filters.length > 0){
            betChoices = this.mixBetChoices()
        }

        let rows = this.buildMatrix(betChoices)

        rows = rows.map((choices,i) => this.renderRow(choices, i))

        return (
            <div class="panel panel-default odds-table">
                
                <Header title={bet.name} />

                <table class="table">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }

    renderRow(choices, i){
        return (
            <tr key={i}>
                {choices.map((choice, i) => this.renderChoice(choice, i))}
            </tr>)
    }

    renderChoice(choice, i){
        const { eventURL, bet, addTip, isInBetSlip, nCols } = this.props
        const choiceClass= nCols== 2 ? "col-xs-6" : "col-xs-4"

        if(choice === "")
            return <td key={i} class={choiceClass}>-</td>
        return <ChoiceTD key={i} eventURL={eventURL} bet={bet} choice={choice} addTip={addTip} isInBetSlip={isInBetSlip} classes={choiceClass}>{choice.name} <span class="pull-right">{choice.odd}</span></ChoiceTD>
    }

    // the choices aren't received in order, they must be filtered and then placed in the right order
    // (ex: [Over, Over, Under, Under] => filter => [[Under, Under] [Over, Over]] => [Under, Over, Under, Over])
    mixBetChoices(){
        const { bet, filters, nCols } = this.props

        let choices = []
        const cols = filters.map(filter => bet.choices.filter(filter))

        for (var i = 0; i < Math.max(...cols.map(col=>col.length)); i++){
            for (var j = 0; j < nCols; j++)
                choices.push(i >= cols[j].length ? "" : cols[j][i])
        }
        return choices
    }

    buildMatrix(choices){
        const { nCols } = this.props

        let rows = []
        for (var i = 0; i < choices.length; i+=nCols){
            const row = []
            for (var j = 0; j < nCols; j++)
                row.push(choices[i+j])
            rows.push(row)
        }
        return rows
    }
}
