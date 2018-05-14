const STORAGE_KEY = 'REACT_TWO_DOTS';

/**
 * Subscribe Game Progress
 *
 * @param {*} store
 */
function subscribeProgress(store) {
  store.subscribe(() => {
    let data = encodeURIComponent(JSON.stringify(store.getState().gameInfo));
    if (window.btoa) {
      data = window.btoa(data);
    }
    localStorage.setItem(STORAGE_KEY, data);
  });
}

/**
 * Restore Game Progress
 *
 */
function restoreProgress() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return undefined;
  }
  try {
    if (window.atob) {
      data = window.atob(data);
    }
    data = JSON.parse(decodeURIComponent(data));
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e);
    }
    return undefined;
  }
  return {
    gameInfo: data,
  };
}

export { subscribeProgress, restoreProgress };
