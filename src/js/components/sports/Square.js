import React from "react"

import classNames from "classnames"

export default class Square extends React.Component {

    render() {

    const { active, code, icon, img, url, name} = this.props

    const hasIcon = typeof icon !== "undefined"

    return (
            <div class={classNames("square col-xs-12 col-sm-4", { active }, { noIcon : !hasIcon } )}>
                <div class="aspect-ratio">
                    <a class="inner-item" href={url}>

                        <picture style={ { backgroundImage: "url(" + img + ")" } } />

                        <div>
                            { hasIcon ? <svg><use xlinkHref={icon} /></svg> : null }
                            <h2>{name}</h2>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
