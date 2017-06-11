import React from "react"

import ButtonsContainer from "./buttons/ButtonsContainer"

export default class Header extends React.Component {

    render() {

        const { name, img, following, toggleFollow } = this.props

        return (
            <header>

                <div class="content fade-in">

                    <img src={img} class="img-circle" />

                    <h2>{name}</h2>

                    <ButtonsContainer name={name} following={following} toggleFollow={toggleFollow}/>

                </div>

            </header>
        )
    }
}
