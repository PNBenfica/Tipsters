import React from 'react';
import { captureUserMedia, S3Upload } from './AppUtils';
import Webcam from './Webcam';
import RecordRTC from 'recordrtc';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
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
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });

    setTimeout(() => {
      this.stopRecord();
    }, 4000);
  }

  stopRecord() {
    const { setUploadVideo } = this.props

    this.state.recordVideo.stopRecording(() => {

      setUploadVideo( this.state.recordVideo.blob );

    });
  }

  _base64ToArrayBuffer(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

  render() {

    let { src } = this.state
    const { uploadedVideo } = this.props

    if (uploadedVideo){
        // var videoSRC = new Blob([this._base64ToArrayBuffer(uploadedVideo)], { type: "video/webm" })
        src = uploadedVideo
    }

    return(
      <div>
        <div><Webcam src={src}/></div>
        <div><button onClick={this.startRecord}>Start Record</button></div>
      </div>
    )
  }
}

export default RecordPage;

