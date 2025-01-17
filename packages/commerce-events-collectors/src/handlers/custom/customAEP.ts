import { Event } from "@adobe/commerce-events-sdk";

import { sendEvent } from "../../alloy";
import { BeaconSchema } from "../../types/aep";

const aepHandler = async (event: Event): Promise<void> => {
    const { customContext } = event.eventInfo;
    sendEvent(customContext as BeaconSchema);
};

export default aepHandler;
