import React from "react";
import {ButtonGroup, Glyphicon, Media} from "react-bootstrap";



export default class FooterXs extends React.Component {

  render() {

    const { likes, comments} = this.props;

    return (
        <div class="panel-footer visible-xs">
            <div class="row">
                <a class="col-xs-6"><Glyphicon glyph="thumbs-up" /><small>{likes}</small></a>
                <a class="col-xs-6" onClick={() => this.props.toggleCommentBox()}><Glyphicon glyph="comment" /><small>{comments}</small></a>
            </div>
        </div>
    );
  }
}
