/**
 * Small utility to help with processing mouse-drag events. Usage is:
 *    dom('div', mouseDrag((startEvent, elem) => ({
 *      onMove(moveEvent) { ... },
 *      onStop(stopEvent) { ... },
 *    })));
 *
 * The passed-in callback is called on 'mousedown' events. It may return null to ignore the event.
 * Otherwise, it should return a handler for mousemove/mouseup: we will then subscribe to these
 * events, and clean up on mouseup.
 */
import { DomElementMethod, IDisposable } from "grainjs";
export interface MouseDragHandler {
    onMove(moveEv: MouseEvent): void;
    onStop(endEv: MouseEvent): void;
}
export declare type MouseDragStart = (startEv: MouseEvent, elem: Element) => MouseDragHandler | null;
export declare function mouseDragElem(elem: HTMLElement, onStart: MouseDragStart): IDisposable;
export declare function mouseDrag(onStart: MouseDragStart): DomElementMethod;
