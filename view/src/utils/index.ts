import * as React from "react";
import { Remote } from 'electron';

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

export type PromiseResult<T> = Promise<[T, null] | [null, Error]>;
function promiseWrapper<T>(p: Promise<T>): PromiseResult<T> {
  return new Promise(resolve => {
    p.then(i => resolve([i as T, null])).catch(e => resolve([null, e]));
  });
}

function uniqueBy<T>(array: T[], getKey: (item: T) => string): T[] {
  const map: {
    [key: string]: T;
  } = {};
  array.forEach(i => {
    const key = getKey(i);
    if (map[key]) return;
    map[key] = i;
  });
  return Object.keys(map).map(key => map[key]);
}

function scrollToTop(element: Maybe<HTMLElement>, smooth: boolean = true): void {
  if (!element) {
    return;
  }
  return element.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto"
  });
}

function getRemote(): Remote {
  const electron = window.require("electron");
  return electron.remote;
}

export {
  genRange,
  px,
  noop,
  exec,
  uniqueBy,
  preventSyntheticEvent,
  formatPlayingTime,
  isAnyPartOfElementInViewport,
  promiseWrapper,
  scrollToTop,
  getRemote
};
export { getIPC, ipcUtils } from "./ipc";
export * from "./event";
export * from "./lyric-parser";
