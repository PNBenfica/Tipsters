// handle user media capture
export function captureUserMedia(callback) {
  var params = { audio: true, video: true };

  navigator.getUserMedia(params, callback, (error) => {
    alert(JSON.stringify(error));
  });
};
