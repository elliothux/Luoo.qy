declare module 'react-textscroll' {
    export interface readOptions {
        filter?: RegExp | Filter,
        dirTransform?: DirTransform,
        fileTransform?: FileTransform
    }

    export type Filter = (file: File) => boolean;
    export type DirTransform = (file: File, value: any) => any;
    export type FileTransform = (file: File) => any;

    export function readDirectory(dir: string, options?: readOptions): object;

    export class File {
        key: string;
        readonly path: string;
        readonly fullpath: string;
        readonly ext: string;
        readonly name: string;
        readonly basename: string;

        constructor(dir: string, file: string);

        readonly isDirectory: boolean;
        readonly isRequirable: boolean;
    }
}
