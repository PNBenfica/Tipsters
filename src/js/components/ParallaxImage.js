import React from "react"

export default class ParallaxImage extends React.Component {

	constructor(args){
		super(...args)
		this.state = { backgroundPositionY : 0 }

		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount(){
        window.addEventListener("scroll", this.handleScroll)
	}

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll() {
    	// const backgroundPositionY = -document.body.scrollTop / 5
    	const backgroundPositionY = -(window.innerHeight - this.refs.picture.getBoundingClientRect().top) / 8 + 60
		// console.log(-(window.innerHeight - this.refs.picture.getBoundingClientRect().top) / 8 + 60)
		// console.log(backgroundPositionY)
		// console.log("-----------------")
    	this.setState({ backgroundPositionY })
    }

    render() {

    	const { img } = this.props
		const { backgroundPositionY } = this.state

        return (
			<picture class="parallax" ref="picture" style={ { backgroundImage: "url(" + img + ")", backgroundPositionY: backgroundPositionY + "px" } } />
        )
    }
}
