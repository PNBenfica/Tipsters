import React from "react"

import ButtonsSlide from "./../ButtonsSlide"

export default class MakeLiveStreamPanel extends React.Component {

    render() {

        return (
            <ButtonsSlide buttons={[{ title: "Start Live Stream", url: "#" }]} />
        )
    }

}
