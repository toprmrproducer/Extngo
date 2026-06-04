export default function ShopifyRoot() {
  return (
    <>
      <shopify-store
        store-domain="extngo.myshopify.com"
        public-access-token="169ddb8b4b740e71e1e32e7ba9910aea"
        country="US"
        language="en"
      />
      <shopify-cart id="main-cart" />
      <style dangerouslySetInnerHTML={{ __html: `
        shopify-store { display: none; }
        shopify-cart::part(dialog) { border-radius: 16px; }
        shopify-cart::part(primary-button) {
          background-color: #E8431A;
          border: 0;
          border-radius: 999px;
          color: #ffffff;
          font-family: var(--font-geist);
          font-size: 14px;
          font-weight: 600;
          padding: 14px 22px;
          letter-spacing: 0.3px;
          box-shadow: 0 10px 24px rgba(232,67,26,.28);
        }
        shopify-cart::part(primary-button):hover { transform: translateY(-1px); box-shadow: 0 16px 32px rgba(232,67,26,.4); }
        shopify-cart::part(secondary-button) {
          background: #ffffff;
          color: #1A1A1A;
          fill: #1A1A1A;
          border: 1.5px solid rgba(26,26,26,.18);
          border-radius: 999px;
        }
        shopify-cart::part(line-heading) { font-family: var(--font-geist); font-weight: 600; }
        shopify-cart::part(line-price) { font-family: var(--font-geist); font-weight: 600; color: #1A1A1A; }
      `}} />
    </>
  )
}
