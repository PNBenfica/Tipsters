import React from "react"

export default class Panel extends React.Component {

    constructor(args){
        super(args)
        this.state = { counter: 0 }
    }

    componentDidMount(){
        this.startCounterAnimation()
    }

    componentWillUnmount () {
        this.timerFunction && clearInterval(this.timerFunction);
        this.timerFunction = false;
    }

    startCounterAnimation(){
        const { counter } = this.props
        const animationDuration = 2000;
        const repetitionDuration = animationDuration / (this.isInt(counter) ? counter : counter * 10)
        this.timerFunction = setInterval(this.counterAnimation.bind(this), repetitionDuration)
        this.setState({ animationDuration })
    }

    counterAnimation(){
        const { counter } = this.props
        if (this.state.counter < counter){
            this.setState({ counter: this.state.counter + (this.isInt(counter) ? 1 : 0.11) })
        }
        else{
            clearInterval(this.timerFunction);
            this.setState({ counter })
        } 
    }
    
    isInt(n) {
       return n % 1 === 0;
    }

    render() {

    	const { icon, description, percentage } = this.props
        const { counter } = this.state
        return (
        	<div class="top-stat-panel col-xs-4">
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
