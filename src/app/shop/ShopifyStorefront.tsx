'use client'

const PRODUCTS = [
  {
    key: '50ft',
    handle:
      'extngo-retractable-ethernet-cable-50-feet-15-meter-cat6-flat-internet-extension-cord-reel-portable-1-gbps-data-speed-swiftly-setup-extend-networks-male-female-rj-45-connector-utp-extender',
    badge: '50 ft / 15 m',
    tagline: 'For full office runs and conference setups.',
  },
  {
    key: '33ft',
    handle:
      'retractable-network-cable-extender-33-feet-10-meter-cat-6-ethernet-cable-flat-portable-1-gbps-data-speed-swiftly-setup-temp-networks-cascadable-male-female-rj45-connector-utp-cable-reel',
    badge: '33 ft / 10 m',
    tagline: 'For hotel rooms, home labs and travel kits.',
  },
] as const

const openProductModal = `
  (function(e){
    var d=document.getElementById('product-modal');
    var c=document.getElementById('product-modal-context');
    if(d&&c){c.update(e);d.showModal();}
  })(event)
`.replace(/\s+/g, ' ')

const addToCart = `
  (function(e){
    var c=document.getElementById('main-cart');
    if(c){c.addLine(e); c.showModal();}
  })(event)
`.replace(/\s+/g, ' ')

const buyNow = `document.querySelector('shopify-store').buyNow(event)`

const closeModal = `document.getElementById('product-modal').close()`

export default function ShopifyStorefront() {
  return (
    <>
      {/* Hero grid: 2 main products */}
      <section className="shop-grid">
        {PRODUCTS.map((p) => (
          <article key={p.key} className="shop-card">
            <shopify-context type="product" handle={p.handle}>
              <template
                dangerouslySetInnerHTML={{
                  __html: `
                    <div class="shop-card__inner">
                      <div class="shop-card__media">
                        <shopify-media width="520" height="520" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
                      </div>
                      <div class="shop-card__body">
                        <div class="shop-card__badge">${p.badge}</div>
                        <h2 class="shop-card__title"><shopify-data query="product.title"></shopify-data></h2>
                        <p class="shop-card__tagline">${p.tagline}</p>
                        <div class="shop-card__price">
                          <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
                          <shopify-money class="shop-card__compare" query="product.selectedOrFirstAvailableVariant.compareAtPrice"></shopify-money>
                        </div>
                        <shopify-variant-selector></shopify-variant-selector>
                        <div class="shop-card__buttons">
                          <button class="shop-btn shop-btn--primary"
                            onclick="${addToCart}"
                            shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
                            Add to cart
                          </button>
                          <button class="shop-btn shop-btn--secondary"
                            onclick="${buyNow}"
                            shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
                            Buy now
                          </button>
                        </div>
                        <button class="shop-card__details-link"
                          onclick="${openProductModal}">
                          View full details &rarr;
                        </button>
                      </div>
                    </div>
                  `,
                }}
              />
              <div data-shopify-loading-placeholder="true" className="shop-card__placeholder" />
            </shopify-context>
          </article>
        ))}
      </section>

      {/* You may also like — frontpage collection */}
      <section className="shop-collection">
        <h2 className="shop-collection__title">More from EXTNGO</h2>
        <shopify-context type="collection" handle="frontpage">
          <template
            dangerouslySetInnerHTML={{
              __html: `
                <div class="shop-collection__grid">
                  <shopify-list-context type="product" query="collection.products" first="8">
                    <template>
                      <button class="shop-collection__card"
                        onclick="${openProductModal}"
                        shopify-attr--disabled="!product.availableForSale">
                        <div class="shop-collection__media">
                          <shopify-media width="320" height="320" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
                        </div>
                        <div class="shop-collection__info">
                          <h3 class="shop-collection__name"><shopify-data query="product.title"></shopify-data></h3>
                          <span class="shop-collection__price"><shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money></span>
                        </div>
                      </button>
                    </template>
                  </shopify-list-context>
                </div>
              `,
            }}
          />
        </shopify-context>
      </section>

      {/* Quick-view product modal */}
      <dialog id="product-modal" className="shop-modal">
        <shopify-context id="product-modal-context" type="product" wait-for-update>
          <template
            dangerouslySetInnerHTML={{
              __html: `
                <div class="shop-modal__inner">
                  <button class="shop-modal__close" aria-label="Close"
                    onclick="${closeModal}">&times;</button>
                  <div class="shop-modal__grid">
                    <div class="shop-modal__media">
                      <shopify-media width="520" height="520" query="product.selectedOrFirstAvailableVariant.image"></shopify-media>
                    </div>
                    <div class="shop-modal__body">
                      <span class="shop-modal__vendor"><shopify-data query="product.vendor"></shopify-data></span>
                      <h2 class="shop-modal__title"><shopify-data query="product.title"></shopify-data></h2>
                      <div class="shop-modal__price">
                        <shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
                        <shopify-money class="shop-card__compare" query="product.selectedOrFirstAvailableVariant.compareAtPrice"></shopify-money>
                      </div>
                      <shopify-variant-selector></shopify-variant-selector>
                      <div class="shop-card__buttons">
                        <button class="shop-btn shop-btn--primary"
                          onclick="document.getElementById('main-cart').addLine(event).showModal(); document.getElementById('product-modal').close();"
                          shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
                          Add to cart
                        </button>
                        <button class="shop-btn shop-btn--secondary"
                          onclick="${buyNow}"
                          shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
                          Buy now
                        </button>
                      </div>
                      <div class="shop-modal__desc">
                        <shopify-data query="product.descriptionHtml"></shopify-data>
                      </div>
                    </div>
                  </div>
                </div>
              `,
            }}
          />
        </shopify-context>
      </dialog>

      <style jsx global>{`
        .shop-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(20px, 3vw, 32px);
        }
        @media (min-width: 900px) {
          .shop-grid { grid-template-columns: 1fr 1fr; }
        }
        .shop-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid rgba(26,26,26,.06);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 36px -16px rgba(26,26,26,0.12);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .shop-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 20px 48px -16px rgba(26,26,26,0.18);
        }
        .shop-card__inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 600px) {
          .shop-card__inner { grid-template-columns: 1fr 1fr; }
        }
        .shop-card__media {
          background: radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%);
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1/1;
        }
        .shop-card__media img {
          max-width: 100%;
          height: auto;
          mix-blend-mode: multiply;
        }
        .shop-card__body {
          padding: clamp(24px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .shop-card__badge {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 6px 12px;
          background: rgba(26,26,26,.04);
          border: 1px solid rgba(26,26,26,.08);
          color: #1A1A1A;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 999px;
        }
        .shop-card__title {
          margin: 0;
          font-family: var(--font-bricolage);
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .shop-card__tagline {
          margin: 0;
          color: #6D6D6D;
          font-size: 14px;
          line-height: 1.55;
        }
        .shop-card__price {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-family: var(--font-geist);
          font-size: 26px;
          font-weight: 700;
          color: #1A1A1A;
          letter-spacing: -0.02em;
        }
        .shop-card__compare {
          text-decoration: line-through;
          opacity: 0.45;
          font-size: 16px;
          font-weight: 500;
        }
        .shop-card__buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 6px;
        }
        .shop-btn {
          font-family: var(--font-geist);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.3px;
          padding: 14px 22px;
          border-radius: 999px;
          cursor: pointer;
          border: 0;
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }
        .shop-btn--primary {
          background: #E8431A;
          color: #fff;
          box-shadow: 0 10px 24px rgba(232,67,26,.28);
        }
        .shop-btn--primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 32px rgba(232,67,26,.4);
        }
        .shop-btn--secondary {
          background: transparent;
          color: #1A1A1A;
          border: 1.5px solid rgba(26,26,26,.18);
        }
        .shop-btn--secondary:hover {
          border-color: rgba(26,26,26,.35);
          transform: translateY(-1px);
        }
        .shop-btn[disabled] {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        .shop-card__details-link {
          background: none;
          border: 0;
          color: #6D6D6D;
          font-family: var(--font-geist);
          font-size: 13px;
          font-weight: 500;
          padding: 0;
          margin-top: 4px;
          text-align: left;
          cursor: pointer;
          align-self: flex-start;
        }
        .shop-card__details-link:hover { color: #E8431A; }
        .shop-card__placeholder {
          min-height: 480px;
          background: rgba(26,26,26,.03);
        }

        /* Variant selector — branded */
        shopify-variant-selector::part(form) {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 14px 0;
          border-top: 1px solid rgba(26,26,26,.08);
        }
        shopify-variant-selector::part(label) {
          font-family: var(--font-geist);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #6D6D6D;
        }
        shopify-variant-selector::part(radio) {
          background: transparent;
          border: 1.5px solid rgba(26,26,26,.18);
          color: #1A1A1A;
          border-radius: 999px;
          padding: 10px 18px;
          font-family: var(--font-geist);
          font-size: 13px;
          font-weight: 500;
        }
        shopify-variant-selector::part(radio):hover {
          background: rgba(232,67,26,.06);
          border-color: rgba(232,67,26,.35);
          color: #E8431A;
        }
        shopify-variant-selector::part(radio-selected) {
          background: #1A1A1A;
          color: #fff;
          border-color: #1A1A1A;
        }

        /* Collection */
        .shop-collection {
          margin-top: clamp(56px, 8vh, 96px);
        }
        .shop-collection__title {
          margin: 0 0 24px;
          font-family: var(--font-bricolage);
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
        }
        .shop-collection__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: clamp(12px, 2vw, 20px);
        }
        @media (min-width: 700px) { .shop-collection__grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        @media (min-width: 1000px) { .shop-collection__grid { grid-template-columns: repeat(4, minmax(0,1fr)); } }
        .shop-collection__card {
          background: #fff;
          border: 1px solid rgba(26,26,26,.06);
          border-radius: 18px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-family: var(--font-geist);
        }
        .shop-collection__card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -16px rgba(26,26,26,0.18);
        }
        .shop-collection__card[disabled] { opacity: 0.4; cursor: not-allowed; }
        .shop-collection__media {
          aspect-ratio: 1/1;
          border-radius: 12px;
          background: radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .shop-collection__media img {
          max-width: 100%;
          height: auto;
          mix-blend-mode: multiply;
        }
        .shop-collection__info { display: flex; flex-direction: column; gap: 4px; }
        .shop-collection__name {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .shop-collection__price {
          font-size: 14px;
          color: #6D6D6D;
          font-weight: 500;
        }

        /* Modal */
        .shop-modal {
          padding: 0;
          border: 0;
          border-radius: 20px;
          max-width: 920px;
          width: calc(100% - 32px);
          box-shadow: 0 25px 60px -12px rgba(0,0,0,0.25);
        }
        .shop-modal::backdrop { background: rgba(26,26,26,.45); backdrop-filter: blur(4px); }
        .shop-modal__inner { padding: 24px; }
        .shop-modal__close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: rgba(26,26,26,.06);
          border: 0;
          font-size: 20px;
          color: #1A1A1A;
          cursor: pointer;
        }
        .shop-modal__close:hover { background: rgba(26,26,26,.12); }
        .shop-modal__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 760px) { .shop-modal__grid { grid-template-columns: 1fr 1fr; } }
        .shop-modal__media {
          background: radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%);
          border-radius: 16px;
          padding: 24px;
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .shop-modal__media img { max-width: 100%; height: auto; mix-blend-mode: multiply; }
        .shop-modal__body { display: flex; flex-direction: column; gap: 14px; padding: 12px 0; font-family: var(--font-geist); }
        .shop-modal__vendor {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #6D6D6D;
        }
        .shop-modal__title {
          margin: 0;
          font-family: var(--font-bricolage);
          font-size: clamp(20px, 2.2vw, 28px);
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .shop-modal__price {
          display: flex;
          align-items: baseline;
          gap: 10px;
          font-size: 22px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .shop-modal__desc {
          font-size: 14px;
          color: #4A4A4A;
          line-height: 1.6;
          padding-top: 14px;
          border-top: 1px solid rgba(26,26,26,.08);
          max-height: 220px;
          overflow-y: auto;
        }
        .shop-modal__desc p { margin: 0 0 10px; }
      `}</style>
    </>
  )
}
