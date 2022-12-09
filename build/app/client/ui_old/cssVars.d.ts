/**
 * CSS Variables. To use in your web appication, add `cssRootVars` to the class list for your app's
 * root node, typically `<body>`.
 *
 * The fonts used attempt to default to system fonts as described here:
 *  https://css-tricks.com/snippets/css/system-font-stack/
 *
 */
import { ProductFlavor } from 'app/common/gristUrls';
import { TestId } from 'grainjs';
declare class CustomProp {
    name: string;
    value: string;
    constructor(name: string, value: string);
    decl(): string;
    toString(): string;
}
export declare const colors: {
    lightGrey: CustomProp;
    mediumGrey: CustomProp;
    mediumGreyOpaque: CustomProp;
    darkGrey: CustomProp;
    light: CustomProp;
    dark: CustomProp;
    darkBg: CustomProp;
    slate: CustomProp;
    lightGreen: CustomProp;
    darkGreen: CustomProp;
    darkerGreen: CustomProp;
    lighterGreen: CustomProp;
    cursor: CustomProp;
    selection: CustomProp;
    inactiveCursor: CustomProp;
    hover: CustomProp;
    error: CustomProp;
    backdrop: CustomProp;
};
export declare const vars: {
    fontFamily: CustomProp;
    fontFamilyData: CustomProp;
    xxsmallFontSize: CustomProp;
    xsmallFontSize: CustomProp;
    smallFontSize: CustomProp;
    mediumFontSize: CustomProp;
    largeFontSize: CustomProp;
    xlargeFontSize: CustomProp;
    xxlargeFontSize: CustomProp;
    xxxlargeFontSize: CustomProp;
    controlFontSize: CustomProp;
    smallControlFontSize: CustomProp;
    bigControlFontSize: CustomProp;
    headerControlFontSize: CustomProp;
    bigControlTextWeight: CustomProp;
    headerControlTextWeight: CustomProp;
    labelTextSize: CustomProp;
    labelTextBg: CustomProp;
    labelActiveBg: CustomProp;
    controlMargin: CustomProp;
    controlPadding: CustomProp;
    tightPadding: CustomProp;
    loosePadding: CustomProp;
    primaryBg: CustomProp;
    primaryBgHover: CustomProp;
    primaryFg: CustomProp;
    controlBg: CustomProp;
    controlFg: CustomProp;
    controlFgHover: CustomProp;
    controlBorder: CustomProp;
    controlBorderRadius: CustomProp;
    logoBg: CustomProp;
    toastBg: CustomProp;
};
export declare const cssRootVars: string;
export declare const testId: TestId;
/**
 * Attaches the global css properties to the document's root to them available in the page.
 */
export declare function attachCssRootVars(productFlavor: ProductFlavor, varsOnly?: boolean): void;
export {};
