import React from "react"

import PostsContainer from "../../PostsContainer"

export default class Posts extends React.Component {

    render() {

        return (
            <div class="col-md-8 col-md-push-2">

                <PostsContainer {...this.props.params}/>
            
            </div>
        )
    }
}
