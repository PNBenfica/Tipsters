import React from "react"

import classNames from "classnames"
import onClickOutside from 'react-onclickoutside'

import Button from "../../Button"

export default onClickOutside(class ImageUpdater extends React.Component {

    handleClickOutside(event){
        const { hide } = this.props
        hide()
    }

    render() {

        const { active, onChange, updateImage, value = "" } = this.props

        return (
            <div class={classNames( "image-updater" , { active } )} >

                <div class="col-xs-12 inner-item">
                    <input type="text" placeholder="Insert image url" value={value} onChange={onChange} />
                    <Button onClick={updateImage} title="Actualizar" />
                </div>

            </div>
        )
    }
})
