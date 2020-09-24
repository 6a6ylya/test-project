export class ButtonLog {

    public static click(locator: string, nameButton: string): string {
        return `Шаг: Нажать на кнопку "${nameButton}". Локатор элемента: "${locator}".`;
    };

}
