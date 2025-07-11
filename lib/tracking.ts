// Funções de tracking com nomenclatura em português
import { UTMManager } from './utm-manager';

export interface EventoEcommerce {
  currency: string;
  value: number;
  items: ItemProduto[];
}

export interface ItemProduto {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

export interface EventoCustom {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  value?: number;
  ecommerce?: EventoEcommerce;
  custom_parameters?: Record<string, any>;
}

// Função principal para enviar eventos com UTMs automáticos
export function enviarEvento(evento: EventoCustom): void {
  if (typeof window === 'undefined') return;

  // Adicionar UTMs automaticamente usando UTMManager
  const utms = UTMManager.getAllUTMs();
  if (Object.keys(utms).length > 0) {
    evento.custom_parameters = {
      ...evento.custom_parameters,
      ...utms,
    };
  }

  // Enviar para Google Analytics via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(evento);
    console.log('Evento enviado para dataLayer:', evento);
  }

  // Enviar para Facebook Pixel se disponível
  if (window.fbq) {
    window.fbq('track', evento.event, evento.custom_parameters);
    console.log('Evento enviado para Facebook Pixel:', evento);
  }
}

// Eventos específicos do Buy Button
export const EventosBuyButton = {
  // Quando o botão é carregado
  botaoCarregado: () => {
    enviarEvento({
      event: 'BotaoCompraCarregado',
      event_category: 'Ecommerce',
      event_action: 'Carregamento',
      event_label: 'Buy Button',
    });
  },

  // Quando item é adicionado ao carrinho
  itemAdicionadoCarrinho: (lineItem: any, cart: any) => {
    enviarEvento({
      event: 'AdicionarAoCarrinho',
      event_category: 'Ecommerce',
      event_action: 'Adicionar Produto',
      event_label: lineItem?.title || 'Produto',
      value: lineItem?.price || 0,
      ecommerce: {
        currency: 'MXN',
        value: lineItem?.price || 0,
        items: [
          {
            item_id: lineItem?.variant?.id || '',
            item_name: lineItem?.title || '',
            item_category: 'Jersey',
            item_variant: lineItem?.variant?.title || '',
            price: lineItem?.price || 0,
            quantity: lineItem?.quantity || 1,
          },
        ],
      },
    });
  },

  // Quando checkout é iniciado
  iniciarCheckout: (cart: any) => {
    enviarEvento({
      event: 'IniciarCheckout',
      event_category: 'Ecommerce',
      event_action: 'Iniciar Checkout',
      event_label: 'Checkout',
      value: cart?.subtotalPrice || 0,
      ecommerce: {
        currency: 'MXN',
        value: cart?.subtotalPrice || 0,
        items: cart?.lineItems || [],
      },
    });
  },

  // Quando carrinho é aberto
  carrinhoAberto: () => {
    enviarEvento({
      event: 'CarrinhoAberto',
      event_category: 'Ecommerce',
      event_action: 'Abrir Carrinho',
      event_label: 'Carrinho',
    });
  },

  // Quando carrinho é fechado
  carrinhoFechado: () => {
    enviarEvento({
      event: 'CarrinhoFechado',
      event_category: 'Ecommerce',
      event_action: 'Fechar Carrinho',
      event_label: 'Carrinho',
    });
  },
};

// Eventos específicos da página
export const EventosPagina = {
  // Visualização da página
  visualizacaoPagina: () => {
    enviarEvento({
      event: 'VisualizacaoPagina',
      event_category: 'Navegacao',
      event_action: 'Visualizar Pagina',
      event_label: 'Produto Jersey Mexico',
    });
  },

  // Clique em imagem do produto
  imagemProdutoClicada: (imageIndex: number) => {
    enviarEvento({
      event: 'ImagemProdutoClicada',
      event_category: 'Produto',
      event_action: 'Clique Imagem',
      event_label: `Imagem ${imageIndex + 1}`,
    });
  },

  // Navegação no carrossel de imagens
  navegacaoCarrossel: (direcao: 'anterior' | 'proxima', imageIndex: number) => {
    enviarEvento({
      event: 'NavegacaoCarrossel',
      event_category: 'Produto',
      event_action: `Navegar ${direcao}`,
      event_label: `Para imagem ${imageIndex + 1}`,
    });
  },

  // Seleção de personalização
  personalizacaoSelecionada: (tipo: 'player' | 'custom', valor?: string) => {
    enviarEvento({
      event: 'PersonalizacaoSelecionada',
      event_category: 'Produto',
      event_action: 'Selecionar Personalizacao',
      event_label: tipo === 'player' ? `Jogador: ${valor}` : 'Personalizado',
      custom_parameters: {
        tipo_personalizacao: tipo,
        valor_personalizacao: valor || '',
      },
    });
  },

  // Clique em favoritos
  adicionarFavoritos: () => {
    enviarEvento({
      event: 'AdicionarFavoritos',
      event_category: 'Produto',
      event_action: 'Adicionar Favoritos',
      event_label: 'Jersey Mexico',
    });
  },

  // Clique em avaliações
  avaliacoesClicadas: () => {
    enviarEvento({
      event: 'AvaliacoesClicadas',
      event_category: 'Produto',
      event_action: 'Ver Avaliacoes',
      event_label: 'Avaliacoes',
    });
  },

  // Clique em botão de review útil
  reviewUtil: (reviewId: number, tipo: 'util' | 'nao_util') => {
    enviarEvento({
      event: 'ReviewInteracao',
      event_category: 'Produto',
      event_action: `Review ${tipo}`,
      event_label: `Review ${reviewId}`,
      custom_parameters: {
        review_id: reviewId,
        tipo_interacao: tipo,
      },
    });
  },

  // Clique em accordion
  accordionAberto: (secao: string) => {
    enviarEvento({
      event: 'AccordionAberto',
      event_category: 'Produto',
      event_action: 'Abrir Accordion',
      event_label: secao,
    });
  },

  // Clique em informações de entrega
  informacoesEntrega: (tipo: 'envio' | 'devolucao' | 'cartao_presente') => {
    enviarEvento({
      event: 'InformacoesEntrega',
      event_category: 'Produto',
      event_action: 'Ver Informacoes',
      event_label: tipo,
    });
  },

  // Clique em guia de tamanhos
  guiaTamanhos: () => {
    enviarEvento({
      event: 'GuiaTamanhosAberta',
      event_category: 'Produto',
      event_action: 'Abrir Guia Tamanhos',
      event_label: 'Guia Tamanhos',
    });
  },

  // Scroll para seção específica
  scrollSecao: (secao: string) => {
    enviarEvento({
      event: 'ScrollSecao',
      event_category: 'Navegacao',
      event_action: 'Scroll Para Secao',
      event_label: secao,
    });
  },

  // Clique em breadcrumb
  breadcrumbClicado: (item: string) => {
    enviarEvento({
      event: 'BreadcrumbClicado',
      event_category: 'Navegacao',
      event_action: 'Clique Breadcrumb',
      event_label: item,
    });
  },

  // Clique em galeria UGC
  ugcGaleriaClicada: (imageIndex: number) => {
    enviarEvento({
      event: 'UGCGaleriaClicada',
      event_category: 'Produto',
      event_action: 'Clique UGC',
      event_label: `UGC Imagem ${imageIndex + 1}`,
    });
  },

  // Navegação na galeria UGC
  ugcNavegacao: (direcao: 'anterior' | 'proxima') => {
    enviarEvento({
      event: 'UGCNavegacao',
      event_category: 'Produto',
      event_action: `UGC ${direcao}`,
      event_label: 'UGC Gallery',
    });
  },

  // Clique em "Ver produtos" no UGC
  ugcVerProdutos: (imageIndex: number) => {
    enviarEvento({
      event: 'UGCVerProdutos',
      event_category: 'Produto',
      event_action: 'Ver Produtos UGC',
      event_label: `UGC Imagem ${imageIndex + 1}`,
    });
  },

  // Clique em header
  headerClicado: () => {
    enviarEvento({
      event: 'HeaderClicado',
      event_category: 'Navegacao',
      event_action: 'Clique Header',
      event_label: 'Header Adidas',
    });
  },

  // Clique em footer
  footerClicado: () => {
    enviarEvento({
      event: 'FooterClicado',
      event_category: 'Navegacao',
      event_action: 'Clique Footer',
      event_label: 'Footer Adidas',
    });
  },

  // Tempo na página
  tempoNaPagina: (segundos: number) => {
    enviarEvento({
      event: 'TempoNaPagina',
      event_category: 'Engajamento',
      event_action: 'Tempo Permanencia',
      event_label: `${segundos} segundos`,
      value: segundos,
    });
  },

  // Formulário de personalização preenchido
  formularioPersonalizacao: (nome: string, numero: string) => {
    enviarEvento({
      event: 'FormularioPersonalizacao',
      event_category: 'Produto',
      event_action: 'Preencher Personalizacao',
      event_label: 'Personalizacao Customizada',
      custom_parameters: {
        nome_personalizado: nome,
        numero_personalizado: numero,
      },
    });
  },
};

// Função para inicializar tracking da página (agora usando UTMManager)
export function inicializarTracking(): void {
  if (typeof window === 'undefined') return;

  // Inicializar UTMManager
  UTMManager.initializeTracking();

  // Evento de visualização da página
  EventosPagina.visualizacaoPagina();

  // Rastrear tempo na página
  const startTime = Date.now();

  // Enviar evento de tempo a cada 30 segundos
  const timeInterval = setInterval(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    EventosPagina.tempoNaPagina(timeSpent);
  }, 30000);

  // Limpar interval quando a página é fechada
  window.addEventListener('beforeunload', () => {
    clearInterval(timeInterval);
    const finalTime = Math.floor((Date.now() - startTime) / 1000);
    EventosPagina.tempoNaPagina(finalTime);
  });

  // Debug UTMs na inicialização
  console.log('Tracking inicializado com UTMManager:');
  UTMManager.debugUTMs();
}

// Declaração global para Facebook Pixel
declare global {
  interface Window {
    fbq?: any;
  }
}
