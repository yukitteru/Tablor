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
import { BindableValue, DomElementMethod } from 'grainjs';
export interface ITransitionLogic<T = void> {
    prepare(elem: HTMLElement, value: T): void;
    run(elem: HTMLElement, value: T): void;
    finish?(elem: HTMLElement, value: T): void;
}
export declare function transition<T>(obs: BindableValue<T>, trans: ITransitionLogic<T>): DomElementMethod;
