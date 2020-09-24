import {by, element, ElementArrayFinder, ElementFinder} from "protractor";

export class ScorePO {

    public static get searchButton(): ElementFinder {
        return element(by.css(`[data-component="SearchBar"] [class*='searchOpenButton']`));
    };

    public static get searchInput(): ElementFinder {
        return element(by.css(`[data-testid="search-bar"]`));
    };

    public static get clearSearchInput(): ElementFinder {
        return element(by.css(`[data-component="SearchBar"] [class*='searchCloseButton']`));
    };

    public static get searchBarAutocompleteTable(): ElementFinder {
        return element(by.id(`search-bar-autocomplete`));
    };

    public static get searchBarAutocompleteSearchAllGamesButton(): ElementFinder {
        return element(by.css(`#search-bar-autocomplete #no-result`));
    };

    public static get searchBarAutocompleteListResult(): ElementArrayFinder {
        return element.all(by.css(`#search-bar-autocomplete [id*="result-item"]`));
    };

    public static searchBarAutocompleteGetResultElementByNumber(numberElement: number): ElementFinder {
        return element(by.css(`#search-bar-autocomplete #result-item-${--numberElement}`));
    };

    public static searchBarAutocompleteGetResultElementByText(text: string): ElementFinder {
        return element(by.xpath(`//*[. = '${text}' and contains(@id, 'result-item')]`));
    };

    public static get searchBarAutocompleteResultSeeMoreButton(): ElementFinder {
        return element(by.id(`result-see-more`));
    };

}
