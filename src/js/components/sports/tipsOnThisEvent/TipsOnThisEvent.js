import React from "react";

import AddComentBox from "./AddComentBox";
import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";

export default class TipsOnThisEvent extends React.Component {

    constructor(...args) {
        super(...args);
        // const tips = [{tipster: {name: "João Almeida", image: "img/joaoalmeida.jpg"}, date:"12 min ago", tips: [{selection: "Benfica", event:"Benfica vs Arouca", odd:1.33}, {selection: "Benfica", event:"Benfica vs Arouca", odd:1.35}]},
        //        {tipster: {name: "João Almeida", image: "img/joaoalmeida.jpg"}, date:"12 min ago", comment: "O Ronaldo está em duvida para o jogo. Esperem até mais proximo da hora do jogo para apostar."},
        //        {tipster: {name: "João Almeida", image: "img/joaoalmeida.jpg"}, date:"12 min ago", tips: [{selection: "Benfica", event:"Benfica vs Arouca", odd:1.33}]}];
        const tips = []
        this.state = { tips};
    }

    

    addComment(comment){
        this.state.tips = [ ...this.state.tips, {tipster: {name: "João Almeida", image: "img/joaoalmeida.jpg"}, date:"12 min ago", comment: comment}];
        this.setState({tips: this.state.tips});
        console.log(this.state.tips);
    }

    render() {

        return (
            <div class="tips-on-this-event panel">

                <ChatHeader />

                <ChatBody tips={this.state.tips}/>

                <AddComentBox addComment={this.addComment.bind(this)}/>

            </div>
        );
    }
}
