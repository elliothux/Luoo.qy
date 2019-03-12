import * as React from "react";

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

function exec(fn: (...args: any[]) => any) {
  return setTimeout(fn, 0);
}

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

type PromiseResolveResult<T> = [T, null];
type PromiseRejectResult = [null, Error];
export type PromiseResult<T> = Promise<
  PromiseResolveResult<T> | PromiseRejectResult
>;
function promiseWrapper<T>(p: Promise<T>): PromiseResult<T> {
  return new Promise(resolve => {
    p.then(i => resolve([i as T, null])).catch(e => resolve([null, e]));
  });
}

export {
  genRange,
  px,
  noop,
  exec,
  preventSyntheticEvent,
  formatPlayingTime,
  isAnyPartOfElementInViewport,
  promiseWrapper
};
export * from "./ipc";
export * from "./event";
export * from "./lyric-parser";
