import React from "react"

export default class Panel extends React.Component {

    constructor(args){
        super(args)
        this.state = { counter: 0 }

        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount(){
        window.addEventListener("scroll", this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
        this.timerFunction && clearInterval(this.timerFunction);
        this.timerFunction = false;
    }

    handleScroll() {
        if (this.refs.panel.getBoundingClientRect().top < window.innerHeight){
            window.removeEventListener("scroll", this.handleScroll)
            setTimeout(this.startCounterAnimation.bind(this), 1000)
        }
    }



    startCounterAnimation(){
        const { counter } = this.props
        const animationDuration = 2000;
        const repetitionDuration = animationDuration / (this.isInt(counter) ? this.modulo(counter) : this.modulo(counter) * 10)
        this.timerFunction = setInterval(this.counterAnimation.bind(this), repetitionDuration)
        this.setState({ animationDuration })
    }

    counterAnimation(){
        const { counter } = this.props
        if (this.modulo(this.state.counter) < this.modulo(counter)){
            this.setState({ counter: this.state.counter + this.inc(counter) })
        }
        else{
            clearInterval(this.timerFunction);
            this.setState({ counter })
        } 
    }

    inc(n){
        let inc = 1
        if (!this.isInt(n))
            inc = 0.11
        if (!this.isPositive(n))
            inc = -inc
        return inc
    }

    modulo(n){
        if (this.isPositive(n))
            return n
        else 
            return -n
    }

    isPositive(n){
        return n > 0
    }
    
    isInt(n) {
       return n % 1 === 0;
    }

    render() {

    	const { icon, description, percentage } = this.props
        const { counter } = this.state
        return (
        	<div class="top-stat-panel col-xs-4" ref="panel">
        		<div class="inner-item">
        			<div class="border">

                        <div>

                            <i class={ icon } aria-hidden="true"></i>

                            <p class="counter">{ (percentage? counter.toFixed(2) +  "%" : counter)}</p>

                            <p class="description">{ description }</p>

                        </div>

        			</div>
        		</div>
        	</div>
        )
    }
}
