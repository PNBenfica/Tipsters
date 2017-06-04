import React from "react"

import classNames from "classnames"

export default class Sport extends React.Component {

    render() {

    const { active, code, icon, img, name} = this.props

    return (
            <div class={classNames("sport col-xs-4", { active })}>
                <div class="aspect-ratio">
                    <a class="inner-item" href={"#sports/"+name+"/"+code}>

                        <picture style={ { backgroundImage: "url(" + img + ")" } } />

                        <div>
                            <svg><use xlinkHref={icon} /></svg>
                            <h2>{name}</h2>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
