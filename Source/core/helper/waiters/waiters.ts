import {browser, ElementFinder, ExpectedConditions} from "protractor";
import {errorMessageWaiters, WaitersLog} from "./waitersLog";

const waitWebElementMaxTimeout: number = 60000;

export class Waiters {

    /**
     * Ожидание, когда url-адрес будет содержать ожидаемый текст.
     *
     * @param {string} expectValue значение, которое пользователь хочет увидеть в url-адресе.
     * @param {number} waitMaxTimeout максимальное время ожидания.
     */
    public static async waitUntilUrlIsContained(expectValue: string, waitMaxTimeout: number = waitWebElementMaxTimeout): Promise<void> {
        try {
            await browser.wait(ExpectedConditions.urlContains(expectValue),
                waitMaxTimeout);
        } catch (err) {
            if(err.name === errorMessageWaiters.timeout) {
                throw WaitersLog.urlContains(expectValue);
            }
        }
    };

    /**
     * Ожидание отображения элемента на странице.
     *
     * @param {ElementFinder} webElement элемент, который пользователь ожидает увидеть на странице.
     * @param {number} waitMaxTimeout максимальное время ожидания.
     */
    public static async waitUntilElementIsDisplayed(webElement: ElementFinder, waitMaxTimeout: number = waitWebElementMaxTimeout): Promise<void> {
        try {
            await browser.wait(ExpectedConditions.visibilityOf(webElement),
                waitMaxTimeout);
        } catch (err) {
            if(err.name === errorMessageWaiters.timeout) {
                throw WaitersLog.display(await webElement.locator());
            } else {
                throw err.name;
            }
        }
    };

    /**
     * Ожидание, когда элемент пропадёт со страницы.
     *
     * @param {ElementFinder} webElement элемент, который пользователь ожидает не увидеть на странице.
     * @param {number} waitMaxTimeout максимальное время ожидания.
     */
    public static async waitUntilElementNotDisplayed(webElement: ElementFinder, waitMaxTimeout: number = waitWebElementMaxTimeout): Promise<void> {
        try{
            await browser.wait(ExpectedConditions.invisibilityOf(webElement),
                waitMaxTimeout);
        } catch (err) {
            if(err.name === errorMessageWaiters.timeout) {
                throw WaitersLog.notDisplay(await webElement.locator());
            } else {
                throw err.name;
            }
        }
    };

    /**
     * Ожидание появление элемента в DOM дереве.
     *
     * @param {ElementFinder} webElement элемент, который пользователь ожидает увидеть в DOM дереве.
     * @param {number} waitMaxTimeout максимальное время ожидания.
     */
    public static async waitUntilElementPresentInDom(webElement: ElementFinder, waitMaxTimeout: number = waitWebElementMaxTimeout): Promise<void> {
        try {
            await browser.wait(ExpectedConditions.presenceOf(webElement),
                waitMaxTimeout);
        } catch (error) {
            if (error.name === errorMessageWaiters.timeout) {
                throw WaitersLog.present(await webElement.locator());
            }
            else {
                throw error;
            }
        }
    };

    /**
     * Ожидание, когда элемент пропадёт из DOM дерева.
     *
     * @param {ElementFinder} webElement элемент, который должен пропасть из DOM дерева.
     */
    public static async waitUntilElementNotPresentInDom(webElement: ElementFinder, waitMaxTimeout: number = waitWebElementMaxTimeout): Promise<void> {
        try {
            await browser.wait(ExpectedConditions.stalenessOf(webElement),
                waitMaxTimeout);
        } catch (error) {
            if (error.name === errorMessageWaiters.timeout) {
                throw WaitersLog.notPresent(await webElement.locator());
            } else {
                throw error.name;
            }
        }
    };


    /**
     * Ожидание, когда элемент станет кликабельным.
     *
     * @param {ElementFinder} webElement элемент, который должен быть кликальный.
     * @param {number} waitMaxTimeout максимальное время ожидания.
     */
    public static async waitUntilElementIsClickable(webElement: ElementFinder, waitMaxTimeout: number = waitWebElementMaxTimeout): Promise<void> {
        try{
            await browser.wait(ExpectedConditions.elementToBeClickable(webElement),
                waitMaxTimeout);
        } catch (err) {
            if(err.name === errorMessageWaiters.timeout) {
                throw WaitersLog.clickable(await webElement.locator());
            } else {
                throw err.name;
            }
        }
    };

    /**
     * Метод, который ожидает пока в атрибуте, который указал пользователь не будет находится ожидаемое значение.
     *
     * @param {ElementArrayFinder} webElement элемент, у которого требуется взять атрибут.
     * @param {string} attribute атрибут в котором пользователь ожидает появление текста.
     * @param {string} attributeValue значение которое ожидает увидеть пользователь.
     * @param {number} time время начало отсчёта для ожидания.
     * @param {number} waitMaxTimeout максимальное время ожидания.
     */
    public static async waitUntilElementAttributeEqualValue(webElement: ElementFinder, attribute: string, attributeValue: string, waitMaxTimeout: number = waitWebElementMaxTimeout, time: number = 0): Promise<void> {
        const actualAttributeValue: string = await webElement.getAttribute(attribute);

        if(time <= waitMaxTimeout) {
            if(actualAttributeValue !== attributeValue) {
                await browser.sleep(200);
                await this.waitUntilElementAttributeEqualValue(webElement, attribute, attributeValue, time + 200);
            }
        } else {
            throw WaitersLog.attributeIsEqualValue(await webElement.locator(), attribute, actualAttributeValue, attributeValue);
        }
    };

}
