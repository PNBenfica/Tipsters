import React from 'react';
import { captureUserMedia } from './AppUtils';
import Webcam from './Webcam';
import RecordRTC from 'recordrtc';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      recording: false,
      src: null
    };

    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
    });
  }

  startRecord() {

    this.setState({ recording : true })

    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });


    // setTimeout(() => {
      // this.stopRecord();
    // }, 4000);
  }

  stopRecord() {
    const { setUploadVideo } = this.props

    this.setState({ recording : false })

    this.state.recordVideo.stopRecording(() => {

      setUploadVideo( this.state.recordVideo.blob )

    });

  }

    discardRecord() {
        const { setUploadVideo } = this.props
        setUploadVideo( false )
    }

    renderActions(){

        const { uploadedVideo } = this.props
        const { recording } = this.state

        let button
        if (uploadedVideo)
            button = { name : "Discard video", onClick : this.discardRecord.bind(this)}
        else if (recording)
            button = { name : "Stop", onClick : this.stopRecord}
        else
            button = { name : "Start", onClick : this.startRecord}

        return (
            <div class="actions">
            {
                <div class="button" onClick={button.onClick}><span>{button.name}</span></div>
            }
            </div>
        )
    }

    render() {

        let { src } = this.state
        const { uploadedVideo } = this.props

        if (uploadedVideo){
            src = uploadedVideo
        }

        return(
            <div class="record-container col-xs-12">
                <div><Webcam src={src} uploadedVideo={uploadedVideo} /></div>

                {this.renderActions()}
            </div>
        )
    }
}

export default RecordPage;

