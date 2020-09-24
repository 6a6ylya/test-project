import {ElementFinder} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";
import {Waiters as wait} from "../../helper/waiters/waiters";
import {ButtonLog} from "./buttonLog";

export class Button {

    /**
     * Нажать на кнопку.
     *
     * @param {ElementFinder} button кнопка на которую требуется нажать.
     * @param {string} nameButton название кнопки.
     * @param {ElementFinder} waitElement элемент которого требуется дождаться после нажатия.
     */
    public static async clickOnButton(button: ElementFinder, nameButton: string, waitElement: ElementFinder = undefined): Promise<void> {
        await allureStep(ButtonLog.click(await button.locator(), nameButton), async() => {
            await wait.waitUntilElementIsDisplayed(button);
            await wait.waitUntilElementIsClickable(button);
            await button.click();
            if(waitElement !== undefined) {
                await wait.waitUntilElementPresentInDom(waitElement);
                await wait.waitUntilElementIsDisplayed(waitElement);
            }
        });
    };

    /**
     * Нажать на кнопку если она кликабельна и не нажимать если она не кликабельна.
     *
     * @param {ElementFinder} button кнопка.
     * @param {string} nameButton название кнопки.
     */
    public static async clickOrNotClickButton(button: ElementFinder, nameButton: string): Promise<void> {
        await wait.waitUntilElementIsDisplayed(button);
        if(await button.isEnabled()) {
            await allureStep(ButtonLog.click(await button.locator(), nameButton), async() => {
                await wait.waitUntilElementIsClickable(button);
                await button.click();
            });
        }
    };

}
