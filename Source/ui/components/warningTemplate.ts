import {by, element, ElementFinder} from "protractor";

export class WarningTemplate {

    public static get warningTemplate(): ElementFinder {
        return element(by.css(`[data-component="WarningTemplate"]`));
    };

    public static get warningTemplateIcon(): ElementFinder {
        return element(by.css(`[data-component="WarningTemplate"] [class*='messageIcon']`));
    };

    public static get warningTemplateText(): ElementFinder {
        return element(by.css(`[data-component="WarningTemplate"] [class*='messageText']`));
    };

    public static get warningTemplateContinueButton(): ElementFinder {
        return element(by.css(`[data-component="WarningTemplate"] [class*='ageGateButtonsWrapper']`));
    };

    public static get warningTemplateReturnToStoreLink(): ElementFinder {
        return element(by.css(`[data-component="WarningTemplate"] [class*='ageGateBackButton']`));
    };

}
