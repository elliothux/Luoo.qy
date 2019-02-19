export { getIPC } from "./ipc";
export { events, EventTypes } from "./event";

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

export { genRange, px, noop, preventSyntheticEvent };
