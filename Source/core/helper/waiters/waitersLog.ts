import {IErrorMessageWaiters} from "./models/errorMessageWaiters.model";

export const errorMessageWaiters: IErrorMessageWaiters = {
    timeout: "TimeoutError"
};

export class WaitersLog {

    public static urlContains(url: string): string {
        return `Ошибка: Текст "${url}" отсутствует в строке адреса браузера.`;
    };

    public static display(locator: string): string {
        return `Ошибка: Элемент не отображается на странице, время ожидания истекло. Локатор элемента: "${locator}".`;
    };

    public static notDisplay(locator: string): string {
        return `Ошибка: Элемент отображается на странице, время ожидания истекло. Локатор элемента: "${locator}".`;
    };

    public static present(locator: string): string {
        return `Ошибка: Элемент отсутствует в DOM дереве, время ожидания истекло. Локатор элемента: "${locator}".`;
    };

    public static notPresent(locator: string): string {
        return `Ошибка: Элемент присутствует DOM дереве, время ожидания истекло. Локатор элемента: "${locator}".`;
    };

    public static clickable(locator: string): string {
        return  `Ошибка: Элемент не кликабелен, время ожидания истекло. Локатор элемента: "${locator}".`;
    };

    public static attributeIsEqualValue(locator: string, attribute: string, actualAttributeValue: string, attributeValue: string): string {
        return `Ошибка: Значение атрибута ${attribute} = "${actualAttributeValue}" не соответствует ожидаемому значению "${attributeValue}". Локатор элемента: "${locator}".`;
    };

}
