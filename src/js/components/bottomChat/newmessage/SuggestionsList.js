import React from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"

import SuggestionsListItem from "./SuggestionsListItem"

@connect((store) => {
  return {
    suggestions: store.search.suggestions,
  }
})
export default class SuggestionsList extends React.Component {

    render() {

        const { input, createNewMessage } = this.props

        let suggestions = this.props.suggestions.filter(suggestion => suggestion.type == "USER").map(suggestion => suggestion.name)
        // let suggestions = [ "Rui Silva", "Britta Buckmaster", "Alberta Borrero", "So Granados", "Rossana Allensworth", "Ilse Betton", "Patrick Hirata", "Lewis Sampson", "Len Shin", "Brad Whitmire", "Charla Roane", "Cristina Lollar", "Jeane Bethel", "Franklin Meidinger", "Micheal Nix", "Alissa Goodwin", "Alyson Spada", "Elinor Umfleet", "Kari Kesinger", "Onita Demoura", "Sherlyn Kinlaw", "Venita Saunder", "Darron Kantz", "Noel Goldman", "Elwanda Ulman", "Dione Cresswell", "Linn Reidhead", "Leonor Lierman", "Hector Aune", "America Alicea", "Van Kirwin", "Angel Balderas", "Ilda Rosenbalm", "Carla Kiger", "Chan Vandenberg", "Wendi Mccotter", "Victor Pinkowski", "Ashlea Vanwagenen", "Karie Mallet", "Fran Gorham", "Miranda Kopp", "Floria Ferber", "Consuela Lafountain", "Erna Evans", "Frankie Miles", "Danielle Brueggemann", "Gloria Mandez", "Dortha Paquet", "Sharonda Mccutchen", "Emerson Esqueda", "Karmen Newcombe" ]
        
        if(input === "")
            suggestions = []
        else{
            suggestions = suggestions.filter(name => name.toLowerCase().includes(input.toLowerCase())).sort()
            suggestions = suggestions.slice(0,4).map((name, i) => <SuggestionsListItem key={i} name={name} createNewMessage={createNewMessage}/>)
        }

        return (
            <div class="col-xs-12">
                <ul class="list-group">
                    {suggestions}
                </ul>
            </div>
        )
    }
}


