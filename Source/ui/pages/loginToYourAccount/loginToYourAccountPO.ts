import {by, element, ElementFinder} from "protractor";

export class LoginToYourAccountPO {

    public static get loginToYouAccountForm(): ElementFinder {
        return element(by.className(`ModalBase-card`));
    };

    public static get appleIdButton(): ElementFinder {
        return element(by.id(`login-with-apple`));
    };

}
