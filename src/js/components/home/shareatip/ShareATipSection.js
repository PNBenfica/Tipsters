import React from "react"

import Section from "../Section"
import Slider from "../Slider"
import LeaguePanel from "./LeaguePanel"

export default class ShareATipSection extends React.Component {

    render() {

        let leagues = [
            {name:"Premier League", url:"#", img:"img/home/ibra.jpg"},
            {name:"Bundesliga", url:"#", img:"img/home/deus_nato.jpg"},
            {name:"La Liga", url:"#", img:"img/home/messi_neymar.jpg"},
            {name:"Liga Nos", url:"#", img:"img/home/pizzi_cervi.jpg"},
            {name:"Serie A", url:"#", img:"img/home/deus_joao.jpg"},
            {name:"Ligue 1", url:"#", img:"img/home/bernardo_silva.jpg"},
            {name:"Champions League", url:"#", img:"img/home/champions_league.jpg"},
            {name:"Europa League", url:"#", img:"img/home/europa_league.jpg"},
        ]

        leagues = leagues.map((league,i) => <div key={i}><LeaguePanel {...league} /></div>)

        return (
            <Section title="Share a Tip" id="share-a-tip">

                <Slider>
                    <div key={1000}/>
                    { leagues }
                </Slider>

            	
            </Section>
        )
    }

}
