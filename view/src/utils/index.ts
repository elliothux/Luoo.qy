export { getIPC } from "./ipc";
export { events, EventTypes } from "./event";
export { LyricParser } from "./lyric-parser";

function genRange(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function px(i: number) {
  return `${i}px`;
}

function noop() {}

function preventSyntheticEvent<T>(e: React.FormEvent<T>) {
  e.preventDefault();
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  return false;
}

function formatPlayingTime(time: number): string {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = Math.floor(time - minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

function isAnyPartOfElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

export {
  genRange,
  px,
  noop,
  preventSyntheticEvent,
  formatPlayingTime,
  isAnyPartOfElementInViewport
};
