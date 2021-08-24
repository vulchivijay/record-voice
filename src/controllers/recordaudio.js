import { RecordStartStop } from './../redux/actions';

let rec;

export const RecordStart = () => {
  let audioChunks = [];
  navigator.mediaDevices.getUserMedia( { audio : true } )
    .then(stream => {
      RecordStartStop(true);
      rec = new MediaRecorder(stream);
      let recordedAudio = document.querySelector('#recordedAudio');
      // let audioDownload;
      rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state === "inactive") {
          let blob = new Blob(audioChunks, {type: 'audio/x-mpeg-3'});
          recordedAudio.src = URL.createObjectURL(blob);
          recordedAudio.controls = true;
          recordedAudio.autoplay = false;
        }
      }
      rec.start();
    })
    .catch( e => console.log(e) );
}

export const RecordStop = () => {
  RecordStartStop(false);
  rec.stop();
}