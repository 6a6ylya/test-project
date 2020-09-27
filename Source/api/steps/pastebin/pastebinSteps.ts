import {allureStep, expectToCompare, expectToContains} from "../../../core/helper/allure/allureSteps";
import {Requests} from "../../../core/http/requests";
import {BodyRequest} from "../../../core/http/interfaces/body";
import {pastebinUrl} from "../../testsData/urls/pastebin/pastebinUrl";

export class PastebinSteps {

    public static async post(body: BodyRequest, urlAddress: string): Promise<string> {
        let response: any;
        await allureStep(`Шаг: Отправить POST запрос по адресу: "${urlAddress}".`, async () => {
            response = await Requests.post(body);
            if(response.statusCode !== 200) {
                throw `Ошибка: Статус код: "${response.statusCode}". Тело ответа "${JSON.stringify(response.body)}". Модель запроса: ${JSON.stringify(body)}.`;
            } else {
                await expectToCompare(response.statusCode, 200, `Код ответа`);
            }
        }, false);
        return response.body;
    };

    public static async postCreatePaste(body: BodyRequest): Promise<string> {
        let response: any;
        await allureStep(`Шаг: Отправить POST запрос по адресу: "${pastebinUrl.createNewPaste}".`, async () => {
            response = await Requests.post(body);
            if(response.statusCode !== 200) {
                throw `Ошибка: Статус код: "${response.statusCode}". Тело ответа "${JSON.stringify(response.body)}". Модель запроса: ${JSON.stringify(body)}.`;
            } else {
                await expectToCompare(response.statusCode, 200, `Код ответа`);
            }
        }, false);

        await expectToContains(response.body, pastebinUrl.main, 'Ответ запроса содержит в себе часть ссылки');

        await allureStep(`Шаг: Получить ссылку на созданную запись: "${response.body}"`, async () => {
        }, false);
        return response.body;
    };

}
