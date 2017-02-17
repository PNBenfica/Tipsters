import React from "react";

import Header from "./Header"

export default class SportTable extends React.Component {

  	render() {

	    const {title, events, eventURL } = this.props;

        const Events = events.map((event, i) => {
                const ref = eventURL.add(event.name, event.id).renderPath()
                return <a key={i} href={ref} class="col-xs-12 col-sm-6 col-lg-4">{event.name}</a>
            })

	    return (
            <div class="panel">
            
                <Header title={title} />

                <div class="panel-body">        
                    {Events}            
                </div>
            </div>
	    );
  	}
}
