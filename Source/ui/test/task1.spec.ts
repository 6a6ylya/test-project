import {
    allureStep, expectToCompare,
    expectToDisplay,
    expectToNotCompare,
    expectToPresent,
    takeScreenShot
} from "../../core/helper/allure/allureSteps";
import {baseUrl} from "../testsData/urlAddress";
import {BaseFunction} from "../../core/helper/baseFunction";
import {Waiters as wait} from "../../core/helper/waiters/waiters";
import {ScorePO} from "../pages/score/scorePO";
import {Input} from "../../core/controls/input/input";
import {Attributes} from "../testsData/attributes";
import {Button} from "../../core/controls/button/button";
import {WarningTemplate} from "../components/warningTemplate";
import {GameCardPO} from "../pages/gameCard/gameCardPO";
import {LoginToYourAccountPO} from "../pages/loginToYourAccount/loginToYourAccountPO";

const testData: any = {
    searchValue: "Red",
    selectValue: "Red Dead Redemption 2",
    warningTemplateText: "Игра содержит материалы, предназначенные для людей старше 18 лет",
    nameEdition: "Red Dead Redemption 2: Special Edition"
};

describe(`Задание 1 – e2e-тестирование.`, async () => {

    it(`Работа с сайтом EpicGames.`, async () => {
        await allureStep(`Шаг 1: Открыть страницу: "${baseUrl.main}".`, async () => {
            await BaseFunction.goToUrl(baseUrl.main);
            await wait.waitUntilElementIsDisplayed(ScorePO.searchInput);
            await takeScreenShot();
        });

        await allureStep(`Шаг 2: Ввести в поле "Поиск" текст "${testData.searchValue}" и убедиться, что появились предлагаемые поисковые результаты.`, async () => {
            await Input.enterValueInInputField(ScorePO.searchInput, testData.searchValue);
            await wait.waitUntilElementAttributeEqualValue(ScorePO.searchInput, Attributes.value, testData.searchValue);
            await wait.waitUntilElementIsDisplayed(ScorePO.searchBarAutocompleteTable);
            await expectToDisplay(ScorePO.searchBarAutocompleteTable, true, 'Таблица с результатами поиска');
            await wait.waitUntilElementIsDisplayed(ScorePO.searchBarAutocompleteGetResultElementByNumber(1));
            await expectToDisplay(ScorePO.searchBarAutocompleteGetResultElementByNumber(1), true, 'Первое значение поиска');
            await wait.waitUntilElementIsDisplayed(ScorePO.searchBarAutocompleteResultSeeMoreButton);
            await expectToDisplay(ScorePO.searchBarAutocompleteGetResultElementByNumber(1), true, 'Кнопка "Подробнее"');
            await expectToNotCompare(await ScorePO.searchBarAutocompleteListResult.count(), 0, 'Количество записей поиска');
            await expectToPresent(ScorePO.searchBarAutocompleteSearchAllGamesButton, false, 'Кнопка "Искать все игры"');
            await takeScreenShot();
        });

        await allureStep(`Шаг 3: Очистить текст (любым способом) - убедиться, что предлагаемые результаты скрылись.`, async () => {
            await Button.clickOnButton(ScorePO.clearSearchInput, 'Очистить поле для поиска');
            await wait.waitUntilElementNotDisplayed(ScorePO.clearSearchInput);
            await wait.waitUntilElementAttributeEqualValue(ScorePO.searchInput, Attributes.value, '');
            await wait.waitUntilElementNotDisplayed(ScorePO.searchBarAutocompleteTable);
            await wait.waitUntilElementNotPresentInDom(ScorePO.searchBarAutocompleteTable);
            await expectToPresent(ScorePO.searchBarAutocompleteTable, false, 'Таблица с результатами поиска');
            await takeScreenShot();
        });

        await allureStep(`Шаг 4: Снова ввести в поле "Поиск" текст "${testData.searchValue}".`, async () => {
            await Input.enterValueInInputField(ScorePO.searchInput, testData.searchValue);
            await wait.waitUntilElementAttributeEqualValue(ScorePO.searchInput, Attributes.value, testData.searchValue);
            await wait.waitUntilElementIsDisplayed(ScorePO.searchBarAutocompleteTable);
            await takeScreenShot();
        });

        await allureStep(`Шаг 5: Нажать на пункт "${testData.selectValue}" и убедиться, что выпадашка исчезла из DOM страницы и открылась страница с возраcтным ограничением.`, async () => {
            await Button.clickOnButton(ScorePO.searchBarAutocompleteGetResultElementByText(testData.selectValue), `Кнопка "${testData.selectValue}`);
            await wait.waitUntilElementNotPresentInDom(ScorePO.searchBarAutocompleteTable);
            await wait.waitUntilElementIsDisplayed(WarningTemplate.warningTemplateIcon);
            await expectToDisplay(WarningTemplate.warningTemplateIcon, true, 'Иконка');
            await wait.waitUntilElementIsDisplayed(WarningTemplate.warningTemplateText);
            await expectToCompare(await WarningTemplate.warningTemplateText.getText(), testData.warningTemplateText, 'Текст сообщения');
            await wait.waitUntilElementIsDisplayed(WarningTemplate.warningTemplateReturnToStoreLink);
            await expectToDisplay(WarningTemplate.warningTemplateReturnToStoreLink, true, 'Кнопка "Вернуться в магазин"');
            await takeScreenShot();
        });

        await allureStep(`Шаг 6: В окне возрастного ограничения нажать на "Продолжить" и убедиться, что это окно стало невидимым (исчезло с экрана).`, async () => {
            await Button.clickOnButton(WarningTemplate.warningTemplateContinueButton, 'Кнопка "Продолжить"');
            await wait.waitUntilElementNotPresentInDom(WarningTemplate.warningTemplate);
            await expectToPresent(WarningTemplate.warningTemplate, false, 'Окно предкпреждения возраста');
            await takeScreenShot();
        });

        await allureStep(`Шаг 7: Нажать на "Добавить в список желаемого" напротив версии "${testData.nameEdition}".`, async () => {
            await Button.clickOnButton(GameCardPO.buyNowButtonByNameEdition(testData.nameEdition), `Кнопка "Добавить в список желаемого" для издания "${testData.nameEdition}"`);
            await takeScreenShot();
        });

        await allureStep(`Шаг 8: Убедиться, что открылась форма авторизации с возможностью логина с помощью Apple ID.`, async () => {
            await wait.waitUntilElementIsDisplayed(LoginToYourAccountPO.loginToYouAccountForm);
            await expectToDisplay(LoginToYourAccountPO.loginToYouAccountForm, true, 'Форма "Выберите способ входа в свою учётную запись Epic"');
            await wait.waitUntilElementIsDisplayed(LoginToYourAccountPO.appleIdButton);
            await expectToDisplay(LoginToYourAccountPO.appleIdButton, true, 'Кнопка "Ввойти с помощью Apple"');
            await takeScreenShot();
        });
    });

});
