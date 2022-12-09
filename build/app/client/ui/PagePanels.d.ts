import { DomArg, Observable, TestId } from "grainjs";
export interface PageSidePanel {
    panelWidth: Observable<number>;
    panelOpen: Observable<boolean>;
    hideOpener?: boolean;
    header: DomArg;
    content: DomArg;
}
export interface PageContents {
    leftPanel: PageSidePanel;
    rightPanel?: PageSidePanel;
    headerMain: DomArg;
    contentMain: DomArg;
    onResize?: () => void;
    testId?: TestId;
}
export declare function pagePanels(page: PageContents): HTMLDivElement;
export declare const cssLeftPane: ((...args: import("grainjs").IDomArgs<HTMLDivElement>) => HTMLDivElement) & import("grainjs").IClsName;
