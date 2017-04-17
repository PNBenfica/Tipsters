import React from "react"

import ButtonsContainer from "./buttons/ButtonsContainer"

export default class MainAvatar extends React.Component {

    render() {

        const { name, img, following, toggleFollow } = this.props

        return (
            <div class="main-avatar">

                <div class="background"/>
            
                <div class="content">

                    <img src={img} class="img-circle" />

                    <h2>{name}</h2>

                    <ButtonsContainer following={following} toggleFollow={toggleFollow}/>

                </div>

            </div>
        )
    }
}
