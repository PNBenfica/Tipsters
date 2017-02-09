import React from "react"
import classNames from "classnames"

import Bar from "./Bar"

export default class SideBar extends React.Component {
    
    /*constructor(args){
        super(args)

        const { location } = this.props

        const options = this.getOptions(location.pathname)

        this.state = {
            options
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.location.pathname)
        console.log(this.props.location.pathname)

        if (nextProps.location.pathname !== this.props.location.pathname){
            console.log("yeeeeeee")
            const options = this.getOptions(nextProps.location.pathname)
            this.setState({ options })
        }
    }*/

    getOptions(pathname){
        return [ {name: "News Feed", logo: "img/navbar/news_feed.png", href:"", active :  pathname === "/" },
                 {name: "Share a tip", logo: "img/navbar/share_a_tip.png", href:"sports/1/Football", active : pathname.match(/^\/sports/), 
                    submenus: [ {name: "Football", logo: "img/navbar/football.png", href:"sports/1/Football", active : pathname.match(/^\/sports\/1\/Football/)},
                                {name: "Basketball", logo: "img/navbar/basketball.png", href:"sports/2/Basketball", active : pathname.match(/^\/sports\/2\/Basketball/)},
                                {name: "Tennis", logo: "img/navbar/tennis.png", href:"sports/3/Tennis", active : pathname.match(/^\/sports\/3\/Tennis/)} ]
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
            <div class={classNames("sidebar open", { open })}>
                
                <Bar options={options} active={!sportsPageActive} />

                <Bar options={options[1].submenus} active={sportsPageActive} submenu={true} />

            </div>
        )
    }
}
