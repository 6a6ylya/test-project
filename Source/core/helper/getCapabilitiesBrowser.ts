import {browser} from "protractor";
import {Capabilities} from "selenium-webdriver";

export class GetCapabilitiesBrowser {

    /**
     * Получение свойст браузера.
     */
    public static async getCapabilitiesBrowser(): Promise<Capabilities> {
        return browser.getCapabilities().then((capabilities) => {
            return capabilities;
        });
    }

    /**
     * Получение название браузера.
     */
    public static async getBrowserName(): Promise<string> {
        let capability = await browser.getCapabilities();
        return capability.get('browserName');
    }

    /**
     * Получение версии браузера.
     */
    public static async getBrowserVersion(): Promise<string> {
        let capability = await browser.getCapabilities();
        return capability.get('version');
    }

}
