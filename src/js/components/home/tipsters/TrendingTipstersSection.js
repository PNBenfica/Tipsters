import React from "react"

import Section from "../../Section"
import Slider from "../Slider"
import TrendTipsterPanel from "./TrendTipsterPanel"

export default class TrendingTipstersSection extends React.Component {

    render() {

        let liveStreams = [
            { tipster:{name: "Paulo Teixeira", avatar:"img/user1.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "Ederson Florentino", avatar:"img/user6.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "João Almeida", avatar:"img/user2.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "Ederson Florentino", avatar:"img/user3.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "Paulo Teixeira", avatar:"img/user4.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "João Almeida", avatar:"img/user5.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "Paulo Teixeira", avatar:"img/user7.jpg"}, date:"Há 27 minutos", url:"#" },
            { tipster:{name: "João Almeida", avatar:"img/user8.jpg"}, date:"Há 27 minutos", url:"#" },
        ]

        liveStreams = liveStreams.map((liveStream,i) => <div key={i}><TrendTipsterPanel {...liveStream} /></div>)

        return (
            <Section title="Trending Tipsters" id="trend-users" classes="card-slide">

                <Slider>
                    <div key={1000}/>
                    { liveStreams }
                </Slider>

            	
            </Section>
        )
    }

}
