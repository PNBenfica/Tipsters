import React from "react"


export default class TipsterName extends React.Component {

  render() {

    const {name, description} = this.props

    return (
        <div class="tipster-info">
            <p class="tipster-name"><a href={"#/profile/" + name}>{name}</a></p>
            <p class="tipster-description">{description}</p>
        </div>
    )
  }
}
