import React from 'react'

export default class Webcam extends React.Component {

  	render() {
  		
  		const { uploadedVideo } = this.props

		return (
			uploadedVideo ? <video controls src={this.props.src} /> : <video autoPlay loop muted src={this.props.src} />
		)
	}
}
