import { getDataAsync, setDataAsync } from './db';
const STORAGE_KEY = 'AUDIO_EFFECT';

const audioEffect = {};
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
if (!!AudioContext) {
  // single instance
  audioCtx = window.audioEffectCtx || new AudioContext();
  window.audioEffectCtx = audioCtx;
  getDataAsync(STORAGE_KEY)
    .then(data => {
      if (!data) {
        return import('../resources/music/audio-effect').then(
          m => m.audioEffect
        );
      }
      return data;
    })
    .then(data => {
      // 采用 IndexedDB
      try {
        setDataAsync(STORAGE_KEY, data);
      } catch (error) {
        console.error(error);
      }
      return data;
    })
    .then(audioData => {
      Object.keys(audioData).forEach(v => {
        fetch(audioData[v])
          .then(res => res.arrayBuffer())
          .then(buffer => {
            audioCtx.decodeAudioData(buffer, decodedData => {
              // 缓存解析到的 AudioBuffer
              audioEffect[v] = decodedData;
            });
          })
          .catch(e => console.error(e));
      });
    });
}

function triggerAudioEffect(prop) {
  if (!!AudioContext) {
    let buffer = audioEffect[prop];
    if (buffer && buffer instanceof AudioBuffer) {
      let source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start();
    } else {
      fetch(audioEffect[prop])
        .then(res => res.arrayBuffer())
        .then(buffer => {
          let source = audioCtx.createBufferSource();
          audioCtx.decodeAudioData(buffer, decodedData => {
            // 缓存解析到的 AudioBuffer
            audioEffect[prop] = decodedData;
            source.buffer = decodedData;
            source.connect(audioCtx.destination);
            source.start();
          });
        })
        .catch(e => console.log(e));
    }
  }
}

export default triggerAudioEffect;
