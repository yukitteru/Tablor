import {PageContents, pagePanels} from 'app/client/ui/PagePanels';
import {cssRootVars} from 'app/client/ui_old/cssVars';
import {dom, observable, styled} from "grainjs";

function renderPage(): Element {
    const leftPanelOpen = observable(true);
    const testContent = styled('div', `
        padding: 5px;
        text-align: center,
        flex: 1 1 0px;
    `);
    const page: PageContents = {
        leftPanel: {
            panelWidth: observable<number>(240),
            panelOpen: leftPanelOpen,
            hideOpener: false,
            header: testContent('LEFT HEADER'),
            content: testContent('LEFT PANEL'),
        },
        rightPanel: {
            panelWidth: observable<number>(240),
            panelOpen: observable(true),
            header: testContent('RIGHT HEADER'),
            content: testContent('RIGHT PANEL'),
        },
        headerMain: testContent('Header'),
        contentMain: testContent('Welcome to a tiny bit of Tablor'),
    }



    dom.update(document.body, dom.cls(cssRootVars), renderPage());
}
