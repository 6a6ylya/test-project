import {allureStep} from "./allure/allureSteps";
import {browser} from "protractor";
import {Waiters as wait} from "./waiters/waiters";

export class BaseFunction {

    /**
     * Переход по url адресу.
     *
     * @param {string} url адрес перехода.
     */
    public static async goToUrl(url: string): Promise<void> {
        await allureStep(`Шаг: Выполнить переход по url адресу: "${url}".`, async () => {
            await browser.waitForAngularEnabled(false);
            await browser.get(url);
            await wait.waitUntilUrlIsContained(url);
        });
    };

}
