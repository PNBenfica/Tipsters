import React from "react"
import classNames from "classnames"

import onClickOutside from 'react-onclickoutside'

export default onClickOutside(class SideBar extends React.Component {

    handleClickOutside(event){
        const { open, close } = this.props
        
        if (open){
            
            const clickedTopLink = event.target.className && ( (typeof event.target.className === "string" &&  event.target.className.includes("link") )   || event.target.parentNode.className.includes("link") )
        	
            if (!clickedTopLink){

                close()
            
            }
        
        }
    }

    render() {

        const { classes, open } = this.props

        return (
        	<div class={classNames("sidebar-right", { open }, classes )}>

                {this.props.children}

        	</div>
        )
    }
})
