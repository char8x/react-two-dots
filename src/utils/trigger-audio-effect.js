const STORAGE_KEY = 'AUDIO_EFFECT';
async function downloadAudioEffect() {
  let data = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : null;
  if (!data) {
    data = await import('../resources/music/audio-effect').then(
      m => m.audioEffect
    );
    try {
      // 如果超出 localStorage 在浏览器中的定额或在隐私浏览模式下会抛出异常
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
  return data;
}

const audioEffect = {};
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
if (!!AudioContext) {
  audioCtx = new AudioContext();
  (async () => {
    const audioData = await downloadAudioEffect();
    Object.keys(audioData).forEach(v => {
      fetch(audioData[v])
        .then(res => res.arrayBuffer())
        .then(buffer => {
          audioCtx.decodeAudioData(buffer, decodedData => {
            // 缓存解析到的 AudioBuffer
            audioEffect[v] = decodedData;
          });
        })
        .catch(e => console.log(e));
    });
  })();
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
