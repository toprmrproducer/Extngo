// Canonical Shopify product URLs for EXTNGO.
// extngo.com is the Shopify primary domain (verified via Storefront API).
// Use these constants instead of hard-coding URLs in components.

const SHOP_DOMAIN = 'https://extngo.com'

export const PRODUCT_HANDLES = {
  cable50ft:
    'extngo-retractable-ethernet-cable-50-feet-15-meter-cat6-flat-internet-extension-cord-reel-portable-1-gbps-data-speed-swiftly-setup-extend-networks-male-female-rj-45-connector-utp-extender',
  cable33ft:
    'retractable-network-cable-extender-33-feet-10-meter-cat-6-ethernet-cable-flat-portable-1-gbps-data-speed-swiftly-setup-temp-networks-cascadable-male-female-rj45-connector-utp-cable-reel',
} as const

export const SHOPIFY_BUY = {
  cable50ft: `${SHOP_DOMAIN}/products/${PRODUCT_HANDLES.cable50ft}`,
  cable33ft: `${SHOP_DOMAIN}/products/${PRODUCT_HANDLES.cable33ft}`,
  // Blue Edition has no Shopify SKU yet — send to the in-app /shop page.
  cableBlue: '/shop',
  // Generic "buy" target when the variant isn't known.
  default: `${SHOP_DOMAIN}/products/${PRODUCT_HANDLES.cable50ft}`,
} as const
