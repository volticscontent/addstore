// Gerenciador UTM otimizado para Shopify checkout
export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  [key: string]: string | undefined
}

export class UTMManager {
  private static readonly UTM_STORAGE_KEY = 'shopify_utm_params'
  private static readonly SESSION_STORAGE_KEY = 'shopify_session_utm'
  private static readonly UTM_EXPIRY_HOURS = 24

  // Captura UTMs da URL atual
  static captureCurrentUTMs(): UTMParams {
    if (typeof window === 'undefined') return {}
    
    const params = new URLSearchParams(window.location.search)
    const utms: UTMParams = {}
    
    // Capturar UTMs padrão
    const standardUTMs = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    standardUTMs.forEach(key => {
      const value = params.get(key)
      if (value) {
        utms[key] = value
        console.log(`UTM capturado - ${key}:`, value)
      }
    })

    // Capturar outros parâmetros de tracking (gclid, fbclid, etc)
    const trackingParams = ['gclid', 'fbclid', 'msclkid', 'ttclid', 'twclid']
    trackingParams.forEach(key => {
      const value = params.get(key)
      if (value) {
        utms[key] = value
        console.log(`Parâmetro de tracking capturado - ${key}:`, value)
      }
    })

    // Verificar se temos UTMs
    if (Object.keys(utms).length > 0) {
      console.log('UTMs encontrados na URL atual:', utms)
      // Salvar imediatamente
      this.saveUTMs(utms)
    } else {
      console.log('Nenhum UTM encontrado na URL atual')
    }

    return utms
  }

  // Salva UTMs com timestamp
  static saveUTMs(utms: UTMParams): void {
    if (typeof window === 'undefined') return
    
    const utmData = {
      params: utms,
      timestamp: Date.now(),
      expires: Date.now() + (this.UTM_EXPIRY_HOURS * 60 * 60 * 1000)
    }

    try {
      // Salvar em localStorage
      localStorage.setItem(this.UTM_STORAGE_KEY, JSON.stringify(utmData))
      console.log('UTMs salvos em localStorage:', utmData)

      // Salvar em sessionStorage
      sessionStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(utms))
      console.log('UTMs salvos em sessionStorage:', utms)
    } catch (e) {
      console.warn('Erro ao salvar UTMs:', e)
    }
  }

  // Recupera UTMs salvos (verificando expiração)
  static getSavedUTMs(): UTMParams {
    if (typeof window === 'undefined') return {}
    
    try {
      // Tentar sessionStorage primeiro (prioridade)
      const sessionData = sessionStorage.getItem(this.SESSION_STORAGE_KEY)
      if (sessionData) {
        return JSON.parse(sessionData)
      }

      // Fallback para localStorage
      const storedData = localStorage.getItem(this.UTM_STORAGE_KEY)
      if (storedData) {
        const utmData = JSON.parse(storedData)
        
        // Verificar se não expirou
        if (utmData.expires && Date.now() < utmData.expires) {
          return utmData.params || {}
        } else {
          // Remover dados expirados
          localStorage.removeItem(this.UTM_STORAGE_KEY)
        }
      }
    } catch (e) {
      console.warn('Erro ao recuperar UTMs:', e)
    }

    return {}
  }

  // Combina UTMs atuais com salvos
  static getAllUTMs(): UTMParams {
    const currentUTMs = this.captureCurrentUTMs()
    const savedUTMs = this.getSavedUTMs()
    
    // UTMs atuais têm prioridade sobre salvos
    return { ...savedUTMs, ...currentUTMs }
  }

  // Converte UTMs para query string
  static utmsToQueryString(utms: UTMParams): string {
    const filteredUTMs = Object.entries(utms)
      .filter(([_, value]) => value && value.trim() !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    
    return filteredUTMs.join('&')
  }

  // Adiciona UTMs à URL de checkout
  static addUTMsToCheckoutURL(checkoutUrl: string, utms?: UTMParams): string {
    console.group('Adicionando UTMs à URL de checkout')
    console.log('URL original:', checkoutUrl)
    
    // Forçar captura de UTMs atuais
    this.captureCurrentUTMs()
    
    const allUTMs = utms || this.getAllUTMs()
    console.log('UTMs a serem adicionados:', allUTMs)
    
    // Se não houver UTMs, adicionar valores padrão para debug
    if (Object.keys(allUTMs).length === 0) {
      console.log('Nenhum UTM encontrado, adicionando valores de teste')
      allUTMs.utm_source = 'test_source'
      allUTMs.utm_medium = 'test_medium'
      allUTMs.utm_campaign = 'test_campaign'
    }
    
    const utmString = this.utmsToQueryString(allUTMs)
    console.log('Query string gerada:', utmString)
    
    // Garantir que a URL do checkout está limpa
    let baseUrl = checkoutUrl
    if (baseUrl.includes('?')) {
      const [urlBase, params] = baseUrl.split('?')
      const existingParams = new URLSearchParams(params)
      
      // Remover parâmetros UTM existentes
      const standardUTMs = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      standardUTMs.forEach(utm => existingParams.delete(utm))
      
      // Reconstruir URL com parâmetros não-UTM
      const cleanParams = existingParams.toString()
      baseUrl = urlBase + (cleanParams ? `?${cleanParams}` : '')
    }
    
    // Adicionar novos UTMs
    const separator = baseUrl.includes('?') ? '&' : '?'
    const finalUrl = `${baseUrl}${separator}${utmString}`
    
    console.log('URL final com UTMs:', finalUrl)
    console.groupEnd()
    
    return finalUrl
  }

  // Inicializar captura automática de UTMs
  static initializeTracking(): void {
    if (typeof window === 'undefined') return
    
    // Capturar UTMs imediatamente
    const currentUTMs = this.captureCurrentUTMs()
    if (Object.keys(currentUTMs).length > 0) {
      this.saveUTMs(currentUTMs)
    }

    // Escutar mudanças na URL (SPA)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      setTimeout(() => {
        const newUTMs = UTMManager.captureCurrentUTMs()
        if (Object.keys(newUTMs).length > 0) {
          UTMManager.saveUTMs(newUTMs)
        }
      }, 0)
    }
    
    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      setTimeout(() => {
        const newUTMs = UTMManager.captureCurrentUTMs()
        if (Object.keys(newUTMs).length > 0) {
          UTMManager.saveUTMs(newUTMs)
        }
      }, 0)
    }

    // Escutar evento popstate
    window.addEventListener('popstate', () => {
      const newUTMs = this.captureCurrentUTMs()
      if (Object.keys(newUTMs).length > 0) {
        this.saveUTMs(newUTMs)
      }
    })
  }

  // Intercepta cliques em links de checkout do Shopify
  static interceptCheckoutLinks(): void {
    if (typeof window === 'undefined') return
    
    const observer = new MutationObserver(() => {
      // Interceptar botões de checkout do Buy Button
      const checkoutButtons = document.querySelectorAll('.shopify-buy__cart__footer__checkout')
      checkoutButtons.forEach(button => {
        if (!button.hasAttribute('data-utm-interceptor')) {
          button.setAttribute('data-utm-interceptor', 'true')
          
          button.addEventListener('click', (e) => {
            e.preventDefault()
            
            // Obter URL de checkout do elemento
            const cart = (window as any).shopifyCart || {}
            let checkoutUrl = cart.checkoutUrl || button.getAttribute('href') || ''
            
            if (checkoutUrl) {
              checkoutUrl = this.addUTMsToCheckoutURL(checkoutUrl)
              window.location.href = checkoutUrl
            }
          })
        }
      })

      // Interceptar outros links de checkout
      const checkoutLinks = document.querySelectorAll('a[href*="checkout"], a[href*="/cart"]')
      checkoutLinks.forEach(link => {
        if (!link.hasAttribute('data-utm-interceptor')) {
          link.setAttribute('data-utm-interceptor', 'true')
          
          link.addEventListener('click', (e) => {
            e.preventDefault()
            
            let href = link.getAttribute('href') || ''
            if (href.includes('checkout') || href.includes('/cart')) {
              href = this.addUTMsToCheckoutURL(href)
              window.location.href = href
            }
          })
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  // Método para uso direto no Buy Button
  static enhanceShopifyBuyButton(cart: any): string {
    if (!cart || !cart.checkoutUrl) {
      console.warn('Cart ou checkoutUrl não encontrado')
      return ''
    }

    console.log('Checkout URL original:', cart.checkoutUrl)
    const utms = this.getAllUTMs()
    console.log('UTMs a serem aplicados:', utms)
    
    const enhancedUrl = this.addUTMsToCheckoutURL(cart.checkoutUrl, utms)
    console.log('URL de checkout aprimorada:', enhancedUrl)
    
    return enhancedUrl
  }

  // Debug: mostrar todos os UTMs ativos
  static debugUTMs(): void {
    console.group('UTM Manager Debug')
    console.log('UTMs atuais da URL:', this.captureCurrentUTMs())
    console.log('UTMs salvos (session):', sessionStorage.getItem(this.SESSION_STORAGE_KEY))
    console.log('UTMs salvos (local):', localStorage.getItem(this.UTM_STORAGE_KEY))
    console.log('UTMs salvos (parsed):', this.getSavedUTMs())
    console.log('Todos os UTMs combinados:', this.getAllUTMs())
    console.log('Query string gerada:', this.utmsToQueryString(this.getAllUTMs()))
    console.groupEnd()
  }

  // Limpar UTMs salvos
  static clearSavedUTMs(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(this.UTM_STORAGE_KEY)
      sessionStorage.removeItem(this.SESSION_STORAGE_KEY)
      console.log('UTMs limpos')
    } catch (e) {
      console.warn('Erro ao limpar UTMs:', e)
    }
  }
} 