import React from "react"
import classNames from "classnames"

export default class SideBarItem extends React.Component {

    render() {

        const { name, location, logo, ref, active } = this.props

        //const active = location.pathname.match(/^\/sports/)

        return (
            <a href={"#/" + ref} class={classNames("item col-xs-12", { active } )} >

                <div class="img-wrapper">
                    <img src="https://s28.postimg.org/n8ly0wxy5/modality_basketball.png"/>
                    <div class="hover"> </div>
                </div>
                <div class="name">News feed</div>

            </a>
        )
    }
}
