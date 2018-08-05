import { getDataAsync, setDataAsync } from './db';
const STORAGE_KEY = 'BGM_MUSIC';

async function subscribeBgmMusic(store) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const isMobile = window.matchMedia('(max-width: 414px)').matches;
  if (!!AudioContext && isMobile) {
    // single instance
    const audioCtx = window.bgmAudioCtx || new AudioContext();
    window.bgmAudioCtx = audioCtx;
    const source = audioCtx.createBufferSource();
    getDataAsync(STORAGE_KEY)
      .then(data => {
        if (!data) {
          return import('../resources/music/bgm').then(m => m.music);
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
      .then(music => {
        return fetch(music)
          .then(res => res.arrayBuffer())
          .then(buffer => {
            audioCtx.decodeAudioData(buffer, decodedData => {
              source.buffer = decodedData;
              source.loop = true; // 音乐循环播放
              source.connect(audioCtx.destination);
              source.start();
              if (
                audioCtx.state === 'running' &&
                !store.getState().gameInfo.music
              ) {
                audioCtx.suspend();
              }
            });
          });
      });

    store.subscribe(() => {
      if (audioCtx.state === 'suspended' && store.getState().gameInfo.music) {
        audioCtx.resume().then(function() {
          // Promise
          console.log('music resume');
        });
      } else if (
        audioCtx.state === 'running' &&
        !store.getState().gameInfo.music
      ) {
        audioCtx.suspend().then(function() {
          // Promise
          console.log('music suspended');
        });
      }
    });
    document.addEventListener('visibilitychange', function(e) {
      if (document.hidden && audioCtx.state === 'running') {
        audioCtx.suspend().then(function() {
          // Promise
          console.log('music suspended');
        });
      } else if (
        !document.hidden &&
        audioCtx.state === 'suspended' &&
        store.getState().gameInfo.music
      ) {
        audioCtx.resume().then(function() {
          // Promise
          console.log('music resume');
        });
      }
    });
  }
}

export { subscribeBgmMusic };
