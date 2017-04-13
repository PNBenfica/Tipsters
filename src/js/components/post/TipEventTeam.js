import React from "react"

export default class TipEventTeam extends React.Component {

	randomImage(){
		const images = ["img/sports/arouca.png", "img/sports/arsenal.png", "img/sports/barcelona.png", "img/sports/belenenses.png", "img/sports/borussia.png", "img/sports/braga.png", "img/sports/chaves.png", "img/sports/feirense.png", "img/sports/liverpool.jpg", "img/sports/maritimo.png", "img/sports/moreirense.png", "img/sports/nacional.png", "img/sports/pferreira.png", "img/sports/porto.png", "img/sports/realmadrid.png"]
		return images[Math.floor(Math.random()*images.length)];  
	}

    render() {

        const { name, img } = this.props

        return (
            <div class="team">
                <img src={img}/>
                {name}
            </div>
        )
    }
}
