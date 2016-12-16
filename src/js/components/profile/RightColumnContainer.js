import React from "react"

import PostsContainer from "./../PostsContainer"
import Stats from "./stats/Stats"

export default class RightColumnContainer extends React.Component {

    render() {

        return (
            <div class="col-xs-12 col-md-7 col-lg-6 col-lg-push-1">
            
                <Stats /> 

                <br/><br/>
                
                <PostsContainer />

            </div>
        )
    }
}
