import React from "react"

export default class ScrollPageDetector extends React.Component {

    handleScroll() {
        // const elem = document.getElementById(this.props.eID)
        // console.log(elem.scrollHeight - elem.scrollTop)
        // console.log(elem.offsetHeight)
        // if (elem.scrollHeight - elem.scrollTop == elem.offsetHeight) {
        // if (obj.scrollTop === (obj.scrollHeight - obj.offsetHeight)){
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight
        const body = document.body
        const html = document.documentElement
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight)
        const windowBottom = windowHeight + window.pageYOffset
        if (windowBottom >= docHeight) {
            this.props.onScrollBottom()
        } 
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this))
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
