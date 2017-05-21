import React from "react"

import classNames from "classnames"

export default class Slide extends React.Component {

    render() {

    	const { active, background, next, prevDotClick, title } = this.props

        return (
            <section class={classNames("slide", { active, next, prevDotClick } ) } style={{ backgroundImage: "url("+ background + ")" }} >

            	<p>{title}</p>

            </section>
        )

    }
}
