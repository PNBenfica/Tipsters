import React from "react"

export default class PostDate extends React.Component {

    render() {

        const { date, id } = this.props

        return (        
            <a href={"#/posts/" + id}>
                <div class="post-date"><i class="fa fa-clock-o fa-fw"></i> {date}</div>
            </a>
        )
    }
}
