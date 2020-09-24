import {ElementFinder} from "protractor";
import {allureStep} from "../../helper/allure/allureSteps";
import {InputLog} from "./inputLog";
import {Waiters as wait} from "../../helper/waiters/waiters";

export class Input {

    /**
     * Ввести значение в поле для ввода.
     *
     * @param {ElementFinder} input элемент в который пользователь хочет ввести данные.
     * @param {string} text значение, которое пользователь хочет ввести в поле для ввода.
     */
    public static async enterValueInInputField(input: ElementFinder, text: string): Promise<void> {
        await allureStep(InputLog.fillInput(await input.locator(), text), async() => {
            await wait.waitUntilElementIsDisplayed(input);
            await wait.waitUntilElementIsClickable(input);
            await input.sendKeys(text);
        });
    };

}
