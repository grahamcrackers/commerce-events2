import { Recommendations, RecommendationUnit, RecommendedProduct } from "@adobe/commerce-events-sdk";

const getUnit = (unitId: string, ctx: Recommendations): RecommendationUnit | null => {
    const unit = ctx?.units.find((unit) => unit.unitId === unitId);

    if (!unit) {
        return null;
    }

    return unit;
};

const getProduct = (unitId: string, productId: number, ctx: Recommendations): RecommendedProduct | null => {
    const unit = getUnit(unitId, ctx);

    if (!unit) {
        return null;
    }

    const product = unit.products.find((product) => product.productId === productId);

    if (!product) {
        return null;
    }

    return product;
};

export { getProduct, getUnit };
