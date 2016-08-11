import React from "react";

import PostBuyTip from "../components/post/PostBuyTip";
import Post from "../components/post/Post";

export default class PostsContainer extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {posts: [{
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
                                        lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
                        date : "7:30 PM",
                        likes : "5",
                        nComments : "2",
                        totalOdd : 3.41,
                        comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
                        },{
                        tips : [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Rio Ave",  event : "Sporting vs Rio Ave",   odd : 2.35}],
                        comment : "Benfica is very strong, they win. Sporting is very weak, they lose for sure.",
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
                                        lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
                        date : "7:30 PM",
                        likes : "5",
                        nComments : "2",
                        totalOdd : 3.41,
                        comments : [ { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"},
                                     { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "2 min", comment : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}]
                        },{
                        tipster : {name: "João Almeida", image : "img/joaoalmeida.jpg", profit : 120, wins: 120, losses: 60,
                                        lastTips : [ { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost", tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}, 
                                                     { status: "lost",  tips: [{ selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36} ]}, 
                                                     { status: "win",  tips: [ { selection : "Benfica", event : "Belenenses vs Benfica", odd : 1.51}, { selection : "Bayern",  event : "Wolfsburg vs Bayern",   odd : 1.36}]}]},
                        date : "7:30 PM",
                        selections : 5,
                        totalOdd : 3.41, 
                        likes : "5",
                        nComments : "2",
                        price : 0.30                     
                        }]};
    }

    addComment(post, comment) {
        post.comments = [ ...post.comments, { tipsterName : "João Almeida", tipsterImage : "img/joaoalmeida.jpg", date : "just now", comment : comment}];
        this.setState({posts: this.state.posts});
    }

    render() {

        const Posts = this.state.posts.map((post, i) => {
            if (post.price > 0)
                return <PostBuyTip key={i} tipster={post.tipster} date={post.date} likes={post.likes} nComments={post.nComments} totalOdd={post.totalOdd} selections={post.selections} price={post.price}/>
            else
                return <Post addComment={this.addComment.bind(this, post)} key={i} tips={post.tips} comment={post.comment} tipster={post.tipster} date={post.date} likes={post.likes} nComments={post.nComments} totalOdd={post.totalOdd} comments={post.comments}/>
        });

        return (
            <div class="feed-container">
                {Posts}
            </div>
        );
    }
}
