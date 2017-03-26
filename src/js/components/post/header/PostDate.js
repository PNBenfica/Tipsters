import React from "react"

import TimeAgo from './../../TimeAgo'

export default class PostDate extends React.Component {

    render() {

        const { date, id } = this.props

        return (        
            <a class="post-date" href={"#/posts/" + id}><TimeAgo date={date}/></a>
        )
    }
}
