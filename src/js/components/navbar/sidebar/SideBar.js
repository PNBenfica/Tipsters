import React from "react"
import classNames from "classnames"

import Bar from "./Bar"

export default class SideBar extends React.Component {

    getOptions(pathname){
        return [ {name: "News Feed", logo: "img/navbar/news_feed.png", href:"", active :  pathname === "/" },
                 {name: "Share a tip", logo: "img/navbar/share_a_tip.png", href:"sports/Football/1", active : pathname.match(/^\/sports/), 
                    submenus: [ {name: "Football", logo: "img/navbar/football.png", href:"sports/Football/1", active : pathname.match(/^\/sports\/Football\/1/)},
                                {name: "Basketball", logo: "img/navbar/basketball.png", href:"sports/Basketball/4", active : pathname.match(/^\/sports\/Basketball\/4/)},
                                {name: "Tennis", logo: "img/navbar/tennis.png", href:"sports/Tennis/2", active : pathname.match(/^\/sports\/Tennis\/2/)} ]
                },
                 {name: "Live Streams", logo: "img/navbar/live_streams.png", href:"streams", active : pathname.match(/^\/streams/) },
                 {name: "Rankings", logo: "img/navbar/rankings.png", href:"rankings", active : pathname.match(/^\/rankings/) },
                 {name: "Find Tipsters", logo: "img/navbar/tipsters.png", href:"tipsters", active : pathname.match(/^\/tipsters/) }]
    }

    render() {

        const { location, open } = this.props

        const options = this.getOptions(location.pathname)

        const sportsPageActive = options[1].active

        return (
            <div class={classNames("sidebar", { open })}>
                
                <Bar options={options} active={!sportsPageActive} />

                <Bar options={options[1].submenus} active={sportsPageActive} submenu={true} />

            </div>
        )
    }
}
