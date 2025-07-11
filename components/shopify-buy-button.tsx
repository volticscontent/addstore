"use client"

import { useEffect, useRef } from 'react'
import { EventosBuyButton } from '@/lib/tracking'
import { UTMManager } from '@/lib/utm-manager'

declare global {
  interface Window {
    ShopifyBuy: any
    dataLayer: any
    shopifyCart?: any
  }
}

interface ShopifyBuyButtonProps {
  productId: string
  storefrontAccessToken: string
  domain: string
  moneyFormat?: string
  options?: any
}

export default function ShopifyBuyButton({
  productId,
  storefrontAccessToken,
  domain,
  moneyFormat = '${{amount}}',
  options = {}
}: ShopifyBuyButtonProps) {
  const componentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inicializar captura de UTMs
    UTMManager.initializeTracking()

    // URL oficial do Buy Button
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    
    const initBuyButton = () => {
      if (!window.ShopifyBuy) {
        console.error('ShopifyBuy não carregado')
        return
      }

      console.log('Inicializando Buy Button com UTM Manager...')

      const client = window.ShopifyBuy.buildClient({
        domain: domain,
        storefrontAccessToken: storefrontAccessToken
      })

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        console.log('Buy Button UI ready')
        
        // Evento: Botão carregado
        EventosBuyButton.botaoCarregado()
        
        // Configurações do Buy Button oficial com UTM Manager
        const component = ui.createComponent('product', {
          id: productId,
          node: componentRef.current,
          moneyFormat: moneyFormat,
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "auto",
                    "margin-right": "auto",
                    "margin-bottom": "20px",
                    "text-align": "center"
                  },
                  "text-align": "center",
                  "width": "100%"
                },
                button: {
                  "font-weight": "bold",
                  ":hover": {
                    "background-color": "#202020"
                  },
                  "background-color": "#131313",
                  ":focus": {
                    "background-color": "#202020"
                  },
                  "border-radius": "40px",
                  "padding-left": "95px",
                  "padding-right": "95px"
                }
              },
              contents: {
                img: false,
                title: false,
                price: false
              },
              text: {
                button: "Añadir al carrito"
              }
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px"
                  }
                }
              }
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true
              },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px"
                  }
                },
                button: {
                  "font-weight": "bold",
                  ":hover": {
                    "background-color": "#202020"
                  },
                  "background-color": "#131313",
                  ":focus": {
                    "background-color": "#202020"
                  },
                  "border-radius": "40px",
                  "padding-left": "95px",
                  "padding-right": "95px"
                }
              },
              text: {
                button: "Add to cart"
              }
            },
            option: {},
            cart: {
              styles: {
                button: {
                  "font-weight": "bold",
                  ":hover": {
                    "background-color": "#202020"
                  },
                  "background-color": "#131313",
                  ":focus": {
                    "background-color": "#202020"
                  },
                  "border-radius": "40px"
                }
              },
              text: {
                total: "Subtotal",
                button: "Checkout"
              },
              popup: false,
              events: {
                afterInit: function(cart: any) {
                  cart.onCheckout = () => {
                    try {
                      // Capturar UTMs atuais
                      const currentUTMs = UTMManager.getAllUTMs()
                      console.log('UTMs capturados:', currentUTMs)
                      
                      // Construir URL do checkout com UTMs
                      const checkoutUrl = cart.model.webUrl
                      if (!checkoutUrl) {
                        console.error('URL do checkout não encontrada')
                        return true
                      }
                      
                      // Adicionar UTMs à URL
                      const finalUrl = UTMManager.addUTMsToCheckoutURL(checkoutUrl, currentUTMs)
                      console.log('URL final com UTMs:', finalUrl)
                      
                      // Forçar redirecionamento com delay
                      setTimeout(() => {
                        window.location.href = finalUrl
                      }, 500)
                      return false
                    } catch (error) {
                      console.error('Erro ao processar checkout:', error)
                      return true
                    }
                  }
                }
              }
            },
            toggle: {
              styles: {
                toggle: {
                  "font-weight": "bold",
                  "background-color": "#131313",
                  ":hover": {
                    "background-color": "#202020"
                  },
                  ":focus": {
                    "background-color": "#202020"
                  }
                }
              }
            }
          }
        });
        
        console.log('Buy Button component criado com UTM Manager')
      }).catch((error: any) => {
        console.error('Erro ao criar Buy Button:', error)
      })
    }

    const loadScript = () => {
      // Verificar se já está carregado
      if (window.ShopifyBuy) {
        console.log('ShopifyBuy já carregado, inicializando...')
        initBuyButton()
        return
      }

      // Verificar se script já existe
      if (document.querySelector(`script[src="${scriptURL}"]`)) {
        console.log('Script já existe, aguardando carregamento...')
        return
      }

      console.log('Carregando script do Buy Button...')
      const script = document.createElement('script')
      script.async = true
      script.src = scriptURL
      script.onload = () => {
        console.log('Script carregado com sucesso')
        initBuyButton()
      }
      script.onerror = () => {
        console.error('Erro ao carregar o Buy Button script')
      }
      document.head.appendChild(script)
    }

    loadScript()

    // Inicializar interceptadores globais do UTMManager
    UTMManager.interceptCheckoutLinks()

    // Cleanup
    return () => {
      if (componentRef.current) {
        componentRef.current.innerHTML = ''
      }
    }
  }, [productId, storefrontAccessToken, domain, moneyFormat, options])

  return (
    <div 
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <div ref={componentRef} id="shopify-buy-button-container" style={{ width: '100%' }}></div>
    </div>
  )
} 