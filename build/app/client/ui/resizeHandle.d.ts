import { DomElementArg } from "grainjs";
export declare type ChangeFunc = (value: number) => void;
export declare type Edge = 'left' | 'right';
export interface IResizeFlexOptions {
    target: 'left' | 'right';
    onDrag?(value: number): void;
    onSave(value: number): void;
}
export interface IResizeOptions {
    prop: 'width' | 'height';
    sign: 1 | -1;
    getTarget(handle: Element): Element | null;
    onDrag?(value: number): void;
    onSave(value: number): void;
}
export declare function resizeFlexVHandle(options: IResizeFlexOptions, ...args: DomElementArg[]): Element;
