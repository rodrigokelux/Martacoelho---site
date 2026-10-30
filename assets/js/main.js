/* ==========================================================================
   Marta Coelho — scripts partilhados por todas as páginas
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const PRODUCTS = window.MC_PRODUCTS || [];
  const CDN = 'https://cdn.shopify.com/s/files/1/0817/5291/6300/files/';
  const FREE_SHIP = 150;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;

  const img = (u, w = 800) => u ? `${u}?width=${w}` : '';
  const srcset = (u, ws = [400, 700, 1000, 1400]) => ws.map(w => `${img(u, w)} ${w}w`).join(', ');
  const byHandle = h => PRODUCTS.find(p => p.h === h);
  const inStock = p => p.sizes.some(s => s.ok);
  const siblings = p => PRODUCTS.filter(x => x.name === p.name && x.collection === p.collection);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* armazenamento indisponível */ } }
  };

  const SWATCH = {
    'preto': '#1c1a1a', 'azul escuro': '#1f2a44', 'verde': '#2d5a47', 'bordô': '#6e1d2a', 'coral': '#e8674a',
    'castanho': '#5a3a2b', 'bege': '#d8c6ab', 'lavanda': '#a69ad6', 'branco': '#f4f1ea', 'azulão': '#2446c6',
    'xadrez colorido': 'conic-gradient(#e2477a 0 25%, #f1a518 0 50%, #3a8f6a 0 75%, #7b5fd0 0)'
  };
  // as mesmas cores com o nome em inglês
  Object.assign(SWATCH, { 'black': SWATCH.preto, 'dark blue': SWATCH['azul escuro'], 'green': SWATCH.verde, 'burgundy': SWATCH['bordô'], 'brown': SWATCH.castanho,
    'beige': SWATCH.bege, 'lavender': SWATCH.lavanda, 'white': SWATCH.branco, 'royal blue': SWATCH['azulão'], 'colourful check': SWATCH['xadrez colorido'] });
  const swatchOf = c => SWATCH[(c || '').toLowerCase()] || '#cbb8a6';

  const ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7.5-4.6-9.2-9.3C1.6 7.3 3.8 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.4 0 5.6 3.3 4.4 6.7C19.5 15.4 12 20 12 20Z"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h18M3 16h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m5 5 14 14M19 5 5 19"/></svg>',
    left: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5l7 7-7 7"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.3c-1.5 0-2.9-.4-4-1.1v6.1c0 3.4-2.6 5.8-5.8 5.8S5 18.5 5 15.3c0-3.3 2.8-5.9 6.3-5.6v3.4c-1.5-.3-2.9.7-2.9 2.2 0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-1 2.4-2.6V3h3.5Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h14l-3-3M20 16H6l3 3"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10m0-5.5V4a1.5 1.5 0 0 1 3 0v6m0-5a1.5 1.5 0 0 1 3 0v5.5m0-3a1.5 1.5 0 0 1 3 0V14c0 4-3 7-7 7h-1c-3 0-4.5-1.6-6-4l-2.2-3.8a1.5 1.5 0 0 1 2.5-1.6L7 13"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l7-7"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/></svg>',
    down: '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 9 7 7 7-7"/></svg>'
  };

  // Idioma: o cabeçalho e os menus usam t(); o resto da página é traduzido por assets/js/i18n.js
  const LANG = store.get('mc-lang', 'pt') === 'en' ? 'en' : 'pt';
  const t = (pt, en) => LANG === 'en' ? en : pt;
  const I18N = LANG === 'en' && window.MC_I18N;
  if (I18N) PRODUCTS.forEach(I18N.product);
  const money = n => n.toLocaleString(LANG === 'en' ? 'en-IE' : 'pt-PT', { style: 'currency', currency: 'EUR' });
  const IG_URL = 'https://www.instagram.com/bymartacoelho/';

  /* ------------------------------------------------------------------------
     Cabeçalho, menus e rodapé (partilhados)
     ------------------------------------------------------------------------ */
  const page = document.body.dataset.page || '';
  const megaImg = (h, i = 0) => { const p = byHandle(h); return p ? img(p.img[i], 700) : ''; };

  // categorias de acessórios (para assinalar o menu certo na página de coleção)
  const ACC_CATS = ['malas', 'vichy', 'fazenda', 'cortica', 'bolsas', 'mini-bolsas', 'lencos', 'chapeus'];
  const qc = new URLSearchParams(location.search).get('c') || 'inverno';
  const group = page === 'colecao' ? (ACC_CATS.includes(qc) ? 'acessorios' : ['inverno', 'malhas', 'calcoes'].includes(qc) ? 'vestuario' : '')
    : page === 'sobre' || page === 'lojas' ? 'sobre' : '';
  const cur = g => group === g ? ' aria-current="page"' : '';

  // Menus: colunas de ligações e zonas em destaque (imagem ou, sem fotografia, bloco de cor)
  const MENU = [
    { id: 'vestuario', label: t('Vestuário', 'Garments'), href: 'colecao.html?c=inverno', cols: [
      { h: t('Todas as peças', 'All pieces'), href: 'colecao.html?c=inverno', items: [
        [t('Camisas e blusas', 'Shirts and blouses'), 'colecao.html?c=inverno&t=Blusa'],
        [t('Malhas', 'Knitwear'), 'colecao.html?c=malhas'],
        [t('Calças', 'Trousers'), 'colecao.html?c=inverno&t=Calças'],
        [t('Vestidos', 'Dresses'), 'colecao.html?c=inverno&t=Vestido'],
        [t('Casacos e blazers', 'Coats and blazers'), 'colecao.html?c=inverno&t=Casaco'],
        [t('Calções', 'Shorts'), 'colecao.html?c=calcoes'],
        [t('Preços especiais', 'Special prices'), 'colecao.html?c=promo', 'hot']
      ] },
      { h: t('Coleções', 'Collections'), items: [['Salvia · ' + t('Inverno', 'Winter') + ' 26/27', 'colecao.html?c=inverno']] }
    ], tiles: [
      [t('Casacos em burel', 'Burel coats'), 'colecao.html?c=inverno&t=Casaco', megaImg('casaco-burel-oversized-auranza-xadrez-colorido', 1)],
      [t('Malhas em bambu', 'Bamboo knitwear'), 'colecao.html?c=malhas', megaImg('vestido-comprido-bambu-essenza-coral')]
    ] },
    { id: 'acessorios', label: t('Acessórios', 'Accessories'), href: 'colecao.html?c=malas', cols: [
      { h: t('Malas', 'Bags'), href: 'colecao.html?c=malas', items: [
        [t('Todas as tote bags', 'All tote bags'), 'colecao.html?c=malas&t=Tote bag', 'best'],
        [t('Tote bags em vichy e xadrez', 'Gingham tote bag'), 'colecao.html?c=vichy'],
        [t('Tote bags em fazenda', 'Wool cloth tote bags'), 'colecao.html?c=fazenda'],
        [t('Tote bags em cortiça portuguesa', 'Portuguese cork tote bags'), 'colecao.html?c=cortica'],
        ['Micro bags', 'colecao.html?c=malas&t=Mala']
      ] },
      { h: t('Bolsas', 'Pouches'), items: [
        [t('Bolsas em vichy', 'Gingham pouches'), 'colecao.html?c=bolsas'],
        [t('Mini bolsas em vichy', 'Mini gingham pouches'), 'colecao.html?c=mini-bolsas']
      ] },
      { h: t('Croché', 'Crochet'), items: [
        [t('Lenços', 'Scarves'), 'colecao.html?c=lencos'],
        [t('Chapéus', 'Hats'), 'colecao.html?c=chapeus']
      ] }
    ], tiles: [
      [t('Tote bags em vichy', 'Gingham tote bags'), 'colecao.html?c=vichy', megaImg('tote-bag-seersucker-rosa-vermelho')],
      // TODO(Marta): fotografia dos chapéus em croché
      [t('Chapéus em croché', 'Crochet hats'), 'colecao.html?c=chapeus', '']
    ] },
    { id: 'sobre', label: t('Sobre', 'About'), href: 'sobre.html', cols: [
      { h: t('Sobre Marta Coelho', 'About Marta Coelho'), href: 'sobre.html', items: [
        [t('A nossa história', 'Our story'), 'sobre.html'],
        [t('Sustentabilidade', 'Sustainability'), 'sobre.html#sustentabilidade'],
        [t('Mercados e lojas', 'Markets and stores'), 'lojas.html'],
        ['Blog', '#', 'demo']
      ] }
    ], tiles: [
      [t('Mercado na LX Factory', 'Market at LX Factory'), 'lojas.html#lx-factory', img(CDN + 'IMG_6007_2.jpg', 700)]
    ] }
  ];
  const megaLink = ([label, href, flag]) => `<li><a href="${href}"${flag === 'hot' ? ' class="is-hot"' : ''}${flag === 'demo' ? ' data-demo' : ''}>${label}${flag === 'best' ? '<em class="mega__tag">Best seller</em>' : ''}</a></li>`;
  const megaTile = ([label, href, src]) => src
    ? `<a class="mega__tile" href="${href}"><img src="${src}" alt="" loading="lazy"><span>${label}</span></a>`
    : `<a class="mega__tile mega__tile--empty" href="${href}"><span>${label}</span></a>`;
  const navItem = m => `
            <div class="nav__item">
              <a class="nav__link" href="${m.href}"${cur(m.id)}>${m.label}</a>
              <div class="mega mega--${m.id}">
                ${m.cols.map(c => `<div><h4>${c.href ? `<a href="${c.href}">${c.h}</a>` : c.h}</h4><ul>${c.items.map(megaLink).join('')}</ul></div>`).join('')}
                ${m.tiles.map(megaTile).join('')}
              </div>
            </div>`;

  // Menu móvel: Vestuário e Acessórios abrem com as mesmas colunas do menu do computador
  const drawerGroup = m => `
        <div class="dgroup">
          <button type="button" class="big dgroup__btn" aria-expanded="false">${m.label}<i></i></button>
          <div class="dgroup__panel"><div>
            ${m.cols.map(c => `<h4>${c.href ? `<a href="${c.href}">${c.h}</a>` : c.h}</h4><ul>${c.items.map(megaLink).join('')}</ul>`).join('')}
          </div></div>
        </div>`;

  // Pesquisa: sugestões (texto mostrado, termo pesquisado) e coleções em destaque
  const SEARCH_TOP = [['Tote bags', 'Tote bag'], ['Cortiça portuguesa', 'Cortiça'], ['Burel', 'Burel'], ['Bambu', 'Bambu'], ['Vichy', 'Seersucker'],
    ['Casacos', 'Casaco'], ['Camisas', 'Camisa'], ['Blusas', 'Blusa'], ['Calças', 'Calças'], ['Peças em verde', 'Verde']];
  const SEARCH_FEAT = [
    [t('Novidades', 'New in'), 'colecao.html?c=inverno', megaImg('vestido-comprido-bambu-essenza-coral')],
    ['Tote bags', 'colecao.html?c=malas&t=Tote bag', megaImg('tote-bag-cortica-fragments-gold-caramel')]
  ];

  // Seletores de moeda e idioma (canto direito da barra de anúncios)
  const CURRENCIES = [['EUR', '€'], ['USD', '$'], ['GBP', '£']];
  const LANGS = [['pt', 'Português'], ['en', 'English']];
  const pickers = () => `
    <div class="dd"><button type="button" class="dd__btn" aria-expanded="false" aria-label="${t('Moeda', 'Currency')}">EUR €${ICON.down}</button>
      <ul class="dd__menu">${CURRENCIES.map(([c, s]) => `<li><button type="button"${c === 'EUR' ? ' class="is-on"' : ' data-demo="moeda"'}>${c} ${s}</button></li>`).join('')}</ul></div>
    <div class="dd"><button type="button" class="dd__btn" aria-expanded="false" aria-label="${t('Idioma', 'Language')}">${LANG.toUpperCase()}${ICON.down}</button>
      <ul class="dd__menu">${LANGS.map(([l, n]) => `<li><button type="button" data-lang="${l}"${l === LANG ? ' class="is-on"' : ''}>${n}</button></li>`).join('')}</ul></div>`;

  function renderChrome() {
    const header = $('#site-header');
    if (header) header.outerHTML = `
      <header class="header" id="header">
        <div class="ann" role="region" aria-label="${t('Avisos', 'Notices')}">
          <a class="ann__ig" href="${IG_URL}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          <div class="ann__track">
            <p class="ann__msg is-active">${t('Receba 10% de desconto na sua primeira compra', 'Receive 10% off your first purchase')} | <button type="button" data-pop>${t('Registe-se', 'Sign up')}</button></p>
            <p class="ann__msg">${t('Portes grátis para Portugal a partir de 150&nbsp;€', 'Worldwide shipping')}</p>
          </div>
          <div class="ann__opts">${pickers()}</div>
        </div>
        <div class="header__bar">
          <button class="icon-btn menu-btn" id="menuBtn" aria-label="${t('Abrir menu', 'Open menu')}" aria-expanded="false">${ICON.menu}</button>
          <a class="logo" href="index.html" aria-label="Marta Coelho, ${t('página inicial', 'home page')}"><span class="logo__mark" aria-hidden="true"></span><span class="logo__word">Marta Coelho</span></a>
          <nav class="nav" aria-label="Principal">${MENU.map(navItem).join('')}
          </nav>
          <div class="tools">
            <button class="search-btn" id="searchBtn" aria-label="${t('Pesquisar', 'Search')}">${ICON.search}<span class="hide-m">${t('Pesquisa', 'Search')}</span></button>
            <a class="icon-btn hide-m" href="#" aria-label="${t('Conta', 'Account')}" data-demo>${ICON.user}</a>
            <a class="icon-btn hide-m" href="colecao.html?c=favoritos" aria-label="${t('Favoritos', 'Wishlist')}">${ICON.heart}</a>
            <button class="icon-btn" id="cartBtn" aria-label="${t('Abrir carrinho', 'Open cart')}">${ICON.bag}<span class="cart-count" id="cartCount">0</span></button>
          </div>
        </div>
      </header>
      <nav class="drawer-nav" id="drawerNav" aria-label="Menu móvel">
        <button class="icon-btn drawer-nav__close" id="menuClose" aria-label="${t('Fechar menu', 'Close menu')}">${ICON.close}</button>
        ${MENU.filter(m => m.id !== 'sobre').map(drawerGroup).join('')}
        <a class="big" href="colecao.html?c=promo">${t('Preços especiais', 'Special prices')}</a>
        <a class="big" href="sobre.html">${t('A nossa história', 'Our story')}</a>
        <a class="big" href="lojas.html">${t('Mercados e lojas', 'Markets and stores')}</a>
        <a class="big" href="colecao.html?c=favoritos">${t('Favoritos', 'Wishlist')}</a>
        <a class="big" href="sobre.html#contactos">${t('Contactos', 'Contacts')}</a>
        <div class="drawer-nav__opts">${pickers()}</div>
        <div class="drawer-nav__foot">
          <a href="mailto:customercare@martacoelho.com">customercare@martacoelho.com</a>
          <a href="${IG_URL}" target="_blank" rel="noopener">@bymartacoelho</a>
        </div>
      </nav>
      <div class="pop" id="pop" role="dialog" aria-label="Newsletter" aria-hidden="true" data-news-wrap>
        <button type="button" class="icon-btn pop__close" id="popClose" aria-label="${t('Fechar', 'Close')}">${ICON.close}</button>
        <h3>${t('Junte-se à comunidade', 'Join us')}</h3>
        <p>${t('Descubra todas as novidades e criações MARTA COELHO.', 'Discover all the news and MARTA COELHO\'s creations.')}<br>${t('Registe-se e receba 10% de desconto na sua primeira encomenda.', 'Sign up and get 10% off your first order.')}</p>
        <form data-news novalidate>
          <label class="sr-only" for="popEmail">E-mail</label><input id="popEmail" type="email" required placeholder="${t('Endereço de e-mail', 'Email address')}" autocomplete="email">
          <button class="btn btn--orange btn--block" type="submit">${t('Inscrever', 'Sign up')}</button>
        </form>
        <p class="news-ok">${t('Obrigada! Verifique o seu e-mail 🧡', 'Thank you! Please check your email 🧡')}</p>
      </div>
      <div class="overlay" id="overlay"></div>
      <aside class="cart" id="cart" aria-label="Carrinho" aria-hidden="true">
        <div class="cart__head"><h2>Carrinho</h2><button class="icon-btn" id="cartClose" aria-label="Fechar carrinho">${ICON.close}</button></div>
        <div class="cart__ship" id="cartShip"></div>
        <div class="cart__items" id="cartItems"></div>
        <div class="cart__foot" id="cartFoot"></div>
      </aside>
      <div class="search" id="search" role="dialog" aria-label="Pesquisa">
        <div class="search__bar">${ICON.search}<input id="searchInput" type="search" placeholder="O que procura?" autocomplete="off" aria-label="Pesquisar produtos"><button class="icon-btn" id="searchClose" aria-label="Fechar pesquisa">${ICON.close}</button></div>
        <div class="search__body">
          <div class="search__top"><h4>Mais pesquisado</h4><ul>${SEARCH_TOP.map(([label, q]) => `<li><button type="button" data-q="${q}">${label}</button></li>`).join('')}</ul></div>
          <div>
            <div class="search__feat" id="searchFeat">${SEARCH_FEAT.map(megaTile).join('')}</div>
            <div class="search__results" id="searchResults"></div>
          </div>
        </div>
      </div>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
      <div class="cursor" id="cursor" aria-hidden="true">Ver</div>`;

    const footer = $('#site-footer');
    if (footer) footer.outerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div class="footer__news" data-news-wrap>
              <h4>Subscreva a newsletter e receba 10% de desconto na primeira encomenda</h4>
              <form data-news novalidate>
                <label class="sr-only" for="footName">Nome</label><input id="footName" type="text" placeholder="Nome" autocomplete="given-name">
                <label class="sr-only" for="footLast">Apelido</label><input id="footLast" type="text" placeholder="Apelido" autocomplete="family-name">
                <label class="sr-only" for="footEmail">E-mail</label><input id="footEmail" type="email" required placeholder="E-mail" autocomplete="email">
                <button type="submit">Subscrever</button>
              </form>
              <p class="news-ok">Obrigada! Verifique o seu e-mail 🧡</p>
              <div class="socials">
                <a href="https://www.instagram.com/bymartacoelho/" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
                <a href="#" aria-label="Facebook" data-demo>${ICON.fb}</a>
                <a href="#" aria-label="TikTok" data-demo>${ICON.tiktok}</a>
              </div>
            </div>
            <div>
              <h4>Loja</h4>
              <ul>
                <li><a href="colecao.html?c=inverno">Salvia · Inverno 26/27</a></li>
                <li><a href="colecao.html?c=todos">Vestuário</a></li>
                <li><a href="colecao.html?c=malas">Malas</a></li>
                <li><a href="#" data-demo>Cartão-presente</a></li>
                <li><a href="colecao.html?c=promo">Preços especiais</a></li>
              </ul>
            </div>
            <div>
              <h4>Sobre</h4>
              <ul>
                <li><a href="sobre.html">Sobre nós</a></li>
                <li><a href="sobre.html#sustentabilidade">Sustentabilidade</a></li>
                <li><a href="lojas.html">Mercados e lojas</a></li>
                <li><a href="https://www.instagram.com/bymartacoelho/" target="_blank" rel="noopener">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4>Apoio ao cliente</h4>
              <ul>
                <li><a href="#" data-demo>Envios e entregas</a></li>
                <li><a href="#" data-demo>Trocas e devoluções</a></li>
                <li><a href="#" data-demo>Guia de tamanhos</a></li>
                <li><a href="#" data-demo>Perguntas frequentes</a></li>
              </ul>
            </div>
            <div class="footer__contact">
              <h4>Contactos</h4>
              <ul>
                <li><small>Apoio ao cliente</small><a href="mailto:customercare@martacoelho.com">customercare@martacoelho.com</a></li>
                <li><small>Marca, parcerias e imprensa</small><a href="mailto:info@martacoelho.com">info@martacoelho.com</a></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} Marta Coelho · Feito à mão em Portugal</span>
            <nav aria-label="Legal">
              <a href="#" data-demo>Termos e condições</a>
              <a href="#" data-demo>Privacidade</a>
              <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener">Livro de Reclamações</a>
            </nav>
            <div class="pay" aria-label="Métodos de pagamento"><img src="assets/img/pay/mbway.svg" alt="MB WAY" title="MB WAY" class="pay--mbway" loading="lazy"><img src="assets/img/pay/multibanco.svg" alt="Multibanco" title="Multibanco" class="pay--multibanco" loading="lazy"><img src="assets/img/pay/visa.svg" alt="Visa" title="Visa" class="pay--visa" loading="lazy"><img src="assets/img/pay/mastercard.svg" alt="Mastercard" title="Mastercard" class="pay--mastercard" loading="lazy"><img src="assets/img/pay/paypal.svg" alt="PayPal" title="PayPal" class="pay--paypal" loading="lazy"><img src="assets/img/pay/applepay.svg" alt="Apple Pay" title="Apple Pay" class="pay--applepay" loading="lazy"><img src="assets/img/pay/klarna.svg" alt="Klarna" title="Klarna" class="pay--klarna" loading="lazy"></div>
          </div>
        </div>
      </footer>`;
  }

  /* ------------------------------------------------------------------------
     Cartão de produto
     ------------------------------------------------------------------------ */
  function productCard(p, { quick = true, sizes = '(max-width: 900px) 50vw, 25vw' } = {}) {
    const ok = inStock(p);
    const sib = siblings(p);
    const tags = [];
    if (!ok) tags.push('<span class="tag tag--out">Edição esgotada</span>');
    else if (p.was) tags.push(`<span class="tag tag--sale">−${Math.round((1 - p.price / p.was) * 100)}%</span>`);
    else tags.push('<span class="tag tag--ok"><i></i>Pronto a enviar</span>');
    const sizeBtns = p.sizes.map(s => `<button type="button" class="${s.ok ? '' : 'is-out'}" data-add="${p.h}" data-size="${esc(s.s)}" title="${s.ok ? 'Adicionar ' + esc(s.s) : 'Esgotado: avise-me'}">${esc(s.s)}</button>`).join('');
    return `
      <a class="card" href="produto.html?p=${p.h}" data-cursor>
        <div class="card__media">
          <div class="card__tags">${tags.join('')}</div>
          <img class="main" src="${img(p.img[0], 600)}" srcset="${srcset(p.img[0], [400, 600, 900])}" sizes="${sizes}" alt="${esc(p.name)} ${esc(p.color)}" loading="lazy">
          ${p.img[1] ? `<img class="alt" src="${img(p.img[1], 600)}" srcset="${srcset(p.img[1], [400, 600, 900])}" sizes="${sizes}" alt="" loading="lazy">` : ''}
          ${quick ? `<div class="card__quick"><p>${ok ? 'Adicionar rápido' : 'Avise-me se voltar'}</p><div class="card__sizes">${sizeBtns}</div></div>` : ''}
        </div>
        <div class="card__body">
          <div>
            <div class="card__name">${esc(p.name)}</div>
            <div class="card__color">${esc(p.color || p.material)}</div>
            ${sib.length > 1 ? `<div class="card__swatches">${sib.slice(0, 6).map(s => `<i style="background:${swatchOf(s.color)}" title="${esc(s.color)}"></i>`).join('')}</div>` : ''}
          </div>
          <div class="card__price">${p.was ? `<s>${money(p.was)}</s><span class="sale">${money(p.price)}</span>` : money(p.price)}</div>
        </div>
      </a>`;
  }

  /* ------------------------------------------------------------------------
     Carrinho
     ------------------------------------------------------------------------ */
  let cart = store.get('mc-cart', []);
  const cartTotal = () => cart.reduce((t, i) => { const p = byHandle(i.h); return t + (p ? p.price * i.q : 0); }, 0);

  function saveCart() { store.set('mc-cart', cart); renderCart(); }

  function renderCart() {
    const count = cart.reduce((t, i) => t + i.q, 0);
    const badge = $('#cartCount');
    if (badge) { badge.textContent = count; badge.classList.toggle('has-items', count > 0); }
    const items = $('#cartItems'); if (!items) return;
    const total = cartTotal();
    const left = Math.max(0, FREE_SHIP - total);
    $('#cartShip').innerHTML = (left > 0
      ? `Faltam <b>${money(left)}</b> para ter portes grátis em Portugal`
      : '<b>Parabéns!</b> Tem portes grátis para Portugal 🧡') +
      `<div class="cart__bar"><i style="width:${Math.min(100, total / FREE_SHIP * 100)}%"></i></div>`;
    if (!cart.length) {
      items.innerHTML = `<div class="cart__empty"><div class="display">O carrinho está vazio</div><p>Que tal espreitar a nova coleção de inverno?</p><a class="btn" href="colecao.html?c=inverno" style="margin-top:14px">Ver coleção</a></div>`;
      $('#cartFoot').innerHTML = '';
      return;
    }
    items.innerHTML = cart.map((i, idx) => {
      const p = byHandle(i.h); if (!p) return '';
      return `<div class="citem">
        <a href="produto.html?p=${p.h}"><img src="${img(p.img[0], 200)}" alt=""></a>
        <div><h3>${esc(p.name)}</h3><p>${esc(p.color || p.material)}${i.s !== 'Único' ? ' · ' + esc(i.s) : ''}</p>
          <div class="qty"><button data-q="${idx}" data-d="-1" aria-label="Menos">−</button><span>${i.q}</span><button data-q="${idx}" data-d="1" aria-label="Mais">+</button></div></div>
        <div class="citem__right"><span>${money(p.price * i.q)}</span><button class="citem__rm" data-rm="${idx}">Remover</button></div>
      </div>`;
    }).join('');
    $('#cartFoot').innerHTML = `
      <div class="cart__total"><span>Subtotal</span><span>${money(total)}</span></div>
      <button class="btn btn--block btn--lg" data-demo="checkout">Finalizar compra</button>
      <small>Impostos incluídos. Portes calculados no checkout. Pagamento com MB WAY, Multibanco, cartão ou PayPal.</small>`;
  }

  function addToCart(h, size) {
    const p = byHandle(h); if (!p) return;
    const line = cart.find(i => i.h === h && i.s === size);
    if (line) line.q++; else cart.push({ h, s: size, q: 1 });
    saveCart();
    const badge = $('#cartCount');
    badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
    toast(`<img src="${img(p.img[0], 120)}" alt=""><span>${esc(p.name)}${size !== 'Único' ? ' · ' + esc(size) : ''} foi adicionado ao carrinho</span>`);
  }

  function openPanel(el) {
    el.classList.add('is-open'); el.setAttribute('aria-hidden', 'false');
    $('#overlay').classList.add('is-on'); document.documentElement.style.overflow = 'hidden';
  }
  function closePanels() {
    $$('.cart.is-open, .search.is-open').forEach(el => { el.classList.remove('is-open'); el.setAttribute('aria-hidden', 'true'); });
    $('#overlay').classList.remove('is-on'); document.documentElement.style.overflow = '';
  }

  /* ------------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------------ */
  let toastT;
  function toast(html) {
    const t = $('#toast'); if (!t) return;
    t.innerHTML = html.startsWith('<img') ? html : `<span class="toast__ico">${ICON.check}</span><span>${html}</span>`;
    t.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 3200);
  }

  /* ------------------------------------------------------------------------
     Pesquisa
     ------------------------------------------------------------------------ */
  function runSearch(q) {
    const out = $('#searchResults');
    const n = q.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    $('#searchFeat').hidden = !!n;
    if (!n) { out.innerHTML = ''; return; }
    const hits = PRODUCTS.filter(p => [p.name, p.color, p.type, p.material, p.line, p.intro, ...Object.values(p.pt || {})].join(' ').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').includes(n)).slice(0, 12);
    out.innerHTML = hits.length ? hits.map(p => productCard(p, { quick: false, sizes: '16vw' })).join('') : `<p class="grid-empty">Não encontrámos resultados para “${esc(q)}”.</p>`;
  }

  /* ------------------------------------------------------------------------
     Interações globais
     ------------------------------------------------------------------------ */
  function bindChrome() {
    const header = $('#header');
    let lastY = 0;
    const onScroll = () => {
      const y = scrollY;
      header.classList.toggle('is-solid', y > 40);
      header.classList.toggle('is-hidden', y > 600 && y > lastY + 4 && !header.matches(':hover'));
      if (y < lastY - 4) header.classList.remove('is-hidden');
      document.body.classList.toggle('header-hidden', header.classList.contains('is-hidden'));
      lastY = y;
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // avisos rotativos
    const msgs = $$('.ann__msg'); let ai = 0;
    setInterval(() => {
      msgs[ai].classList.remove('is-active'); msgs[ai].classList.add('is-out');
      const prev = msgs[ai]; setTimeout(() => prev.classList.remove('is-out'), 700);
      ai = (ai + 1) % msgs.length; msgs[ai].classList.add('is-active');
    }, 4200);

    // seletores de moeda e idioma
    const closeDd = () => $$('.dd.is-open').forEach(d => { d.classList.remove('is-open'); $('.dd__btn', d).setAttribute('aria-expanded', 'false'); });
    document.addEventListener('click', e => {
      const btn = e.target.closest('.dd__btn');
      const lang = e.target.closest('[data-lang]');
      if (lang) { store.set('mc-lang', lang.dataset.lang); location.reload(); return; }
      if (!btn) { closeDd(); return; }
      const dd = btn.closest('.dd'), open = !dd.classList.contains('is-open');
      closeDd(); dd.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open);
    });
    addEventListener('scroll', closeDd, { passive: true });

    // pop-up de registo: abre sozinho na primeira visita, ou pelo "Registe-se" da barra
    const pop = $('#pop');
    const setPop = on => { pop.classList.toggle('is-on', on); pop.setAttribute('aria-hidden', !on); };
    $$('[data-pop]').forEach(b => b.addEventListener('click', () => { setPop(true); setTimeout(() => $('#popEmail').focus(), 400); }));
    $('#popClose').addEventListener('click', () => { setPop(false); if (!store.get('mc-pop')) store.set('mc-pop', 'closed'); });
    $('form', pop).addEventListener('submit', () => {
      if (!$('#popEmail').checkValidity()) return;
      store.set('mc-pop', 'done'); setTimeout(() => setPop(false), 3500);
    });
    if (!store.get('mc-pop')) setTimeout(() => setPop(true), 6000);

    // menu móvel
    const drawer = $('#drawerNav');
    const setMenu = open => {
      drawer.classList.toggle('is-open', open); $('#menuBtn').setAttribute('aria-expanded', open);
      $('#overlay').classList.toggle('is-on', open); document.documentElement.style.overflow = open ? 'hidden' : '';
    };
    $('#menuBtn').addEventListener('click', () => setMenu(true));
    $('#menuClose').addEventListener('click', () => setMenu(false));
    $$('.dgroup__btn', drawer).forEach(b => b.addEventListener('click', () => {
      const g = b.parentElement, open = !g.classList.contains('is-open');
      g.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
    }));
    $('#overlay').addEventListener('click', () => setMenu(false));

    // carrinho
    $('#cartBtn').addEventListener('click', () => openPanel($('#cart')));
    $('#cartClose').addEventListener('click', closePanels);
    $('#overlay').addEventListener('click', closePanels);
    $('#cartItems').addEventListener('click', e => {
      const q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
      if (q) { const i = cart[+q.dataset.q]; i.q += +q.dataset.d; if (i.q < 1) cart.splice(+q.dataset.q, 1); saveCart(); }
      if (rm) { cart.splice(+rm.dataset.rm, 1); saveCart(); }
    });

    // pesquisa
    $('#searchBtn').addEventListener('click', () => { openPanel($('#search')); setTimeout(() => $('#searchInput').focus(), 300); });
    $('#searchClose').addEventListener('click', closePanels);
    $('#searchInput').addEventListener('input', e => runSearch(e.target.value));
    $$('.search__top [data-q]').forEach(c => c.addEventListener('click', () => { $('#searchInput').value = c.textContent; runSearch(c.dataset.q); }));
    addEventListener('keydown', e => { if (e.key === 'Escape') { closePanels(); closeDd(); setPop(false); $('#drawerNav').classList.remove('is-open'); document.documentElement.style.overflow = ''; } });

    // adicionar rápido a partir dos cartões (delegado)
    document.addEventListener('click', e => {
      const add = e.target.closest('[data-add]');
      if (add) {
        e.preventDefault(); e.stopPropagation();
        const p = byHandle(add.dataset.add);
        const s = p.sizes.find(x => x.s === add.dataset.size);
        if (s && s.ok) addToCart(p.h, s.s);
        else location.href = `produto.html?p=${p.h}&s=${encodeURIComponent(add.dataset.size)}#avise-me`;
        return;
      }
      const demo = e.target.closest('[data-demo]');
      if (demo) {
        e.preventDefault();
        toast(demo.dataset.demo === 'checkout' ? 'Na versão final, este botão segue para o checkout seguro.'
          : demo.dataset.demo === 'moeda' ? 'Os preços noutras moedas ficam disponíveis com a loja online final.'
            : 'Página disponível na versão final do site.');
      }
    });

    // cursor "Ver" sobre imagens de produto
    const cursor = $('#cursor');
    if (finePointer && !reduced) {
      let x = 0, y = 0, cx = 0, cy = 0;
      addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
      (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; cursor.style.translate = `${cx}px ${cy}px`; requestAnimationFrame(loop); })();
      document.addEventListener('mouseover', e => {
        const media = e.target.closest('[data-cursor] .card__media, [data-cursor-media]');
        const quick = e.target.closest('.card__quick');
        cursor.classList.toggle('is-on', !!media && !quick);
        if (media) cursor.textContent = media.closest('[data-cursor-label]')?.dataset.cursorLabel || 'Ver';
      });
    }

    renderCart();
  }

  /* ------------------------------------------------------------------------
     Revelações ao fazer scroll
     ------------------------------------------------------------------------ */
  function bindReveals(root = document) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -10% 0px', threshold: .08 });
    $$('.reveal, .reveal-img, .stagger', root).forEach(el => io.observe(el));
  }

  /* Paralaxe suave em elementos com data-parallax */
  function bindParallax() {
    if (reduced) return;
    const els = $$('[data-parallax]');
    if (!els.length) return;
    const tick = () => {
      const vh = innerHeight;
      els.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${p * -(+el.dataset.parallax || 60)}px, 0)`;
      });
    };
    addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true }); tick();
  }

  /* Carrossel horizontal arrastável */
  function bindRail(rail) {
    const track = $('.rail__track', rail);
    const prev = $('[data-prev]', rail.parentElement), next = $('[data-next]', rail.parentElement);
    const bar = $('.rail__progress i', rail);
    const step = () => track.querySelector(':scope > *')?.getBoundingClientRect().width + 20 || 300;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = track.clientWidth / track.scrollWidth;
      if (bar) { bar.style.width = `${ratio * 100}%`; bar.style.transform = `translateX(${max ? (track.scrollLeft / max) * ((1 - ratio) / ratio) * 100 : 0}%)`; }
      if (prev) prev.disabled = track.scrollLeft < 4;
      if (next) next.disabled = track.scrollLeft > max - 4;
    };
    prev?.addEventListener('click', () => track.scrollBy({ left: -step() * 2, behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step() * 2, behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
    if (!finePointer) return;
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.button) return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 6) { moved = true; track.classList.add('is-dragging'); }
      if (moved) track.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => track.classList.remove('is-dragging'), 0); });
    track.addEventListener('dragstart', e => e.preventDefault());
  }

  /* Formulários de newsletter / aviso */
  function bindForms(root = document) {
    $$('form[data-news]', root).forEach(f => f.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('input[type=email]', f);
      if (!input.checkValidity()) { input.reportValidity(); return; }
      f.closest('[data-news-wrap]').classList.add('is-done');
    }));
  }

  /* ========================================================================
     Cartão de produto (estilo listagem limpa)
     ======================================================================== */
  const isNew = p => p.date >= '2026-01-01';
  function pcard(p, i = 0) {
    const ok = inStock(p);
    const sib = siblings(p);
    const label = !ok ? '<span class="pcard__label out">Esgotado</span>'
      : p.was ? `<span class="pcard__label sale">−${Math.round((1 - p.price / p.was) * 100)}%</span>`
        : isNew(p) ? '<span class="pcard__label new">Novidade</span>' : '';
    const imgs = p.img.slice(0, 4);
    const multi = p.sizes.length > 1;
    const add = !ok
      ? `<button type="button" data-add="${p.h}" data-size="${esc(p.sizes[0].s)}">Avise-me se voltar</button>`
      : multi
        ? `<span>Adicionar</span>${p.sizes.map(s => `<button type="button" class="${s.ok ? '' : 'is-out'}" data-add="${p.h}" data-size="${esc(s.s)}">${esc(s.s)}</button>`).join('')}`
        : `<button type="button" data-add="${p.h}" data-size="${esc(p.sizes[0].s)}">Adicionar ao carrinho</button>`;
    return `
      <article class="pcard" style="animation-delay:${Math.min(i, 12) * 40}ms">
        <a class="pcard__media" href="produto.html?p=${p.h}" aria-label="${esc(p.name)} ${esc(p.color)}">
          ${label}
          ${imgs.map((u, k) => `<img class="${k ? '' : 'is-on'}" src="${img(u, 600)}" srcset="${srcset(u, [400, 600, 900])}" sizes="(max-width: 900px) 50vw, 25vw" alt="" loading="lazy">`).join('')}
          ${imgs.length > 1 ? `<button type="button" class="pcard__nav prev" data-step="-1" aria-label="Imagem anterior">${ICON.left}</button><button type="button" class="pcard__nav next" data-step="1" aria-label="Imagem seguinte">${ICON.right}</button>` : ''}
          <div class="pcard__add">${add}</div>
        </a>
        <div class="pcard__info">
          <a class="pcard__name" href="produto.html?p=${p.h}"><b>${esc(p.name)}</b>${p.color ? ` em ${esc(p.color)}` : ''}</a>
          <div class="pcard__price">${p.was ? `<s>${money(p.was)}</s><span class="sale">${money(p.price)}</span>` : money(p.price)}</div>
        </div>
        ${sib.length > 1 ? `<div class="pcard__sw">${sib.map(s => `<a href="produto.html?p=${s.h}" data-swap="${s.h}" class="${s.h === p.h ? 'is-on' : ''}" style="--c:${swatchOf(s.color)}" title="${esc(s.color)}" aria-label="${esc(s.color)}"></a>`).join('')}</div>` : ''}
      </article>`;
  }

  // ao passar o rato, o cartão mostra outra fotografia da peça
  const showCardImg = (media, n) => {
    const imgs = $$('img', media); if (imgs.length < 2) return;
    imgs.forEach((im, k) => im.classList.toggle('is-on', k === n));
  };
  document.addEventListener('mouseover', e => {
    const m = e.target.closest('.pcard__media');
    if (m && !m.contains(e.relatedTarget)) showCardImg(m, 1);
  });
  document.addEventListener('mouseout', e => {
    const m = e.target.closest('.pcard__media');
    if (m && !m.contains(e.relatedTarget)) showCardImg(m, 0);
  });

  // amostras de cor: trocam o cartão para essa cor sem sair da página
  document.addEventListener('click', e => {
    const a = e.target.closest('.pcard__sw [data-swap]'); if (!a) return;
    e.preventDefault();
    const card = a.closest('.pcard'), p = byHandle(a.dataset.swap);
    if (!p || a.classList.contains('is-on')) return;
    const t = document.createElement('div');
    t.innerHTML = pcard(p).trim();
    const next = t.firstElementChild;
    next.style.animation = 'none';
    card.replaceWith(next);
    $(`[data-swap="${p.h}"]`, next)?.focus({ preventScroll: true });
  });

  // setas de imagem dentro dos cartões
  document.addEventListener('click', e => {
    const b = e.target.closest('.pcard__nav'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const imgs = $$('img', b.closest('.pcard__media'));
    const cur = imgs.findIndex(x => x.classList.contains('is-on'));
    imgs[cur].classList.remove('is-on');
    imgs[(cur + +b.dataset.step + imgs.length) % imgs.length].classList.add('is-on');
  });

  /* ========================================================================
     PÁGINA INICIAL
     ======================================================================== */
  function initHome() {
    document.body.classList.add('has-hero');

    // Banner: uma imagem de cada vez, alternando entre duas
    // TODO(Marta): substituir pelas fotografias da coleção Salvia · Inverno 26/27
    const HERO = ['IMG_3452.heic', 'IMG_3167.heic'];
    const panel = $('.hero__panel');
    panel.insertAdjacentHTML('afterbegin', HERO.map((f, i) => {
      const u = CDN + f;
      return `<div class="hero__slide${i === 0 ? ' is-active' : ''}"><img src="${img(u, 1900)}" srcset="${srcset(u, [700, 1000, 1400, 1900, 2400])}" sizes="(min-width: 901px) 50vw, 100vw" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}></div>`;
    }).join(''));
    let hi = 0;
    if (!reduced) setInterval(() => {
      hi = (hi + 1) % HERO.length;
      $$('.hero__slide', panel).forEach((s, i) => s.classList.toggle('is-active', i === hi));
    }, 6500);

    // Novidades
    const NEW = ['casaco-burel-oversized-auranza-xadrez-colorido', 'vestido-comprido-bambu-essenza-coral', 'casaco-la-oversized-luranza-verde', 'saia-midi-bambu-prenzia-lavanda'];
    $('#newGrid').innerHTML = NEW.map(byHandle).filter(Boolean).map(pcard).join('');

    // Categorias
    const CATS = [
      ['Casacos', 'colecao.html?c=inverno&t=Casaco', 'casaco-burel-oversized-auranza-bordo', 0],
      ['Camisas e blusas', 'colecao.html?c=inverno&t=Blusa', 'blusa-oversized-bambu-essenza-lavanda', 0],
      ['Vestidos', 'colecao.html?c=inverno&t=Vestido', 'vestido-comprido-bambu-essenza-verde', 0],
      ['Tote bags', 'colecao.html?c=malas&t=Tote bag', 'tote-bag-cortica-fragments-gold-caramel', 0]
    ];
    $('#cats').innerHTML = CATS.map(([t, href, h, i]) => { const p = byHandle(h); return `<a class="cat" href="${href}"><span>${t}</span><div class="cat__img"><img src="${img(p.img[i], 700)}" alt="" loading="lazy"></div></a>`; }).join('');


    // Destaque das malas
    const BANNER = [['tote-bag-cortica-fragments-gold', 0], ['mala-pequena-burel-micro-cutie-blue', 0], ['tote-bag-seersucker-rosa-vermelho', 0]];
    $('#bagsBanner').insertAdjacentHTML('afterbegin', BANNER.map(([h, i]) => { const p = byHandle(h); return `<img src="${img(p.img[i], 900)}" srcset="${srcset(p.img[i], [500, 900, 1300])}" sizes="(max-width: 900px) 100vw, 33vw" alt="" loading="lazy">`; }).join(''));

    // Informações relevantes (com imagem, como na Deadly Ponies)
    const PILLARS = [
      ['Feito à mão', 'Todas as peças são feitas à mão em Portugal, com técnicas que reduzem o desperdício.', CDN + 'IMG_1494.heic', 'sobre.html'],
      ['Sustentabilidade', 'Materiais certificados, tecidos deadstock e uma abordagem zero waste.', 'tote-bag-cortica-fragments-gold-caramel:2', 'sobre.html#sustentabilidade'],
      ['Onde nos encontrar', 'Showroom, mercados e concept stores em Lisboa, Porto e Pombal.', CDN + 'IMG_6007_2.jpg', 'lojas.html'],
      ['Portes grátis', 'Envios gratuitos para Portugal continental a partir de 150 €.', CDN + 'DSC_0627.jpg', 'colecao.html?c=todos'],
      ['Trocas e devoluções', '14 dias para trocar ou devolver, com embalagens recicláveis.', CDN + 'Marta_Coelho_Brand.jpg', 'sobre.html#contactos']
    ];
    $('#pillars').innerHTML = PILLARS.map(([t, d, src, href]) => {
      const [h, i] = src.split(':');
      const u = src.startsWith('http') ? src : byHandle(h).img[+i];
      return `<a class="pillar" href="${href}"><div class="pillar__img"><img src="${img(u, 600)}" alt="" loading="lazy"></div><h3>${t}</h3><p>${d}</p></a>`;
    }).join('');

    // Testemunhos (avaliações reais do site atual)
    const REVIEWS = [
      ['Melhor que nas fotos, muito feliz com a minha compra, tecido confortável e não preciso passar a ferro.', 'H.C.S.'],
      ['I love it! Everything as described, beautiful color, comfortable and incredible material. I highly recommend it!', 'Anabela Coelho'],
      ['Ich liebe meine neue Tasche und die Farben darauf sind wunderschön.', 'Mirjana'],
      ['I love my mini cork handbag, it is made excellently and matched the description. Beautifully lined and packaged.', 'Yasmin'],
      ['Amei! São perfeitos e com muita qualidade.', 'Anónimo'],
      ['The actual item is even better than the photos. Beautiful and super strong bag! Thank you, Marta!', 'Momò']
    ];
    const rs = $('#quotes');
    rs.innerHTML = REVIEWS.map((r, i) => `<figure class="quote${i === 0 ? ' is-on' : ''}"><blockquote>“${esc(r[0])}”</blockquote><figcaption>${esc(r[1])}</figcaption></figure>`).join('');
    let ri = 0, rt;
    const showQ = n => {
      const all = $$('.quote', rs);
      all[ri].classList.remove('is-on'); ri = (n + all.length) % all.length; all[ri].classList.add('is-on');
      clearTimeout(rt); if (!reduced) rt = setTimeout(() => showQ(ri + 1), 6500);
    };
    $('#quotePrev').addEventListener('click', () => showQ(ri - 1));
    $('#quoteNext').addEventListener('click', () => showQ(ri + 1));
    showQ(0);

    // Instagram: publicações escolhidas pela Marta, por ordem, da esquerda para a direita.
    // Fotografias e vídeos guardados em assets/img/ig/ (os vídeos só tocam quando estão visíveis)
    const IG = [['Dd35DKtDad0', '1.jpg'], ['DaFlfOfDU5K', '2.jpg'], ['DXsClJ0o91T', '3.mp4'], ['DW_WYsTDZMW', '4.mp4'], ['DM0SGW0NdP8', '5.jpg'], ['DHRkcx6NwVI', '6.mp4']];
    $('#igGrid').innerHTML = IG.map(([post, f]) => {
      const src = 'assets/img/ig/' + f;
      const media = f.endsWith('.mp4') ? `<video src="${src}#t=0.1" muted loop playsinline preload="metadata"></video>` : `<img src="${src}" alt="" loading="lazy">`;
      return `<a href="https://www.instagram.com/p/${post}/" target="_blank" rel="noopener" aria-label="Ver no Instagram">${media}<span>${ICON.ig}</span></a>`;
    }).join('');
    const vio = new IntersectionObserver(es => es.forEach(en => en.isIntersecting && !reduced ? en.target.play().catch(() => {}) : en.target.pause()));
    $$('#igGrid video').forEach(v => vio.observe(v));
  }

  /* ========================================================================
     COLEÇÃO / LOJA
     ======================================================================== */
  function initCollection() {
    const q = new URLSearchParams(location.search);
    const wish = store.get('mc-wish', []);
    const soon = 'Estamos a preparar estas peças. Em breve na loja.';
    const none = () => false;
    const CATS = {
      inverno: { crumb: 'Vestuário', title: 'Coleção Outono–Inverno', desc: 'Casacos em burel da Serra da Estrela e lã, malhas de bambu e viscose EcoVero. Peças largas, quentes e cheias de cor, feitas à mão em Portugal.', f: p => p.collection === 'inverno' },
      malhas: { crumb: 'Vestuário', title: 'Malhas', desc: 'Malhas em bambu, leves, macias e confortáveis, feitas à mão em Portugal.', f: p => p.collection === 'inverno' && p.material === 'Bambu' },
      calcoes: { crumb: 'Vestuário', title: 'Calções', desc: soon, f: none },
      malas: { crumb: 'Acessórios', title: 'Tote bags e bolsas', desc: 'Em cortiça portuguesa, piñatex e burel, com forro em algodão orgânico. Leves, resistentes e feitas à mão, uma a uma.', f: p => p.collection === 'malas' },
      vichy: { crumb: 'Acessórios', title: 'Tote bags em vichy e xadrez', desc: 'Tote bags em tecido aos quadrados, leves e alegres, com espaço para tudo o que precisa no dia a dia.', f: p => p.line === 'Seersucker' },
      fazenda: { crumb: 'Acessórios', title: 'Tote bags em fazenda', desc: soon, f: none },
      cortica: { crumb: 'Acessórios', title: 'Tote bags em cortiça portuguesa', desc: 'Tote bags em tecido de cortiça portuguesa, com forro em algodão orgânico.', f: p => p.type === 'Tote bag' && p.material === 'Cortiça' },
      bolsas: { crumb: 'Acessórios', title: 'Bolsas em vichy', desc: soon, f: none },
      'mini-bolsas': { crumb: 'Acessórios', title: 'Mini bolsas em vichy', desc: soon, f: none },
      lencos: { crumb: 'Acessórios', title: 'Lenços em croché', desc: soon, f: none },
      chapeus: { crumb: 'Acessórios', title: 'Chapéus em croché', desc: soon, f: none },
      promo: { crumb: 'Loja', title: 'Preços especiais', desc: 'Peças com preço especial, enquanto houver stock.', f: p => !!p.was },
      favoritos: { crumb: 'Loja', title: 'Favoritos', desc: 'As peças que guardou. Toque no coração de uma peça para a juntar aqui.', f: p => wish.includes(p.h) },
      todos: { crumb: 'Loja', title: 'Toda a loja', desc: 'Vestuário e malas, desenhados por Marta Coelho e feitos à mão em Portugal.', f: () => true }
    };
    const c = CATS[q.get('c')] ? q.get('c') : 'inverno';
    const META = CATS[c];
    const TYPE_LABEL = { Casaco: 'Casacos e blazers', Vestido: 'Vestidos', Blusa: 'Camisas e blusas', Saia: 'Saias', 'Calças': 'Calças', 'Tote bag': 'Tote bags', Mala: 'Micro bags' };
    const typeOf = p => /Blusa|Camisa/.test(p.type) ? 'Blusa' : p.type;
    document.body.dataset.page = META.crumb === 'Acessórios' ? 'malas' : 'colecao';
    document.title = `${META.title} | Marta Coelho`;

    const base = PRODUCTS.filter(META.f);
    const state = { sort: 'feat', t: new Set(q.get('t') ? [q.get('t')] : []), l: new Set(q.get('l') ? [q.get('l')] : []), col: new Set(), stock: false };
    const heading = () => state.t.size === 1 && !state.l.size ? TYPE_LABEL[[...state.t][0]] : state.l.size === 1 && !state.t.size ? `Linha ${[...state.l][0]}` : META.title;

    // gaveta de filtros
    const count = (fn) => base.filter(fn).length;
    const types = [...new Set(base.map(typeOf))];
    const lines = [...new Set(base.map(p => p.line).filter(Boolean))].filter(() => META.crumb !== 'Acessórios');
    const colors = [...new Set(base.map(p => p.color).filter(x => x && SWATCH[x.toLowerCase()]))];
    const box = (name, v, label, n, extra = '') => `<label class="check"><input type="checkbox" name="${name}" value="${esc(v)}">${extra}${label}<small>${n}</small></label>`;
    $('#filtersForm').innerHTML = `
      <fieldset><legend>Ordenar por</legend><div>
        ${[['feat', 'Em destaque'], ['new', 'Mais recentes'], ['asc', 'Preço: mais baixo'], ['desc', 'Preço: mais alto']].map(([v, l]) => `<label class="check"><input type="radio" name="sort" value="${v}"${v === 'feat' ? ' checked' : ''}>${l}</label>`).join('')}
      </div></fieldset>
      <fieldset><legend>Tipo de peça</legend><div>${types.map(t => box('t', t, TYPE_LABEL[t] || t, count(p => typeOf(p) === t))).join('')}</div></fieldset>
      ${lines.length ? `<fieldset><legend>Linha</legend><div class="cols">${lines.map(l => box('l', l, l, count(p => p.line === l))).join('')}</div></fieldset>` : ''}
      ${colors.length > 1 ? `<fieldset><legend>Cor</legend><div class="cols">${colors.map(x => box('col', x, x, count(p => p.color === x), `<i style="--c:${swatchOf(x)}"></i>`)).join('')}</div></fieldset>` : ''}
      <fieldset><legend>Disponibilidade</legend><div>${box('stock', '1', 'Pronto a enviar', count(inStock))}</div></fieldset>`;
    const form = $('#filtersForm');
    const syncForm = () => $$('input', form).forEach(i => {
      i.checked = i.name === 'sort' ? i.value === state.sort : i.name === 'stock' ? state.stock : state[i.name].has(i.value);
    });
    const readForm = () => {
      state.sort = form.sort.value;
      ['t', 'l', 'col'].forEach(k => { state[k] = new Set($$(`input[name="${k}"]:checked`, form).map(i => i.value)); });
      state.stock = !!$('input[name="stock"]', form)?.checked;
    };
    const drawer = $('#filters');
    const openF = () => { syncForm(); drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); $('#overlay').classList.add('is-on'); document.documentElement.style.overflow = 'hidden'; };
    const closeF = () => { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); $('#overlay').classList.remove('is-on'); document.documentElement.style.overflow = ''; };
    $('#filterBtn').addEventListener('click', openF);
    $('#filtersClose').addEventListener('click', closeF);
    $('#overlay').addEventListener('click', closeF);
    $('#filtersApply').addEventListener('click', () => { readForm(); render(); closeF(); });
    $('#filtersClear').addEventListener('click', () => { state.sort = 'feat'; state.t.clear(); state.l.clear(); state.col.clear(); state.stock = false; syncForm(); render(); closeF(); });

    function render() {
      let list = base.filter(p => (!state.t.size || state.t.has(typeOf(p))) && (!state.l.size || state.l.has(p.line)) && (!state.col.size || state.col.has(p.color)) && (!state.stock || inStock(p)));
      const sorters = { asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price, new: (a, b) => b.date.localeCompare(a.date), feat: (a, b) => inStock(b) - inStock(a) };
      list = [...list].sort(sorters[state.sort]);
      const active = state.t.size + state.l.size + state.col.size + (state.stock ? 1 : 0);
      $('#filterCount').textContent = active; $('#filterCount').classList.toggle('on', active > 0);
      $('#plpTitle').textContent = heading();
      $('#plpDesc').textContent = META.desc;
      $('#crumbs').innerHTML = `<a href="index.html">Início</a><span>${META.crumb}</span>${heading() !== META.title ? `<span>${esc(heading())}</span>` : ''}`;
      const cards = list.map(pcard);
      // imagem editorial ocupa duas colunas, como nas referências
      const e = { malas: ['tote-bag-cortica-pure-burgundy', 1, 'Cortiça portuguesa', 'colecao.html?c=cortica'], inverno: ['casaco-burel-oversized-auranza-xadrez-colorido', 5, 'Casacos em burel', 'colecao.html?c=inverno&t=Casaco'] }[c];
      if (e && !active && cards.length > 8) {
        const p = byHandle(e[0]);
        cards.splice(4, 0, `<a class="plp__edit" href="${e[3]}"><img src="${img(p.img[e[1]], 1400)}" srcset="${srcset(p.img[e[1]], [700, 1000, 1400])}" sizes="(max-width: 900px) 100vw, 50vw" alt="" loading="lazy"><span>${e[2]}</span></a>`);
      }
      const empty = !base.length ? (c === 'favoritos' ? 'Ainda não guardou nenhuma peça nos favoritos.' : 'Em breve: estamos a preparar estas peças.') : 'Não há peças com estes filtros.';
      $('#grid').innerHTML = cards.length ? cards.join('') : `<p class="grid-empty">${empty}</p>`;
    }
    render();
  }

  /* ========================================================================
     PRODUTO
     ======================================================================== */
  function initProduct() {
    const q = new URLSearchParams(location.search);
    const p = byHandle(q.get('p')) || PRODUCTS[0];
    document.title = `${p.name} ${p.color ? '| ' + p.color : ''} | Marta Coelho`;
    const isBag = p.collection === 'malas';
    const sib = siblings(p);
    const firstOk = p.sizes.find(s => s.ok);
    const wanted = p.sizes.find(s => s.s === q.get('s'));
    let size = wanted || (p.sizes.length === 1 ? p.sizes[0] : firstOk || p.sizes[0]);

    $('#pdpCrumbs').innerHTML = `<a href="index.html">Início</a><span><a href="colecao.html?c=${p.collection}">${isBag ? 'Malas' : 'Salvia · Inverno 26/27'}</a></span><span>${esc(p.name)}</span>`;

    // Galeria
    const gal = $('#gallery');
    // Imagem principal com miniaturas por baixo
    gal.innerHTML = `<figure class="pdp__main"><img src="${img(p.img[0], 1400)}" srcset="${srcset(p.img[0], [600, 900, 1300, 1800])}" sizes="(max-width: 900px) 100vw, 60vw" alt="${esc(p.name)} ${esc(p.color)}" fetchpriority="high"></figure>`
      + (p.img.length > 1 ? `<div class="pdp__thumbs">${p.img.map((u, i) => `<button class="${i ? '' : 'is-active'}" data-i="${i}" aria-label="Ver imagem ${i + 1}"><img src="${img(u, 240)}" alt="" loading="lazy"></button>`).join('')}</div>` : '');
    const main = $('.pdp__main', gal), mainImg = $('img', main);
    let gi = 0;
    const showImg = i => {
      gi = (i + p.img.length) % p.img.length;
      mainImg.src = img(p.img[gi], 1400); mainImg.srcset = srcset(p.img[gi], [600, 900, 1300, 1800]);
      $$('.pdp__thumbs button', gal).forEach((t, k) => t.classList.toggle('is-active', k === gi));
    };
    gal.addEventListener('click', e => { const t = e.target.closest('.pdp__thumbs button'); if (t) showImg(+t.dataset.i); });
    // deslizar o dedo para mudar de imagem (telemóvel)
    let tx = null;
    main.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    main.addEventListener('touchend', e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(dx) > 40) showImg(gi + (dx < 0 ? 1 : -1)); });
    // zoom ao passar o rato + lightbox
    if (finePointer) {
      main.addEventListener('mousemove', e => { const r = main.getBoundingClientRect(); mainImg.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; });
      main.addEventListener('mouseenter', () => main.classList.add('is-zoom'));
      main.addEventListener('mouseleave', () => main.classList.remove('is-zoom'));
    }
    const lb = $('#lightbox'); let li = 0;
    const showLb = i => { li = (i + p.img.length) % p.img.length; $('img', lb).src = img(p.img[li], 2000); };
    main.addEventListener('click', () => { if (!finePointer) return; showLb(gi); lb.classList.add('is-on'); });
    $('.lightbox__close', lb).addEventListener('click', () => lb.classList.remove('is-on'));
    $('.lightbox__nav.prev', lb).addEventListener('click', () => showLb(li - 1));
    $('.lightbox__nav.next', lb).addEventListener('click', () => showLb(li + 1));
    addEventListener('keydown', e => { if (!lb.classList.contains('is-on')) return; if (e.key === 'Escape') lb.classList.remove('is-on'); if (e.key === 'ArrowLeft') showLb(li - 1); if (e.key === 'ArrowRight') showLb(li + 1); });

    // Informação
    $('#pdpLine').innerHTML = `<span class="tag tag--new">${isBag ? esc(p.material) : 'Salvia · Inverno 26/27'}</span>${p.line && !isBag ? `<span class="eyebrow">Linha ${esc(p.line)}</span>` : ''}`;
    $('#pdpName').textContent = p.name;
    $('#pdpColor').textContent = p.color || p.material;
    $('#pdpPrice').innerHTML = p.was ? `<span class="sale">${money(p.price)}</span><s>${money(p.was)}</s>` : money(p.price);
    $('#pdpIntro').textContent = p.intro;

    if (sib.length > 1) {
      $('#colorways').innerHTML = `<div class="pdp__label">Cor <span>${esc(p.color)}</span></div><div class="colorways">${sib.map(s => `<a class="colorway${s.h === p.h ? ' is-active' : ''}" href="produto.html?p=${s.h}" title="${esc(s.color)}${inStock(s) ? '' : ' (esgotado)'}"><img src="${img(s.img[0], 160)}" alt="${esc(s.color)}"></a>`).join('')}</div>`;
    }

    const renderSizes = () => {
      const multi = p.sizes.length > 1;
      $('#sizes').innerHTML = multi ? `<div class="pdp__label">Tamanho <button type="button" data-open-acc="1">Guia de tamanhos</button></div><div class="sizes">${p.sizes.map(s => `<button type="button" class="size${s.ok ? '' : ' is-out'}${s === size ? ' is-active' : ''}" data-s="${esc(s.s)}">${esc(s.s)}</button>`).join('')}</div>` : '';
      const ok = size.ok;
      $('#stock').className = 'stock' + (ok ? '' : ' is-out');
      $('#stock').innerHTML = ok
        ? '<i></i>Pronto a enviar <small>· Envio em 1 a 3 dias úteis</small>'
        : '<i></i>Edição esgotada <small>· Podemos avisá-la se voltar</small>';
      $('#notify').classList.toggle('is-on', !ok);
      $('#notifySize').textContent = multi ? ` no tamanho ${size.s}` : '';
      $('#addBtn').style.display = ok ? '' : 'none';
      const sbBtn = $('#stickyBuy .btn'); if (sbBtn) sbBtn.textContent = ok ? 'Adicionar' : 'Avise-me';
    };
    $('#sizes').addEventListener('click', e => {
      const b = e.target.closest('.size'); if (b) { size = p.sizes.find(s => s.s === b.dataset.s); renderSizes(); }
      if (e.target.closest('[data-open-acc]')) openAcc(1, true);
    });
    renderSizes();

    $('#addBtn').addEventListener('click', () => addToCart(p.h, size.s));
    $('#notify form').addEventListener('submit', e => {
      e.preventDefault();
      const input = $('#notify input');
      if (!input.checkValidity()) { input.reportValidity(); return; }
      const subs = store.get('mc-notify', []); subs.push({ h: p.h, s: size.s, e: input.value }); store.set('mc-notify', subs);
      $('#notify').classList.add('is-done');
      $('#notify p').innerHTML = `<b>Combinado!</b> Enviamos um e-mail para ${esc(input.value)} assim que ${esc(p.name)}${p.sizes.length > 1 ? ' (' + esc(size.s) + ')' : ''} voltar a estar disponível.`;
    });
    const wish = $('#wish');
    let wl = store.get('mc-wish', []);
    wish.classList.toggle('is-on', wl.includes(p.h));
    wish.addEventListener('click', () => {
      wl = wl.includes(p.h) ? wl.filter(x => x !== p.h) : [...wl, p.h]; store.set('mc-wish', wl);
      wish.classList.toggle('is-on', wl.includes(p.h)); toast(wl.includes(p.h) ? 'Guardado nos favoritos' : 'Removido dos favoritos');
    });

    // Separadores expansíveis: Detalhes, Guia de Tamanhos, Entregas, Trocas e Devoluções
    const details = `
      <dl>
        ${p.details ? `<dt>Detalhes</dt><dd>${esc(p.details)}</dd>` : ''}
        <dt>Composição</dt><dd>${esc(p.comp || (p.material === 'Cortiça' ? 'Tecido de cortiça portuguesa · Forro em algodão orgânico' : p.material === 'Burel' ? 'Burel, lã de ovelha Bordaleira da Serra da Estrela · Forro em algodão orgânico' : p.material === 'Piñatex' ? 'Piñatex, fibra de folha de ananás · Forro em algodão orgânico' : p.material))}</dd>
        ${p.colorNote ? `<dt>Cor</dt><dd>${esc(p.colorNote)}</dd>` : ''}
        ${p.measures ? `<dt>Medidas</dt><dd>${esc(p.measures)}</dd>` : ''}
        <dt>Produção</dt><dd>Feito à mão em Portugal, em unidades limitadas</dd>
      </dl>
      ${p.care ? `<p><b>Cuidados</b></p><img class="care" src="${p.care}" alt="Instruções de lavagem" loading="lazy">` : ''}`;
    // TODO(Marta): confirmar as medidas reais de cada tamanho antes de publicar
    const sizeGuide = isBag
      ? `<p>As malas têm tamanho único.</p>${p.measures ? `<dl><dt>Medidas</dt><dd>${esc(p.measures)}</dd></dl>` : ''}<p>Medidas aproximadas, por serem peças feitas à mão.</p>`
      : `<p>As nossas peças têm um corte largo (oversized), pensado para vestir vários tamanhos com conforto.</p>
        <table class="size-table">
          <thead><tr><th>Tamanho</th><th>Corresponde a</th><th>Busto</th><th>Anca</th></tr></thead>
          <tbody>
            <tr><td>S/M</td><td>XS · S · M (34–40)</td><td>80–96 cm</td><td>88–104 cm</td></tr>
            <tr><td>L/XL</td><td>L · XL (42–46)</td><td>96–112 cm</td><td>104–120 cm</td></tr>
          </tbody>
        </table>
        <p>Tem dúvidas sobre o tamanho? Fale connosco por <a href="mailto:customercare@martacoelho.com"><u>customercare@martacoelho.com</u></a> ou no Instagram <a href="https://www.instagram.com/bymartacoelho/" target="_blank" rel="noopener"><u>@bymartacoelho</u></a>.</p>`;
    const shipping = `
      <p>Peças em stock são enviadas <b>1 a 3 dias</b> depois da compra. Se não estiver em stock, contamos com cerca de 2 semanas de produção antes do envio: produzimos apenas o necessário, para ter menos desperdício.</p>
      <dl>
        <dt>Portugal continental</dt><dd>5 € ao domicílio · 4,50 € num ponto Pick Up · <b>grátis a partir de 150 €</b></dd>
        <dt>Madeira e Açores</dt><dd>11 €</dd>
        <dt>Espanha</dt><dd>7,50 € · grátis a partir de 150 €</dd>
        <dt>Europa</dt><dd>15,50 € a 16,50 €</dd>
        <dt>Estados Unidos</dt><dd>25 € a 97 €, com taxas alfandegárias incluídas</dd>
      </dl>
      <p>Enviamos por CTT, com código de seguimento. As embalagens são recicláveis, reutilizáveis e biodegradáveis.</p>`;
    const returns = `
      <p>Tem <b>14 dias</b>, a contar do dia em que recebe a encomenda, para desistir da compra sem indicar o motivo. Escreva-nos para <a href="mailto:customercare@martacoelho.com"><u>customercare@martacoelho.com</u></a> com o número da encomenda e as peças que quer devolver.</p>
      <p>Pedimos que devolva as peças sem uso, sem lavagens e com as etiquetas. Os portes de devolução ficam a cargo do cliente, exceto se o erro for nosso (peça errada ou com defeito).</p>
      <p>Para uma troca, a forma mais rápida de garantir a peça que quer é devolver a que tem e fazer uma nova compra.</p>`;
    const ACC = [['Detalhes', details], ['Guia de tamanhos', sizeGuide], ['Entregas', shipping], ['Trocas e devoluções', returns]];
    $('#acc').innerHTML = ACC.map(([t, b], i) => `<div class="acc__item${i === 0 ? ' is-open' : ''}"><button class="acc__btn" aria-expanded="${i === 0}" aria-controls="acc-${i}">${t}<i></i></button><div class="acc__panel" id="acc-${i}" role="region"><div class="acc__inner"><div>${b}</div></div></div></div>`).join('');
    function openAcc(i, scroll) {
      $$('.acc__item').forEach((it, k) => { const on = k === i ? !it.classList.contains('is-open') || scroll : it.classList.contains('is-open'); it.classList.toggle('is-open', on); $('.acc__btn', it).setAttribute('aria-expanded', on); });
      if (scroll) $$('.acc__item')[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    $$('.acc__btn').forEach((b, i) => b.addEventListener('click', () => openAcc(i)));

    // Complete o look
    const others = PRODUCTS.filter(x => x.collection === p.collection && x.name !== p.name && inStock(x));
    const seen = new Set(); const rel = others.filter(x => !seen.has(x.name) && seen.add(x.name)).slice(0, 4);
    $('#relGrid').innerHTML = rel.map(pcard).join('');

    // barra de compra fixa (telemóvel)
    const sb = $('#stickyBuy');
    sb.innerHTML = `<img src="${img(p.img[0], 120)}" alt=""><div>${esc(p.name)}<span>${esc(p.color || p.material)} · ${money(p.price)}</span></div><button class="btn">Adicionar</button>`;
    renderSizes();
    $('.btn', sb).addEventListener('click', () => { if (size.ok) addToCart(p.h, size.s); else { $('#notify').scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => $('#notify input').focus(), 500); } });
    new IntersectionObserver(([en]) => sb.classList.toggle('is-on', !en.isIntersecting && en.boundingClientRect.top < 0)).observe($('.pdp__buy'));

    // painel fixo: se for mais alto que o ecrã, fixa pelo fundo para que tudo seja alcançável
    const info = $('.pdp__info');
    const fitSticky = () => {
      if (innerWidth <= 900) { info.style.top = ''; return; }
      const head = $('#header .header__bar').offsetHeight + 20;
      info.style.top = Math.min(head, innerHeight - info.offsetHeight - 20) + 'px';
    };
    addEventListener('resize', fitSticky);
    new ResizeObserver(fitSticky).observe(info);

    if (location.hash === '#avise-me') setTimeout(() => { $('#notify').scrollIntoView({ behavior: 'smooth', block: 'center' }); $('#notify input').focus({ preventScroll: true }); }, 600);
  }

  /* ========================================================================
     LOJAS
     ======================================================================== */
  function initStores() {
    // TODO(Marta): substituir as imagens pelas fotografias de cada loja
    const STORES = [
      { id: 'showroom', city: 'Pombal', name: 'Showroom MARTA COELHO', type: 'Atendimento por marcação', addr: ['Rua Santa Luzia Nr 22', 'Escritório 2.20', '3100-483 Pombal'], map: 'Rua de Santa Luzia 22, 3100-483 Pombal', desc: 'Showroom da marca MARTA COELHO, dedicado ao desenvolvimento das suas criações e do design de autor. Um espaço de proximidade, com atendimento personalizado mediante marcação prévia.', hours: 'Atendimento por marcação', mail: 'customercare@martacoelho.com', img: ['casaco-la-oversized-luranza-verde', 1] },
      { id: 'lx-factory', city: 'Lisboa', name: 'Lx Factory', type: 'Mercado', addr: ['Rua Rodrigues Faria 103', '1300-501 Lisboa'], desc: 'Num espaço criativo, a LX Factory reúne marcas independentes, design de autor e projetos únicos. A marca MARTA COELHO está presente todos os domingos.', hours: 'Todos os domingos, das 10h às 18h', img: ['casaco-burel-oversized-auranza-xadrez-colorido', 1] },
      { id: 'scar-id', city: 'Porto', name: 'SCAR-ID', type: 'Design and Art Store Gallery', addr: ['Rua do Rosário, 253', '4050-124 Porto'], desc: 'Na zona das galerias de arte do Porto, perto da Rua de Miguel Bombarda. Loja e galeria dedicada ao design de autor português.', img: ['saia-midi-bambu-prenzia-lavanda', 1] },
      { id: 'adora', city: 'Pombal', name: 'Adora Concept Store', type: 'Concept store', addr: ['Rua Dr. Luís Torres, 9', '3100-464 Pombal'], map: 'Rua Doutor Luís Torres 9, 3100-464 Pombal', desc: 'Na terra natal da Marta. Uma concept store com peças escolhidas a dedo e um carinho especial pela marca.', img: ['casaco-burel-oversized-auranza-bordo', 1] }
    ];
    const cities = [...new Set(STORES.map(s => s.city))];
    $('#storeFilter').innerHTML = `<button class="chip is-active" data-c="">Todas (${STORES.length})</button>` + cities.map(c => `<button class="chip" data-c="${c}">${c}</button>`).join('');
    $('#storeList').innerHTML = STORES.map((s, i) => {
      const q = encodeURIComponent(s.map || `${s.name} ${s.addr.join(', ')}`);
      const p = byHandle(s.img[0]);
      return `<article class="store reveal" id="${s.id}" data-city="${s.city}">
        <div class="store__img"><img src="${img(p.img[s.img[1]], 1000)}" alt="${esc(s.name)}" loading="lazy"><span class="store__city">${s.city}</span></div>
        <div class="store__info">
          <h2>${esc(s.name)}</h2>
          <span class="store__type">${esc(s.type)}</span>
          ${s.desc ? `<p>${esc(s.desc)}</p>` : ''}
          <ul class="store__meta">
            <li>${ICON.pin}<span>${s.addr.map(esc).join('<br>')}</span></li>
            <li>${ICON.clock}<span>${esc(s.hours || 'Consulte o horário da loja no Google Maps')}</span></li>
            ${s.mail ? `<li>${ICON.mail}<a href="mailto:${s.mail}"><u>${s.mail}</u></a></li>` : ''}
          </ul>
          <div class="store__actions">
            <a class="btn btn--orange" href="https://www.google.com/maps/dir/?api=1&destination=${q}" target="_blank" rel="noopener">Como chegar</a>
            <a class="link" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Abrir no mapa</a>
          </div>
        </div>
        <div class="store__map" data-q="${q}">
          <div class="store__map-load">${ICON.pin}<div><b>${esc(s.addr[s.addr.length - 1])}</b><br><small>A carregar mapa…</small></div></div>
        </div>
      </article>`;
    }).join('');
    // os mapas só carregam quando ficam visíveis
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      const m = en.target; io.unobserve(m);
      m.insertAdjacentHTML('beforeend', `<iframe title="Mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${m.dataset.q}&z=16&output=embed"></iframe>`);
    }), { rootMargin: '300px' });
    $$('.store__map').forEach(m => io.observe(m));
    $('#storeFilter').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('#storeFilter .chip').forEach(c => c.classList.toggle('is-active', c === b));
      $$('.store').forEach(s => { s.hidden = !!b.dataset.c && s.dataset.city !== b.dataset.c; });
    });
    // as lojas são criadas aqui, por isso o salto para #lx-factory (vindo do menu) faz-se à mão
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => target.scrollIntoView({ block: 'start' }), 100);
  }

  /* ========================================================================
     SOBRE
     ======================================================================== */
  function initAbout() {
    const set = (sel, h, i, w = 1200) => { const el = $(sel); const p = byHandle(h); if (el && p) { el.src = img(p.img[i], w); el.srcset = srcset(p.img[i], [600, 900, 1300]); } };
    // TODO(Marta): substituir pela nova imagem da história
    set('#storyImg', 'blusa-oversized-bambu-essenza-branco', 1, 900);
    const tl = $('.timeline'), tt = $('.timeline__track');
    bindRail(tl);
    // esconde o esbatimento da direita quando se chega ao fim do percurso
    const tlEnd = () => tl.classList.toggle('is-end', tt.scrollLeft >= tt.scrollWidth - tt.clientWidth - 4);
    tt.addEventListener('scroll', tlEnd, { passive: true }); addEventListener('resize', tlEnd); tlEnd();
  }

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */
  renderChrome();
  bindChrome();
  ({ home: initHome, colecao: initCollection, produto: initProduct, lojas: initStores, sobre: initAbout }[page] || (() => {}))();
  bindReveals();
  bindParallax();
  bindForms();
  if (I18N) I18N.start();

  requestAnimationFrame(() => document.body.classList.add('is-loaded'));
})();
