import {GetCapabilitiesBrowser} from "./getCapabilitiesBrowser";

const allureReporter: any = require('jasmine-allure-reporter');

export function initializeReporters(): void {
    GetCapabilitiesBrowser.getCapabilitiesBrowser().then((c) => {
        jasmine.getEnv().addReporter(new allureReporter({
            resultsDir: `./output/allure-results-${c.get('browserName')}-${c.get('version').substring(0, 4)}`,
        }) as any);
    });
}
