export { getIPC } from "./ipc";
export { events, EventTypes } from './event';

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

export { genRange, px };
