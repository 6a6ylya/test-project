import {BodyRequest} from "../../../core/http/interfaces/body";
import {allureStep, expectToCompare} from "../../../core/helper/allure/allureSteps";
import {Requests} from "../../../core/http/requests";
import {apodUrl} from "../../testsData/urls/NASA/apodUrl";
import {ApodResponseModel} from "./interfaces/apodResponseModel";

export class ApodSteps {

    public static async getSuccessfulExecution(body: BodyRequest): Promise<ApodResponseModel> {
        let response: any;
        await allureStep(`Шаг: Отправить GET запрос по адресу: "${apodUrl.get}".`, async () => {
            response = await Requests.get(body);
            if(response.statusCode !== 200) {
                throw `Ошибка: Статус код: "${response.statusCode}". Тело ответа "${JSON.stringify(response.body)}". Модель запроса: ${JSON.stringify(body)}.`;
            } else {
                await expectToCompare(response.statusCode, 200, `Код ответа`);
            }
        }, false);
        await allureStep(`Шаг: Полученный ответ: "${response.body}".`, async () => {
        }, false);

        return JSON.parse(response.body);
    };

}
