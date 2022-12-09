/**
 * CSS Variables. To use in your web appication, add `cssRootVars` to the class list for your app's
 * root node, typically `<body>`.
 *
 * The fonts used attempt to default to system fonts as described here:
 *  https://css-tricks.com/snippets/css/system-font-stack/
 *
 */
import {ProductFlavor} from 'app/common/tablorUrls';
import {dom, makeTestId, styled, TestId} from 'grainjs';
import values = require('lodash/values');

const VAR_PREFIX = 'grist';

class CustomProp {
  constructor(public name: string, public value: string) { }

  public decl() {
    return `--${VAR_PREFIX}-${this.name}: ${this.value};`;
  }

  public toString() {
    return `var(--${VAR_PREFIX}-${this.name})`;
  }
}

export const colors = {
  lightGrey: new CustomProp('color-light-grey', '#F7F7F7'),
  mediumGrey: new CustomProp('color-medium-grey', 'rgba(217,217,217,0.6)'),
  mediumGreyOpaque: new CustomProp('color-medium-grey-opaque', '#E8E8E8'),
  darkGrey: new CustomProp('color-dark-grey', '#D9D9D9'),

  light: new CustomProp('color-light', '#FFFFFF'),
  dark: new CustomProp('color-dark', '#262633'),
  darkBg: new CustomProp('color-dark-bg', '#262633'),
  slate: new CustomProp('color-slate', '#929299'),

  lightGreen: new CustomProp('color-light-green', '#16B378'),
  darkGreen: new CustomProp('color-dark-green', '#009058'),
  darkerGreen: new CustomProp('color-darker-green', '#007548'),
  lighterGreen: new CustomProp('color-lighter-green', '#b1ffe2'),

  cursor: new CustomProp('color-cursor', '#16B378'),   // cursor is lightGreen
  selection: new CustomProp('color-selection', 'rgba(22,179,120,0.15)'),
  inactiveCursor: new CustomProp('color-inactive-cursor', '#A2E1C9'),

  hover: new CustomProp('color-hover', '#bfbfbf'),
  error: new CustomProp('color-error', '#D0021B'),
  backdrop: new CustomProp('color-backdrop', 'rgba(38,38,51,0.9)')

};

export const vars = {
  /* Fonts */
  fontFamily: new CustomProp('font-family', `-apple-system,BlinkMacSystemFont,Segoe UI,
    Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol`),

  // This is more monospace and looks better for data that should often align (e.g. to have 00000
  // take similar space to 11111). This is the main font for user data.
  fontFamilyData: new CustomProp('font-family-data',
    `Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol`),

  /* Font sizes */
  xxsmallFontSize:  new CustomProp('xx-font-size',        '8px'),
  xsmallFontSize:   new CustomProp('x-small-font-size',   '10px'),
  smallFontSize:    new CustomProp('small-font-size',     '11px'),
  mediumFontSize:   new CustomProp('medium-font-size',    '13px'),
  largeFontSize:    new CustomProp('large-font-size',     '16px'),
  xlargeFontSize:   new CustomProp('x-large-font-size',   '18px'),
  xxlargeFontSize:  new CustomProp('xx-large-font-size',  '20px'),
  xxxlargeFontSize: new CustomProp('xxx-large-font-size', '22px'),

  /* Controls size and space */
  controlFontSize: new CustomProp('control-font-size', '12px'),
  smallControlFontSize: new CustomProp('small-control-font-size', '10px'),
  bigControlFontSize: new CustomProp('big-control-font-size', '13px'),
  headerControlFontSize: new CustomProp('header-control-font-size', '22px'),
  bigControlTextWeight: new CustomProp('big-text-weight', '500'),
  headerControlTextWeight: new CustomProp('header-text-weight', '600'),

  /* Labels */
  labelTextSize:  new CustomProp('label-text-size', 'medium'),
  labelTextBg:    new CustomProp('label-text-bg', '#FFFFFF'),
  labelActiveBg:  new CustomProp('label-active-bg', '#F0F0F0'),

  controlMargin:  new CustomProp('normal-margin', '2px'),
  controlPadding: new CustomProp('normal-padding', '3px 5px'),
  tightPadding:   new CustomProp('tight-padding',  '1px 2px'),
  loosePadding:   new CustomProp('loose-padding',  '5px 15px'),

  /* Control colors and borders */
  primaryBg:        new CustomProp('primary-fg', '#16B378'),
  primaryBgHover:   new CustomProp('primary-fg-hover', '#009058'),
  primaryFg:        new CustomProp('primary-bg', '#ffffff'),

  controlBg:      new CustomProp('control-bg', '#ffffff'),
  controlFg:      new CustomProp('control-fg', '#16B378'),
  controlFgHover: new CustomProp('primary-fg-hover', '#009058'),

  controlBorder:        new CustomProp('control-border', '1px solid #11B683'),
  controlBorderRadius:  new CustomProp('border-radius', '4px'),

  logoBg: new CustomProp('logo-bg', '#040404'),
  toastBg: new CustomProp('toast-bg', '#040404'),
};

const cssColors = values(colors).map(v => v.decl()).join('\n');
const cssVars = values(vars).map(v => v.decl()).join('\n');
const cssFontParams = `
  font-family: ${vars.fontFamily};
  font-size: ${vars.mediumFontSize};
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`;

// We set box-sizing globally to match bootstrap's setting of border-box, since we are integrating
// into an app which already has it set, and it's impossible to make things look consistently with
// AND without it. This duplicates bootstrap's setting.
const cssBorderBox = `
  *, *:before, *:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  }
`;

// These styles duplicate bootstrap's global settings, which we rely on even on pages that don't
// have bootstrap.
const cssInputFonts = `
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
`;

const cssVarsOnly = styled('div', cssColors + cssVars);
const cssBodyVars = styled('div', cssFontParams + cssColors + cssVars + cssBorderBox + cssInputFonts);

const cssBody = styled('body', `
  margin: 0;
  height: 100%;
`);

const cssRoot = styled('html', `
  height: 100%;
  overflow: hidden;
`);

export const cssRootVars = cssBodyVars.className;

// Also make a globally available testId, with a simple "test-" prefix (i.e. in tests, query css
// class ".test-{name}". Ideally, we'd use noTestId() instead in production.
export const testId: TestId = makeTestId('test-');

/**
 * Attaches the global css properties to the document's root to them available in the page.
 */
export function attachCssRootVars(productFlavor: ProductFlavor, varsOnly: boolean = false) {
  dom.update(document.documentElement!, varsOnly ? dom.cls(cssVarsOnly.className) : dom.cls(cssRootVars));
  document.documentElement!.classList.add(cssRoot.className);
  document.body.classList.add(cssBody.className);
}
