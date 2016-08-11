import React from "react";

import AboutListItem from "./AboutListItem";
import ProfilePanel from "./ProfilePanel";

export default class About extends React.Component {

    render() {

        const profileInfoList = [["Date of Birth", "6 Agosto de 1994"],["Lives in", "Portugal"], ["Favorite sport", "Football"],["Favorite team", "Benfica"],["Profit", "120"]]
                .map((item, i) => <AboutListItem description={item[0]} value={item[1]} key={i}/>);

        return (
            <ProfilePanel header="About">
                {profileInfoList}
            </ProfilePanel>
        );
    }
}
