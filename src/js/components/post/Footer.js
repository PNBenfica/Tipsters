import React from "react"

export default class Footer extends React.Component {

    render() {

        const { likes, comments} = this.props

        return (
            <div class="panel-footer">
                <div class="row">
                    <a><i class="fa fa-thumbs-up" aria-hidden="true"></i> Like ({likes})</a>
                    <a onClick={() => this.props.toggleCommentBox()}><i class="fa fa-envelope" aria-hidden="true"></i> Comment ({comments})</a>
                </div>
            </div>
        )
    }
}
