import React from "react";
import ReactDOM from 'react-dom';

import {FormControl} from "react-bootstrap";

export default class SellingPrice extends React.Component {

	isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}

	handleChange(e){
		let price = e.target.value;

		if (price === "")
			price = 0;

		if (this.isNumeric(price)){
			this.props.updateSellingPrice(parseFloat(price));
		}
		else{
			e.target.value = price.slice(0, -1);
		}
	}

    render() {
                
        return (
			<p>Selling Price: <FormControl onChange={this.handleChange.bind(this)} type="text" class="input-sm" placeholder="0.0"/> €</p>
        );
  }
}
