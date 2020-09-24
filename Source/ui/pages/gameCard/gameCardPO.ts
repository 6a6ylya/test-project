import {by, element, ElementFinder} from "protractor";

export class GameCardPO {

    public static buyNowButtonByNameEdition(nameEdition: string): ElementFinder {
        return element(by.xpath(`//*[contains(@class, 'ProductCardTopRow') and normalize-space(text()) = '${nameEdition}']
            //ancestor::*[@data-component="ProductCard"]//*[@data-testid="wish-button"]`));
    };

}
