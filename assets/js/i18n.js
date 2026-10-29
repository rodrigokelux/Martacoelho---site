/* ==========================================================================
   Marta Coelho — versão em inglês
   Dicionário PT → EN aplicado a todos os textos da página (incluindo os que
   os scripts criam depois) e tradução dos dados dos produtos.
   Para traduzir um texto novo, basta acrescentá-lo ao dicionário D.
   ========================================================================== */
window.MC_I18N = (() => {
  'use strict';

  const norm = s => s.replace(/\s+/g, ' ').trim();

  // Textos fixos (a chave é o texto em português, sem espaços a mais)
  const D = {
    // Geral
    'Início': 'Home', 'Fechar': 'Close', 'Anterior': 'Previous', 'Seguinte': 'Next', 'Ver': 'View',
    'Navegação estrutural': 'Breadcrumb', 'Principal': 'Main', 'Menu móvel': 'Mobile menu',
    'Coleção': 'Collection', 'Produto': 'Product', 'Sobre nós': 'About us',
    'Marta Coelho | Moda sustentável feita à mão em Portugal': 'Marta Coelho | Sustainable fashion handmade in Portugal',

    // Pesquisa e carrinho
    'Pesquisa': 'Search', 'O que procura?': 'What are you looking for?', 'Pesquisar produtos': 'Search products', 'Fechar pesquisa': 'Close search',
    'Carrinho': 'Cart', 'Fechar carrinho': 'Close cart',
    'Faltam': 'You are', 'para ter portes grátis em Portugal': 'away from free shipping in Portugal',
    'Parabéns!': 'Congratulations!', 'Tem portes grátis para Portugal 🧡': 'You have free shipping to Portugal 🧡',
    'O carrinho está vazio': 'Your cart is empty', 'Que tal espreitar a nova coleção de inverno?': 'Why not take a look at the new winter collection?',
    'Ver coleção': 'View collection', 'Menos': 'Decrease', 'Mais': 'Increase', 'Remover': 'Remove', 'Subtotal': 'Subtotal',
    'Finalizar compra': 'Checkout',
    'Impostos incluídos. Portes calculados no checkout. Pagamento com MB WAY, Multibanco, cartão ou PayPal.': 'Taxes included. Shipping calculated at checkout. Pay with MB WAY, Multibanco, card or PayPal.',
    'Na versão final, este botão segue para o checkout seguro.': 'In the final version, this button takes you to the secure checkout.',
    'Os preços noutras moedas ficam disponíveis com a loja online final.': 'Prices in other currencies will be available with the final online shop.',
    'Página disponível na versão final do site.': 'Page available in the final version of the website.',
    'Guardado nos favoritos': 'Saved to your wishlist', 'Removido dos favoritos': 'Removed from your wishlist',

    // Cartões de produto
    'Edição esgotada': 'Sold out', 'Esgotado': 'Sold out', 'Pronto a enviar': 'Ready to ship', 'Novo': 'New',
    'Adicionar rápido': 'Quick add', 'Avise-me se voltar': 'Notify me when it is back', 'Esgotado: avise-me': 'Sold out: notify me',
    'Adicionar': 'Add', 'Adicionar ao carrinho': 'Add to cart', 'Imagem anterior': 'Previous image', 'Imagem seguinte': 'Next image',
    'Único': 'One size',

    // Rodapé
    'Subscreva a newsletter e receba 10% de desconto na primeira encomenda': 'Subscribe to our newsletter and get 10% off your first order',
    'Nome': 'First name', 'Apelido': 'Last name', 'E-mail': 'Email', 'Subscrever': 'Subscribe',
    'Obrigada! Verifique o seu e-mail 🧡': 'Thank you! Please check your email 🧡',
    'Loja': 'Shop', 'Inverno 25/26': 'Winter 25/26', 'Vestuário': 'Garments', 'Malas': 'Bags', 'Cartão-presente': 'Gift card',
    'Preços especiais': 'Special prices', 'Sobre': 'About', 'Sustentabilidade': 'Sustainability', 'Mercados e lojas': 'Markets and stores',
    'Apoio ao cliente': 'Customer care', 'Envios e entregas': 'Shipping and delivery', 'Trocas e devoluções': 'Exchanges and returns',
    'Guia de tamanhos': 'Size guide', 'Perguntas frequentes': 'FAQ', 'Contactos': 'Contacts',
    'Marca, parcerias e imprensa': 'Brand, partnerships and press', 'Termos e condições': 'Terms and conditions',
    'Privacidade': 'Privacy', 'Livro de Reclamações': 'Complaints Book', 'Métodos de pagamento': 'Payment methods',

    // Página inicial
    'Coleção Outono/Inverno 25/26': 'Autumn/Winter Collection 25/26', 'Compre agora': 'Shop now',
    'MARTA COELHO é uma marca portuguesa de moda de autor com peças únicas e unidades limitadas.': 'MARTA COELHO is a Portuguese designer fashion brand with unique pieces made in limited quantities.',
    'Linho, algodão, algodão orgânico, bambu, lyocell, cortiça portuguesa e burel são alguns dos materiais utilizados na criação das peças.': 'Linen, cotton, organic cotton, bamboo, lyocell, Portuguese cork and burel are some of the materials used to create our pieces.',
    'Todas as peças são feitas à mão em Portugal': 'All pieces are handmade in Portugal',
    'A nossa história': 'Our story', 'Novidades': 'New in', 'Ver tudo': 'View all',
    'Tote bags e bolsas': 'Tote bags and pouches', 'Ver malas': 'Shop bags',
    'Categorias': 'Categories', 'Informações': 'Information', 'Testemunhos': 'Testimonials',
    'O que dizem as clientes': 'What our customers say', 'Em destaque no Instagram': 'Featured on Instagram', 'Ver no Instagram': 'View on Instagram',
    'Casacos': 'Coats', 'Vestidos': 'Dresses',
    'Feito à mão': 'Handmade',
    'Todas as peças são feitas à mão em Portugal, com técnicas que reduzem o desperdício.': 'Every piece is handmade in Portugal, using techniques that reduce waste.',
    'Materiais certificados, tecidos deadstock e uma abordagem zero waste.': 'Certified materials, deadstock fabrics and a zero waste approach.',
    'Onde nos encontrar': 'Where to find us',
    'Showroom, mercados e concept stores em Lisboa, Porto e Pombal.': 'Showroom, markets and concept stores in Lisbon, Porto and Pombal.',
    'Portes grátis': 'Free shipping',
    'Envios gratuitos para Portugal continental a partir de 150 €.': 'Free shipping to mainland Portugal on orders over €150.',
    '14 dias para trocar ou devolver, com embalagens recicláveis.': '14 days to exchange or return, with recyclable packaging.',
    '“Melhor que nas fotos, muito feliz com a minha compra, tecido confortável e não preciso passar a ferro.”': '“Even better than in the photos, very happy with my purchase, comfortable fabric and no ironing needed.”',
    '“Ich liebe meine neue Tasche und die Farben darauf sind wunderschön.”': '“I love my new bag and its colours are beautiful.”',
    '“Amei! São perfeitos e com muita qualidade.”': '“Loved it! They are perfect and very high quality.”',
    'Anónimo': 'Anonymous',

    // Coleção
    'Filtrar': 'Filter', 'Filtros': 'Filters', 'Fechar ✕': 'Close ✕', 'Ver peças': 'Show pieces', 'Limpar': 'Clear',
    'Ordenar por': 'Sort by', 'Em destaque': 'Featured', 'Mais recentes': 'Newest', 'Preço: mais baixo': 'Price: low to high', 'Preço: mais alto': 'Price: high to low',
    'Tipo de peça': 'Type', 'Linha': 'Line', 'Cor': 'Colour', 'Disponibilidade': 'Availability',
    'Acessórios': 'Accessories', 'Coleção Outono–Inverno': 'Autumn–Winter Collection',
    'Casacos em burel da Serra da Estrela e lã, malhas de bambu e viscose EcoVero. Peças largas, quentes e cheias de cor, feitas à mão em Portugal.': 'Coats in Serra da Estrela burel and wool, bamboo knitwear and EcoVero viscose. Loose, warm and colourful pieces, handmade in Portugal.',
    'Malhas': 'Knitwear', 'Malhas em bambu, leves, macias e confortáveis, feitas à mão em Portugal.': 'Bamboo knitwear: light, soft and comfortable, handmade in Portugal.',
    'Calções': 'Shorts',
    'Em cortiça portuguesa, piñatex e burel, com forro em algodão orgânico. Leves, resistentes e feitas à mão, uma a uma.': 'In Portuguese cork, Piñatex and burel, lined with organic cotton. Light, durable and handmade, one by one.',
    'Tote bags em vichy e xadrez': 'Gingham and check tote bags',
    'Tote bags em tecido aos quadrados, leves e alegres, com espaço para tudo o que precisa no dia a dia.': 'Checked fabric tote bags, light and cheerful, with room for everything you need every day.',
    'Tote bags em fazenda': 'Wool cloth tote bags', 'Tote bags em cortiça portuguesa': 'Portuguese cork tote bags',
    'Tote bags em tecido de cortiça portuguesa, com forro em algodão orgânico.': 'Tote bags in Portuguese cork fabric, lined with organic cotton.',
    'Bolsas em vichy': 'Gingham pouches', 'Mini bolsas em vichy': 'Mini gingham pouches',
    'Lenços em croché': 'Crochet scarves', 'Chapéus em croché': 'Crochet hats',
    'Estamos a preparar estas peças. Em breve na loja.': 'We are preparing these pieces. Coming soon to the shop.',
    'Peças com preço especial, enquanto houver stock.': 'Pieces at a special price, while stocks last.',
    'Favoritos': 'Wishlist', 'As peças que guardou. Toque no coração de uma peça para a juntar aqui.': 'The pieces you have saved. Tap the heart on a piece to add it here.',
    'Toda a loja': 'Shop all', 'Vestuário e malas, desenhados por Marta Coelho e feitos à mão em Portugal.': 'Clothing and bags, designed by Marta Coelho and handmade in Portugal.',
    'Casacos e blazers': 'Coats and blazers', 'Camisas e blusas': 'Shirts and blouses', 'Saias': 'Skirts', 'Calças': 'Trousers',
    'Cortiça portuguesa': 'Portuguese cork', 'Casacos em burel': 'Burel coats',
    'Ainda não guardou nenhuma peça nos favoritos.': 'You have not saved any pieces to your wishlist yet.',
    'Em breve: estamos a preparar estas peças.': 'Coming soon: we are preparing these pieces.',
    'Não há peças com estes filtros.': 'No pieces match these filters.',
    'Não encontrou o seu tamanho?': 'Can’t find your size?', 'Muitas peças são feitas': 'Many pieces are', 'por encomenda': 'made to order',
    'Se a peça que procura estiver esgotada, peça-nos para a avisar quando voltar, ou fale connosco: produzimos em pequenas quantidades e podemos ter novidades para si.': 'If the piece you are looking for is sold out, ask us to let you know when it is back, or get in touch: we produce in small quantities and may have news for you.',
    'Falar connosco': 'Contact us',

    // Produto
    'IVA incluído · Portes grátis em Portugal a partir de 150 €': 'VAT included · Free shipping in Portugal on orders over €150',
    'Deixe o seu e-mail e avisamos assim que esta peça': 'Leave your email and we will let you know as soon as this piece',
    'voltar a estar disponível.': 'is back in stock.', 'O seu e-mail': 'Your email', 'Avise-me': 'Notify me',
    'Guardar nos favoritos': 'Save to wishlist', 'Feito à mão em Portugal': 'Handmade in Portugal', '14 dias para devolver': '14 days to return',
    'Complete o look': 'Complete the look', 'Imagem ampliada': 'Enlarged image',
    'Tamanho': 'Size', '· Envio em 1 a 3 dias úteis': '· Ships in 1 to 3 working days', '· Podemos avisá-la se voltar': '· We can let you know when it is back',
    'Combinado!': 'All set!',
    'Detalhes': 'Details', 'Composição': 'Composition', 'Medidas': 'Measurements', 'Produção': 'Production', 'Cuidados': 'Care', 'Entregas': 'Delivery',
    'Instruções de lavagem': 'Care instructions',
    'Tecido de cortiça portuguesa · Forro em algodão orgânico': 'Portuguese cork fabric · Organic cotton lining',
    'Burel, lã de ovelha Bordaleira da Serra da Estrela · Forro em algodão orgânico': 'Burel, Bordaleira sheep’s wool from Serra da Estrela · Organic cotton lining',
    'Piñatex, fibra de folha de ananás · Forro em algodão orgânico': 'Piñatex, pineapple leaf fibre · Organic cotton lining',
    'Feito à mão em Portugal, em unidades limitadas': 'Handmade in Portugal, in limited quantities',
    'As malas têm tamanho único.': 'Bags are one size.', 'Medidas aproximadas, por serem peças feitas à mão.': 'Measurements are approximate, as the pieces are handmade.',
    'As nossas peças têm um corte largo (oversized), pensado para vestir vários tamanhos com conforto.': 'Our pieces have a loose (oversized) fit, designed to comfortably fit several sizes.',
    'Corresponde a': 'Equivalent to', 'Busto': 'Bust', 'Anca': 'Hips',
    'Tem dúvidas sobre o tamanho? Fale connosco por': 'Questions about sizing? Contact us at', 'ou no Instagram': 'or on Instagram',
    'Peças em stock são enviadas': 'In-stock pieces are shipped', '1 a 3 dias': '1 to 3 days',
    'depois da compra. Se não estiver em stock, contamos com cerca de 2 semanas de produção antes do envio: produzimos apenas o necessário, para ter menos desperdício.': 'after purchase. If a piece is not in stock, please allow about 2 weeks of production before shipping: we only produce what is needed, to reduce waste.',
    'Portugal continental': 'Mainland Portugal', '5 € ao domicílio · 4,50 € num ponto Pick Up ·': '€5 home delivery · €4.50 at a Pick Up point ·',
    'grátis a partir de 150 €': 'free on orders over €150', 'Madeira e Açores': 'Madeira and the Azores', '11 €': '€11',
    'Espanha': 'Spain', '7,50 € · grátis a partir de 150 €': '€7.50 · free on orders over €150', 'Europa': 'Europe',
    '15,50 € a 16,50 €': '€15.50 to €16.50', 'Estados Unidos': 'United States', '25 € a 97 €, com taxas alfandegárias incluídas': '€25 to €97, customs duties included',
    'Enviamos por CTT, com código de seguimento. As embalagens são recicláveis, reutilizáveis e biodegradáveis.': 'We ship with CTT, with a tracking code. Our packaging is recyclable, reusable and biodegradable.',
    'Tem': 'You have', '14 dias': '14 days',
    ', a contar do dia em que recebe a encomenda, para desistir da compra sem indicar o motivo. Escreva-nos para': ', from the day you receive your order, to cancel your purchase without giving a reason. Write to us at',
    'com o número da encomenda e as peças que quer devolver.': 'with your order number and the pieces you want to return.',
    'Pedimos que devolva as peças sem uso, sem lavagens e com as etiquetas. Os portes de devolução ficam a cargo do cliente, exceto se o erro for nosso (peça errada ou com defeito).': 'Please return the pieces unworn, unwashed and with their labels. Return shipping is paid by the customer, unless the mistake is ours (wrong or faulty piece).',
    'Para uma troca, a forma mais rápida de garantir a peça que quer é devolver a que tem e fazer uma nova compra.': 'For an exchange, the quickest way to secure the piece you want is to return the one you have and place a new order.',

    // Lojas
    'Onde nos': 'Where to', 'encontrar': 'find us',
    'As peças MARTA COELHO estão à venda em concept stores e lojas de norte a sul do país. Venha usufruir da experiência de compra física.': 'MARTA COELHO pieces are sold in concept stores and shops from the north to the south of Portugal. Come and enjoy shopping in person.',
    'Filtrar por cidade': 'Filter by city', 'Lisboa': 'Lisbon',
    'Trabalhamos com concept stores e lojas que partilham os nossos valores. Fale connosco para saber mais.': 'We work with concept stores and shops that share our values. Get in touch to find out more.',
    'Atendimento por marcação': 'By appointment', 'Escritório 2.20': 'Office 2.20',
    'Contactar o atendimento ao cliente para agendar a sua visita.': 'Contact customer care to book your visit.',
    'Mercado': 'Market', 'Todos os domingos, das 10h às 18h': 'Every Sunday, 10am to 6pm',
    'Na zona das galerias de arte do Porto, perto da Rua de Miguel Bombarda. Loja e galeria dedicada ao design de autor português.': 'In Porto’s art gallery district, near Rua de Miguel Bombarda. A shop and gallery dedicated to Portuguese designer pieces.',
    'Na terra natal da Marta. Uma concept store com peças escolhidas a dedo e um carinho especial pela marca.': 'In Marta’s hometown. A concept store with hand-picked pieces and a special fondness for the brand.',
    'Consulte o horário da loja no Google Maps': 'Check the opening hours on Google Maps',
    'Como chegar': 'Get directions', 'Abrir no mapa': 'Open in Maps', 'A carregar mapa…': 'Loading map…', 'Mapa': 'Map',

    // Sobre
    'Uma marca que nasceu de um': 'A brand born from a', 'desafio': 'challenge', 'Blusa Essenza em bambu': 'Essenza bamboo blouse',
    'A MARTA COELHO é uma marca portuguesa de moda de autor, fundada em 2022 pela designer de moda Marta Coelho, licenciada em Design de Moda e Têxtil e mestre em Branding e Design de Moda.': 'MARTA COELHO is a Portuguese designer fashion brand, founded in 2022 by fashion designer Marta Coelho, who holds a degree in Fashion and Textile Design and a master’s in Branding and Fashion Design.',
    'A marca nasceu num período de desafios profissionais. Criar uma marca não fazia parte dos planos, mas, após participar no primeiro desfile de moda sustentável, em 2022, teve a certeza de que aquele era o caminho que queria seguir.': 'The brand was born during a time of professional challenges. Starting a brand was never part of the plan but, after taking part in her first sustainable fashion show in 2022, Marta knew this was the path she wanted to follow.',
    'Com o objetivo de comercializar as suas criações, Marta Coelho lançou a primeira coleção da marca, Return to Origins, dedicada às Tote Bags. As peças combinavam materiais como o algodão orgânico, a cortiça portuguesa e o burel, uma lã tradicional portuguesa, valorizando os recursos naturais e a identidade nacional.': 'To bring her creations to market, Marta Coelho launched the brand’s first collection, Return to Origins, dedicated to tote bags. The pieces combined materials such as organic cotton, Portuguese cork and burel, a traditional Portuguese wool, celebrating natural resources and national identity.',
    'Em 2024, lança a primeira coleção de vestuário, Bioluminescence. Mais tarde, abriu um espaço físico de atendimento por marcação, criando um lugar onde os visitantes podem conhecer de perto, experimentar e descobrir as suas criações.': 'In 2024 she launched her first clothing collection, Bioluminescence. Later she opened a showroom, by appointment, a place where visitors can see, try on and discover her creations up close.',
    'Além da presença em Concept Stores em Portugal, em 2026, MARTA COELHO começou também a marcar presença em diferentes locais de Lisboa, incluindo a Lx Factory, onde está presente todos os domingos.': 'As well as being stocked in concept stores in Portugal, in 2026 MARTA COELHO also started appearing at different venues in Lisbon, including Lx Factory, where you can find us every Sunday.',
    'Moda Consciente': 'Conscious Fashion',
    'As criações MARTA COELHO são desenhadas para aliar conforto, qualidade e criatividade a valores de inclusão, sustentabilidade, ética e excelência.': 'MARTA COELHO creations are designed to combine comfort, quality and creativity with values of inclusion, sustainability, ethics and excellence.',
    'Cada peça é cuidadosamente criada para refletir o compromisso com o ambiente e com uma moda mais consciente e responsável. A marca privilegia a utilização de materiais certificados e o reaproveitamento de tecidos deadstock que, de outra forma, acabariam em aterros.': 'Each piece is carefully made to reflect a commitment to the environment and to more conscious, responsible fashion. The brand favours certified materials and reuses deadstock fabrics that would otherwise end up in landfill.',
    'Linho, algodão, algodão orgânico, bambu, lyocell, cortiça portuguesa e burel são alguns dos materiais utilizados na criação das peças. A marca distingue-se pela criação de peças únicas e de edição limitada.': 'Linen, cotton, organic cotton, bamboo, lyocell, Portuguese cork and burel are some of the materials used to create our pieces. The brand stands out for its unique, limited-edition pieces.',
    'Tudo é feito à mão em Portugal. As criações refletem a visão da designer sobre a moda, valorizando o detalhe, o artesanato e a autenticidade.': 'Everything is handmade in Portugal. The creations reflect the designer’s vision of fashion, valuing detail, craftsmanship and authenticity.',
    'O percurso': 'The journey', 'De Pombal a': 'From Pombal to', 'Milão': 'Milan', 'Deslize': 'Swipe',
    'Licenciatura na ESART': 'Degree at ESART', 'Design de Moda e Têxtil, em Castelo Branco.': 'Fashion and Textile Design, in Castelo Branco.',
    'Primeiro Desfile de Moda Sustentável': 'First Sustainable Fashion Show',
    'Participação no primeiro desfile de moda sustentável, no Príncipe Real. Criação da marca MARTA COELHO e lançamento da coleção de Acessórios Return to Origins.': 'Took part in the first sustainable fashion show, in Príncipe Real. Founded the MARTA COELHO brand and launched the Return to Origins accessories collection.',
    'Final em Milão': 'Final in Milan',
    'Finalista do concurso Freudenberg Fashioning Sustainability, com apresentação no Bagni Misteriosi.': 'Finalist in the Freudenberg Fashioning Sustainability competition, presented at Bagni Misteriosi.',
    'Modtissimo e Pavilhão do Conhecimento': 'Modtissimo and Pavilhão do Conhecimento',
    'Novos desfiles com a Etikway, em Matosinhos e em Lisboa. Início do trabalho como stylist em televisão.': 'New shows with Etikway, in Matosinhos and Lisbon. Started working as a TV stylist.',
    'A primeira coleção cápsula de vestuário.': 'The first clothing capsule collection.', '1.º prémio': '1st prize',
    'Vencedora do Desfile de Moda Sustentável da Etikway com a coleção Laranja do Algarve 🍊': 'Winner of the Etikway Sustainable Fashion Show with the Laranja do Algarve collection 🍊',
    'A coleção Outono–Inverno, com casacos em burel e lã e malhas de bambu.': 'The Autumn–Winter collection, with burel and wool coats and bamboo knitwear.',
    'Moda feita com': 'Fashion made with', 'consciência': 'care',
    'Damos sempre prioridade a materiais de origem portuguesa, embora também usemos alguns materiais de outros países europeus. Muitos têm certificações que comprovam a sua sustentabilidade.': 'We always prioritise materials of Portuguese origin, although we also use some materials from other European countries. Many are certified for their sustainability.',
    'Todas as peças são feitas à mão em Portugal, com técnicas de modelagem e corte que reduzem o desperdício de materiais.': 'Every piece is handmade in Portugal, with pattern-making and cutting techniques that reduce material waste.',
    'Os excedentes de tecido que resultam da confeção são reaproveitados para fazer pequenas bolsas.': 'Fabric offcuts left over from production are reused to make small pouches.',
    'Tecidos deadstock': 'Deadstock fabrics',
    'Usamos excedentes de rolos de tecido que, em vez de serem descartados e enviados para aterro, dão origem a novas peças.': 'We use leftover fabric rolls that, instead of being thrown away and sent to landfill, become new pieces.',
    'Materiais certificados': 'Certified materials',
    'Linho, algodão orgânico, bambu, lyocell, cortiça portuguesa e burel, muitos com certificações de sustentabilidade.': 'Linen, organic cotton, bamboo, lyocell, Portuguese cork and burel, many with sustainability certifications.',
    'Embalagens responsáveis': 'Responsible packaging',
    'As embalagens das encomendas online são recicláveis, reutilizáveis e biodegradáveis.': 'Online order packaging is recyclable, reusable and biodegradable.',
    'Etiquetas em algodão orgânico': 'Organic cotton labels',
    'As etiquetas interiores são feitas em 100% algodão orgânico, em Portugal.': 'Inside labels are made from 100% organic cotton, in Portugal.',
    'Materiais que usamos': 'Materials we use', 'Linho': 'Linen', 'Algodão orgânico': 'Organic cotton', 'Burel da Serra da Estrela': 'Serra da Estrela burel',
    'Fale': 'Get in', 'connosco': 'touch',
    'Encomendas, tamanhos, trocas e devoluções': 'Orders, sizes, exchanges and returns',
    'Dúvidas sobre uma encomenda, um tamanho ou uma peça? Escreva-nos.': 'Questions about an order, a size or a piece? Write to us.',
    'Marca': 'Brand', 'Parcerias, imprensa e revenda': 'Partnerships, press and retail',
    'Para colaborações, pedidos de imprensa e lojas que queiram vender as nossas peças.': 'For collaborations, press requests and shops that would like to sell our pieces.',

    // Pesquisa rápida, materiais e cores
    'Casaco': 'Coat', 'Vestido': 'Dress', 'Bambu': 'Bamboo', 'Cortiça': 'Cork', 'Lã': 'Wool', 'Algodão': 'Cotton',
    'Preto': 'Black', 'Azul Escuro': 'Dark Blue', 'Verde': 'Green', 'Bordô': 'Burgundy', 'Xadrez Colorido': 'Colourful Check',
    'Castanho': 'Brown', 'Bege': 'Beige', 'Lavanda': 'Lavender', 'Branco': 'White', 'Azulão': 'Royal Blue', 'Rosa e Vermelho': 'Pink and Red',
    'Forro preto': 'Black lining', 'Forro bege': 'Beige lining', 'Quadrados rosa e vermelho': 'Pink and red checks',

    // Produtos: descrições
    'Casaco de corte largo (oversized) em 100% lã, com gola de rebuço e forro em viscose e seda.': 'Loose-fit (oversized) coat in 100% wool, with a shawl collar and a viscose and silk lining.',
    'Casaco de corte largo (oversized) em 100% lã burel, com gola de rebuço e forro em viscose e seda.': 'Loose-fit (oversized) coat in 100% burel wool, with a shawl collar and a viscose and silk lining.',
    'Vestido comprido de malha em bambu, com decote à barco, aberturas e dois bolsos laterais. Leve, macio e confortável.': 'Long bamboo knit dress with a boat neckline, slits and two side pockets. Light, soft and comfortable.',
    'Saia midi em bambu, com elástico no cós, duas aberturas laterais e bolsos retangulares.': 'Bamboo midi skirt with an elasticated waistband, two side slits and rectangular pockets.',
    'Blusa de manga comprida e corte largo (oversized) em bambu, com decote à barco e modelo assimétrico.': 'Long-sleeved, loose-fit (oversized) bamboo blouse with a boat neckline and an asymmetric cut.',
    'Vestido comprido de malha em bambu e algodão, com decote à barco, aberturas e dois bolsos laterais.': 'Long bamboo and cotton knit dress with a boat neckline, slits and two side pockets.',
    'Saia comprida em bambu e algodão, com elástico no cós, duas aberturas laterais e bolsos retangulares.': 'Long bamboo and cotton skirt with an elasticated waistband, two side slits and rectangular pockets.',
    'Blusa de manga comprida e corte largo (oversized) em bambu e algodão, com decote à barco e modelo assimétrico.': 'Long-sleeved, loose-fit (oversized) bamboo and cotton blouse with a boat neckline and an asymmetric cut.',
    'Calças de corte largo em viscose EcoVero, com cós trespassado em triângulo, dois botões e elástico atrás. Dois bolsos laterais.': 'Wide-leg EcoVero viscose trousers with a crossover triangle waistband, two buttons and elastic at the back. Two side pockets.',
    'Camisa de manga comprida e corte largo (oversized) em viscose EcoVero, com cinto.': 'Long-sleeved, loose-fit (oversized) EcoVero viscose shirt with a belt.',
    'Tote bag em tecido seersucker aos quadrados rosa e vermelho, leve e com textura. O padrão alegre dá-lhe um toque fresco, e o interior espaçoso, com dois bolsos, tem lugar para o portátil e para tudo o que precisa no dia a dia, na cidade ou no campo.': 'Tote bag in pink and red checked seersucker, light and textured. The cheerful pattern gives it a fresh touch, and the roomy interior, with two pockets, has space for your laptop and everything you need every day, in the city or the countryside.',
    'Tote bag em tecido de cortiça. A mala não tem fecho. O forro é em algodão orgânico.': 'Cork fabric tote bag. The bag has no zip. The lining is organic cotton.',
    'Tote bag em tecido de cortiça. A mala tem fecho. O forro é em algodão orgânico.': 'Cork fabric tote bag with a zip. The lining is organic cotton.',
    'Mini tote bag em tecido de cortiça. O forro é em algodão orgânico.': 'Mini tote bag in cork fabric. The lining is organic cotton.',
    'O Piñatex é uma alternativa ao couro feita a partir de fibras de celulose extraídas das folhas de ananás. É um material bonito, natural e sustentável.': 'Piñatex is a leather alternative made from cellulose fibres extracted from pineapple leaves. It is a beautiful, natural and sustainable material.',
    'Manga comprida, 2 botões em carcela invisível e 2 bolsos': 'Long sleeves, 2 buttons on a concealed placket and 2 pockets',
    'Decote à barco, aberturas e 2 bolsos retangulares nas laterais': 'Boat neckline, slits and 2 rectangular side pockets',
    'Elástico no cós, 2 aberturas laterais e bolsos retangulares': 'Elasticated waistband, 2 side slits and rectangular pockets',
    'Manga comprida, decote à barco, modelo assimétrico': 'Long sleeves, boat neckline, asymmetric cut',
    'Cós trespassado em triângulo, 2 botões, elástico atrás, 2 bolsos laterais': 'Crossover triangle waistband, 2 buttons, elastic at the back, 2 side pockets',
    'Manga comprida, corte oversized, cinto': 'Long sleeves, oversized fit, belt',
    'Alças compridas e confortáveis, duas fitas para fechar, interior com dois bolsos, etiqueta exclusiva Marta Coelho': 'Long, comfortable straps, two ties to close it, two inside pockets, exclusive Marta Coelho label',
    'Exterior 100% lã · Forro viscose e seda': 'Outer 100% wool · Lining viscose and silk',
    'Exterior 100% lã burel · Forro viscose e seda': 'Outer 100% burel wool · Lining viscose and silk',
    '95% bambu, 5% elastano': '95% bamboo, 5% elastane', '50% bambu, 50% algodão': '50% bamboo, 50% cotton',
    '100% viscose EcoVero': '100% EcoVero viscose', 'Seersucker leve': 'Lightweight seersucker'
  };

  // Malas pequenas: a descrição segue sempre o mesmo modelo
  const BAG_COL = { castanha: 'brown', verde: 'green', rosa: 'pink', prateado: 'silver', vermelho: 'red', preto: 'black', branco: 'white', azul: 'blue', caramelo: 'caramel', natural: 'natural' };
  const BAG_MAT = { 'de cortiça': 'cork', pinatex: 'Piñatex', burel: 'burel' };

  // Textos com partes variáveis (preços, nomes, números)
  const R = [
    [/^Mala pequena em tecido (de cortiça|pinatex|burel) (\S+)(?: com fragmentos (dourados|holográficos))?\. A mala tem um fecho feito de materiais ecológicos\.( O forro é em algodão orgânico\.)?$/,
      (m, c, f, l) => `Small bag in ${BAG_COL[c] || c} ${BAG_MAT[m]} fabric${f ? ` with ${f === 'dourados' ? 'gold' : 'holographic'} fragments` : ''}. The bag has a zip made from eco-friendly materials.${l ? ' The lining is organic cotton.' : ''}`],
    [/^(.+) foi adicionado ao carrinho$/, a => `${a} has been added to your cart`],
    [/^em (.+)$/, a => `in ${tr(a)}`],
    [/^Linha (.+)$/, a => `${a} line`],
    [/^Não encontrámos resultados para “(.*)”\.$/, a => `No results found for “${a}”.`],
    [/^Todas \((\d+)\)$/, a => `All (${a})`],
    [/^no tamanho (.+)$/, a => `in size ${a}`],
    [/^Enviamos um e-mail para (.+?) assim que (.+) voltar a estar disponível\.$/, (a, b) => `We will email ${a} as soon as ${b} is back in stock.`],
    [/^Adicionar (.+)$/, a => `Add ${tr(a)}`],
    [/^Ver imagem (\d+)$/, a => `View image ${a}`],
    [/^(.+) \(esgotado\)$/, a => `${a} (sold out)`],
    [/^© (\d+) Marta Coelho · Feito à mão em Portugal$/, a => `© ${a} Marta Coelho · Handmade in Portugal`],
    [/^(.+) \| Marta Coelho$/, a => `${tr(a)} | Marta Coelho`],
    [/^(.+) · (€.+)$/, (a, b) => `${tr(a)} · ${b}`]
  ];

  function tr(s) {
    const k = norm(String(s ?? ''));
    if (!k) return s;
    let v = D[k];
    if (v === undefined) for (const [re, f] of R) { const m = k.match(re); if (m) { v = f(...m.slice(1)); break; } }
    if (v === undefined || v === k) return s;
    return s.match(/^\s*/)[0] + v + s.match(/\s*$/)[0];
  }

  // Nomes das peças: "Casaco Luranza" → "Luranza Coat"
  const TYPE = { Casaco: 'Coat', Vestido: 'Dress', Saia: 'Skirt', Blusa: 'Blouse', 'Calças': 'Trousers', Camisa: 'Shirt' };
  const name = s => { const m = s.match(/^(Casaco|Vestido|Saia|Blusa|Calças|Camisa) (\S+)( Comprida)?$/); return m ? `${m[2]}${m[3] ? ' Long' : ''} ${TYPE[m[1]]}` : s; };
  const measures = s => s.replace(/Alça de ombro/g, 'Shoulder strap').replace(/Altura/g, 'Height').replace(/Largura/g, 'Width')
    .replace(/Profundidade/g, 'Depth').replace(/Pega/g, 'Handle').replace(/Alça/g, 'Strap');

  // Traduz os campos visíveis de um produto (guarda o original em p.pt para a pesquisa)
  function product(p) {
    p.pt = { name: p.name, color: p.color, intro: p.intro };
    p.name = name(p.name);
    p.color = tr(p.color);
    p.intro = tr(p.intro);
    p.details = tr(p.details);
    p.comp = tr(p.comp);
    p.colorNote = (p.colorNote || '').split(' · ').map(tr).join(' · ');
    p.measures = measures(p.measures || '');
  }

  // Percorre a página e traduz textos e atributos; continua a vigiar o que os scripts acrescentam
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);
  const textNode = n => { if (SKIP.has(n.parentNode?.nodeName)) return; const v = tr(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; };
  const attrs = el => ATTRS.forEach(a => { const o = el.getAttribute(a); if (o) { const v = tr(o); if (v !== o) el.setAttribute(a, v); } });
  function apply(root) {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
    attrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeType === 3 ? textNode(n) : attrs(n);
  }
  function start() {
    document.documentElement.lang = 'en';
    apply(document.documentElement);
    new MutationObserver(ms => ms.forEach(m => {
      if (m.type === 'characterData') textNode(m.target);
      else if (m.type === 'attributes') attrs(m.target);
      else m.addedNodes.forEach(apply);
    })).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  return { tr, product, start };
})();
