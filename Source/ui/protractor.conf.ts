import {browser, Config} from "protractor";
import {initializeReporters} from "../core/helper/reports";

const locales: any = ["LANG=ru_RU.UTF-8", "LANGUAGE=ru:en", "LC_ALL=ru_RU.UTF-8"];

export let config: Config = {

    seleniumAddress: 'http://csl-dauc-test.cislink.moscow:4444/wd/hub',

    specs: [
        "./tests/**/**.spec.js",
    ],

    params: {
        waitWebElementMaxTimeout: 60000,
        takeScreenShotFromEachAllureStep: false
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 100000000,
    },

    onPrepare: async () => {
        await browser.manage().window().maximize();
        initializeReporters();
    },

    multiCapabilities: [
        {
            browserName : "chrome",
            version: "85.0",
            enableVNC: true,
            enableVideo: false,
            shardTestFiles: true,
            maxInstances: 4,
            env: locales,
            loggingPrefs: {
                "browser": "ALL",
                "driver": "ALL",
                "performance": "ALL"
            },
            chromeOptions: {
                excludeSwitches: ["enable-automation"],
                perfLoggingPrefs: {
                    "enableNetwork": true,
                    "enablePage": false
                },
                args: [
                    "--window-size=1920x1080",
                    "--disable-browser-side-navigation",
                    "disable-infobars",
                    "--disable-notifications"
                ],
                prefs: {
                    "credentials_enable_service": false
                }
            }
        },
    ]

};
