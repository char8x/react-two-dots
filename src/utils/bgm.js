const STORAGE_KEY = 'BGM_MUSIC';
async function downloadMusic() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    data = await import('../resources/music/bgm').then(m => m.music);
    try {
      // 如果超出 localStorage 在浏览器中的定额或在隐私浏览模式下会抛出异常
      localStorage.setItem(STORAGE_KEY, data);
    } catch (e) {
      console.log(e);
    }
  }
  return data;
}

async function subscribeBgmMusic(store) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const isMobile = window.matchMedia('(max-width: 414px)').matches;
  if (!!AudioContext && isMobile) {
    const audioCtx = new AudioContext();
    const source = audioCtx.createBufferSource();
    const music = await downloadMusic();
    fetch(music)
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
  }
}

export { subscribeBgmMusic };
