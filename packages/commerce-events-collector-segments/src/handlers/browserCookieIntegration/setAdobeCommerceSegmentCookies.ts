/**
 * The name of the cookie to save so that adobe commerce can read in the segment information.
 *
 * Should match up with Github located at:
 * @link https://github.com/magento-commerce/segments-service/blob/poc/Segment/Model/SegmentResolver.php#L12
 */
const ADOBE_COMMERCE_SHOPPER_SEGMENT = "adobe_segment";
const ADOBE_COMMERCE_AEP_SEGMENT_MEMBERSHIP_COOKIE_NAME = "aep-segments-membership";

/**
 * Clear the browsers cookies set for Adobe Commerce AEP Segments
 */
export const clearAdobeCommerceAEPSegmentCookies = () => {
    document.cookie = `${ADOBE_COMMERCE_SHOPPER_SEGMENT}=; expires=Fri, 31 Dec 1999 23:59:59 GMT;`;
    document.cookie = `${ADOBE_COMMERCE_AEP_SEGMENT_MEMBERSHIP_COOKIE_NAME}=; expires=Fri, 31 Dec 1999 23:59:59 GMT;`;
};

/**
 * Set the browser cookies with the returned segmentMembershipIds from the proxy service
 *
 * @note for now we'll keep the `expires` param for cookies set to default.
 *
 * @param userSegmentIds comma delimited string of `segmentMembershipIds` that is returned from the proxy service
 */
const setAdobeCommerceAEPSegmentCookies = (userSegmentIds = "") => {
    //again, note that no expiration is set, so this will be a session cookie
    document.cookie = `${ADOBE_COMMERCE_AEP_SEGMENT_MEMBERSHIP_COOKIE_NAME}=${userSegmentIds};path=/`;
};

export default setAdobeCommerceAEPSegmentCookies;
