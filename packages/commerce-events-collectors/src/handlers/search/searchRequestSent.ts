import { Event } from "@adobe/commerce-events-sdk";
import { SelfDescribingJson, trackStructEvent } from "@snowplow/browser-tracker";

import { createSearchInputCtx } from "../../contexts";

const handler = (event: Event): void => {
    const { searchUnitId, pageContext, searchInputContext } = event.eventInfo;

    const searchInputCtx = createSearchInputCtx(searchUnitId as string, searchInputContext);

    const context: Array<SelfDescribingJson> = [];

    if (searchInputCtx) {
        context.push(searchInputCtx);
    }

    trackStructEvent({
        category: "search",
        action: "api-request-sent",
        label: searchInputCtx?.data.searchRequestId as string,
        property: pageContext?.pageType,
        context,
    });
};

export default handler;
