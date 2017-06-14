import React from "react"

export default class FormGroup extends React.Component {

    componentWillMount(){
        const { inputs } = this.props
        
        let values = {}
        inputs.forEach(input => values[input.name] = "" )

        this.setState( { values } )
    }

    handleInputChange(e, inputName){
        let { values } = this.state
        values[inputName] = e.target.value

        this.setState( { values } )

    }

    handleKeyPress(e) {
        if (e.key === 'Enter'){
            e.preventDefault();
            this.onSubmit()
        }
    }

    onSubmit(){

        const { onSubmit } = this.props
        const { values } = this.state

        if (this.validInputs()){
            onSubmit(values)
        }

    }

    validInputs(){

        const { inputs } = this.props

        let valid = true
        inputs.forEach(input => { valid = valid && this.isEmpty(input.name) })

        return valid;
    } 

    isEmpty(inputName){
        const { values } = this.state
        return values[inputName] !== ""
    }   

    render() {

        const { submitButton } = this.props
        const { values } = this.state

        const inputs = this.props.inputs.map( (input,i) => <input key={i} {...input} value={ values[input.name] } onChange={ e => this.handleInputChange(e, input.name) } onKeyPress={this.handleKeyPress.bind(this)} /> )

        return (

    		<div class="form-group">

        		{ inputs }

                <div class="sumbit-button" onClick={ this.onSubmit.bind(this) } >
                    { submitButton }
                </div>

    		</div>
        )
    }
}
