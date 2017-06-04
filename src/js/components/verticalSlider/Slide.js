import React from "react"

import classNames from "classnames"

export default class Slide extends React.Component {

    render() {

    	const { active, background, description, next, prevDotClick, href, refTitle, title } = this.props

        return (
            <section class={classNames("slide", { active, next, prevDotClick } ) } >


                <picture style={ { backgroundImage: "url(" + background + ")" } } />

            	<div>

                    <div>
                        <p>{ title }</p>
                        <small>{ description }</small>
                        <a class="hover-underline" href={ href }>{ refTitle }</a>
                    </div>

            	</div>

            </section>
        )

    }
}
