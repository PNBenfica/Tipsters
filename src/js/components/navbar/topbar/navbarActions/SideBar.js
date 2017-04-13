import React from "react"
import classNames from "classnames"

import onClickOutside from 'react-onclickoutside'

export default onClickOutside(class SideBar extends React.Component {

    handleClickOutside(event){
        const { open, close } = this.props
        if (open)
        	close()
    }

    render() {

        const { open } = this.props

        return (
        	<div class={classNames("sidebar-right", { open } )}>

                {this.props.children}

        	</div>
        )
    }
})
