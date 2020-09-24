export class InputLog {

    public static fillInput(locator: string, value: string): string {
        return `Шаг: Заполнить инпут значением "${value}". Локатор элемента: "${locator}".`;
    };

}
