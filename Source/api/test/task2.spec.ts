import {allureStep} from "../../core/helper/allure/allureSteps";
import {ApodSteps} from "../steps/NASA/apodSteps";
import {BodyRequest} from "../../core/http/interfaces/body";
import {apodUrl} from "../testsData/urls/NASA/apodUrl";
import {ApodParametersRequest} from "../steps/NASA/interfaces/apodParametersRequest";
import {ApodResponseModel} from "../steps/NASA/interfaces/apodResponseModel";
import {
    PastebinParametersRequestLogin,
    PastebinParametersRequestPost
} from "../steps/pastebin/interfaces/pastebinParametersRequest";
import {pastebinUrl} from "../testsData/urls/pastebin/pastebinUrl";
import {PastebinSteps} from "../steps/pastebin/pastebinSteps";
import {pastebinConstData} from "../testsData/data/pastebin";
import {PastebinPastePrivate} from "../testsData/enum/pastebinEnum";
import {RandomGenerator} from "../../core/untils/randomGenerator";

describe(`Задание 2 – реализация запроса к API и получение ответа.`, async () => {

    it(`Получение картинки из сервиса NASA и отправка описание картинки в сервис Pastebin.`, async () => {
        let nasaApodResponse: ApodResponseModel;

        await allureStep(`Шаг 1: Получение картинки из сервиса NASA средствами API.`, async () => {
            const parameters: ApodParametersRequest = {
                date: "2020-01-01",
                hd: true,
                api_key: "DEMO_KEY"
            };
            const bodyRequestNasaApod: BodyRequest = {
                url: apodUrl.get,
                qs: parameters
            };

            nasaApodResponse = await ApodSteps.getSuccessfulExecution(bodyRequestNasaApod);
        }, false);

        await allureStep(`Шаг 2: Отправка текста описания картинки NASA в сервис Pastebin средствами API.`, async () => {
            const parametersLogin: PastebinParametersRequestLogin = {
                api_dev_key: "012MZGABrmvBwX6295-0hpsx8d-fJfV2",
                api_user_name: "6a6ka",
                api_user_password: "Prohor19971997"
            };
            const bodyRequestLogin: BodyRequest = {
                url: pastebinUrl.login,
                form: parametersLogin
            };
            let api_user_key: string;

            api_user_key = await PastebinSteps.post(bodyRequestLogin, pastebinUrl.login);

            const parametersCreateNewPaste: PastebinParametersRequestPost = {
                api_dev_key: pastebinConstData.api_dev_key,
                api_paste_code: nasaApodResponse.explanation,
                api_paste_private: PastebinPastePrivate.Public,
                api_paste_name: RandomGenerator.text(25),
                api_paste_expire_date: "N",
                api_paste_format: "text",
                api_user_key: api_user_key,
                api_option: "paste"
            };
            const bodyRequestCreateNewPaste: BodyRequest = {
                url: pastebinUrl.createNewPaste,
                form: parametersCreateNewPaste
            };

            console.log(await PastebinSteps.postCreatePaste(bodyRequestCreateNewPaste));

        }, false);


    });

});
