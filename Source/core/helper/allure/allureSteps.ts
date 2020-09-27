import {browser, ElementFinder} from "protractor";
import {
    expectToContainLog,
    expectToDisplayLog,
    expectToEqualLog,
    expectToNotEqualLog,
    expectToPresentLog
} from "./allureLog";
import {Waiters as wait} from "../waiters/waiters";
declare let allure: any;

export async function allureStep(stepDefinition: string, method: any, takeScreenShotBoolean: boolean = browser.params.takeScreenShotFromEachAllureStep): Promise<void> {
    await allure.createStep(stepDefinition, async () => {
        try {
            await method();
            if(takeScreenShotBoolean) {
                await takeScreenShot();
            }
        }
        catch (error) {
            if(takeScreenShotBoolean) {
                await takeScreenShot();
            }
            throw error;
        }
    })();
}

export async function takeScreenShot(screenShotName = 'ScreenShot', done = undefined): Promise<any> {
    return (browser as any).takeScreenshot()
        .then((png) => allure.createAttachment(screenShotName,
            () => new Buffer(png, 'base64'),
            'image/png')())
        .then(() => {
            if (done) {
                done();
            }
        });
}

/**
 * Установить подробное описание теста, если имени теста недостаточно.
 *
 * @param {string} description текст с подробным описанием теста.
 */
export async function allureDescription(description: string): Promise<void> {
    await allure.description(description);
}

/**
 * Установить серьезность теста.
 *
 * @param {string} severity значение серьёзности теста (можно найти в файле allureSeverity.ts).
 */
export async function allureSeverity(severity: string): Promise<void> {
    await allure.severity(severity);
}

/**
 * Установить значение фичи к которой относится тест.
 *
 * @param {string} featureName название фичи.
 */
export async function allureFeature(featureName: string): Promise<void> {
    await allure.feature(featureName);
}

/**
 * Установить пользовательскую историю для тестирования.
 *
 * @param {string} storyName название пользовательской истории.
 */
export async function allureStory(storyName: string): Promise<void> {
    await allure.story(storyName);
}

/**
 * Установить параметры, которые были использованы в тесте.
 *
 * @param {string} name название параметра.
 * @param {string} value значение параметра.
 */
export async function allureAddArgument(name: string, value: string): Promise<void> {
    await allure.addArgument(name, value);
}

/**
 * Установить параметр(-ы) окружения (HTTP-ссылки на тестовую страницу или используемую версию пакета).
 *
 * @param {string} name название параметра.
 * @param {string} value значение параметра.
 */
export async function allureAddEnvironment(name: string, value: string): Promise<void> {
    await allure.addEnvironment(name, value);
}

/**
 * Проверка на отображение элемента в дом дереве.
 *
 * @param {ElementFinder} element элемент, который необходимо проверить.
 * @param {boolean} expectedResult ожидаемые результат отображения (true или false).
 * @param {string} description описание (название текста в элементе и т.д.).
 */
export async function expectToPresent(element: ElementFinder, expectedResult: boolean, description: string): Promise<void> {
    await allureStep(expectToPresentLog.compare(await element.locator(), expectedResult, description), async () => {
        if(expectedResult) {
            await wait.waitUntilElementPresentInDom(element);
        } else {
            await wait.waitUntilElementNotPresentInDom(element);
        }

        const result: boolean = await element.isPresent();

        if(!result === expectedResult) {
            await takeScreenShot();
            await expect(result).not.toEqual(expectedResult);
            throw expectToPresentLog.error(await element.locator(), expectedResult, result, description);
        }
    });
}

/**
 * Проверка на отображение элемента на странице.
 *
 * @param {ElementFinder} element элемент, который необходимо проверить.
 * @param {boolean} expectedResult ожидаемые результат отображения (true или false).
 * @param {string} description описание (название текста в элементе и т.д.).
 */
export async function expectToDisplay(element: ElementFinder, expectedResult: boolean, description: string): Promise<void> {
    await allureStep(expectToDisplayLog.compare(await element.locator(), expectedResult, description), async () => {
        let result: boolean;

        if(expectedResult) {
            await wait.waitUntilElementIsDisplayed(element);
        } else {
            await wait.waitUntilElementNotDisplayed(element);
        }

        try {
            result = await element.isDisplayed();
        }
        catch(err) {
            throw expectToDisplayLog.tryError(await element.locator(), description);
        }

        if(!result === expectedResult) {
            await takeScreenShot();
            await expect(result).toEqual(expectedResult);
            throw expectToDisplayLog.error(await element.locator(), result, expectedResult, description);
        }
    });
}

/**
 * Точное сравнение на неравенство данных (не массивы).
 *
 * @param {string | number} actualResult актуальные данные.
 * @param {string | number} expectedResult ожидаемые данные.
 * @param {string} description описание (название текста в элементе и т.д.).
 */
export async function expectToNotCompare(actualResult: string | number, expectedResult: string | number, description: string): Promise<void> {
    await allure.createStep(expectToNotEqualLog.notCompare(expectedResult, actualResult, description), async () => {
        if (actualResult === expectedResult) {
            await takeScreenShot();
            await expect(actualResult).toEqual(expectedResult);
            throw expectToNotEqualLog.error(expectedResult, actualResult, description);
        }
    })();
}

/**
 * Точное сравнение данных (не массивы).
 *
 * @param {string | number} actualResult актуальные данные.
 * @param {string | number} expectedResult ожидаемые данные.
 * @param {string} description описание (название текста в элементе и т.д.).
 */
export async function expectToCompare(actualResult: string | number, expectedResult: string | number, description: string): Promise<void> {
    await allure.createStep(expectToEqualLog.compare(expectedResult, actualResult, description), async () => {
        if (actualResult !== expectedResult) {
            await takeScreenShot();
            await expect(actualResult).not.toEqual(expectedResult);
            throw expectToEqualLog.error(expectedResult, actualResult, description);
        }
    })();
}

/**
 * Проверка содержится ли переданное значение в ожидаемом.
 *
 * @param {any} actualResult актуальные данные.
 * @param {any} expectedResult ожидаемые данные.
 * @param {string} description описание (название текста в элементе и т.д.).
 */
export async function expectToContains(actualResult: any, expectedResult: any, description: string): Promise<void> {
    await allure.createStep(expectToContainLog.compare(expectedResult, actualResult, description), async () => {
        if (!actualResult.includes(expectedResult)) {
            await takeScreenShot();
            await expect(actualResult).not.toContain(expectedResult);
            throw expectToContainLog.error(expectedResult, actualResult, description);
        }
    })();
}
