import React from "react";


export default class SportTable extends React.Component {

  	render() {

	    const {title, options} = this.props;

	    return (
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{title}</h3>            
                </div>

                <div class="panel-body">                    
                    {options.map((option, i) => <a key={i} href="#/sports/football/premier-league" class="col-xs-12 col-sm-6 col-lg-4">{option}</a>)}
                </div>
            </div>
	    );
  	}
}
