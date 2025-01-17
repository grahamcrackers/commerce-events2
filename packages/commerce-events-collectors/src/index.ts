/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { createInstance } from "@adobe/alloy";
import { configure, hasConfig, setConsent } from "./alloy";
import { subscribeToEvents } from "./events";
import { configureSnowplow, SNOWPLOW_COLLECTOR_PATH, SNOWPLOW_COLLECTOR_URL } from "./snowplow";

/**
 * this is the script added to an external build if a user is adding a custom name
 * see https://experienceleague.adobe.com/docs/experience-platform/edge/fundamentals/installing-the-sdk.html?lang=en
 */
const addCustomNameToAlloyNamespace = (customName: string) =>
    (function (n, o) {
        ``;
        o.forEach(function (o) {
            // @ts-ignore
            n[o] ||
                ((n.__alloyNS = n.__alloyNS || []).push(o),
                // @ts-ignore
                (n[o] = function () {
                    // eslint-disable-next-line prefer-rest-params
                    const u = arguments;
                    return new Promise(function (i, l) {
                        // @ts-ignore
                        n[o].q.push([i, l, u]);
                    });
                }),
                // @ts-ignore
                (n[o].q = []));
        });
    })(window, [customName]);

/** initialize alloy if magentoStorefrontEvents exists and aep is set to true */
const initializeAlloy = async () => {
    try {
        if (!hasConfig()) {
            return;
        }

        const sdk = window.magentoStorefrontEvents;
        const customName = sdk.context.getAEP().webSdkName;
        const name = customName ? customName : "alloy";
        addCustomNameToAlloyNamespace(name);

        await configure(createInstance({ name }));

        // start polling every second to look for changes
        const consentInterval = setInterval(async () => {
            try {
                await setConsent();
            } catch {
                clearInterval(consentInterval);
                console.warn("Consent could not be set.");
            }
        }, 1000);
    } catch (error) {
        console.warn("Alloy could not be configured.");
    }
};

const initialize = async () => {
    configureSnowplow({
        appId: "magento-storefront-event-collector",
        collectorUrl: SNOWPLOW_COLLECTOR_URL,
        collectorPath: SNOWPLOW_COLLECTOR_PATH,
    });

    await initializeAlloy();
    subscribeToEvents();
};

/**
 * handleMessage will only run if we recieve a `magento-storefront-events-sdk`
 * message and if the `magentoStorefrontEvents` exists on the window. this
 * allows the collector to be loaded before the sdk and we can then initialize
 * our collectors
 */
const handleMessage = (event: MessageEvent) => {
    // skip other messages
    if (event.data !== "magento-storefront-events-sdk") {
        return;
    }

    // do nothing if sdk is still not available
    if (!window.magentoStorefrontEvents) {
        return;
    }

    initialize();

    // clean up listener
    window.removeEventListener("message", initialize);
};

if (window.magentoStorefrontEvents) {
    initialize();
} else {
    window.addEventListener("message", handleMessage, false);
}

export * from "./events";
export * from "./snowplow";
