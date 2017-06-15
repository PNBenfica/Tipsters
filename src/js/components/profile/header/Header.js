import React from "react"

import ButtonsContainer from "./buttons/ButtonsContainer"
import ImageUpdater from "./ImageUpdater"

export default class Header extends React.Component {

    constructor(args){
        super(...args)
        this.state = { updatingImage : false }
    }

    onImageClick(){
        const { myProfile } = this.props

        if ( myProfile ){
            this.showImageUpdater()
        }
    }

    showImageUpdater(){
        this.setState({ updatingImage : true })
    }

    hideImageUpdater(){
        this.setState({ updatingImage : false })
    }

    updateImage(){
        this.hideImageUpdater()
        this.props.updateImage()
    }

    render() {

        const { name, img, inputValue, following, onInputChange, toggleFollow } = this.props
        const { updatingImage } = this.state

        return (
            <header>

                <div class="content fade-in">

                    <picture onClick={this.onImageClick.bind(this)} >
                        <img src={img} />
                    </picture>

                    <h2>{name}</h2>

                    <ButtonsContainer name={name} following={following} toggleFollow={toggleFollow}/>

                    <ImageUpdater active={updatingImage} hide={this.hideImageUpdater.bind(this)} updateImage={this.updateImage.bind(this)} value={inputValue} onChange={onInputChange} />

                </div>

            </header>
        )
    }
}
