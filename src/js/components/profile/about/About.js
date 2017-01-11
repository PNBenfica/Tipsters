import React from "react";

import AboutListItem from "./AboutListItem";
import ProfilePanel from "./../ProfilePanel";

export default class About extends React.Component {

    render() {
    	const { profile } = this.props

    	const mapKeys = {date: "Date of Birth", location:"Lives in", favSport:"Favorite sport", favTeam: "Favorite team", profit:"Profit"}
        const infoOrder = ["date", "location", "favSport", "favTeam", "profit"]

        const profileInfoList = infoOrder.map((key, i) => <AboutListItem description={mapKeys[key]} value={profile[key]} key={i}/>);

        return (
            <ProfilePanel header="About">
                {profileInfoList}
            </ProfilePanel>
        );
    }
}
