"use strict";
/**
 * A helper for CSS transitions. Usage:
 *
 *    dom(...,
 *      transition(obs, {
 *        prepare(elem, val) { SET STYLE WITH TRANSITIONS OFF },
 *        run(elem, val) { SET STYLE WITH TRANSITIONS ON },
 *        // finish(elem, val) { console.log("transition finished"); }
 *      )
 *    )
 *
 * Allows modifiying styles in response to changes in an observable. Any time the observable
 * changes, the prepare() callback allows preparing the styles, with transitions off. Then
 * the run() callback can set the styles that will be subject to transitions.
 *
 * The actual transition styles (e.g. 'transition: width 0.2s') should be set on elem elsewhere.
 *
 * The optional finish() callback is called when the transition ends. If CSS transitions are set
 * on multiple properties, only the first one is used to determine when the transition ends.
 *
 * All callbacks are called with the element this is attached to, and the value of the observable.
 *
 * The recommendation is to avoid setting styles at transition end, since it's not entirely
 * reliable; it's better to arrange CSS so that the desired final styles can be set in run(). The
 * finish() callback is intended to tell other code that the element is in its transitioned state.
 *
 * When the observable changes during a transition, the prepare() callback is skipped, the run()
 * callback is called, and the finish() callback delayed until the new transition ends.
 *
 * If other styles are changed (or css classes applied) when the observable changes, subscriptions
 * triggered BEFORE the transition() subscription are applied with transitions OFF (like
 * prepare()); those triggered AFTER are subject to transitions (like run()).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transition = void 0;
const grainjs_1 = require("grainjs");
function transition(obs, trans) {
    const { prepare, run, finish } = trans;
    let watcher = null;
    let firstCall = true;
    return (elem) => grainjs_1.subscribeElem(elem, obs, (val) => {
        // First call is initialization, don't treat it as a transition
        if (firstCall) {
            firstCall = false;
            return;
        }
        if (watcher) {
            watcher.reschedule();
        }
        else {
            watcher = new TransitionWatcher(elem);
            watcher.onDispose(() => {
                watcher = null;
                if (finish) {
                    finish(elem, val);
                }
            });
            // Call prepare() with transitions turned off.
            const prior = elem.style.transitionProperty;
            elem.style.transitionProperty = 'none';
            prepare(elem, val);
            // Recompute styles while transitions are off. See https://stackoverflow.com/a/16575811/328565
            // for explanation and https://stackoverflow.com/a/31862081/328565 for the recommendation used
            // here to trigger a style computation without a reflow.
            window.getComputedStyle(elem).opacity; // tslint:disable-line:no-unused-expression
            // Restore transitions before run().
            elem.style.transitionProperty = prior;
        }
        run(elem, val);
    });
}
exports.transition = transition;
/**
 * Helper for waiting for an active transition to end. Beyond listening to 'transitionend', it
 * does a few things:
 *
 * (1) if the transition lists multiple properties, only the first property and duration are used
 *     ('transitionend' on additional properties is inconsistent across browsers).
 * (2) if 'transitionend' fails to fire, the transition is considered ended when duration elapses,
 *     plus 10ms grace period (to let 'transitionend' fire first normally).
 * (3) reschedule() allows resetting the timer if a new transition is known to have started.
 *
 * When the transition ends, TransitionWatcher disposes itself. Its onDispose() method allows
 * registering callbacks.
 */
class TransitionWatcher extends grainjs_1.Disposable {
    constructor(elem) {
        super();
        const style = window.getComputedStyle(elem);
        this._propertyName = style.transitionProperty.split(",")[0].trim();
        // Gets the duration of the transition from the styles of the given element, in ms.
        // FF and Chrome both return transitionDuration in seconds (e.g. "0.150s") In case of multiple
        // values, e.g. "0.150s, 2s"; parseFloat will just parse the first one.
        const duration = style.transitionDuration;
        this._durationMs = ((duration && parseFloat(duration)) || 0) * 1000;
        this.autoDispose(grainjs_1.dom.onElem(elem, 'transitionend', (e) => (e.propertyName === this._propertyName) && this.dispose()));
        this._timer = setTimeout(() => this.dispose(), this._durationMs + 10);
        this.onDispose(() => clearTimeout(this._timer));
    }
    reschedule() {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => this.dispose(), this._durationMs + 10);
    }
}
//# sourceMappingURL=transitions.js.map