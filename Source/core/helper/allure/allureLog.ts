export const expectToDisplayLog: any = {
    compare: (locator: any, expectedResult: boolean, description: string): string => {
        if (expectedResult === true) {
            return `Проверка: ${description} отображается на странице. Локатор элемента: "${locator}".`;
        } else {
            return `Проверка: ${description} не отображается на странице. Локатор элемента: "${locator}".`;
        }
    },
    tryError: (locator: any, description: string): string => {
        return `Ошибка: ${description} отсутствует в DOM дереве. Локатор элемента: "${locator}".`;
    },
    error: (locator: any, result: boolean, expectedResult: boolean, description: string): string => {
        return `Ошибка: Ожидаемый статус отображение ${description} на странице "${result}" не совпадает с фактическим "${expectedResult}". Локатор элемента: "${locator}".`;
    }
};

export const expectToPresentLog: any = {
    compare: (locator: any, expectedResult: boolean, description: string): string => {
        if(expectedResult === true) {
            return `Проверка: ${description} присутствует в DOM дереве. Локатор элемента: "${locator}".`;
        } else {
            return `Проверка: ${description} отсутствует в DOM дереве. Локатор элемента: "${locator}".`;
        }
    },
    error: (locator: any, expectedResult: boolean, result: boolean, description: string):string => {
        return `Ошибка: Ожидаемый статус присутствие элемента ${description} в DOM дереве "${expectedResult}" не совпадает с фактическим "${result}".`;
    }
};

export const expectToNotEqualLog: any = {
    notCompare: (expectedResult: any, value: any, description: string): string => {
        return `Проверка: ${description}. Ожидаемый результат "${expectedResult}" не совпадает с фактическим "${value}".`;
    },
    error: (expectedResult: any, value: any, description: string): string => {
        return `Ошибка: ${description}. Ожидаемый результат "${expectedResult}" совпадает с фактическим "${value}".`;
    }
};

export const expectToEqualLog: any = {
    compare: (expectedResult: any, value: any, description: string): string => {
        return `Проверка: ${description}. Сравнение ожидаемого результата "${expectedResult}" с фактическим "${value}".`;
    },
    error: (expectedResult: any, value: any, description: string): string => {
        return `Ошибка: ${description}. Ожидаемый результат "${expectedResult}" не совпадает с фактическим "${value}".`;
    }
};

export const expectToContainLog: any = {
    compare: (expectedResult: any, value: any, description: string): string => {
        return `Проверка: ${description}. Значение "${value}" содержит в себе "${expectedResult}".`;
    },
    error: (expectedResult: any, value: any, description: string): string => {
        return `Ошибка: ${description}. Значение "${value}" не содержит в себе "${expectedResult}".`;
    }
};