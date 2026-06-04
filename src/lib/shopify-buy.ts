// Client-only helper that drives the global Shopify Storefront Web Components cart.
//
// Pattern: <ShopifyRoot /> mounts a hidden <shopify-context> per SKU. Each context
// holds an invisible <button data-shopify-buy="KEY"> with an inline onclick that
// calls main-cart.addLine + showModal. Visible Buy Now CTAs across the site
// programmatically click that hidden button, so the event target is inside a
// product context and the cart knows which product to add. No redirect required.

export type BuyKey = 'cable50ft' | 'cable33ft'

export const PRODUCT_HANDLES: Record<BuyKey, string> = {
  cable50ft:
    'extngo-retractable-ethernet-cable-50-feet-15-meter-cat6-flat-internet-extension-cord-reel-portable-1-gbps-data-speed-swiftly-setup-extend-networks-male-female-rj-45-connector-utp-extender',
  cable33ft:
    'retractable-network-cable-extender-33-feet-10-meter-cat-6-ethernet-cable-flat-portable-1-gbps-data-speed-swiftly-setup-temp-networks-cascadable-male-female-rj45-connector-utp-cable-reel',
}

export function buyShopify(key: BuyKey): void {
  if (typeof window === 'undefined') return
  const trigger = document.querySelector<HTMLButtonElement>(
    `[data-shopify-buy="${key}"]`,
  )
  if (!trigger) {
    // Web components script may still be loading, gracefully bail to /shop.
    window.location.href = '/shop'
    return
  }
  trigger.click()
}
