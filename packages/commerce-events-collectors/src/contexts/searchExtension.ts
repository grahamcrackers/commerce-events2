import { SearchExtension } from "@adobe/commerce-events-sdk";

import schemas from "../schemas";
import { SearchExtensionContext } from "../types/contexts";

const createContext = (extension?: SearchExtension): SearchExtensionContext => {
    const mse = window.magentoStorefrontEvents;
    const searchExtensionCtx = extension ?? mse.context.getSearchExtension();

    if (!searchExtensionCtx) {
        return {
            schema: schemas.SEARCH_EXTENSION_SCHEMA_URL,
            data: {},
        };
    }

    const context = {
        schema: schemas.SEARCH_EXTENSION_SCHEMA_URL,
        data: {
            version: searchExtensionCtx.version,
        },
    };

    return context;
};

export default createContext;
