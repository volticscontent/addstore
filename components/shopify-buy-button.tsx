"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    ShopifyBuy: any
    dataLayer: any
  }
}

interface ShopifyBuyButtonProps {
  productId: string
  storefrontAccessToken: string
  domain: string
  moneyFormat: string
  options: any
}

function getUTMParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  for (const key of params.keys()) {
    if (key.startsWith('utm_')) {
      utms[key] = params.get(key) || ''
    }
  }
  return utms
}

export default function ShopifyBuyButton({
  productId,
  storefrontAccessToken,
  domain,
  moneyFormat,
  options
}: ShopifyBuyButtonProps) {
  useEffect(() => {
    // Captura e salva UTM no localStorage
    const utms = getUTMParams()
    if (Object.keys(utms).length > 0) {
      localStorage.setItem('utm_params', JSON.stringify(utms))
    }

    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    
    const loadScript = () => {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptURL
      document.head.appendChild(script)
      script.onload = ShopifyBuyInit
    }

    const ShopifyBuyInit = () => {
      const client = window.ShopifyBuy.buildClient({
        domain: domain,
        storefrontAccessToken: storefrontAccessToken,
        utm: getUTMParams(),
        utm_source: 'instagram',
        utm_medium: 'social',
        utm_campaign: 'instagram_ad',
        utm_content: 'instagram_ad',
        utm_term: 'instagram_ad',
      })

      // Recupera UTM do localStorage
      let utmNote = ''
      let customAttributes: any[] = []
      try {
        const utms = JSON.parse(localStorage.getItem('utm_params') || '{}')
        utmNote = Object.entries(utms).map(([k, v]) => `${k}=${v}`).join('&')
        customAttributes = Object.entries(utms).map(([k, v]) => ({ key: k, value: v }))
      } catch {}

      window.ShopifyBuy.UI.onReady(client).then(function (ui: any) {
        ui.createComponent('product', {
          id: productId,
          node: document.getElementById('product-component-1752142215746'),
          moneyFormat: moneyFormat,
          options: {
            ...options,
            cart: {
              ...options.cart,
              events: {
                ...options.cart?.events,
                afterInit: function(cart: any) {
                  // MutationObserver para garantir que o listener seja sempre adicionado
                  const observer = new MutationObserver(() => {
                    const checkoutBtn = document.querySelector('.shopify-buy__cart__footer__checkout');
                    if (checkoutBtn && !checkoutBtn.hasAttribute('data-utm-listener')) {
                      checkoutBtn.setAttribute('data-utm-listener', 'true');
                      checkoutBtn.addEventListener('click', function (e: any) {
                        e.preventDefault();
                        // Pega a URL de checkout original
                        const checkoutUrl = cart && cart.checkoutUrl ? cart.checkoutUrl : '';
                        // Pega as UTMs da URL atual
                        const params = new URLSearchParams(window.location.search);
                        const utms: string[] = [];
                        for (const [key, value] of params.entries()) {
                          if (key.startsWith('utm_')) {
                            utms.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
                          }
                        }
                        let finalUrl = checkoutUrl;
                        if (utms.length > 0) {
                          finalUrl += (checkoutUrl.includes('?') ? '&' : '?') + utms.join('&');
                        }
                        window.location.href = finalUrl;
                        // Opcional: desconectar observer após o clique
                        observer.disconnect();
                      }, { once: true });
                    }
                  });
                  observer.observe(document.body, { childList: true, subtree: true });
                },
                afterAddVariantToCart: function(lineItem: any, cart: any) {
                  // Evento AddToCart
                  if (window.dataLayer) {
                    window.dataLayer.push({ event: 'AddToCart' })
                  }
                }
              }
            },
            // Não envia mais UTM por note ou customAttributes
          },
        })
      })
    }

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit()
      } else {
        loadScript()
      }
    } else {
      loadScript()
    }
  }, [productId, storefrontAccessToken, domain, moneyFormat, options])

  return <div id='product-component-1752142215746'></div>
} 