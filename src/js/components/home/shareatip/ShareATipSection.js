import React from "react"

import Section from "../Section"
import Slider from "../Slider"
import LeaguePanel from "./LeaguePanel"

export default class ShareATipSection extends React.Component {

    render() {

        let leagues = [
            {name:"Premier League", url:"#/sports/Football/1/Eng. Premier League/3", img:"img/home/ibra.jpg"},
            {name:"Bundesliga", url:"#/sports/Football/1/German Bundesliga/5/", img:"img/home/deus_nato.jpg"},
            {name:"La Liga", url:"#/sports/Football/1/Spanish Liga Primera/7", img:"img/home/messi_neymar.jpg"},
            {name:"Liga Nos", url:"#/sports/Football/1/Portuguese Prim. Liga/32", img:"img/home/pizzi_cervi.jpg"},
            {name:"Serie A", url:"#/sports/Football/1/Italian Serie A/6", img:"img/home/deus_joao.jpg"},
            {name:"Ligue 1", url:"#/sports/Football/1/French Ligue 1/4", img:"img/home/bernardo_silva.jpg"},
            {name:"Champions League", url:"#/sports/Football/1/Champions League/8", img:"img/home/champions_league.jpg"},
            {name:"Europa League", url:"#/sports/Football/1/Europa League/3453", img:"img/home/europa_league.jpg"},
            {name:"NBA", url:"#/sports/Basketball/4/NBA/13", img:"img/home/nba.jpg"},
            {name:"Australian Open", url:"#/sports/Tennis/2/Australian Open M./22", img:"img/home/federer.jpg"},
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
