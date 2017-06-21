import React from "react";

import classNames from "classnames"
import onClickOutside from 'react-onclickoutside'

import Icon from "./Icon"
import Section from "../../Section"

export default onClickOutside( class FixedPagePanel extends React.Component {

    constructor(args){
        super(...args)
        this.state = { open : false }
    }

    onIconClick(){
        const open = !this.state.open
        if (open){
            // this.lockBody()
            this.setState( { open } )
        }
        else{
            this.closePanel()
        }
    }

    handleClickOutside(event){
        this.closePanel()
    }

    closePanel(){
        const { open } = this.state
        if (open){
            // this.unlockBody()
            this.setState( { open : false } )
        }
    }
    
    render() {

        const { active, classes, icon, iconNumber, id, title } = this.props;
        const { open } = this.state

        return (
            <div id={id} class={ classNames("fixed-page-panel", classes, { active: active || open, open }) } >

                <Icon icon={icon} n={iconNumber} onClick={this.onIconClick.bind(this)} />

                <div class="page-panel">
                    <Section title={title}>
                        { this.props.children }
                    </Section>
                </div>

            </div>
        )
    }



    lockBody() {
        var scrollbarwidth = (window.innerWidth - $(window).width());
        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        var html = $('html'); 
        if (!html.hasClass("scroll-lock")) {
            html.addClass("scroll-lock");
            html.data('scroll-position', scrollPosition);
            html.data('previous-overflow', html.css('overflow'));
            $('html').css('overflow-y', 'hidden');
            window.scrollTo(scrollPosition[0], scrollPosition[1]);
            $('html, .fixed, .fixed-nav > .nav-top, .cookies-bar').css('padding-right', scrollbarwidth + 'px');
        }
    };
    unlockBody(){
        var html = $('html');
        html.css('overflow-y', 'visible');
        $('html, .fixed, .fixed-nav > .nav-top, .cookies-bar').css('padding-right', '0');
        html.removeClass("scroll-lock");
    };
})
