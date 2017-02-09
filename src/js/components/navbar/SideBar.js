import React from "react"
import classNames from "classnames"
import SideBarItem from "./SideBarItem"

export default class SideBar extends React.Component {

    render() {

        const { location } = this.props
        // const feedClass = location.pathname === "/" ? "sidebar-item-active" : ""
        // const profileClass = location.pathname.match(/^\/profile/) ? "sidebar-item-active" : ""
        // const sportsClass = location.pathname.match(/^\/sports/) ? "sidebar-item-active" : ""
        // const rankingsClass = location.pathname.match(/^\/rankings/) ? "sidebar-item-active" : ""

        const { open } = this.props

        let options = [ {name: "News Feed", img: "img/navbar/news_feed", ref:"sports", active :location.pathname.match(/^\/sports/) },
                        {name: "News Feed", img: "img/navbar/news_feed", ref:"sports", active :location.pathname.match(/^\/sports/) },
                        {name: "News Feed", img: "img/navbar/news_feed", ref:"sports", active :location.pathname.match(/^\/sports/) },
                        {name: "News Feed", img: "img/navbar/news_feed", ref:"sports", active :location.pathname.match(/^\/sports/) },
                        {name: "News Feed", img: "img/navbar/news_feed", ref:"sports", active :location.pathname.match(/^\/sports/) }]

        options = options.map((option, i) => <SideBarItem key={i} location={location} {...option}/>)

        return (
            <div class={classNames("sidebar open", { open })}>
                
                { options }

            </div>
        )
    }
}
