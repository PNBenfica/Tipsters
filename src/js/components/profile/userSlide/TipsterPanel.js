import React from "react"

import SlidePanel from "../../home/SlidePanel"

export default class TipsterPanel extends React.Component {

    render() {

        const { name, avatar } = this.props

        return (
            <SlidePanel url={ "#/profile/" + name } img={avatar}>
            
                <div class="description col-xs-12">

                    <h3>{ name }</h3>

                </div>

            </SlidePanel>
        )
    }

}

