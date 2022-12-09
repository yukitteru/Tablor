"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssLeftPane = exports.pagePanels = void 0;
/**
 * Note that it assumes the presence of cssVars.cssRootVars on <body>.
 */
const resizeHandle_1 = require("app/client/ui/resizeHandle");
const transitions_1 = require("app/client/ui/transitions");
const cssVars_1 = require("app/client/ui_old/cssVars");
const icons_1 = require("app/client/ui_old/icons");
const grainjs_1 = require("grainjs");
function pagePanels(page) {
    const testId = page.testId || grainjs_1.noTestId;
    const left = page.leftPanel;
    const right = page.rightPanel;
    const onResize = page.onResize || (() => null);
    return cssPageContainer(exports.cssLeftPane(testId('left-panel'), cssTopHeader(left.header), left.content, grainjs_1.dom.style('width', (use) => use(left.panelOpen) ? use(left.panelWidth) + 'px' : ''), 
    // Opening/closing the left pane, with transitions.
    exports.cssLeftPane.cls('-open', left.panelOpen), transitions_1.transition(left.panelOpen, {
        prepare(elem, open) { elem.style.marginRight = (open ? -1 : 1) * (left.panelWidth.get() - 48) + 'px'; },
        run(elem, open) { elem.style.marginRight = ''; },
        finish: onResize,
    })), 
    // Resizer for the left pane.
    // TODO: resizing to small size should collapse. possibly should allow expanding too
    cssResizeFlexVHandle({ target: 'left', onSave: (val) => { left.panelWidth.set(val); onResize(); } }, testId('left-resizer'), grainjs_1.dom.show(left.panelOpen)), 
    // Show plain border when the resize handle is hidden.
    cssResizeDisabledBorder(grainjs_1.dom.hide(left.panelOpen)), cssMainPane(cssTopHeader((left.hideOpener ? null :
        cssPanelOpener('PanelRight', cssPanelOpener.cls('-open', left.panelOpen), testId('left-opener'), grainjs_1.dom.on('click', () => toggleObs(left.panelOpen)))), page.headerMain, (!right || right.hideOpener ? null :
        cssPanelOpener('PanelLeft', cssPanelOpener.cls('-open', right.panelOpen), testId('right-opener'), grainjs_1.dom.on('click', () => toggleObs(right.panelOpen))))), page.contentMain), (right ? [
        // Resizer for the right pane.
        cssResizeFlexVHandle({ target: 'right', onSave: (val) => { right.panelWidth.set(val); onResize(); } }, testId('right-resizer'), grainjs_1.dom.show(right.panelOpen)),
        cssRightPane(testId('right-panel'), cssTopHeader(right.header), right.content, grainjs_1.dom.style('width', (use) => use(right.panelOpen) ? use(right.panelWidth) + 'px' : ''), 
        // Opening/closing the right pane, with transitions.
        cssRightPane.cls('-open', right.panelOpen), transitions_1.transition(right.panelOpen, {
            prepare(elem, open) { elem.style.marginLeft = (open ? -1 : 1) * right.panelWidth.get() + 'px'; },
            run(elem, open) { elem.style.marginLeft = ''; },
            finish: onResize,
        }))
    ] : null));
}
exports.pagePanels = pagePanels;
function toggleObs(boolObs) {
    boolObs.set(!boolObs.get());
}
const cssVBox = grainjs_1.styled('div', `
  display: flex;
  flex-direction: column;
`);
const cssHBox = grainjs_1.styled('div', `
  display: flex;
`);
const cssPageContainer = grainjs_1.styled(cssHBox, `
  position: absolute;
  isolation: isolate; /* Create a new stacking context */
  z-index: 0; /* As of March 2019, isolation does not have Edge support, so force one with z-index */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 600px;
  background-color: ${cssVars_1.colors.lightGrey};
`);
exports.cssLeftPane = grainjs_1.styled(cssVBox, `
  position: relative;
  background-color: ${cssVars_1.colors.lightGrey};
  width: 48px;
  margin-right: 0px;
  overflow: hidden;
  transition: margin-right 0.4s;
  &-open {
    width: 240px;
    min-width: 160px;
    max-width: 320px;
  }
`);
const cssMainPane = grainjs_1.styled(cssVBox, `
  position: relative;
  flex: 1 1 0px;
  min-width: 0px;
  background-color: white;
  z-index: 1;
`);
const cssRightPane = grainjs_1.styled(cssVBox, `
  position: relative;
  background-color: ${cssVars_1.colors.lightGrey};
  width: 0px;
  margin-left: 0px;
  overflow: hidden;
  transition: margin-left 0.4s;
  z-index: 0;
  &-open {
    width: 240px;
    min-width: 240px;
    max-width: 320px;
  }
`);
const cssTopHeader = grainjs_1.styled('div', `
  height: 48px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${cssVars_1.colors.mediumGrey};
`);
const cssResizeFlexVHandle = grainjs_1.styled(resizeHandle_1.resizeFlexVHandle, `
  --resize-handle-color: ${cssVars_1.colors.mediumGrey};
  --resize-handle-highlight: ${cssVars_1.colors.lightGreen};
`);
const cssResizeDisabledBorder = grainjs_1.styled('div', `
  flex: none;
  width: 1px;
  height: 100%;
  background-color: ${cssVars_1.colors.mediumGrey};
`);
const cssPanelOpener = grainjs_1.styled(icons_1.icon, `
  flex: none;
  width: 32px;
  height: 32px;
  padding: 8px 8px;
  cursor: pointer;
  -webkit-mask-size: 16px 16px;
  background-color: ${cssVars_1.colors.lightGreen};
  transition: transform 0.4s;
  &:hover { background-color: ${cssVars_1.colors.darkGreen}; }
  &-open { transform: rotateY(180deg); }
`);
//# sourceMappingURL=PagePanels.js.map