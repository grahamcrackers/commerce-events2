import "@adobe/adobe-client-data-layer";

import MagentoStorefrontEvents from "@adobe/commerce-events-sdk/src/MagentoStorefrontEvents";

import {
    mockCategory,
    mockDataServicesExtension,
    mockExperiencePlatformConnectorExtenion,
    mockExtension,
    mockOrder,
    mockPage,
    mockProduct,
    mockRecommendations,
    mockRecommendationsExtension,
    mockSearchExtension,
    mockSearchInput,
    mockSearchResults,
    mockShopper,
    mockShoppingCart,
    mockStorefront,
} from "./mocks/dataLayer";

jest.mock("@snowplow/browser-tracker");

const mse = new MagentoStorefrontEvents();

window.magentoStorefrontEvents = mse;

mse.context.setCategory(mockCategory);
mse.context.setMagentoExtension(mockExtension);
mse.context.setDataServicesExtension(mockDataServicesExtension);
mse.context.setExperiencePlatformConnectorExtension(mockExperiencePlatformConnectorExtenion);
mse.context.setRecommendationsExtension(mockRecommendationsExtension);
mse.context.setSearchExtension(mockSearchExtension);
mse.context.setOrder(mockOrder);
mse.context.setPage(mockPage);
mse.context.setProduct(mockProduct);
mse.context.setRecommendations(mockRecommendations);
mse.context.setSearchInput(mockSearchInput);
mse.context.setSearchResults(mockSearchResults);
mse.context.setShopper(mockShopper);
mse.context.setShoppingCart(mockShoppingCart);
mse.context.setStorefrontInstance(mockStorefront);

export const __VERSION__ = "1.2.3";
