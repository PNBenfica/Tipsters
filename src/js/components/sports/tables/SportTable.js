import React from "react";


export default class SportTable extends React.Component {

  	render() {

	    const {title, events, baseRef} = this.props;

        const Events = events.map((event, i) => {
                const ref = "#/sports/" + baseRef + "/" + event.name + "/" + event.id
                return <a key={i} href={ref} class="col-xs-12 col-sm-6 col-lg-4">{event.name}</a>
            })

	    return (
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{title}</h3>            
                </div>

                <div class="panel-body">        
                    {Events}            
                </div>
            </div>
	    );
  	}
}
