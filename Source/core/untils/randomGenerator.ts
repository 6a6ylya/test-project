export class RandomGenerator {

    /**
     * Генерирование рандомного текста.
     *
     * @param {number} charsAmount количество символов.
     */
    public static text(charsAmount: number): string {
        let text: string = '';
        const possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
        for (let i = 0; i < charsAmount; i += 1) {
            text +=  possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    };

}
