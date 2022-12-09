"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouseDrag = exports.mouseDragElem = void 0;
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
const grainjs_1 = require("grainjs");
function mouseDragElem(elem, onStart) {
    // This prevents the default text-drag behavior when elem is part of a text selection.
    elem.style.userSelect = 'none';
    return grainjs_1.dom.onElem(elem, 'mousedown', (ev, el) => _startDragging(ev, el, onStart));
}
exports.mouseDragElem = mouseDragElem;
function mouseDrag(onStart) {
    return (elem) => { mouseDragElem(elem, onStart); };
}
exports.mouseDrag = mouseDrag;
function _startDragging(startEv, elem, onStart) {
    const dragHandler = onStart(startEv, elem);
    if (dragHandler) {
        const { onMove, onStop } = dragHandler;
        const upLis = grainjs_1.dom.onElem(document, 'mouseup', stop, { useCapture: true });
        const moveLis = grainjs_1.dom.onElem(document, 'mousemove', onMove, { useCapture: true });
        function stop(stopEv) {
            moveLis.dispose();
            upLis.dispose();
            onStop(stopEv);
        }
    }
}
//# sourceMappingURL=mouseDrag.js.map