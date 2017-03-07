import React from "react"

import PostsContainer from "./../PostsContainer"
import Stats from "./stats/Stats"

export default class RightColumnContainer extends React.Component {

    render() {

    	const { user } = this.props

        return (
            <div class="right-profile-container">
            
                <Stats /> 

            </div>
        )
    }
}
