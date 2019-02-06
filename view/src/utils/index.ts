export { getIPC } from "./ipc";

function genRange(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

export {
    genRange
}
