import React from "react"

import classNames from "classnames"

import SVG from "./../SVG"

export default class Video extends React.Component {

	constructor(args){
		super(...args)
		this.state = { playing: false }

		this.playVideo = this.playVideo.bind(this)
		this.pauseVideo = this.pauseVideo.bind(this)
		this.fullScreen = this.fullScreen.bind(this)
	}

	playVideo(){
        
        const { playing } = this.state

        if (!playing){
			this.refs.video.play()
			this.setState({ playing : true })
        }
        else {
			this.pauseVideo()
        }
	}

	pauseVideo(){

        const { playing } = this.state

        if (playing){
			this.refs.video.pause()
			this.setState({ playing : false })
        }
	}

	fullScreen(){
		const { video } = this.refs
		if (video.requestFullscreen) {
		  	video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
		  	video.mozRequestFullScreen();
		} else if (video.webkitRequestFullscreen) {
		  	video.webkitRequestFullscreen();
		}
	}

    render() {

        const { video } = this.props
        const { playing } = this.state

        return (
        	<div class={classNames( "col-xs-12 video-container", { playing } )} onClick={this.playVideo} onDoubleClick={this.fullScreen} >

      			<video ref="video" src={video} onEnded={this.pauseVideo} onPaused={this.pauseVideo} />

      			<div class={classNames("play-button")} >
      				<SVG icon="icon-video" />
  				</div>

        	</div>
		)
  	}
}