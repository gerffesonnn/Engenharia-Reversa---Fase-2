/**
 * IMPORTANTE: os seletores aqui usam ".carousel-container article.slide"
 * (e não só ".slide") de propósito. Isso porque o carrossel hero (o de
 * vídeo/foto tela cheia) TAMBÉM usa a classe "slide" nas suas divs.
 * Se usássemos só ".slide" os dois carrosséis (o hero e o de modelos)
 * ficariam misturados e o script quebraria o carrossel hero.
 */

// Guarda o índice do slide de modelo atualmente exibido (começa em 0 = primeiro slide)
let currentModelSlide = 0;

// Busca todos os slides (article.slide) que estão dentro do carrossel de modelos,
// usando o seletor restrito para não pegar os slides do carrossel hero
function getModelSlides() {
  return document.querySelectorAll('.carousel-container article.slide');
}

// Busca todos os "dots" (bolinhas indicadoras) do carrossel de modelos
function getModelDots() {
  return document.querySelectorAll('.dots .dot');
}

// Sincroniza a tela com o valor de currentModelSlide:
// remove a classe "active" de todos os slides/dots e depois
// adiciona "active" apenas no slide e no dot correspondentes ao índice atual
function updateModelCarousel() {
  const articles = getModelSlides();
  const dotsList = getModelDots();

  // Passo 1: desativa todos os slides e dots
  articles.forEach((art, index) => {
    art.classList.remove('active');
    if (dotsList[index]) dotsList[index].classList.remove('active');
  });

  // Passo 2: ativa apenas o slide/dot do índice atual (com verificação de segurança)
  if (articles[currentModelSlide]) {
    articles[currentModelSlide].classList.add('active');
  }
  if (dotsList[currentModelSlide]) {
    dotsList[currentModelSlide].classList.add('active');
  }
}

// Avança para o próximo slide. O "% articles.length" faz o índice voltar
// para 0 automaticamente quando passa do último slide (efeito circular)
function nextSlide() {
  const articles = getModelSlides();
  if (!articles.length) return; // segurança: se não houver slides, não faz nada
  currentModelSlide = (currentModelSlide + 1) % articles.length;
  updateModelCarousel();
}

// Volta para o slide anterior. Somar "articles.length" antes do "%" evita
// que o índice fique negativo quando estamos no primeiro slide (efeito circular)
function prevSlide() {
  const articles = getModelSlides();
  if (!articles.length) return; // segurança: se não houver slides, não faz nada
  currentModelSlide = (currentModelSlide - 1 + articles.length) % articles.length;
  updateModelCarousel();
}

// Pula diretamente para um slide específico, chamado ao clicar em um dos dots
function setSlide(index) {
  currentModelSlide = index;
  updateModelCarousel();
}

/**
 * Alterna a imagem, a frase do slogan e o destaque das abas
 */
// Chamada pelos botões de aba (ex: "REVUELTO" / "REVUELTO SV") para trocar
// a foto do carro, o texto do slogan e marcar visualmente a aba clicada como ativa
function switchTab(btnClicked, imgId, newSrc, sloganId, newSloganText) {
  // Altera a imagem do carro, buscando o elemento pelo id recebido como parâmetro
  const carImg = document.getElementById(imgId);
  if (carImg) {
    carImg.src = newSrc;
  }

  // Altera o slogan, apenas se um id e um novo texto de slogan forem informados
  if (sloganId && newSloganText) {
    const sloganEl = document.getElementById(sloganId);
    if (sloganEl) {
      sloganEl.textContent = newSloganText;
    }
  }

  // Atualiza visualmente qual aba está ativa:
  // pega o elemento pai do botão clicado (o container das abas),
  // remove "active" de todas as abas irmãs e adiciona apenas no botão clicado
  const tabsContainer = btnClicked.parentElement;
  const tabs = tabsContainer.querySelectorAll('.tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));

  btnClicked.classList.add('active');
}

const contactDialog = document.getElementById('contatoModal');
const contactForm = document.getElementById('contatoForm');
const contactModel = document.getElementById('contatoModelo');

if (contactDialog && contactModel) {
  document.querySelectorAll('[data-contact-model]').forEach(button => {
    button.addEventListener('click', () => {
      contactModel.value = button.dataset.contactModel;
      contactDialog.showModal();
      const contactNameField = document.getElementById('contatoNome');
      if (contactNameField) {
        contactNameField.focus();
      }
    });
  });

  const closeContactButton = document.querySelector('.contato-fechar');
  if (closeContactButton) {
    closeContactButton.addEventListener('click', () => {
      contactDialog.close();
    });
  }

  contactDialog.addEventListener('click', event => {
    if (event.target === contactDialog) {
      contactDialog.close();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const message = [
      `Modelo de interesse: ${formData.get('modelo')}`,
      `Nome: ${formData.get('nome')}`,
      `E-mail: ${formData.get('email')}`,
      `Telefone: ${formData.get('telefone') || 'Não informado'}`,
      '',
      formData.get('mensagem')
    ].join('\n');
    const emailParameters = new URLSearchParams({
      subject: `Contato sobre ${formData.get('modelo')}`,
      body: message
    });

    window.location.href = `mailto:customercare@lamborghini.com?${emailParameters}`;
  });
}

const translations = {
  en: {
    menu: 'MENU',
    language: 'LANGUAGE',
    models: 'MODELS',
    beyond: 'BEYOND',
    museum: 'MUSEUM',
    ownership: 'OWNERSHIP',
    company: 'COMPANY',
    store: 'STORE',
    dealerships: 'DEALERSHIPS',
    motorsport: 'MOTORSPORT',
    design: 'Design',
    financial: 'Financial services',
    lounge: 'Lounge',
    sustainability: 'Sustainability',
    warranty: 'Warranty extension',
    club: 'Club',
    history: 'History',
    driving: 'Driving Programs',
    podcast: 'Podcast',
    dealerLocator: 'DEALER LOCATOR',
    findDealer: 'FIND YOUR DEALER',
    followUs: 'Follow us on:'
  },
  it: {
    menu: 'MENU',
    language: 'LINGUA',
    models: 'MODELLI',
    beyond: 'OLTRE',
    museum: 'MUSEO',
    ownership: 'PROPRIETÀ',
    company: 'AZIENDA',
    store: 'STORE',
    dealerships: 'CONCESSIONARI',
    motorsport: 'MOTORSPORT',
    design: 'Design',
    financial: 'Servizi finanziari',
    lounge: 'Lounge',
    sustainability: 'Sostenibilità',
    warranty: 'Estensione garanzia',
    club: 'Club',
    history: 'Storia',
    driving: 'Programmi di guida',
    podcast: 'Podcast',
    dealerLocator: 'LOCALIZZATORE CONCESSIONARI',
    findDealer: 'TROVA IL TUO CONCESSIONARIO',
    followUs: 'Seguici su:'
  },
  de: {
    menu: 'MENÜ',
    language: 'SPRACHE',
    models: 'MODELLE',
    beyond: 'DARÜBER HINAUS',
    museum: 'MUSEUM',
    ownership: 'EIGENTUM',
    company: 'UNTERNEHMEN',
    store: 'SHOP',
    dealerships: 'HÄNDLER',
    motorsport: 'MOTORSPORT',
    design: 'Design',
    financial: 'Finanzdienstleistungen',
    lounge: 'Lounge',
    sustainability: 'Nachhaltigkeit',
    warranty: 'Garantieverlängerung',
    club: 'Club',
    history: 'Geschichte',
    driving: 'Fahrprogramme',
    podcast: 'Podcast',
    dealerLocator: 'HÄNDLER-SUCHE',
    findDealer: 'HÄNDLER FINDEN',
    followUs: 'Folgen Sie uns:'
  },
  fr: {
    menu: 'MENU',
    language: 'LANGUE',
    models: 'MODÈLES',
    beyond: 'AU-DELÀ',
    museum: 'MUSÉE',
    ownership: 'POSSESSION',
    company: 'ENTREPRISE',
    store: 'MAGASIN',
    dealerships: 'CONCESSIONNAIRES',
    motorsport: 'MOTORSPORT',
    design: 'Design',
    financial: 'Services financiers',
    lounge: 'Lounge',
    sustainability: 'Durabilité',
    warranty: 'Extension garantie',
    club: 'Club',
    history: 'Histoire',
    driving: 'Programmes de conduite',
    podcast: 'Podcast',
    dealerLocator: 'LOCALISATION DES CONCESSIONNAIRES',
    findDealer: 'TROUVER VOTRE CONCESSIONNAIRE',
    followUs: 'Suivez-nous :' 
  },
  pt: {
    menu: 'MENU',
    language: 'IDIOMA',
    models: 'MODELOS',
    beyond: 'BEYOND',
    museum: 'MUSEU',
    ownership: 'PROPRIEDADE',
    company: 'EMPRESA',
    store: 'LOJA',
    dealerships: 'CONCESSIONÁRIAS',
    motorsport: 'MOTORSPORT',
    design: 'Design',
    financial: 'Serviços financeiros',
    lounge: 'Lounge',
    sustainability: 'Sustentabilidade',
    warranty: 'Extensão de garantia',
    club: 'Club',
    history: 'História',
    driving: 'Programas de condução',
    podcast: 'Podcast',
    dealerLocator: 'LOCALIZADOR DE CONCESSIONÁRIAS',
    findDealer: 'ENCONTRAR CONCESSIONÁRIA',
    followUs: 'Siga-nos:'
  }
};

const pagePhrases = [
  ['THE QUANTUM OF DRIVING', 'THE QUANTUM OF DRIVING', 'IL QUANTUM DELLA GUIDA', 'DAS QUANTUM DES FAHRENS', 'LE QUANTUM DE LA CONDUITE', 'O QUANTUM DA CONDUÇÃO'],
  ['WITH THE ASTRONAUT PAOLO NESPOLI', 'WITH THE ASTRONAUT PAOLO NESPOLI', 'CON L’ASTRONAUTA PAOLO NESPOLI', 'MIT DEM ASTRONAUTEN PAOLO NESPOLI', 'AVEC L’ASTRONAUTE PAOLO NESPOLI', 'COM O ASTRONAUTA PAOLO NESPOLI'],
  ["THE SUV'S MAXIMUM EXPRESSION", "THE SUV'S MAXIMUM EXPRESSION", 'LA MASSIMA ESPRESSIONE DEL SUV', 'DER SUV IN SEINER VOLLENDUNG', 'L’EXPRESSION ULTIME DU SUV', 'A MÁXIMA EXPRESSÃO DO SUV'],
  ['DISCOVER MORE', 'DISCOVER MORE', 'SCOPRI DI PIÙ', 'MEHR ENTDECKEN', 'DÉCOUVRIR', 'SAIBA MAIS'],
  ['FROM NOW ON', 'FROM NOW ON', 'DA ORA IN POI', 'AB JETZT', 'À PARTIR DE MAINTENANT', 'A PARTIR DE AGORA'],
  ['URUS AT ITS PEAK', 'URUS AT ITS PEAK', 'URUS AL SUO MASSIMO', 'URUS AUF DEM HÖHEPUNKT', 'URUS À SON APOGÉE', 'URUS NO SEU AUGE'],
  ["YOU CAN'T HIDE WHO YOU ARE", "YOU CAN'T HIDE WHO YOU ARE", 'NON PUOI NASCONDERE CHI SEI', 'DU KANNST NICHT VERBERGEN, WER DU BIST', 'VOUS NE POUVEZ PAS CACHER QUI VOUS ÊTES', 'NÃO PODE ESCONDER QUEM VOCÊ É'],
  ['REVUELTO SV', 'REVUELTO SV', 'REVUELTO SV', 'REVUELTO SV', 'REVUELTO SV', 'REVUELTO SV'],
  ['REVUELTO', 'REVUELTO', 'REVUELTO', 'REVUELTO', 'REVUELTO', 'REVUELTO'],
  ['URUS PERFORMANTE', 'URUS PERFORMANTE', 'URUS PERFORMANTE', 'URUS PERFORMANTE', 'URUS PERFORMANTE', 'URUS PERFORMANTE'],
  ['URUS SE', 'URUS SE', 'URUS SE', 'URUS SE', 'URUS SE', 'URUS SE'],
  ['EXPLORE THE MODEL', 'EXPLORE THE MODEL', 'ESPLORA IL MODELLO', 'MODELL ENTDECKEN', 'EXPLORER LE MODÈLE', 'EXPLORE O MODELO'],
  ['EXPLORE THE MODELS', 'EXPLORE THE MODELS', 'ESPLORA I MODELLI', 'MODELLE ENTDECKEN', 'EXPLORER LES MODÈLES', 'EXPLORE OS MODELOS'],
  ['START CONFIGURATION', 'START CONFIGURATION', 'INIZIA LA CONFIGURAZIONE', 'KONFIGURATION STARTEN', 'COMMENCER LA CONFIGURATION', 'INICIAR CONFIGURAÇÃO'],
  ['ENQUIRE', 'ENQUIRE', 'RICHIEDI INFORMAZIONI', 'ANFRAGE', 'DEMANDER DES INFORMATIONS', 'ENTRE EM CONTATO'],
  ['CONFIGURE SEU', 'CONFIGURE SEU', 'CONFIGURA LA TUA', 'KONFIGURIERE DEINEN', 'CONFIGUREZ VOTRE', 'CONFIGURE SEU'],
  ['INICIAR CONFIGURAÇÃO', 'START CONFIGURATION', 'INIZIA LA CONFIGURAZIONE', 'KONFIGURATION STARTEN', 'DÉMARRER LA CONFIGURATION', 'INICIAR CONFIGURAÇÃO'],
  ['CONTATO', 'CONTACT', 'CONTATTO', 'KONTAKT', 'CONTACT', 'CONTATO'],
  ['O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE. Os dados de consumo de combustível e emissões estão em fase de homologação.', 'The vehicle is not yet on sale and is therefore not subject to Directive 1999/94/EC. Fuel consumption and emissions data are being homologated.', 'Il veicolo non è ancora in vendita e pertanto non è soggetto alla Direttiva 1999/94/CE. I dati relativi a consumi ed emissioni sono in fase di omologazione.', 'Das Fahrzeug ist noch nicht im Verkauf und unterliegt daher nicht der Richtlinie 1999/94/EG. Verbrauchs- und Emissionsdaten befinden sich in der Homologationsphase.', 'Le véhicule n’est pas encore commercialisé et n’est donc pas soumis à la directive 1999/94/CE. Les données de consommation et d’émissions sont en cours d’homologation.', 'O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE. Os dados de consumo de combustível e emissões estão em fase de homologação.'],
  ['O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE.', 'The vehicle is not yet on sale and is therefore not subject to Directive 1999/94/EC.', 'Il veicolo non è ancora in vendita e pertanto non è soggetto alla Direttiva 1999/94/CE.', 'Das Fahrzeug ist noch nicht im Verkauf und unterliegt daher nicht der Richtlinie 1999/94/EG.', 'Le véhicule n’est pas encore commercialisé et n’est donc pas soumis à la directive 1999/94/CE.', 'O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE.'],
  ['O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE. Os dados de consumo e emissões estão em fase de homologação.', 'The vehicle is not yet on sale and is therefore not subject to Directive 1999/94/EC. Consumption and emissions data are being homologated.', 'Il veicolo non è ancora in vendita e pertanto non è soggetto alla Direttiva 1999/94/CE. I dati relativi a consumi ed emissioni sono in fase di omologazione.', 'Das Fahrzeug ist noch nicht im Verkauf und unterliegt daher nicht der Richtlinie 1999/94/EG. Verbrauchs- und Emissionsdaten befinden sich in der Homologationsphase.', 'Le véhicule n’est pas encore commercialisé et n’est donc pas soumis à la directive 1999/94/CE. Les données de consommation et d’émissions sont en cours d’homologation.', 'O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE. Os dados de consumo e emissões estão em fase de homologação.'],
  ['Consumo combinado: 11,8 l/100km; Emissões de CO2 combinadas: 276 g/km; Classe de eficiência CO2: G.', 'Combined fuel consumption: 11.8 l/100 km; combined CO2 emissions: 276 g/km; CO2 efficiency class: G.', 'Consumo combinato: 11,8 l/100 km; emissioni di CO2 combinate: 276 g/km; classe di efficienza CO2: G.', 'Kombinierter Verbrauch: 11,8 l/100 km; kombinierte CO2-Emissionen: 276 g/km; CO2-Effizienzklasse: G.', 'Consommation combinée : 11,8 l/100 km ; émissions de CO2 combinées : 276 g/km ; classe d’efficacité CO2 : G.', 'Consumo combinado: 11,8 l/100 km; emissões de CO2 combinadas: 276 g/km; classe de eficiência CO2: G.'],
  ['Consumo de energia combinado: 5,1 kWh/100 Km mais 2,08 l/100km; Emissões de CO2 combinadas: 51 g/km.', 'Combined energy consumption: 5.1 kWh/100 km plus 2.08 l/100 km; combined CO2 emissions: 51 g/km.', 'Consumo energetico combinato: 5,1 kWh/100 km più 2,08 l/100 km; emissioni di CO2 combinate: 51 g/km.', 'Consommation d’énergie combinée : 5,1 kWh/100 km plus 2,08 l/100 km ; émissions de CO2 combinées : 51 g/km.', 'Consommation d’énergie combinée : 5,1 kWh/100 km plus 2,08 l/100 km ; émissions de CO2 combinées : 51 g/km.', 'Consumo de energia combinado: 5,1 kWh/100 km mais 2,08 l/100 km; emissões de CO2 combinadas: 51 g/km.'],
  ['FALE COM A NOSSA EQUIPE', 'SPEAK WITH OUR TEAM', 'PARLA CON IL NOSTRO TEAM', 'SPRECHEN SIE MIT UNSEREM TEAM', 'PARLEZ À NOTRE ÉQUIPE', 'FALE COM A NOSSA EQUIPE'],
  ['Entre em contato', 'Get in touch', 'Contattaci', 'Kontaktieren Sie uns', 'Contactez-nous', 'Entre em contato'],
  ['Modelo de interesse', 'Model of interest', 'Modello di interesse', 'Interessierendes Modell', 'Modèle souhaité', 'Modelo de interesse'],
  ['Nome', 'Name', 'Nome', 'Name', 'Nom', 'Nome'],
  ['E-mail', 'Email', 'E-mail', 'E-Mail', 'E-mail', 'E-mail'],
  ['Telefone', 'Phone', 'Telefono', 'Telefon', 'Téléphone', 'Telefone'],
  ['(opcional)', '(optional)', '(facoltativo)', '(optional)', '(facultatif)', '(opcional)'],
  ['Mensagem', 'Message', 'Messaggio', 'Nachricht', 'Message', 'Mensagem'],
  ['Ao enviar, seu aplicativo de e-mail será aberto com a mensagem pronta para envio.', 'When you submit, your email app will open with the message ready to send.', 'Dopo l’invio, si aprirà la tua applicazione e-mail con il messaggio pronto per essere inviato.', 'Nach dem Absenden öffnet sich Ihr E-Mail-Programm mit der vorbereiteten Nachricht.', 'Après l’envoi, votre application e-mail s’ouvrira avec le message prêt à être envoyé.', 'Ao enviar, seu aplicativo de e-mail será aberto com a mensagem pronta para envio.'],
  ['CONTINUAR PARA O E-MAIL', 'CONTINUE TO EMAIL', 'CONTINUA CON L’E-MAIL', 'WEITER ZUR E-MAIL', 'CONTINUER VERS L’E-MAIL', 'CONTINUAR PARA O E-MAIL'],
  ['ASK ME', 'ASK ME', 'CHIEDIMI', 'FRAG MICH', 'DEMANDEZ-MOI', 'PERGUNTE-ME'],
  ['Welcome to the Lamborghini world! I\'m your Virtual Assistant, ready to guide you on a journey of excellence and innovation. How can I assist you today? Feel Free to ask a question or select from topics below.', 'Welcome to the Lamborghini world! I\'m your Virtual Assistant, ready to guide you on a journey of excellence and innovation. How can I assist you today? Feel free to ask a question or select from the topics below.', 'Benvenuto nel mondo Lamborghini! Sono il tuo assistente virtuale e sono pronto ad accompagnarti in un viaggio all’insegna dell’eccellenza e dell’innovazione. Come posso aiutarti oggi? Fai una domanda o scegli uno degli argomenti qui sotto.', 'Willkommen in der Welt von Lamborghini! Ich bin Ihr virtueller Assistent und begleite Sie auf einer Reise voller Exzellenz und Innovation. Wie kann ich Ihnen heute helfen? Stellen Sie eine Frage oder wählen Sie eines der Themen unten.', 'Bienvenue dans l’univers Lamborghini ! Je suis votre assistant virtuel, prêt à vous guider dans un voyage d’excellence et d’innovation. Comment puis-je vous aider aujourd’hui ? Posez une question ou choisissez un sujet ci-dessous.', 'Bem-vindo ao mundo Lamborghini! Sou seu assistente virtual, pronto para acompanhar você em uma jornada de excelência e inovação. Como posso ajudar hoje? Faça uma pergunta ou escolha um dos tópicos abaixo.'],
  ['▸ INFORMATION NOTICE', '▸ INFORMATION NOTICE', '▸ INFORMATIVA SULLA PRIVACY', '▸ DATENSCHUTZHINWEIS', '▸ NOTICE D’INFORMATION', '▸ AVISO DE PRIVACIDADE'],
  ['You can ask me a question or choose from the proposed topics.', 'You can ask me a question or choose from the topics below.', 'Puoi farmi una domanda o scegliere uno degli argomenti proposti.', 'Sie können mir eine Frage stellen oder eines der vorgeschlagenen Themen auswählen.', 'Vous pouvez me poser une question ou choisir parmi les sujets proposés.', 'Você pode fazer uma pergunta ou escolher um dos tópicos sugeridos.'],
  ['Models', 'Models', 'Modelli', 'Modelle', 'Modèles', 'Modelos'],
  ['Exclusive experiences', 'Exclusive experiences', 'Esperienze esclusive', 'Exklusive Erlebnisse', 'Expériences exclusives', 'Experiências exclusivas'],
  ['Customization and services', 'Customization and services', 'Personalizzazione e servizi', 'Personalisierung und Services', 'Personnalisation et services', 'Personalização e serviços'],
  ['Discover Lamborghini', 'Discover Lamborghini', 'Scopri Lamborghini', 'Lamborghini entdecken', 'Découvrir Lamborghini', 'Conheça a Lamborghini'],
  ['Store', 'Store', 'Store', 'Shop', 'Boutique', 'Loja'],
  ['Contacts and support', 'Contacts and support', 'Contatti e assistenza', 'Kontakt und Support', 'Contacts et assistance', 'Contatos e suporte'],
  ['Ask your question here', 'Ask your question here', 'Scrivi qui la tua domanda', 'Stellen Sie hier Ihre Frage', 'Posez votre question ici', 'Digite sua pergunta aqui'],
  ['LANGUAGE', 'LANGUAGE', 'LINGUA', 'SPRACHE', 'LANGUE', 'IDIOMA'],
  ['✕ MENU', '✕ MENU', '✕ CHIUDI MENU', '✕ MENÜ SCHLIESSEN', '✕ FERMER LE MENU', '✕ FECHAR MENU'],
  ['COMPANY', 'COMPANY', 'AZIENDA', 'UNTERNEHMEN', 'ENTREPRISE', 'EMPRESA'],
  ['Revuelto: Combined energy consumption: 4,7 kWh/100 Km plus 15 l/100km; Combined CO2 emissions: 350 g/km; Combined CO2 efficiency class: G; Combined fuel consumption with discharged battery: 17,9 l/100km; CO2 class with discharged battery: G; Revuelto SV: Under approval, not available for sale', 'Revuelto: Combined energy consumption: 4.7 kWh/100 km plus 15 l/100 km; combined CO2 emissions: 350 g/km; combined CO2 efficiency class: G; fuel consumption with discharged battery: 17.9 l/100 km; CO2 class with discharged battery: G. Revuelto SV: pending approval, not available for sale.', 'Revuelto: consumo energetico combinato: 4,7 kWh/100 km più 15 l/100 km; emissioni di CO2 combinate: 350 g/km; classe di efficienza CO2 combinata: G; consumo con batteria scarica: 17,9 l/100 km; classe CO2 con batteria scarica: G. Revuelto SV: in attesa di omologazione, non disponibile per la vendita.', 'Revuelto: kombinierter Energieverbrauch: 4,7 kWh/100 km plus 15 l/100 km; kombinierte CO2-Emissionen: 350 g/km; kombinierte CO2-Effizienzklasse: G; Kraftstoffverbrauch bei entladener Batterie: 17,9 l/100 km; CO2-Klasse bei entladener Batterie: G. Revuelto SV: noch nicht zugelassen und nicht käuflich.', 'Revuelto : consommation d’énergie combinée : 4,7 kWh/100 km plus 15 l/100 km ; émissions de CO2 combinées : 350 g/km ; classe d’efficacité CO2 combinée : G ; consommation batterie déchargée : 17,9 l/100 km ; classe CO2 batterie déchargée : G. Revuelto SV : en attente d’homologation, non disponible à la vente.', 'Revuelto: consumo de energia combinado: 4,7 kWh/100 km mais 15 l/100 km; emissões de CO2 combinadas: 350 g/km; classe de eficiência de CO2 combinada: G; consumo com bateria descarregada: 17,9 l/100 km; classe de CO2 com bateria descarregada: G. Revuelto SV: em homologação, indisponível para venda.'],
  ['and the EU GARAN label.', 'and the EU GARAN label.', 'e l’etichetta EU GARAN.', 'und das EU-GARAN-Label.', 'et l’étiquette EU GARAN.', 'e o selo EU GARAN.'],
  ['of Google apply.', 'of Google apply.', 'di Google.', 'von Google.', 'de Google.', 'do Google.'],
  ['Copyright © 2026 Automobili Lamborghini S.p.A. a company with sole shareholder subject to the management and coordination of AUDI AG.', 'Copyright © 2026 Automobili Lamborghini S.p.A., a company with sole shareholder subject to the management and coordination of AUDI AG.', 'Copyright © 2026 Automobili Lamborghini S.p.A., società con socio unico soggetta all’attività di direzione e coordinamento di AUDI AG.', 'Copyright © 2026 Automobili Lamborghini S.p.A., Gesellschaft mit Alleingesellschafter unter Leitung und Koordination der AUDI AG.', 'Copyright © 2026 Automobili Lamborghini S.p.A., société à associé unique soumise à la direction et à la coordination d’AUDI AG.', 'Copyright © 2026 Automobili Lamborghini S.p.A., empresa com acionista único sujeita à gestão e coordenação da AUDI AG.'],
  ['Follow us on:', 'Follow us on:', 'Seguici su:', 'Folgen Sie uns:', 'Suivez-nous :', 'Siga-nos:'],
  ['COOKIE SETTINGS', 'COOKIE SETTINGS', 'IMPOSTAZIONI COOKIE', 'COOKIE-EINSTELLUNGEN', 'PARAMÈTRES DES COOKIES', 'CONFIGURAÇÕES DE COOKIES'],
  ['FINANCIALS', 'FINANCIALS', 'DATI FINANZIARI', 'FINANZINFORMATIONEN', 'INFORMATIONS FINANCIÈRES', 'INFORMAÇÕES FINANCEIRAS'],
  ['MEDIA CENTER', 'MEDIA CENTER', 'MEDIA CENTER', 'MEDIENCENTER', 'CENTRE MÉDIA', 'CENTRO DE MÍDIA'],
  ['SITEMAP', 'SITEMAP', 'MAPPA DEL SITO', 'SITEMAP', 'PLAN DU SITE', 'MAPA DO SITE'],
  ['CAREERS', 'CAREERS', 'LAVORA CON NOI', 'KARRIERE', 'CARRIÈRES', 'CARREIRAS'],
  ['RECALL CAMPAIGN', 'RECALL CAMPAIGN', 'CAMPAGNA DI RICHIAMO', 'RÜCKRUFAKTION', 'CAMPAGNE DE RAPPEL', 'CAMPANHA DE RECALL'],
  ['PRIVACY & LEGAL', 'PRIVACY & LEGAL', 'PRIVACY E NOTE LEGALI', 'DATENSCHUTZ & RECHTLICHES', 'CONFIDENTIALITÉ ET MENTIONS LÉGALES', 'PRIVACIDADE E TERMOS LEGAIS'],
  ['NEWSLETTER', 'NEWSLETTER', 'NEWSLETTER', 'NEWSLETTER', 'NEWSLETTER', 'NEWSLETTER'],
  ['CONTACT US', 'CONTACT US', 'CONTATTACI', 'KONTAKT', 'CONTACTEZ-NOUS', 'FALE CONOSCO'],
  ['ACCESSIBILITY', 'ACCESSIBILITY', 'ACCESSIBILITÀ', 'BARRIEREFREIHEIT', 'ACCESSIBILITÉ', 'ACESSIBILIDADE'],
  ['Learn about your rights and guarantee: read the', 'Learn about your rights and guarantee: read the', 'Scopri i tuoi diritti e la garanzia: leggi la', 'Erfahren Sie mehr über Ihre Rechte und die Garantie: Lesen Sie den', 'Découvrez vos droits et la garantie : consultez la', 'Saiba mais sobre seus direitos e garantia: leia o'],
  ['Legal Guarantee Notice', 'Legal Guarantee Notice', 'Avviso legale sulla garanzia', 'Garantiehinweis', 'Notice de garantie légale', 'Aviso de garantia legal'],
  ['The consumption and emissions values in the website refer to your geographical IP. This value might be unrealistic if you navigate using VPN or if the position of your Internet provider is imprecise. If you believe you are incorrectly geolocalized, contact your dealer to get valid consumption and emissions information in your area.', 'The consumption and emissions values on this website are based on your geographical IP address. These values may be inaccurate if you use a VPN or if your internet provider location is imprecise. If you believe your location is incorrect, contact your dealer for valid local consumption and emissions information.', 'I valori di consumo ed emissioni indicati sul sito si riferiscono alla tua posizione geografica rilevata tramite IP. Potrebbero non essere accurati se utilizzi una VPN o se la posizione del tuo provider Internet non è precisa. Se ritieni che la tua posizione sia errata, contatta il concessionario per informazioni valide per la tua area.', 'Die Verbrauchs- und Emissionswerte auf dieser Website basieren auf Ihrer geografischen IP-Adresse. Bei Nutzung eines VPN oder ungenauer Standortbestimmung durch Ihren Internetanbieter können die Werte abweichen. Wenn Ihr Standort falsch erkannt wurde, wenden Sie sich an Ihren Händler, um gültige lokale Angaben zu erhalten.', 'Les valeurs de consommation et d’émissions indiquées sur ce site sont basées sur votre adresse IP géographique. Elles peuvent être inexactes si vous utilisez un VPN ou si la localisation de votre fournisseur Internet est imprécise. Si votre localisation vous semble incorrecte, contactez votre concessionnaire pour obtenir des informations locales valides.', 'Os valores de consumo e emissões deste site são baseados na localização geográfica do seu IP. Eles podem ser imprecisos se você usar VPN ou se a localização do provedor de internet não for exata. Se acreditar que sua localização está incorreta, fale com uma concessionária para obter dados válidos para sua região.'],
  ['This site is protected by reCAPTCHA and the', 'This site is protected by reCAPTCHA and the', 'Questo sito è protetto da reCAPTCHA e si applicano la', 'Diese Website ist durch reCAPTCHA geschützt; es gelten die', 'Ce site est protégé par reCAPTCHA et les dispositions de la', 'Este site é protegido pelo reCAPTCHA e se aplicam a'],
  ['Privacy Policy', 'Privacy Policy', 'Informativa sulla privacy', 'Datenschutzerklärung', 'Politique de confidentialité', 'Política de Privacidade'],
  ['Terms of Service', 'Terms of Service', 'Termini di servizio', 'Nutzungsbedingungen', 'Conditions d’utilisation', 'Termos de Serviço'],
  ['and', 'and', 'e', 'und', 'et', 'e'],
  ['Terms of Service of Google apply.', 'Terms of Service of Google apply.', 'e i Termini di servizio di Google.', 'und die Nutzungsbedingungen von Google.', 'et les Conditions d’utilisation de Google.', 'e os Termos de Serviço do Google.'],
  ['All rights reserved. VAT no. IT 00591801204', 'All rights reserved. VAT no. IT 00591801204', 'Tutti i diritti riservati. P. IVA IT 00591801204', 'Alle Rechte vorbehalten. USt-IdNr. IT 00591801204', 'Tous droits réservés. N° TVA IT 00591801204', 'Todos os direitos reservados. CNPJ/IVA IT 00591801204'],
  ['WARNING ABOUT ILLEGAL OFFERS OF ALLEGED SHARES OF AUTOMOBILI LAMBORGHINI S.P.A.', 'WARNING ABOUT ILLEGAL OFFERS OF ALLEGED SHARES OF AUTOMOBILI LAMBORGHINI S.P.A.', 'ATTENZIONE ALLE OFFERTE ILLEGALI DI PRESUNTE AZIONI DI AUTOMOBILI LAMBORGHINI S.P.A.', 'WARNUNG VOR ILLEGALEN ANGEBOTEN VERMEINTLICHER AKTIEN DER AUTOMOBILI LAMBORGHINI S.P.A.', 'ATTENTION AUX OFFRES ILLÉGALES DE PRÉTENDUES ACTIONS D’AUTOMOBILI LAMBORGHINI S.P.A.', 'AVISO SOBRE OFERTAS ILEGAIS DE SUPOSTAS AÇÕES DA AUTOMOBILI LAMBORGHINI S.P.A.'],
  ['Automobili Lamborghini S.p.A. got the notice that several third parties across different countries are allegedly offering shares in Automobili Lamborghini S.p.A. These offers are unlawful and originate neither from Volkswagen Aktiengesellschaft nor from any of its subsidiaries.', 'Automobili Lamborghini S.p.A. has been informed that several third parties in different countries are allegedly offering shares in Automobili Lamborghini S.p.A. These offers are unlawful and do not originate from Volkswagen Aktiengesellschaft or any of its subsidiaries.', 'Automobili Lamborghini S.p.A. è stata informata che diversi soggetti terzi in vari Paesi starebbero offrendo azioni di Automobili Lamborghini S.p.A. Tali offerte sono illegali e non provengono da Volkswagen Aktiengesellschaft né da alcuna delle sue controllate.', 'Automobili Lamborghini S.p.A. wurde darüber informiert, dass verschiedene Dritte in unterschiedlichen Ländern angeblich Aktien der Automobili Lamborghini S.p.A. anbieten. Diese Angebote sind rechtswidrig und stammen weder von der Volkswagen Aktiengesellschaft noch von einer ihrer Tochtergesellschaften.', 'Automobili Lamborghini S.p.A. a été informée que des tiers dans plusieurs pays proposeraient prétendument des actions d’Automobili Lamborghini S.p.A. Ces offres sont illégales et ne proviennent ni de Volkswagen Aktiengesellschaft ni de ses filiales.', 'A Automobili Lamborghini S.p.A. foi informada de que terceiros em diferentes países estariam oferecendo ações da Automobili Lamborghini S.p.A. Essas ofertas são ilegais e não têm origem na Volkswagen Aktiengesellschaft nem em suas subsidiárias.'],
  ['Close menu', 'Close menu', 'Chiudi menu', 'Menü schließen', 'Fermer le menu', 'Fechar menu'],
  ['Open language selector', 'Open language selector', 'Apri selettore lingua', 'Sprachauswahl öffnen', 'Ouvrir le sélecteur de langue', 'Abrir seletor de idioma'],
  ['Chat', 'Chat', 'Chat', 'Chat', 'Chat', 'Chat'],
  ['Search', 'Search', 'Cerca', 'Suche', 'Rechercher', 'Buscar'],
  ['Fechar formulário', 'Close form', 'Chiudi modulo', 'Formular schließen', 'Fermer le formulaire', 'Fechar formulário'],
  ['Fechar Chat', 'Close chat', 'Chiudi chat', 'Chat schließen', 'Fermer le chat', 'Fechar chat'],
  ['Enviar', 'Send', 'Invia', 'Senden', 'Envoyer', 'Enviar']
];

const extendedPagePhrases = [
  ['OVERVIEW', 'OVERVIEW', 'PANORAMICA', 'ÜBERBLICK', 'APERÇU', 'VISÃO GERAL'],
  ['BRAND MANIFESTO', 'BRAND MANIFESTO', 'MANIFESTO DEL MARCHIO', 'MARKENMANIFEST', 'MANIFESTE DE LA MARQUE', 'MANIFESTO DA MARCA'],
  ['OUR BRAND', 'OUR BRAND', 'IL NOSTRO MARCHIO', 'UNSERE MARKE', 'NOTRE MARQUE', 'NOSSA MARCA'],
  ['DRIVING HUMANS BEYOND', 'DRIVING HUMANS BEYOND', 'SPINGERE LE PERSONE OLTRE', 'MENSCHEN ÜBER SICH HINAUSWACHSEN LASSEN', 'POUSSER LES HUMAINS À SE DÉPASSER', 'LEVANDO AS PESSOAS ALÉM'],
  ['OUR VISION', 'OUR VISION', 'LA NOSTRA VISIONE', 'UNSERE VISION', 'NOTRE VISION', 'NOSSA VISÃO'],
  ['OUR SPIRIT', 'OUR SPIRIT', 'IL NOSTRO SPIRITO', 'UNSER GEIST', 'NOTRE ESPRIT', 'NOSSO ESPÍRITO'],
  ['THE LAMBORGHINI WAY', 'THE LAMBORGHINI WAY', 'IL MODO LAMBORGHINI', 'DER LAMBORGHINI-WEG', 'L’ESPRIT LAMBORGHINI', 'O JEITO LAMBORGHINI'],
  ['A NEW DIGITAL WORLD', 'A NEW DIGITAL WORLD', 'UN NUOVO MONDO DIGITALE', 'EINE NEUE DIGITALE WELT', 'UN NOUVEAU MONDE NUMÉRIQUE', 'UM NOVO MUNDO DIGITAL'],
  ['Discover Fast ForWorld, Automobili Lamborghini’s revolutionary digital platform where fans, gamers, and collectors can experience digital super sports cars like never before. Unlock digital collectibles, engage in immersive gameplay, and enjoy exclusive rewards in this cutting-edge interoperable ecosystem.', 'Discover Fast ForWorld, Automobili Lamborghini’s revolutionary digital platform where fans, gamers, and collectors can experience digital super sports cars like never before. Unlock digital collectibles, engage in immersive gameplay, and enjoy exclusive rewards in this cutting-edge interoperable ecosystem.', 'Scopri Fast ForWorld, la piattaforma digitale rivoluzionaria di Automobili Lamborghini dove fan, gamer e collezionisti possono vivere le supersportive digitali come mai prima. Sblocca oggetti da collezione, partecipa a esperienze immersive e ottieni premi esclusivi in questo ecosistema interoperabile all’avanguardia.', 'Entdecken Sie Fast ForWorld, die revolutionäre digitale Plattform von Automobili Lamborghini. Fans, Gamer und Sammler erleben dort digitale Supersportwagen auf neue Weise, entdecken Sammlerstücke, tauchen in Spiele ein und erhalten exklusive Prämien.', 'Découvrez Fast ForWorld, la plateforme numérique révolutionnaire d’Automobili Lamborghini où fans, joueurs et collectionneurs vivent les supercars numériques autrement. Débloquez des objets de collection, plongez dans des jeux immersifs et profitez de récompenses exclusives.', 'Conheça a Fast ForWorld, a plataforma digital revolucionária da Automobili Lamborghini, onde fãs, jogadores e colecionadores vivenciam superesportivos digitais como nunca. Desbloqueie itens colecionáveis, participe de jogos imersivos e aproveite recompensas exclusivas.'],
  ['UNITED TO TRACE UNIQUE ROADS', 'UNITED TO TRACE UNIQUE ROADS', 'UNITI NEL TRACCIARE STRADE UNICHE', 'GEMEINSAM AUF EINZIGARTIGEN WEGEN', 'UNIS POUR TRACER DES ROUTES UNIQUES', 'JUNTOS PARA TRAÇAR CAMINHOS ÚNICOS'],
  ['This is our Employer Value Proposition: what distinguishes and defines us.', 'This is our Employer Value Proposition: what distinguishes and defines us.', 'Questa è la nostra proposta di valore per i dipendenti: ciò che ci distingue e ci definisce.', 'Das ist unser Arbeitgeberversprechen: Es zeichnet uns aus und macht uns unverwechselbar.', 'Voici notre proposition de valeur employeur : ce qui nous distingue et nous définit.', 'Esta é nossa proposta de valor ao colaborador: o que nos distingue e nos define.'],
  ['Teamwork comes first: our strength lies in the team, which is why cross-functional collaboration and mutual respect are central to the way we work.', 'Teamwork comes first: our strength lies in the team, which is why cross-functional collaboration and mutual respect are central to the way we work.', 'Il lavoro di squadra viene prima di tutto: la nostra forza è nel team, per questo collaborazione e rispetto reciproco sono fondamentali.', 'Teamarbeit steht an erster Stelle: Unsere Stärke liegt im Team. Deshalb prägen Zusammenarbeit und gegenseitiger Respekt unsere Arbeit.', 'Le travail d’équipe passe avant tout : notre force réside dans le collectif, où la collaboration et le respect mutuel sont essentiels.', 'O trabalho em equipe vem primeiro: nossa força está no time, por isso a colaboração e o respeito mútuo são essenciais.'],
  ['Our commitment spans training, research, volunteering and solidarity initiatives, creating opportunities for growth and development.', 'Our commitment spans training, research, volunteering and solidarity initiatives, creating opportunities for growth and development.', 'Il nostro impegno comprende formazione, ricerca, volontariato e iniziative solidali, creando opportunità di crescita.', 'Unser Engagement umfasst Weiterbildung, Forschung, ehrenamtliche Arbeit und Solidaritätsinitiativen und schafft Chancen für Entwicklung.', 'Notre engagement couvre la formation, la recherche, le bénévolat et les initiatives solidaires, créant des possibilités d’évolution.', 'Nosso compromisso inclui capacitação, pesquisa, voluntariado e iniciativas solidárias, criando oportunidades de crescimento.'],
  ['Our people make Lamborghini a unique place to work. Discover our culture and the opportunities to grow together.', 'Our people make Lamborghini a unique place to work. Discover our culture and the opportunities to grow together.', 'Le nostre persone rendono Lamborghini un luogo di lavoro unico. Scopri la nostra cultura e le opportunità per crescere insieme.', 'Unsere Mitarbeitenden machen Lamborghini zu einem einzigartigen Arbeitsplatz. Entdecken Sie unsere Kultur und die Möglichkeiten, gemeinsam zu wachsen.', 'Nos collaborateurs font de Lamborghini un lieu de travail unique. Découvrez notre culture et les possibilités d’évoluer ensemble.', 'Nossa equipe faz da Lamborghini um lugar único para trabalhar. Conheça nossa cultura e as oportunidades de crescer junto.'],
  ['Throughout our community, we support organizations and institutes that strive every day to make the world a fairer place.', 'Throughout our community, we support organizations and institutes that strive every day to make the world a fairer place.', 'Nella nostra comunità sosteniamo organizzazioni e istituti che ogni giorno si impegnano per rendere il mondo più equo.', 'In unserer Gemeinschaft unterstützen wir Organisationen und Institute, die sich täglich für eine gerechtere Welt einsetzen.', 'Au sein de notre communauté, nous soutenons des organisations et des instituts qui œuvrent chaque jour pour un monde plus juste.', 'Em nossa comunidade, apoiamos organizações e instituições que trabalham diariamente para tornar o mundo mais justo.'],
  ['Jump into an internship adventure, curricular or extracurricular, and work on real projects alongside our professionals.', 'Jump into an internship adventure, curricular or extracurricular, and work on real projects alongside our professionals.', 'Vivi un tirocinio, curricolare o extracurricolare, e lavora a progetti reali insieme ai nostri professionisti.', 'Starten Sie in ein Praktikum – curricular oder außercurricular – und arbeiten Sie gemeinsam mit unseren Fachleuten an echten Projekten.', 'Lancez-vous dans un stage, intégré au cursus ou non, et travaillez sur des projets concrets aux côtés de nos professionnels.', 'Comece uma jornada de estágio, curricular ou extracurricular, e trabalhe em projetos reais ao lado dos nossos profissionais.'],
  ['Find current opportunities and learn about the recruitment process.', 'Find current opportunities and learn about the recruitment process.', 'Scopri le opportunità disponibili e il processo di selezione.', 'Entdecken Sie aktuelle Stellen und erfahren Sie mehr über den Bewerbungsprozess.', 'Découvrez les opportunités actuelles et le processus de recrutement.', 'Encontre oportunidades atuais e saiba mais sobre o processo seletivo.'],
  ['A VISION IN MOTION', 'A VISION IN MOTION', 'UNA VISIONE IN MOVIMENTO', 'EINE VISION IN BEWEGUNG', 'UNE VISION EN MOUVEMENT', 'UMA VISÃO EM MOVIMENTO'],
  ['Born in Sant’Agata Bolognese, Lamborghini brings together Italian design, engineering and a drive to move beyond convention.', 'Born in Sant’Agata Bolognese, Lamborghini brings together Italian design, engineering and a drive to move beyond convention.', 'Nata a Sant’Agata Bolognese, Lamborghini unisce design italiano, ingegneria e desiderio di superare ogni convenzione.', 'Lamborghini wurde in Sant’Agata Bolognese gegründet und vereint italienisches Design, Ingenieurskunst und den Anspruch, Konventionen zu überwinden.', 'Née à Sant’Agata Bolognese, Lamborghini allie design italien, ingénierie et volonté de dépasser les conventions.', 'Nascida em Sant’Agata Bolognese, a Lamborghini une design italiano, engenharia e desejo de ir além das convenções.'],
  ['Founded in 1963 by Ferruccio Lamborghini, the company has spent more than six decades shaping the super sports car through distinctive design and bold engineering. Its home remains in Sant’Agata Bolognese, Italy.', 'Founded in 1963 by Ferruccio Lamborghini, the company has spent more than six decades shaping the super sports car through distinctive design and bold engineering. Its home remains in Sant’Agata Bolognese, Italy.', 'Fondata nel 1963 da Ferruccio Lamborghini, da oltre sei decenni l’azienda definisce la supersportiva con design distintivo e ingegneria audace. La sua sede è a Sant’Agata Bolognese.', 'Das 1963 von Ferruccio Lamborghini gegründete Unternehmen prägt seit mehr als sechs Jahrzehnten mit unverwechselbarem Design und mutiger Ingenieurskunst den Supersportwagen. Der Stammsitz liegt in Sant’Agata Bolognese.', 'Fondée en 1963 par Ferruccio Lamborghini, l’entreprise façonne depuis plus de six décennies la supercar grâce à un design distinctif et une ingénierie audacieuse. Son siège est à Sant’Agata Bolognese.', 'Fundada em 1963 por Ferruccio Lamborghini, a empresa molda há mais de seis décadas os superesportivos com design marcante e engenharia ousada. Sua sede fica em Sant’Agata Bolognese.'],
  ['A guide to the ethical principles that encourage responsible conduct within Lamborghini.', 'A guide to the ethical principles that encourage responsible conduct within Lamborghini.', 'Una guida ai principi etici che promuovono una condotta responsabile in Lamborghini.', 'Ein Leitfaden zu den ethischen Grundsätzen, die verantwortungsvolles Handeln bei Lamborghini fördern.', 'Un guide des principes éthiques qui encouragent une conduite responsable chez Lamborghini.', 'Um guia dos princípios éticos que incentivam uma conduta responsável na Lamborghini.'],
  ['Volkswagen Group’s Code of Conduct for Business Partners.', 'Volkswagen Group’s Code of Conduct for Business Partners.', 'Il Codice di condotta per i partner commerciali del Gruppo Volkswagen.', 'Der Verhaltenskodex für Geschäftspartner des Volkswagen Konzerns.', 'Le Code de conduite des partenaires commerciaux du groupe Volkswagen.', 'Código de Conduta para Parceiros de Negócios do Grupo Volkswagen.'],
  ['Guidance on how to report potential violations and the channels available for submitting a report.', 'Guidance on how to report potential violations and the channels available for submitting a report.', 'Indicazioni su come segnalare potenziali violazioni e sui canali disponibili.', 'Hinweise zur Meldung möglicher Verstöße und zu den verfügbaren Meldewegen.', 'Conseils sur le signalement de violations potentielles et les canaux disponibles.', 'Orientações sobre como relatar possíveis violações e os canais disponíveis.'],
  ['Find out more about Italian Legislative Decree 231/01 and the company’s Independent Body.', 'Find out more about Italian Legislative Decree 231/01 and the company’s Independent Body.', 'Scopri di più sul Decreto Legislativo italiano 231/01 e sull’Organismo di Vigilanza della società.', 'Erfahren Sie mehr über das italienische Gesetzesdekret 231/01 und das unabhängige Aufsichtsorgan des Unternehmens.', 'En savoir plus sur le décret législatif italien 231/01 et l’organisme indépendant de l’entreprise.', 'Saiba mais sobre o Decreto Legislativo italiano 231/01 e o órgão independente da empresa.'],
  ['Volkswagen Group’s Declaration on Social Rights, Industrial Relations, Business and Human Rights.', 'Volkswagen Group’s Declaration on Social Rights, Industrial Relations, Business and Human Rights.', 'La Dichiarazione del Gruppo Volkswagen sui diritti sociali, le relazioni industriali, le imprese e i diritti umani.', 'Die Erklärung des Volkswagen Konzerns zu sozialen Rechten, Arbeitsbeziehungen, Wirtschaft und Menschenrechten.', 'La déclaration du groupe Volkswagen sur les droits sociaux, les relations professionnelles, les entreprises et les droits humains.', 'Declaração do Grupo Volkswagen sobre Direitos Sociais, Relações Trabalhistas, Negócios e Direitos Humanos.'],
  ['Read about the principles that guide our commitment to human rights throughout the value chain.', 'Read about the principles that guide our commitment to human rights throughout the value chain.', 'Scopri i principi che guidano il nostro impegno per i diritti umani lungo tutta la catena del valore.', 'Erfahren Sie mehr über die Grundsätze, die unser Engagement für Menschenrechte entlang der gesamten Wertschöpfungskette leiten.', 'Découvrez les principes qui guident notre engagement en faveur des droits humains tout au long de la chaîne de valeur.', 'Conheça os princípios que orientam nosso compromisso com os direitos humanos em toda a cadeia de valor.'],
  ['TRANSPARENCY AND ACCOUNTABILITY', 'TRANSPARENCY AND ACCOUNTABILITY', 'TRASPARENZA E RESPONSABILITÀ', 'TRANSPARENZ UND RECHENSCHAFTSPFLICHT', 'TRANSPARENCE ET RESPONSABILITÉ', 'TRANSPARÊNCIA E RESPONSABILIDADE'],
  ['The tax function of Automobili Lamborghini oversees all tax compliance and supports responsible, transparent business management.', 'The tax function of Automobili Lamborghini oversees all tax compliance and supports responsible, transparent business management.', 'La funzione fiscale di Automobili Lamborghini supervisiona gli adempimenti tributari e promuove una gestione aziendale responsabile e trasparente.', 'Die Steuerabteilung von Automobili Lamborghini überwacht die Einhaltung der Steuervorschriften und unterstützt eine verantwortungsvolle, transparente Unternehmensführung.', 'La fonction fiscale d’Automobili Lamborghini veille au respect des obligations fiscales et favorise une gestion responsable et transparente.', 'A área fiscal da Automobili Lamborghini supervisiona as obrigações tributárias e apoia uma gestão empresarial responsável e transparente.'],
  ['Learn about Lamborghini’s approach to tax transparency and cooperation with the relevant authorities.', 'Learn about Lamborghini’s approach to tax transparency and cooperation with the relevant authorities.', 'Scopri l’approccio di Lamborghini alla trasparenza fiscale e alla collaborazione con le autorità competenti.', 'Erfahren Sie mehr über Lamborghinis Ansatz zu steuerlicher Transparenz und zur Zusammenarbeit mit den zuständigen Behörden.', 'Découvrez l’approche de Lamborghini en matière de transparence fiscale et de coopération avec les autorités compétentes.', 'Conheça a abordagem da Lamborghini sobre transparência fiscal e cooperação com as autoridades competentes.'],
  ['Access information about public grants and contributions received by the company.', 'Access information about public grants and contributions received by the company.', 'Consulta le informazioni sui contributi e sulle sovvenzioni pubbliche ricevuti dall’azienda.', 'Hier finden Sie Informationen zu öffentlichen Zuschüssen und Fördermitteln, die das Unternehmen erhalten hat.', 'Consultez les informations sur les aides et contributions publiques reçues par l’entreprise.', 'Consulte informações sobre subsídios e contribuições públicas recebidos pela empresa.'],
  ['Our risk management framework supports the identification, assessment and monitoring of business risks.', 'Our risk management framework supports the identification, assessment and monitoring of business risks.', 'Il nostro sistema di gestione dei rischi favorisce l’identificazione, la valutazione e il monitoraggio dei rischi aziendali.', 'Unser Risikomanagement unterstützt die Identifizierung, Bewertung und Überwachung von Geschäftsrisiken.', 'Notre cadre de gestion des risques aide à identifier, évaluer et surveiller les risques liés aux activités.', 'Nossa estrutura de gestão de riscos apoia a identificação, avaliação e monitoramento de riscos empresariais.'],
  ['Read about the principles that guide Lamborghini’s tax governance and compliance.', 'Read about the principles that guide Lamborghini’s tax governance and compliance.', 'Scopri i principi che guidano la governance fiscale e la conformità di Lamborghini.', 'Erfahren Sie mehr über die Grundsätze der Steuerführung und Compliance bei Lamborghini.', 'Découvrez les principes qui guident la gouvernance fiscale et la conformité de Lamborghini.', 'Conheça os princípios que orientam a governança tributária e a conformidade da Lamborghini.'],
  ['Lamborghini closed 2025 with an excellent performance across its main financial metrics: 10,747 cars delivered and a turnover of €3.20 billion, a new record.', 'Lamborghini closed 2025 with an excellent performance across its main financial metrics: 10,747 cars delivered and a turnover of €3.20 billion, a new record.', 'Lamborghini ha chiuso il 2025 con risultati eccellenti: 10.747 vetture consegnate e un fatturato record di 3,20 miliardi di euro.', 'Lamborghini beendete 2025 mit hervorragenden Ergebnissen: 10.747 ausgelieferte Fahrzeuge und ein Rekordumsatz von 3,20 Milliarden Euro.', 'Lamborghini a clôturé 2025 avec d’excellentes performances : 10 747 voitures livrées et un chiffre d’affaires record de 3,20 milliards d’euros.', 'A Lamborghini encerrou 2025 com excelente desempenho: 10.747 veículos entregues e faturamento recorde de € 3,20 bilhões.'],
  ['Operating income reached €768 million, corresponding to a return on sales of 24%.', 'Operating income reached €768 million, corresponding to a return on sales of 24%.', 'Il risultato operativo ha raggiunto 768 milioni di euro, pari a un ROS del 24%.', 'Das Betriebsergebnis erreichte 768 Millionen Euro, entsprechend einer Umsatzrendite von 24%.', 'Le résultat opérationnel a atteint 768 millions d’euros, soit une marge opérationnelle de 24 %.', 'O resultado operacional chegou a € 768 milhões, equivalente a uma margem operacional de 24%.'],
  ['Data refer to Lamborghini Group (Automobili Lamborghini S.p.A. and Automobili Lamborghini America LLC) consolidated KPIs.', 'Data refer to Lamborghini Group (Automobili Lamborghini S.p.A. and Automobili Lamborghini America LLC) consolidated KPIs.', 'I dati si riferiscono agli indicatori consolidati del Gruppo Lamborghini (Automobili Lamborghini S.p.A. e Automobili Lamborghini America LLC).', 'Die Daten beziehen sich auf die konsolidierten Kennzahlen der Lamborghini Gruppe (Automobili Lamborghini S.p.A. und Automobili Lamborghini America LLC).', 'Les données concernent les indicateurs consolidés du groupe Lamborghini (Automobili Lamborghini S.p.A. et Automobili Lamborghini America LLC).', 'Os dados referem-se aos indicadores consolidados do Grupo Lamborghini (Automobili Lamborghini S.p.A. e Automobili Lamborghini America LLC).'],
  ['DRIVE WORRY-FREE WITH OUR THREE-YEAR WARRANTY', 'DRIVE WORRY-FREE WITH OUR THREE-YEAR WARRANTY', 'VIAGGIA SENZA PENSIERI CON LA NOSTRA GARANZIA DI TRE ANNI', 'SORGENFREI FAHREN MIT UNSERER DREIJÄHRIGEN GARANTIE', 'ROULEZ SEREINEMENT AVEC NOTRE GARANTIE DE TROIS ANS', 'DIRIJA SEM PREOCUPAÇÕES COM NOSSA GARANTIA DE TRÊS ANOS'],
  ['With us, you get more than the highest performance; you also get the guarantee of reliability and protection that allows for a supreme, worry-free driving experience.', 'With us, you get more than the highest performance; you also get the guarantee of reliability and protection that allows for a supreme, worry-free driving experience.', 'Con noi, oltre alle prestazioni più elevate, hai la garanzia di affidabilità e protezione per un’esperienza di guida straordinaria e senza pensieri.', 'Bei uns erhalten Sie mehr als höchste Leistung: Zuverlässigkeit und Schutz sorgen für ein außergewöhnliches, sorgenfreies Fahrerlebnis.', 'Avec nous, vous bénéficiez de performances exceptionnelles, mais aussi d’une fiabilité et d’une protection garanties pour une conduite sereine.', 'Conosco, você tem mais do que alto desempenho: conta também com a garantia de confiabilidade e proteção para dirigir com tranquilidade.'],
  ['On all new vehicles — starting from the date of delivery and under normal conditions of use — Lamborghini provides a three-year, unlimited-mileage warranty.*', 'On all new vehicles — starting from the date of delivery and under normal conditions of use — Lamborghini provides a three-year, unlimited-mileage warranty.*', 'Su tutte le vetture nuove, dalla data di consegna e in normali condizioni d’uso, Lamborghini offre una garanzia di tre anni senza limiti di chilometraggio.*', 'Für alle Neufahrzeuge bietet Lamborghini ab dem Auslieferungsdatum und bei normaler Nutzung eine dreijährige Garantie ohne Kilometerbegrenzung.*', 'Pour tous les véhicules neufs, à compter de la livraison et dans des conditions normales d’utilisation, Lamborghini offre une garantie de trois ans sans limite de kilométrage.*', 'Para todos os veículos novos, a partir da data de entrega e em condições normais de uso, a Lamborghini oferece garantia de três anos sem limite de quilometragem.*'],
  ['The Warranty Extension covers parts and labour included in the Selezione program, with Original Spare Parts and work performed by Lamborghini specialists.', 'The Warranty Extension covers parts and labour included in the Selezione program, with Original Spare Parts and work performed by Lamborghini specialists.', 'L’Estensione Garanzia copre ricambi e manodopera previsti dal programma Selezione, con Ricambi Originali e interventi eseguiti da specialisti Lamborghini.', 'Die Garantieverlängerung umfasst die im Selezione-Programm enthaltenen Teile und Arbeitsleistungen, mit Originalersatzteilen und Arbeiten durch Lamborghini Spezialisten.', 'L’extension de garantie couvre les pièces et la main-d’œuvre prévues par le programme Selezione, avec des pièces d’origine et des interventions réalisées par des spécialistes Lamborghini.', 'A Extensão de Garantia cobre peças e mão de obra incluídas no programa Selezione, com Peças Originais e serviços realizados por especialistas Lamborghini.'],
  ['For the Selezione program, the car must be no more than 10 years old and have no more than 70,000 km (100,000 km for Urus). To renew the warranty, the car must pass the 150 tests of the Lamborghini checklist.', 'For the Selezione program, the car must be no more than 10 years old and have no more than 70,000 km (100,000 km for Urus). To renew the warranty, the car must pass the 150 tests of the Lamborghini checklist.', 'Per il programma Selezione, l’auto non deve avere più di 10 anni e 70.000 km (100.000 km per Urus). Per rinnovare la garanzia, deve superare i 150 controlli della checklist Lamborghini.', 'Für das Selezione-Programm darf das Fahrzeug höchstens 10 Jahre alt sein und maximal 70.000 km (100.000 km beim Urus) gefahren sein. Für die Garantieverlängerung muss es die 150 Prüfungen der Lamborghini Checkliste bestehen.', 'Pour bénéficier du programme Selezione, le véhicule doit avoir moins de 10 ans et moins de 70 000 km (100 000 km pour Urus). Le renouvellement de la garantie exige la réussite des 150 contrôles de la liste Lamborghini.', 'Para participar do programa Selezione, o veículo deve ter no máximo 10 anos e 70.000 km (100.000 km para Urus). Para renovar a garantia, deve passar pelos 150 testes da lista Lamborghini.'],
  ['The Revuelto SV represents a revolutionary step in Lamborghini’s history. Combining a naturally aspirated 6.5-liter V12 engine with three high-performance electric motors, it delivers an unmatched output of 1065 CV. Lightweight carbon fiber monocoque design and GT3-derived aerodynamics establish a new benchmark for super sports cars.', 'The Revuelto SV represents a revolutionary step in Lamborghini’s history. Combining a naturally aspirated 6.5-liter V12 engine with three high-performance electric motors, it delivers an unmatched output of 1065 CV. Lightweight carbon fiber monocoque design and GT3-derived aerodynamics establish a new benchmark for super sports cars.', 'La Revuelto SV segna un passo rivoluzionario nella storia Lamborghini. Il V12 aspirato da 6,5 litri, abbinato a tre motori elettrici ad alte prestazioni, eroga 1065 CV. Il monoscocca leggero in fibra di carbonio e l’aerodinamica derivata dalla GT3 definiscono un nuovo riferimento per le supersportive.', 'Der Revuelto SV ist ein revolutionärer Schritt in der Geschichte Lamborghinis. Ein 6,5-Liter-V12-Saugmotor und drei leistungsstarke Elektromotoren liefern 1065 CV. Das leichte Carbon-Monocoque und die von GT3 abgeleitete Aerodynamik setzen neue Maßstäbe.', 'La Revuelto SV marque une étape révolutionnaire dans l’histoire de Lamborghini. Son V12 atmosphérique de 6,5 litres associé à trois moteurs électriques développe 1065 CV. Sa monocoque en fibre de carbone et son aérodynamique inspirée de la GT3 établissent une nouvelle référence.', 'O Revuelto SV representa um passo revolucionário na história da Lamborghini. Com motor V12 aspirado de 6,5 litros e três motores elétricos, entrega 1065 CV. O monocoque de fibra de carbono e a aerodinâmica derivada da GT3 estabelecem um novo padrão para superesportivos.'],
  ['The Urus SE combines the performance and distinctive design of Lamborghini with an electrified powertrain. It represents a new chapter for the Super SUV.', 'The Urus SE combines the performance and distinctive design of Lamborghini with an electrified powertrain. It represents a new chapter for the Super SUV.', 'Urus SE combina le prestazioni e il design distintivo Lamborghini con una motorizzazione elettrificata. È un nuovo capitolo per il Super SUV.', 'Der Urus SE verbindet die Leistung und das unverwechselbare Design von Lamborghini mit einem elektrifizierten Antrieb. Er schlägt ein neues Kapitel für den Super SUV auf.', 'Urus SE associe les performances et le design distinctif de Lamborghini à une motorisation électrifiée. Il ouvre un nouveau chapitre pour le Super SUV.', 'O Urus SE combina o desempenho e o design marcante da Lamborghini com um conjunto motriz eletrificado. É um novo capítulo para o Super SUV.'],
  ['Sharp lines, powerful proportions and unmistakable Lamborghini details give the Urus SE a strong and aggressive presence on the road.', 'Sharp lines, powerful proportions and unmistakable Lamborghini details give the Urus SE a strong and aggressive presence on the road.', 'Linee affilate, proporzioni imponenti e dettagli Lamborghini conferiscono a Urus SE una presenza forte e grintosa su strada.', 'Scharfe Linien, kraftvolle Proportionen und unverwechselbare Lamborghini Details verleihen dem Urus SE eine starke Präsenz auf der Straße.', 'Des lignes acérées, des proportions puissantes et des détails Lamborghini donnent à Urus SE une présence affirmée sur la route.', 'Linhas marcantes, proporções poderosas e detalhes Lamborghini dão ao Urus SE uma presença forte e agressiva na estrada.'],
  ['Different driving modes allow the Urus SE to adapt to different road conditions while maintaining the unmistakable Lamborghini character.', 'Different driving modes allow the Urus SE to adapt to different road conditions while maintaining the unmistakable Lamborghini character.', 'Le diverse modalità di guida consentono a Urus SE di adattarsi alle condizioni stradali mantenendo l’inconfondibile carattere Lamborghini.', 'Verschiedene Fahrmodi passen den Urus SE an unterschiedliche Straßenbedingungen an, ohne seinen Lamborghini Charakter zu verlieren.', 'Les modes de conduite permettent à Urus SE de s’adapter aux conditions de route tout en préservant le caractère inimitable de Lamborghini.', 'Os diferentes modos de condução permitem ao Urus SE se adaptar à estrada sem perder o caráter inconfundível da Lamborghini.'],
  ['The fascinating history, iconic models and tours of the production lines reveal 60 years of innovation driving Lamborghini into the future.', 'The fascinating history, iconic models and tours of the production lines reveal 60 years of innovation driving Lamborghini into the future.', 'La storia affascinante, i modelli iconici e i tour delle linee produttive raccontano 60 anni di innovazione che proiettano Lamborghini nel futuro.', 'Die faszinierende Geschichte, ikonische Modelle und Führungen durch die Produktionslinien zeigen 60 Jahre Innovation, mit denen Lamborghini in die Zukunft fährt.', 'Une histoire fascinante, des modèles emblématiques et des visites des lignes de production dévoilent 60 ans d’innovation qui propulsent Lamborghini vers l’avenir.', 'A história fascinante, os modelos icônicos e as visitas às linhas de produção revelam 60 anos de inovação que levam a Lamborghini rumo ao futuro.'],
  ['Discover the Miura, the Countach and the latest super sports cars that define the unique Lamborghini attitude. A sensory journey between design, passion and mechanical excellence.', 'Discover the Miura, the Countach and the latest super sports cars that define the unique Lamborghini attitude. A sensory journey between design, passion and mechanical excellence.', 'Scopri Miura, Countach e le supersportive che incarnano il carattere Lamborghini. Un viaggio sensoriale tra design, passione ed eccellenza meccanica.', 'Entdecken Sie Miura, Countach und die neuesten Supersportwagen, die den einzigartigen Lamborghini Charakter prägen. Eine Reise zwischen Design, Leidenschaft und technischer Exzellenz.', 'Découvrez Miura, Countach et les supercars qui incarnent l’esprit Lamborghini. Un voyage entre design, passion et excellence mécanique.', 'Conheça Miura, Countach e os superesportivos que definem a personalidade da Lamborghini. Uma jornada entre design, paixão e excelência mecânica.'],
  ['Due to technical specifications, maps are only displayed correctly after accepting Targeting Cookies.', 'Due to technical specifications, maps are only displayed correctly after accepting Targeting Cookies.', 'Per specifiche tecniche, le mappe vengono visualizzate correttamente solo dopo aver accettato i cookie di profilazione.', 'Aus technischen Gründen werden Karten erst nach Zustimmung zu Targeting-Cookies korrekt angezeigt.', 'Pour des raisons techniques, les cartes ne s’affichent correctement qu’après acceptation des cookies de ciblage.', 'Por especificações técnicas, os mapas só são exibidos corretamente após aceitar os cookies de direcionamento.'],
  ['Search on the website', 'Search on the website', 'Cerca nel sito', 'Website durchsuchen', 'Rechercher sur le site', 'Pesquisar no site'],
  ['MAIN TOPICS', 'MAIN TOPICS', 'ARGOMENTI PRINCIPALI', 'HAUPTTHEMEN', 'SUJETS PRINCIPAUX', 'PRINCIPAIS TÓPICOS'],
  ['CONNECTIVITY', 'CONNECTIVITY', 'CONNETTIVITÀ', 'KONNEKTIVITÄT', 'CONNECTIVITÉ', 'CONECTIVIDADE'],
  ['CUSTOMER APP', 'CUSTOMER APP', 'APP CLIENTI', 'KUNDEN-APP', 'APPLICATION CLIENT', 'APP DO CLIENTE'],
  ['MOBILITY PROGRAM', 'MOBILITY PROGRAM', 'PROGRAMMA MOBILITÀ', 'MOBILITÄTSPROGRAMM', 'PROGRAMME DE MOBILITÉ', 'PROGRAMA DE MOBILIDADE'],
  ['CUSTOM SOLUTIONS', 'CUSTOM SOLUTIONS', 'SOLUZIONI PERSONALIZZATE', 'INDIVIDUELLE LÖSUNGEN', 'SOLUTIONS PERSONNALISÉES', 'SOLUÇÕES PERSONALIZADAS'],
  ['CUSTOMIZATION', 'CUSTOMIZATION', 'PERSONALIZZAZIONE', 'INDIVIDUALISIERUNG', 'PERSONNALISATION', 'PERSONALIZAÇÃO'],
  ['ACCESSORIES', 'ACCESSORIES', 'ACCESSORI', 'ZUBEHÖR', 'ACCESSOIRES', 'ACESSÓRIOS'],
  ['The consumption and emissions values on the website refer to your geographical IP. This value might be unrealistic if you navigate using VPN or if the position of your Internet provider is imprecise.', 'The consumption and emissions values on the website refer to your geographical IP. This value might be unrealistic if you navigate using VPN or if the position of your Internet provider is imprecise.', 'I valori di consumo ed emissioni si riferiscono alla posizione geografica associata al tuo IP. Potrebbero non essere realistici se usi una VPN o se la posizione del provider è imprecisa.', 'Die Verbrauchs- und Emissionswerte beziehen sich auf den geografischen Standort Ihrer IP-Adresse. Bei VPN-Nutzung oder ungenauer Standortbestimmung Ihres Internetanbieters können die Werte unrealistisch sein.', 'Les valeurs de consommation et d’émissions correspondent à la localisation géographique de votre adresse IP. Elles peuvent être imprécises en cas d’utilisation d’un VPN ou si la localisation de votre fournisseur Internet est inexacte.', 'Os valores de consumo e emissões se baseiam na localização geográfica do seu IP. Eles podem não ser realistas se você usar VPN ou se a localização do provedor for imprecisa.'],
  ['This site is protected by reCAPTCHA and the Privacy Policy and Terms of Service of Google apply.', 'This site is protected by reCAPTCHA and the Privacy Policy and Terms of Service of Google apply.', 'Questo sito è protetto da reCAPTCHA e si applicano le norme sulla privacy e i termini di servizio di Google.', 'Diese Website wird durch reCAPTCHA geschützt; es gelten die Datenschutzbestimmungen und Nutzungsbedingungen von Google.', 'Ce site est protégé par reCAPTCHA et les règles de confidentialité et conditions d’utilisation de Google s’appliquent.', 'Este site é protegido pelo reCAPTCHA, e aplicam-se a Política de Privacidade e os Termos de Serviço do Google.'],
  ['MODELS', 'MODELS', 'MODELLI', 'MODELLE', 'MODÈLES', 'MODELOS'],
  ['BEYOND', 'BEYOND', 'OLTRE', 'DARÜBER HINAUS', 'AU-DELÀ', 'BEYOND'],
  ['MUSEUM', 'MUSEUM', 'MUSEO', 'MUSEUM', 'MUSÉE', 'MUSEU'],
  ['Design', 'Design', 'Design', 'Design', 'Design', 'Design'],
  ['Financial services', 'Financial services', 'Servizi finanziari', 'Finanzdienstleistungen', 'Services financiers', 'Serviços financeiros'],
  ['Lounge', 'Lounge', 'Lounge', 'Lounge', 'Lounge', 'Lounge'],
  ['Warranty extension', 'Warranty extension', 'Estensione garanzia', 'Garantieverlängerung', 'Extension de garantie', 'Extensão de garantia'],
  ['Driving Programs', 'Driving Programs', 'Programmi di guida', 'Fahrprogramme', 'Programmes de conduite', 'Programas de condução'],
  ['Podcast', 'Podcast', 'Podcast', 'Podcast', 'Podcast', 'Podcast'],
  ['LANGUAGE', 'LANGUAGE', 'LINGUA', 'SPRACHE', 'LANGUE', 'IDIOMA'],
  ['CLOSE', 'CLOSE', 'CHIUDI', 'SCHLIESSEN', 'FERMER', 'FECHAR'],
  ['SEARCH', 'SEARCH', 'CERCA', 'SUCHE', 'RECHERCHER', 'PESQUISAR'],
  ['SERVICE', 'SERVICE', 'ASSISTENZA', 'SERVICE', 'SERVICE', 'SERVIÇO'],
  ['FINANCIAL SERVICES', 'FINANCIAL SERVICES', 'SERVIZI FINANZIARI', 'FINANZDIENSTLEISTUNGEN', 'SERVICES FINANCIERS', 'SERVIÇOS FINANCEIROS'],
  ['FINANCIAL INFORMATION', 'FINANCIAL INFORMATION', 'INFORMAZIONI FINANZIARIE', 'FINANZINFORMATIONEN', 'INFORMATIONS FINANCIÈRES', 'INFORMAÇÕES FINANCEIRAS'],
  ['KEY PERFORMANCE INDICATORS', 'KEY PERFORMANCE INDICATORS', 'INDICATORI CHIAVE DI PERFORMANCE', 'WICHTIGE LEISTUNGSKENNZAHLEN', 'INDICATEURS CLÉS DE PERFORMANCE', 'INDICADORES-CHAVE DE DESEMPENHO'],
  ['CARS DELIVERED', 'CARS DELIVERED', 'VETTURE CONSEGNATE', 'AUSGELIEFERTE FAHRZEUGE', 'VOITURES LIVRÉES', 'VEÍCULOS ENTREGUES'],
  ['TURNOVER', 'TURNOVER', 'FATTURATO', 'UMSATZ', 'CHIFFRE D’AFFAIRES', 'FATURAMENTO'],
  ['OPERATING INCOME', 'OPERATING INCOME', 'RISULTATO OPERATIVO', 'BETRIEBSERGEBNIS', 'RÉSULTAT OPÉRATIONNEL', 'RESULTADO OPERACIONAL'],
  ['RETURN ON SALES', 'RETURN ON SALES', 'ROS', 'UMSATZRENDITE', 'MARGE OPÉRATIONNELLE', 'MARGEM OPERACIONAL'],
  ['FINANCIAL INFORMATION', 'FINANCIAL INFORMATION', 'INFORMAZIONI FINANZIARIE', 'FINANZINFORMATIONEN', 'INFORMATIONS FINANCIÈRES', 'INFORMAÇÕES FINANCEIRAS'],
  ['QUARTERLY FINANCIAL', 'QUARTERLY FINANCIAL', 'DATI FINANZIARI TRIMESTRALI', 'QUARTALSFINANZEN', 'DONNÉES FINANCIÈRES TRIMESTRIELLES', 'INFORMAÇÕES FINANCEIRAS TRIMESTRAIS'],
  ['CAPITAL MARKET EVENTS', 'CAPITAL MARKET EVENTS', 'EVENTI PER IL MERCATO DEI CAPITALI', 'KAPITALMARKTVERANSTALTUNGEN', 'ÉVÉNEMENTS DES MARCHÉS DE CAPITAUX', 'EVENTOS DO MERCADO DE CAPITAIS'],
  ['BOARD MANAGEMENT', 'BOARD MANAGEMENT', 'DIREZIONE AZIENDALE', 'UNTERNEHMENSLEITUNG', 'DIRECTION DE L’ENTREPRISE', 'GESTÃO EXECUTIVA'],
  ['Chairman and Chief Executive Officer', 'Chairman and Chief Executive Officer', 'Presidente e Amministratore Delegato', 'Vorstandsvorsitzender und CEO', 'Président-directeur général', 'Presidente e diretor executivo'],
  ['Chief People, Culture and Organization Officer', 'Chief People, Culture and Organization Officer', 'Direttore People, Cultura e Organizzazione', 'Leiter Personal, Kultur und Organisation', 'Directeur des ressources humaines, de la culture et de l’organisation', 'Diretor de Pessoas, Cultura e Organização'],
  ['Chief Marketing and Sales Officer', 'Chief Marketing and Sales Officer', 'Direttore Marketing e Vendite', 'Leiter Marketing und Vertrieb', 'Directeur marketing et ventes', 'Diretor de Marketing e Vendas'],
  ['Chief Procurement Officer', 'Chief Procurement Officer', 'Direttore Acquisti', 'Leiter Einkauf', 'Directeur des achats', 'Diretor de Suprimentos'],
  ['Chief Manufacturing Officer', 'Chief Manufacturing Officer', 'Direttore Produzione', 'Leiter Produktion', 'Directeur de la production', 'Diretor de Manufatura'],
  ['General Secretary and Chief Strategy Officer', 'General Secretary and Chief Strategy Officer', 'Segretario Generale e Direttore Strategia', 'Generalsekretär und Leiter Strategie', 'Secrétaire général et directeur de la stratégie', 'Secretário-geral e Diretor de Estratégia'],
  ['Managing Director and Chief Financial Officer', 'Managing Director and Chief Financial Officer', 'Amministratore Delegato e Direttore Finanziario', 'Geschäftsführer und Finanzvorstand', 'Directeur général et directeur financier', 'Diretor-geral e diretor financeiro'],
  ['Chief Technical Officer', 'Chief Technical Officer', 'Direttore Tecnico', 'Technischer Leiter', 'Directeur technique', 'Diretor Técnico'],
  ['CERTIFICATIONS', 'CERTIFICATIONS', 'CERTIFICAZIONI', 'ZERTIFIZIERUNGEN', 'CERTIFICATIONS', 'CERTIFICAÇÕES'],
  ['OFFICIAL COMPANY SITE', 'OFFICIAL COMPANY SITE', 'SITO UFFICIALE DELL’AZIENDA', 'OFFIZIELLE UNTERNEHMENSWEBSITE', 'SITE OFFICIEL DE L’ENTREPRISE', 'SITE OFICIAL DA EMPRESA'],
  ['OPEN POSITIONS', 'OPEN POSITIONS', 'POSIZIONI APERTE', 'OFFENE STELLEN', 'POSTES À POURVOIR', 'VAGAS ABERTAS'],
  ['EARLY CAREERS', 'EARLY CAREERS', 'PRIME ESPERIENZE PROFESSIONALI', 'BERUFSEINSTIEG', 'DÉBUT DE CARRIÈRE', 'INÍCIO DE CARREIRA'],
  ['STUDENTS AND GRADUATES', 'STUDENTS AND GRADUATES', 'STUDENTI E NEOLAUREATI', 'STUDIERENDE UND ABSOLVENTEN', 'ÉTUDIANTS ET DIPLÔMÉS', 'ESTUDANTES E RECÉM-FORMADOS'],
  ['INTERNSHIPS', 'INTERNSHIPS', 'TIROCINI', 'PRAKTIKA', 'STAGES', 'ESTÁGIOS'],
  ['PEOPLE AND CULTURE', 'PEOPLE AND CULTURE', 'PERSONE E CULTURA', 'MENSCHEN UND KULTUR', 'PERSONNES ET CULTURE', 'PESSOAS E CULTURA'],
  ['OPPORTUNITIES FOR STUDENTS AND FRESH GRADUATES', 'OPPORTUNITIES FOR STUDENTS AND FRESH GRADUATES', 'OPPORTUNITÀ PER STUDENTI E NEOLAUREATI', 'CHANCEN FÜR STUDIERENDE UND BERUFSANFÄNGER', 'OPPORTUNITÉS POUR LES ÉTUDIANTS ET JEUNES DIPLÔMÉS', 'OPORTUNIDADES PARA ESTUDANTES E RECÉM-FORMADOS'],
  ['TECHNOLOGICAL AND SOCIAL INNOVATION', 'TECHNOLOGICAL AND SOCIAL INNOVATION', 'INNOVAZIONE TECNOLOGICA E SOCIALE', 'TECHNOLOGISCHE UND SOZIALE INNOVATION', 'INNOVATION TECHNOLOGIQUE ET SOCIALE', 'INOVAÇÃO TECNOLÓGICA E SOCIAL'],
  ['EXPLORE THE COMPANY', 'EXPLORE THE COMPANY', 'ESPLORA L’AZIENDA', 'DAS UNTERNEHMEN ENTDECKEN', 'DÉCOUVRIR L’ENTREPRISE', 'EXPLORE A EMPRESA'],
  ['MADE IN SANT’AGATA BOLOGNESE', 'MADE IN SANT’AGATA BOLOGNESE', 'NATA A SANT’AGATA BOLOGNESE', 'MADE IN SANT’AGATA BOLOGNESE', 'NÉE À SANT’AGATA BOLOGNESE', 'FEITA EM SANT’AGATA BOLOGNESE'],
  ['LANDMARKS', 'LANDMARKS', 'TAPPE FONDAMENTALI', 'MEILENSTEINE', 'DATES MARQUANTES', 'MARCOS HISTÓRICOS'],
  ['FULL HISTORY', 'FULL HISTORY', 'STORIA COMPLETA', 'GESAMTE GESCHICHTE', 'HISTOIRE COMPLÈTE', 'HISTÓRIA COMPLETA'],
  ['LEADERSHIP', 'LEADERSHIP', 'LEADERSHIP', 'FÜHRUNG', 'DIRECTION', 'LIDERANÇA'],
  ['STANDARDS AND RESPONSIBILITY', 'STANDARDS AND RESPONSIBILITY', 'STANDARD E RESPONSABILITÀ', 'STANDARDS UND VERANTWORTUNG', 'NORMES ET RESPONSABILITÉ', 'PADRÕES E RESPONSABILIDADE'],
  ['COOKIE SETTINGS', 'COOKIE SETTINGS', 'IMPOSTAZIONI COOKIE', 'COOKIE-EINSTELLUNGEN', 'PARAMÈTRES DES COOKIES', 'CONFIGURAÇÕES DE COOKIES'],
  ['Follow us on:', 'Follow us on:', 'Seguici su:', 'Folgen Sie uns:', 'Suivez-nous :', 'Siga-nos:'],
  ['The consumption and emissions values in the website refer to your geographical IP...', 'The consumption and emissions values on the website refer to your geographical IP...', 'I valori di consumo ed emissioni sul sito si riferiscono alla posizione geografica associata al tuo IP...', 'Die Verbrauchs- und Emissionswerte auf der Website beziehen sich auf den geografischen Standort Ihrer IP-Adresse...', 'Les valeurs de consommation et d’émissions du site correspondent à la localisation géographique de votre adresse IP...', 'Os valores de consumo e emissões no site referem-se à sua localização geográfica identificada pelo IP...'],
  ['Copyright © 2026 Automobili Lamborghini S.p.A. a company with sole shareholder subject to the management and coordination of AUDI AG. All rights reserved.', 'Copyright © 2026 Automobili Lamborghini S.p.A., a company with sole shareholder subject to the management and coordination of AUDI AG. All rights reserved.', 'Copyright © 2026 Automobili Lamborghini S.p.A., società con socio unico soggetta all’attività di direzione e coordinamento di AUDI AG. Tutti i diritti riservati.', 'Copyright © 2026 Automobili Lamborghini S.p.A., Gesellschaft mit Alleingesellschafter unter Leitung und Koordination der AUDI AG. Alle Rechte vorbehalten.', 'Copyright © 2026 Automobili Lamborghini S.p.A., société à associé unique soumise à la direction et à la coordination d’AUDI AG. Tous droits réservés.', 'Copyright © 2026 Automobili Lamborghini S.p.A., empresa com acionista único sujeita à gestão e coordenação da AUDI AG. Todos os direitos reservados.'],
  ['INICIAR CONFIGURACAO', 'START CONFIGURATION', 'INIZIA LA CONFIGURAZIONE', 'KONFIGURATION STARTEN', 'DÉMARRER LA CONFIGURATION', 'INICIAR CONFIGURAÇÃO'],
  ['INICIAR CONFIGURAÇÃO', 'START CONFIGURATION', 'INIZIA LA CONFIGURAZIONE', 'KONFIGURATION STARTEN', 'DÉMARRER LA CONFIGURATION', 'INICIAR CONFIGURAÇÃO'],
  ['POTENCIA', 'POWER', 'POTENZA', 'LEISTUNG', 'PUISSANCE', 'POTÊNCIA'],
  ['VELOCIDADE MAX.', 'TOP SPEED', 'VELOCITÀ MASSIMA', 'HÖCHSTGESCHWINDIGKEIT', 'VITESSE MAXIMALE', 'VELOCIDADE MÁX.'],
  ['POWERTRAIN', 'POWERTRAIN', 'GRUPPO MOTOPROPULSORE', 'ANTRIEBSSTRANG', 'GROUPE MOTOPROPULSEUR', 'CONJUNTO MOTRIZ'],
  ['PERFORMANCE', 'PERFORMANCE', 'PRESTAZIONI', 'PERFORMANCE', 'PERFORMANCES', 'DESEMPENHO'],
  ['ENGINE', 'ENGINE', 'MOTORE', 'MOTOR', 'MOTEUR', 'MOTOR'],
  ['HYBRID', 'HYBRID', 'IBRIDO', 'HYBRID', 'HYBRIDE', 'HÍBRIDO'],
  ['POWER', 'POWER', 'POTENZA', 'LEISTUNG', 'PUISSANCE', 'POTÊNCIA'],
  ['TOP SPEED', 'TOP SPEED', 'VELOCITÀ MASSIMA', 'HÖCHSTGESCHWINDIGKEIT', 'VITESSE MAXIMALE', 'VELOCIDADE MÁXIMA'],
  ['MAX POWER', 'MAX POWER', 'POTENZA MASSIMA', 'MAXIMALE LEISTUNG', 'PUISSANCE MAXIMALE', 'POTÊNCIA MÁXIMA'],
  ['The legend lives on', 'The legend lives on', 'La leggenda continua', 'Die Legende lebt weiter', 'La légende perdure', 'A lenda continua'],
  ['A revolution on four wheels', 'A revolution on four wheels', 'Una rivoluzione su quattro ruote', 'Eine Revolution auf vier Rädern', 'Une révolution sur quatre roues', 'Uma revolução sobre quatro rodas'],
  ['Presented in 1966, the Lamborghini Miura changed the world of high-performance sports cars. Its central V12 engine and revolutionary design established a new concept of the supercar.', 'Presented in 1966, the Lamborghini Miura changed the world of high-performance sports cars. Its central V12 engine and revolutionary design established a new concept of the supercar.', 'Presentata nel 1966, Lamborghini Miura ha cambiato il mondo delle sportive ad alte prestazioni. Il V12 centrale e il design rivoluzionario hanno definito un nuovo concetto di supersportiva.', 'Der 1966 vorgestellte Lamborghini Miura veränderte die Welt der leistungsstarken Sportwagen. Sein mittiger V12 und das revolutionäre Design begründeten ein neues Supersportwagen-Konzept.', 'Présentée en 1966, la Lamborghini Miura a transformé le monde des sportives de haute performance. Son V12 central et son design révolutionnaire ont créé un nouveau concept de supercar.', 'Apresentado em 1966, o Lamborghini Miura mudou o mundo dos esportivos de alto desempenho. Seu V12 central e design revolucionário estabeleceram um novo conceito de supercarro.'],
  ['The Miura became famous for its low and aggressive silhouette. Every line was created to express speed, elegance and performance.', 'The Miura became famous for its low and aggressive silhouette. Every line was created to express speed, elegance and performance.', 'Miura è diventata famosa per la sua silhouette bassa e aggressiva. Ogni linea esprime velocità, eleganza e prestazioni.', 'Der Miura wurde durch seine flache, aggressive Silhouette berühmt. Jede Linie bringt Geschwindigkeit, Eleganz und Leistung zum Ausdruck.', 'La Miura est devenue célèbre pour sa silhouette basse et agressive. Chaque ligne exprime vitesse, élégance et performance.', 'O Miura ficou famoso por sua silhueta baixa e agressiva. Cada linha expressa velocidade, elegância e desempenho.'],
  ['THE QUANTUM LEAP IN DRIVING EXPERIENCE', 'THE QUANTUM LEAP IN DRIVING EXPERIENCE', 'IL SALTO QUANTICO NELL’ESPERIENZA DI GUIDA', 'DER QUANTENSPRUNG IM FAHRERLEBNIS', 'UN BOND QUANTIQUE DANS L’EXPÉRIENCE DE CONDUITE', 'UM SALTO QUÂNTICO NA EXPERIÊNCIA DE CONDUÇÃO'],
  ['SHAPED BY THE WIND', 'SHAPED BY THE WIND', 'PLASMATA DAL VENTO', 'VOM WIND GEFORMT', 'SCULPTÉE PAR LE VENT', 'MOLDADO PELO VENTO'],
  ['HEART OF A MONSTER', 'HEART OF A MONSTER', 'IL CUORE DI UN MOSTRO', 'DAS HERZ EINES MONSTERS', 'LE CŒUR D’UN MONSTRE', 'CORAÇÃO DE UM MONSTRO'],
  ['TECHNICAL DATA', 'TECHNICAL DATA', 'DATI TECNICI', 'TECHNISCHE DATEN', 'DONNÉES TECHNIQUES', 'DADOS TÉCNICOS'],
  ['DISPLACEMENT', 'DISPLACEMENT', 'CILINDRATA', 'HUBRAUM', 'CYLINDRÉE', 'CILINDRADA'],
  ['ENGINE TYPE', 'ENGINE TYPE', 'TIPO DI MOTORE', 'MOTORTYP', 'TYPE DE MOTEUR', 'TIPO DE MOTOR'],
  ['V12 Naturally Aspirated + 3 Electric Motors', 'V12 Naturally Aspirated + 3 Electric Motors', 'V12 aspirato + 3 motori elettrici', 'V12-Saugmotor + 3 Elektromotoren', 'V12 atmosphérique + 3 moteurs électriques', 'V12 aspirado + 3 motores elétricos'],
  ['COMBINED MAX POWER', 'COMBINED MAX POWER', 'POTENZA MASSIMA COMPLESSIVA', 'MAXIMALE SYSTEMLEISTUNG', 'PUISSANCE MAXIMALE COMBINÉE', 'POTÊNCIA MÁXIMA COMBINADA'],
  ['8-Speed Dual Clutch Automatic', '8-Speed Dual Clutch Automatic', 'Cambio automatico a doppia frizione a 8 rapporti', '8-Gang-Automatik-Doppelkupplungsgetriebe', 'Boîte automatique à double embrayage à 8 rapports', 'Transmissão automática de dupla embreagem de 8 marchas'],
  ['All-Wheel Drive (AWD with Torque Vectoring)', 'All-Wheel Drive (AWD with Torque Vectoring)', 'Trazione integrale (AWD con torque vectoring)', 'Allradantrieb (AWD mit Torque Vectoring)', 'Transmission intégrale (AWD avec vectorisation du couple)', 'Tração integral (AWD com vetorização de torque)'],
  ['Carbon Fiber Monofuselage', 'Carbon Fiber Monofuselage', 'Monoscocca in fibra di carbonio', 'Carbonfaser-Monocoque', 'Monocoque en fibre de carbone', 'Monocoque de fibra de carbono'],
  ['2.4 seconds', '2.4 seconds', '2,4 secondi', '2,4 Sekunden', '2,4 secondes', '2,4 segundos'],
  ['POWER. PERFORMANCE. ELECTRIFIED.', 'POWER. PERFORMANCE. ELECTRIFIED.', 'POTENZA. PRESTAZIONI. ELETTRIFICATA.', 'LEISTUNG. PERFORMANCE. ELEKTRIFIZIERT.', 'PUISSANCE. PERFORMANCE. ÉLECTRIFIÉE.', 'POTÊNCIA. DESEMPENHO. ELETRIFICADO.'],
  ['THE NEW GENERATION', 'THE NEW GENERATION', 'LA NUOVA GENERAZIONE', 'DIE NEUE GENERATION', 'LA NOUVELLE GÉNÉRATION', 'A NOVA GERAÇÃO'],
  ['BOLD ATTITUDE', 'BOLD ATTITUDE', 'CARATTERE AUDACE', 'KRAFTVOLLER AUFTRITT', 'CARACTÈRE AFFIRMÉ', 'ATITUDE OUSADA'],
  ['V8 HYBRID POWER', 'V8 HYBRID POWER', 'POTENZA IBRIDA V8', 'V8-HYBRIDLEISTUNG', 'PUISSANCE HYBRIDE V8', 'POTÊNCIA HÍBRIDA V8'],
  ['DRIVING EXPERIENCE', 'DRIVING EXPERIENCE', 'ESPERIENZA DI GUIDA', 'FAHRERLEBNIS', 'EXPÉRIENCE DE CONDUITE', 'EXPERIÊNCIA DE CONDUÇÃO'],
  ['EVERY ROAD. YOUR WAY.', 'EVERY ROAD. YOUR WAY.', 'OGNI STRADA. A MODO TUO.', 'JEDE STRASSE. DEIN WEG.', 'CHAQUE ROUTE. À VOTRE FAÇON.', 'CADA ESTRADA. DO SEU JEITO.'],
  ['Different driving modes allow the Urus SE to adapt to different road conditions while maintaining the unmistakable Lamborghini character.', 'Different driving modes allow the Urus SE to adapt to different road conditions while maintaining the unmistakable Lamborghini character.', 'Le diverse modalità di guida consentono a Urus SE di adattarsi alle condizioni stradali mantenendo l’inconfondibile carattere Lamborghini.', 'Verschiedene Fahrmodi passen den Urus SE an unterschiedliche Straßenbedingungen an, ohne seinen Lamborghini Charakter zu verlieren.', 'Les modes de conduite permettent à Urus SE de s’adapter aux conditions de route tout en préservant le caractère inimitable de Lamborghini.', 'Os diferentes modos de condução permitem ao Urus SE se adaptar à estrada sem perder o caráter inconfundível da Lamborghini.'],
  ['The Urus SE combines the performance and distinctive design of Lamborghini with an electrified powertrain. It represents a new chapter for the Super SUV.', 'The Urus SE combines the performance and distinctive design of Lamborghini with an electrified powertrain. It represents a new chapter for the Super SUV.', 'Urus SE combina le prestazioni e il design distintivo Lamborghini con una motorizzazione elettrificata. È un nuovo capitolo per il Super SUV.', 'Der Urus SE verbindet die Leistung und das unverwechselbare Design von Lamborghini mit einem elektrifizierten Antrieb. Er schlägt ein neues Kapitel für den Super SUV auf.', 'Urus SE associe les performances et le design distinctif de Lamborghini à une motorisation électrifiée. Il ouvre un nouveau chapitre pour le Super SUV.', 'O Urus SE combina o desempenho e o design marcante da Lamborghini com um conjunto motriz eletrificado. É um novo capítulo para o Super SUV.'],
  ['Sharp lines, powerful proportions and unmistakable Lamborghini details give the Urus SE a strong and aggressive presence on the road.', 'Sharp lines, powerful proportions and unmistakable Lamborghini details give the Urus SE a strong and aggressive presence on the road.', 'Linee affilate, proporzioni imponenti e dettagli Lamborghini conferiscono a Urus SE una presenza forte e grintosa su strada.', 'Scharfe Linien, kraftvolle Proportionen und unverwechselbare Lamborghini Details verleihen dem Urus SE eine starke Präsenz auf der Straße.', 'Des lignes acérées, des proportions puissantes et des détails Lamborghini donnent à Urus SE une présence affirmée sur la route.', 'Linhas marcantes, proporções poderosas e detalhes Lamborghini dão ao Urus SE uma presença forte e agressiva na estrada.'],
  ['The fascinating history, iconic models and tours of the production lines reveal 60 years of innovation driving Lamborghini into the future.', 'The fascinating history, iconic models and tours of the production lines reveal 60 years of innovation driving Lamborghini into the future.', 'La storia affascinante, i modelli iconici e i tour delle linee produttive raccontano 60 anni di innovazione che proiettano Lamborghini nel futuro.', 'Die faszinierende Geschichte, ikonische Modelle und Führungen durch die Produktionslinien zeigen 60 Jahre Innovation, mit denen Lamborghini in die Zukunft fährt.', 'Une histoire fascinante, des modèles emblématiques et des visites des lignes de production dévoilent 60 ans d’innovation qui propulsent Lamborghini vers l’avenir.', 'A história fascinante, os modelos icônicos e as visitas às linhas de produção revelam 60 anos de inovação que levam a Lamborghini rumo ao futuro.'],
  ['Due to technical specifications, maps are only displayed correctly after accepting Targeting Cookies.', 'Due to technical specifications, maps are only displayed correctly after accepting Targeting Cookies.', 'Per specifiche tecniche, le mappe vengono visualizzate correttamente solo dopo aver accettato i cookie di profilazione.', 'Aus technischen Gründen werden Karten erst nach Zustimmung zu Targeting-Cookies korrekt angezeigt.', 'Pour des raisons techniques, les cartes ne s’affichent correctement qu’après acceptation des cookies de ciblage.', 'Por especificações técnicas, os mapas só são exibidos corretamente após aceitar os cookies de direcionamento.'],
  ['Search on the website', 'Search on the website', 'Cerca nel sito', 'Website durchsuchen', 'Rechercher sur le site', 'Pesquisar no site'],
  ['MAIN TOPICS', 'MAIN TOPICS', 'ARGOMENTI PRINCIPALI', 'HAUPTTHEMEN', 'SUJETS PRINCIPAUX', 'PRINCIPAIS TÓPICOS'],
  ['CONNECTIVITY', 'CONNECTIVITY', 'CONNETTIVITÀ', 'KONNEKTIVITÄT', 'CONNECTIVITÉ', 'CONECTIVIDADE'],
  ['CUSTOMER APP', 'CUSTOMER APP', 'APP CLIENTI', 'KUNDEN-APP', 'APPLICATION CLIENT', 'APP DO CLIENTE'],
  ['MOBILITY PROGRAM', 'MOBILITY PROGRAM', 'PROGRAMMA MOBILITÀ', 'MOBILITÄTSPROGRAMM', 'PROGRAMME DE MOBILITÉ', 'PROGRAMA DE MOBILIDADE'],
  ['CUSTOM SOLUTIONS', 'CUSTOM SOLUTIONS', 'SOLUZIONI PERSONALIZZATE', 'INDIVIDUELLE LÖSUNGEN', 'SOLUTIONS PERSONNALISÉES', 'SOLUÇÕES PERSONALIZADAS'],
  ['CUSTOMIZATION', 'CUSTOMIZATION', 'PERSONALIZZAZIONE', 'INDIVIDUALISIERUNG', 'PERSONNALISATION', 'PERSONALIZAÇÃO'],
  ['ACCESSORIES', 'ACCESSORIES', 'ACCESSORI', 'ZUBEHÖR', 'ACCESSOIRES', 'ACESSÓRIOS'],
  ['Alterar idioma', 'Change language', 'Cambia lingua', 'Sprache ändern', 'Changer de langue', 'Alterar idioma'],
  ['Selecione o idioma do configurador', 'Select the configurator language', 'Seleziona la lingua del configuratore', 'Sprache des Konfigurators auswählen', 'Sélectionnez la langue du configurateur', 'Selecione o idioma do configurador'],
  ['Ingles', 'English', 'Inglese', 'Englisch', 'Anglais', 'Inglês'],
  ['Alemao', 'German', 'Tedesco', 'Deutsch', 'Allemand', 'Alemão'],
  ['Italiano', 'Italian', 'Italiano', 'Italienisch', 'Italien', 'Italiano'],
  ['Chines', 'French', 'Francese', 'Französisch', 'Français', 'Francês'],
  ['Japones', 'Portuguese', 'Portoghese', 'Portugiesisch', 'Portugais', 'Português'],
  ['Nenhuma configuracao disponivel', 'No configuration available', 'Nessuna configurazione disponibile', 'Keine Konfiguration verfügbar', 'Aucune configuration disponible', 'Nenhuma configuração disponível'],
  ['Como nenhum carro esta selecionado no momento, nao e possivel gerar o L-Code. Tente novamente depois de iniciar uma configuracao.', 'No car is currently selected, so an L-Code cannot be generated. Try again after starting a configuration.', 'Al momento non è selezionata alcuna vettura, quindi non è possibile generare un L-Code. Riprova dopo aver avviato una configurazione.', 'Da derzeit kein Fahrzeug ausgewählt ist, kann kein L-Code erstellt werden. Versuchen Sie es erneut, nachdem Sie eine Konfiguration gestartet haben.', 'Aucune voiture n’est sélectionnée pour le moment, le L-Code ne peut donc pas être généré. Réessayez après avoir commencé une configuration.', 'Como nenhum carro está selecionado no momento, não é possível gerar um L-Code. Tente novamente depois de iniciar uma configuração.'],
  ['Carregar uma configuracao', 'Load a configuration', 'Carica una configurazione', 'Konfiguration laden', 'Charger une configuration', 'Carregar uma configuração'],
  ['Use um L-Code para editar uma configuracao anterior', 'Use an L-Code to edit a previous configuration', 'Usa un L-Code per modificare una configurazione precedente', 'Verwenden Sie einen L-Code, um eine frühere Konfiguration zu bearbeiten', 'Utilisez un L-Code pour modifier une configuration précédente', 'Use um L-Code para editar uma configuração anterior'],
  ['Insira o L-Code aqui', 'Enter the L-Code here', 'Inserisci qui il L-Code', 'L-Code hier eingeben', 'Saisissez le L-Code ici', 'Insira o L-Code aqui'],
  ['CANCELAR', 'CANCEL', 'ANNULLA', 'ABBRECHEN', 'ANNULER', 'CANCELAR'],
  ['CONFIRMAR', 'CONFIRM', 'CONFERMA', 'BESTÄTIGEN', 'CONFIRMER', 'CONFIRMAR'],
  ['PRIVACIDADE E TERMOS', 'PRIVACY AND TERMS', 'PRIVACY E CONDIZIONI', 'DATENSCHUTZ UND BEDINGUNGEN', 'CONFIDENTIALITÉ ET CONDITIONS', 'PRIVACIDADE E TERMOS'],
  ['O veiculo ainda nao esta a venda e, portanto, nao esta sujeito a Diretiva 1999/94/CE. Os dados de consumo de combustivel e emissoes estao em fase de homologacao.', 'The vehicle is not yet on sale and is therefore not subject to Directive 1999/94/EC. Fuel consumption and emissions data are being homologated.', 'Il veicolo non è ancora in vendita e pertanto non è soggetto alla Direttiva 1999/94/CE. I dati relativi a consumi ed emissioni sono in fase di omologazione.', 'Das Fahrzeug ist noch nicht im Verkauf und unterliegt daher nicht der Richtlinie 1999/94/EG. Verbrauchs- und Emissionsdaten befinden sich in der Homologationsphase.', 'Le véhicule n’est pas encore commercialisé et n’est donc pas soumis à la directive 1999/94/CE. Les données de consommation et d’émissions sont en cours d’homologation.', 'O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE. Os dados de consumo de combustível e emissões estão em fase de homologação.'],
  ['The consumption and emissions values on the website refer to your geographical IP. This value might be unrealistic if you navigate using VPN or if the position of your Internet provider is imprecise.', 'The consumption and emissions values on the website refer to your geographical IP. This value might be unrealistic if you navigate using VPN or if the position of your Internet provider is imprecise.', 'I valori di consumo ed emissioni si riferiscono alla posizione geografica associata al tuo IP. Potrebbero non essere realistici se usi una VPN o se la posizione del provider è imprecisa.', 'Die Verbrauchs- und Emissionswerte beziehen sich auf den geografischen Standort Ihrer IP-Adresse. Bei VPN-Nutzung oder ungenauer Standortbestimmung Ihres Internetanbieters können die Werte unrealistisch sein.', 'Les valeurs de consommation et d’émissions correspondent à la localisation géographique de votre adresse IP. Elles peuvent être imprécises en cas d’utilisation d’un VPN ou si la localisation de votre fournisseur Internet est inexacte.', 'Os valores de consumo e emissões se baseiam na localização geográfica do seu IP. Eles podem não ser realistas se você usar VPN ou se a localização do provedor for imprecisa.'],
  ['This site is protected by reCAPTCHA and the Privacy Policy and Terms of Service of Google apply.', 'This site is protected by reCAPTCHA and the Privacy Policy and Terms of Service of Google apply.', 'Questo sito è protetto da reCAPTCHA e si applicano le norme sulla privacy e i termini di servizio di Google.', 'Diese Website wird durch reCAPTCHA geschützt; es gelten die Datenschutzbestimmungen und Nutzungsbedingungen von Google.', 'Ce site est protégé par reCAPTCHA et les règles de confidentialité et conditions d’utilisation de Google s’appliquent.', 'Este site é protegido pelo reCAPTCHA, e aplicam-se a Política de Privacidade e os Termos de Serviço do Google.'],
  ['Home', 'Home', 'Home', 'Startseite', 'Accueil', 'Início'],
  ['HOME', 'HOME', 'HOME', 'STARTSEITE', 'ACCUEIL', 'INÍCIO'],
  ['OWNERSHIP', 'OWNERSHIP', 'SERVIZI PER I CLIENTI', 'FAHRZEUGBESITZ', 'SERVICES AUX CLIENTS', 'PROPRIETÁRIOS'],
  ['STORE', 'STORE', 'STORE', 'SHOP', 'BOUTIQUE', 'LOJA'],
  ['DEALERSHIPS', 'DEALERSHIPS', 'CONCESSIONARI', 'HÄNDLER', 'CONCESSIONNAIRES', 'CONCESSIONÁRIAS'],
  ['MOTORSPORT', 'MOTORSPORT', 'MOTORSPORT', 'MOTORSPORT', 'MOTORSPORT', 'MOTORSPORT'],
  ['SUSTAINABILITY', 'SUSTAINABILITY', 'SOSTENIBILITÀ', 'NACHHALTIGKEIT', 'DURABILITÉ', 'SUSTENTABILIDADE'],
  ['NEWS', 'NEWS', 'NEWS', 'NEWS', 'ACTUALITÉS', 'NOTÍCIAS'],
  ['HISTORY', 'HISTORY', 'STORIA', 'GESCHICHTE', 'HISTOIRE', 'HISTÓRIA'],
  ['History', 'History', 'Storia', 'Geschichte', 'Histoire', 'História'],
  ['Showroom', 'Showroom', 'Showroom', 'Showroom', 'Showroom', 'Showroom'],
  ['Service', 'Service', 'Assistenza', 'Service', 'Service', 'Serviço'],
  ['Collision center', 'Collision center', 'Centro riparazione sinistri', 'Karosseriezentrum', 'Centre de réparation carrosserie', 'Centro de colisão'],
  ['Search Country/Sales Region', 'Search Country/Sales Region', 'Cerca paese/regione di vendita', 'Land/Vertriebsregion suchen', 'Rechercher un pays/une région commerciale', 'Pesquisar país/região de vendas'],
  ['NEAR YOU', 'NEAR YOU', 'VICINO A TE', 'IN IHRER NÄHE', 'PRÈS DE CHEZ VOUS', 'PERTO DE VOCÊ'],
  ['AUSTRALIA', 'AUSTRALIA', 'AUSTRALIA', 'AUSTRALIEN', 'AUSTRALIE', 'AUSTRÁLIA'],
  ['AUSTRIA', 'AUSTRIA', 'AUSTRIA', 'ÖSTERREICH', 'AUTRICHE', 'ÁUSTRIA'],
  ['AZERBAIJAN', 'AZERBAIJAN', 'AZERBAIGIAN', 'ASERBAIDSCHAN', 'AZERBAÏDJAN', 'AZERBAIJÃO'],
  ['Map', 'Map', 'Mappa', 'Karte', 'Carte', 'Mapa'],
  ['Satellite', 'Satellite', 'Satellite', 'Satellit', 'Satellite', 'Satélite'],
  ['Search on the website', 'Search on the website', 'Cerca nel sito', 'Website durchsuchen', 'Rechercher sur le site', 'Pesquisar no site'],
  ['MAIN TOPICS', 'MAIN TOPICS', 'ARGOMENTI PRINCIPALI', 'HAUPTTHEMEN', 'SUJETS PRINCIPAUX', 'PRINCIPAIS TÓPICOS'],
  ['CONNECTIVITY', 'CONNECTIVITY', 'CONNETTIVITÀ', 'KONNEKTIVITÄT', 'CONNECTIVITÉ', 'CONECTIVIDADE'],
  ['CUSTOMER APP', 'CUSTOMER APP', 'APP CLIENTI', 'KUNDEN-APP', 'APPLICATION CLIENT', 'APP DO CLIENTE'],
  ['MOBILITY PROGRAM', 'MOBILITY PROGRAM', 'PROGRAMMA MOBILITÀ', 'MOBILITÄTSPROGRAMM', 'PROGRAMME DE MOBILITÉ', 'PROGRAMA DE MOBILIDADE'],
  ['CUSTOM SOLUTIONS', 'CUSTOM SOLUTIONS', 'SOLUZIONI PERSONALIZZATE', 'INDIVIDUELLE LÖSUNGEN', 'SOLUTIONS PERSONNALISÉES', 'SOLUÇÕES PERSONALIZADAS'],
  ['CUSTOMIZATION', 'CUSTOMIZATION', 'PERSONALIZZAZIONE', 'INDIVIDUALISIERUNG', 'PERSONNALISATION', 'PERSONALIZAÇÃO'],
  ['ACCESSORIES', 'ACCESSORIES', 'ACCESSORI', 'ZUBEHÖR', 'ACCESSOIRES', 'ACESSÓRIOS'],
  ['HISTÓRIA', 'HISTORY', 'STORIA', 'GESCHICHTE', 'HISTOIRE', 'HISTÓRIA'],
  ['EXPLORE A HISTÓRIA', 'EXPLORE THE HISTORY', 'ESPLORA LA STORIA', 'GESCHICHTE ENTDECKEN', 'DÉCOUVRIR L’HISTOIRE', 'EXPLORE A HISTÓRIA'],
  ['MODELOS ICÔNICOS', 'ICONIC MODELS', 'MODELLI ICONICI', 'IKONISCHE MODELLE', 'MODÈLES EMBLÉMATIQUES', 'MODELOS ICÔNICOS'],
  ['LINHA DO TEMPO', 'TIMELINE', 'CRONOLOGIA', 'ZEITLEISTE', 'CHRONOLOGIE', 'LINHA DO TEMPO'],
  ['ORIGENS', 'ORIGINS', 'ORIGINI', 'URSPRÜNGE', 'ORIGINES', 'ORIGENS'],
  ['O EMBLEMA', 'THE EMBLEM', 'L’EMBLEMA', 'DAS EMBLEM', 'L’EMBLÈME', 'O EMBLEMA'],
  ['UMA IDEIA QUE VIROU LENDA', 'AN IDEA THAT BECAME A LEGEND', 'UN’IDEA DIVENTATA LEGGENDA', 'EINE IDEE WURDE ZUR LEGENDE', 'UNE IDÉE DEVENUE LÉGENDE', 'UMA IDEIA QUE VIROU LENDA'],
  ['OUSADIA', 'BOLDNESS', 'AUDACIA', 'KÜHNHEIT', 'AUDACE', 'OUSADIA'],
  ['EM MOVIMENTO.', 'IN MOTION.', 'IN MOVIMENTO.', 'IN BEWEGUNG.', 'EN MOUVEMENT.', 'EM MOVIMENTO.'],
  ['Desde 1963, a Lamborghini transforma engenharia e design em carros feitos para desafiar expectativas. Uma história de ideias radicais, linhas inconfundíveis e motores que fizeram época.', 'Since 1963, Lamborghini has transformed engineering and design into cars made to challenge expectations. A story of radical ideas, unmistakable lines and era-defining engines.', 'Dal 1963, Lamborghini trasforma ingegneria e design in vetture che sfidano le aspettative. Una storia di idee radicali, linee inconfondibili e motori entrati nella storia.', 'Seit 1963 verwandelt Lamborghini Ingenieurskunst und Design in Fahrzeuge, die Erwartungen herausfordern. Eine Geschichte radikaler Ideen, unverwechselbarer Linien und legendärer Motoren.', 'Depuis 1963, Lamborghini transforme l’ingénierie et le design en voitures qui repoussent les attentes. Une histoire d’idées radicales, de lignes inimitables et de moteurs légendaires.', 'Desde 1963, a Lamborghini transforma engenharia e design em carros que desafiam expectativas. Uma história de ideias radicais, linhas inconfundíveis e motores marcantes.'],
  ['ÍCONES DE CADA GERAÇÃO', 'ICONS OF EVERY GENERATION', 'ICONE DI OGNI GENERAZIONE', 'IKONEN JEDER GENERATION', 'ICÔNES DE CHAQUE GÉNÉRATION', 'ÍCONES DE CADA GERAÇÃO'],
  ['OBRAS-PRIMAS', 'MASTERPIECES', 'CAPOLAVORI', 'MEISTERWERKE', 'CHEFS-D’ŒUVRE', 'OBRAS-PRIMAS'],
  ['1964 — HOJE', '1964 — TODAY', '1964 — OGGI', '1964 — HEUTE', '1964 — AUJOURD’HUI', '1964 — HOJE'],
  ['O primeiro capítulo', 'The first chapter', 'Il primo capitolo', 'Das erste Kapitel', 'Le premier chapitre', 'O primeiro capítulo'],
  ['Uma nova silhueta', 'A new silhouette', 'Una nuova silhouette', 'Eine neue Silhouette', 'Une nouvelle silhouette', 'Uma nova silhueta'],
  ['Espírito sem limites', 'Boundless spirit', 'Spirito senza limiti', 'Grenzenloser Geist', 'Un esprit sans limites', 'Espírito sem limites'],
  ['Velocidade extrema', 'Extreme speed', 'Velocità estrema', 'Extreme Geschwindigkeit', 'Vitesse extrême', 'Velocidade extrema'],
  ['A evolução do V12', 'The evolution of the V12', 'L’evoluzione del V12', 'Die Evolution des V12', 'L’évolution du V12', 'A evolução do V12'],
  ['Uma nova categoria', 'A new category', 'Una nuova categoria', 'Eine neue Kategorie', 'Une nouvelle catégorie', 'Uma nova categoria'],
  ['VER TODOS OS MODELOS', 'VIEW ALL MODELS', 'VEDI TUTTI I MODELLI', 'ALLE MODELLE ANSEHEN', 'VOIR TOUS LES MODÈLES', 'VER TODOS OS MODELOS'],
  ['MARCOS', 'MILESTONES', 'TAPPE', 'MEILENSTEINE', 'JALONS', 'MARCOS'],
  ['Momentos que aceleraram a história.', 'Moments that accelerated history.', 'Momenti che hanno accelerato la storia.', 'Momente, die Geschichte beschleunigten.', 'Des moments qui ont accéléré l’histoire.', 'Momentos que aceleraram a história.'],
  ['TODOS', 'ALL', 'TUTTI', 'ALLE', 'TOUS', 'TODOS'],
  ['UMA NOVA MARCA NASCE', 'A NEW BRAND IS BORN', 'NASCE UN NUOVO MARCHIO', 'EINE NEUE MARKE ENTSTEHT', 'NAISSANCE D’UNE NOUVELLE MARQUE', 'UMA NOVA MARCA NASCE'],
  ['Ferruccio Lamborghini funda a empresa em Sant’Agata Bolognese, na Itália.', 'Ferruccio Lamborghini founds the company in Sant’Agata Bolognese, Italy.', 'Ferruccio Lamborghini fonda l’azienda a Sant’Agata Bolognese, in Italia.', 'Ferruccio Lamborghini gründet das Unternehmen im italienischen Sant’Agata Bolognese.', 'Ferruccio Lamborghini fonde l’entreprise à Sant’Agata Bolognese, en Italie.', 'Ferruccio Lamborghini funda a empresa em Sant’Agata Bolognese, na Itália.'],
  ['O 350 GT CHEGA ÀS RUAS', 'THE 350 GT HITS THE ROAD', 'LA 350 GT ARRIVA SU STRADA', 'DER 350 GT KOMMT AUF DIE STRASSE', 'LA 350 GT PREND LA ROUTE', 'O 350 GT CHEGA ÀS RUAS'],
  ['O primeiro modelo de produção inaugura a visão de Ferruccio para os grand tourers.', 'The first production model launches Ferruccio’s vision for grand touring cars.', 'Il primo modello di produzione inaugura la visione di Ferruccio per le gran turismo.', 'Das erste Serienmodell verwirklicht Ferruccios Vision des Grand Tourers.', 'Le premier modèle de série concrétise la vision de Ferruccio pour les voitures de grand tourisme.', 'O primeiro modelo de produção inaugura a visão de Ferruccio para os grand tourers.'],
  ['MIURA: UM NOVO CONCEITO DE SUPERCARRO', 'MIURA: A NEW SUPERCAR CONCEPT', 'MIURA: UN NUOVO CONCETTO DI SUPERCAR', 'MIURA: EIN NEUES SUPERCAR-KONZEPT', 'MIURA : UN NOUVEAU CONCEPT DE SUPERCAR', 'MIURA: UM NOVO CONCEITO DE SUPERCARRO'],
  ['Motor central e desenho marcante mudam para sempre a arquitetura dos esportivos.', 'A mid-mounted engine and striking design forever change sports car architecture.', 'Il motore centrale e il design distintivo cambiano per sempre l’architettura delle sportive.', 'Mittelmotor und markantes Design verändern die Architektur von Sportwagen für immer.', 'Le moteur central et le design marquant changent à jamais l’architecture des voitures sportives.', 'Motor central e design marcante mudam para sempre a arquitetura dos esportivos.'],
  ['COUNTACH ENTRA EM CENA', 'COUNTACH MAKES ITS DEBUT', 'COUNTACH FA IL SUO INGRESSO', 'COUNTACH BETRITT DIE BÜHNE', 'COUNTACH ENTRE EN SCÈNE', 'COUNTACH ENTRA EM CENA'],
  ['LM 002: FORA DA ESTRADA', 'LM 002: OFF THE ROAD', 'LM 002: FUORI STRADA', 'LM 002: ABSEITS DER STRASSE', 'LM 002 : HORS DES SENTIERS BATTUS', 'LM 002: FORA DA ESTRADA'],
  ['DIABLO ELEVA A APOSTA', 'DIABLO RAISES THE STAKES', 'DIABLO ALZA LA POSTA', 'DIABLO SETZT NEUE MASSSTÄBE', 'DIABLO RELÈVE LE DÉFI', 'DIABLO ELEVA A APOSTA'],
  ['UM NOVO CAPÍTULO COM A AUDI', 'A NEW CHAPTER WITH AUDI', 'UN NUOVO CAPITOLO CON AUDI', 'EIN NEUES KAPITEL MIT AUDI', 'UN NOUVEAU CHAPITRE AVEC AUDI', 'UM NOVO CAPÍTULO COM A AUDI'],
  ['AVENTADOR: EVOLUÇÃO V12', 'AVENTADOR: V12 EVOLUTION', 'AVENTADOR: EVOLUZIONE DEL V12', 'AVENTADOR: V12-EVOLUTION', 'AVENTADOR : ÉVOLUTION DU V12', 'AVENTADOR: EVOLUÇÃO V12'],
  ['URUS ABRE UMA NOVA CATEGORIA', 'URUS OPENS A NEW CATEGORY', 'URUS APRE UNA NUOVA CATEGORIA', 'URUS ERÖFFNET EINE NEUE KATEGORIE', 'URUS OUVRE UNE NOUVELLE CATÉGORIE', 'URUS ABRE UMA NOVA CATEGORIA'],
  ['UMA NOVA ERA DE ELETRIFICAÇÃO', 'A NEW ERA OF ELECTRIFICATION', 'UNA NUOVA ERA DI ELETTRIFICAZIONE', 'EINE NEUE ÄRA DER ELEKTRIFIZIERUNG', 'UNE NOUVELLE ÈRE D’ÉLECTRIFICATION', 'UMA NOVA ERA DE ELETRIFICAÇÃO'],
  ['Nenhum marco listado para esta década.', 'No milestones are listed for this decade.', 'Nessuna tappa è stata registrata per questo decennio.', 'Für dieses Jahrzehnt sind keine Meilensteine aufgeführt.', 'Aucun jalon n’est répertorié pour cette décennie.', 'Nenhum marco listado para esta década.'],
  ['TUDO COMEÇA COM UMA IDEIA', 'IT ALL STARTS WITH AN IDEA', 'TUTTO COMINCIA CON UN’IDEA', 'ALLES BEGINNT MIT EINER IDEE', 'TOUT COMMENCE PAR UNE IDÉE', 'TUDO COMEÇA COM UMA IDEIA'],
  ['DO TRATOR AO SUPERCARRO.', 'FROM TRACTOR TO SUPERCAR.', 'DAL TRATTORE ALLA SUPERCAR.', 'VOM TRAKTOR ZUM SUPERCAR.', 'DU TRACTEUR À LA SUPERCAR.', 'DO TRATOR AO SUPERCARRO.'],
  ['Antes dos carros, Ferruccio Lamborghini já era um empreendedor inquieto. Depois de transformar veículos militares em tratores e criar negócios de aquecimento e refrigeração, voltou sua atenção para os automóveis.', 'Before cars, Ferruccio Lamborghini was already a restless entrepreneur. After converting military vehicles into tractors and building heating and cooling businesses, he turned his attention to automobiles.', 'Prima delle auto, Ferruccio Lamborghini era già un imprenditore instancabile. Dopo aver trasformato veicoli militari in trattori e avviato attività di riscaldamento e refrigerazione, rivolse la sua attenzione alle automobili.', 'Noch vor den Autos war Ferruccio Lamborghini ein unermüdlicher Unternehmer. Nachdem er Militärfahrzeuge in Traktoren umgebaut und Heizungs- und Kühltechnikunternehmen gegründet hatte, wandte er sich den Automobilen zu.', 'Avant les voitures, Ferruccio Lamborghini était déjà un entrepreneur infatigable. Après avoir transformé des véhicules militaires en tracteurs et créé des entreprises de chauffage et de réfrigération, il s’est tourné vers l’automobile.', 'Antes dos carros, Ferruccio Lamborghini já era um empreendedor inquieto. Depois de transformar veículos militares em tratores e criar negócios de aquecimento e refrigeração, voltou sua atenção para os automóveis.'],
  ['UM SÍMBOLO, UMA IDENTIDADE', 'A SYMBOL, AN IDENTITY', 'UN SIMBOLO, UN’IDENTITÀ', 'EIN SYMBOL, EINE IDENTITÄT', 'UN SYMBOLE, UNE IDENTITÉ', 'UM SÍMBOLO, UMA IDENTIDADE'],
  ['A FORÇA DO TOURO.', 'THE STRENGTH OF THE BULL.', 'LA FORZA DEL TORO.', 'DIE KRAFT DES STIERS.', 'LA FORCE DU TAUREAU.', 'A FORÇA DO TOURO.'],
  ['Criado em 1963, o escudo da marca traduz a personalidade de Ferruccio e sua paixão por touradas. O touro, seu signo, permanece no centro de um emblema que evolui sem perder sua essência.', 'Created in 1963, the emblem reflects Ferruccio’s personality and passion for bullfighting. His zodiac sign, the bull, remains at its center as the emblem evolves without losing its essence.', 'Creato nel 1963, lo stemma racconta la personalità di Ferruccio e la sua passione per la corrida. Il toro, il suo segno zodiacale, resta al centro di un emblema che si evolve senza perdere la propria essenza.', 'Das 1963 entworfene Emblem spiegelt Ferruccios Persönlichkeit und seine Leidenschaft für den Stierkampf wider. Sein Sternzeichen, der Stier, bleibt im Zentrum eines Symbols, das sich weiterentwickelt, ohne sein Wesen zu verlieren.', 'Créé en 1963, l’écusson reflète la personnalité de Ferruccio et sa passion pour la corrida. Le taureau, son signe astrologique, reste au cœur d’un emblème qui évolue sans perdre son essence.', 'Criado em 1963, o escudo traduz a personalidade de Ferruccio e sua paixão pelas touradas. O touro, seu signo, permanece no centro de um emblema que evolui sem perder sua essência.'],
  ['NA PISTA, NO MAR E ALÉM', 'ON TRACK, AT SEA AND BEYOND', 'IN PISTA, IN MARE E OLTRE', 'AUF DER STRECKE, AUF SEE UND DARÜBER HINAUS', 'SUR PISTE, EN MER ET AU-DELÀ', 'NA PISTA, NO MAR E ALÉM'],
  ['ESPÍRITO DE COMPETIÇÃO.', 'SPIRIT OF COMPETITION.', 'SPIRITO COMPETITIVO.', 'WETTBEWERBSGEIST.', 'ESPRIT DE COMPÉTITION.', 'ESPÍRITO DE COMPETIÇÃO.'],
  ['Mesmo sem ter nascido para as pistas, a Lamborghini conquistou seu espaço no automobilismo. Seus carros e motores passaram por provas de Gran Turismo, protótipos, Fórmula 1, ralis e corridas offshore.', 'Although Lamborghini was not born for the racetrack, it earned its place in motorsport. Its cars and engines have competed in Gran Turismo, prototypes, Formula 1, rallies and offshore races.', 'Pur non essendo nata per le piste, Lamborghini si è conquistata il proprio spazio nel motorsport. Le sue vetture e i suoi motori hanno affrontato gare Gran Turismo, prototipi, Formula 1, rally e competizioni offshore.', 'Obwohl Lamborghini nicht für die Rennstrecke gegründet wurde, hat sich die Marke im Motorsport etabliert. Fahrzeuge und Motoren traten in Gran-Turismo-Rennen, Prototypenklassen, der Formel 1, bei Rallyes und Offshore-Rennen an.', 'Bien que Lamborghini ne soit pas née pour la piste, la marque s’est imposée en sport automobile. Ses voitures et moteurs ont participé à des épreuves de Grand Tourisme, des courses de prototypes, de Formule 1, des rallyes et des compétitions offshore.', 'Mesmo sem ter nascido para as pistas, a Lamborghini conquistou seu espaço no automobilismo. Seus carros e motores competiram em Gran Turismo, protótipos, Fórmula 1, ralis e provas offshore.'],
  ['Beyond | Lamborghini', 'Beyond | Lamborghini', 'Beyond | Lamborghini', 'Beyond | Lamborghini', 'Au-delà | Lamborghini', 'Beyond | Lamborghini'],
  ['Careers | Lamborghini', 'Careers | Lamborghini', 'Lavora con noi | Lamborghini', 'Karriere | Lamborghini', 'Carrières | Lamborghini', 'Carreiras | Lamborghini'],
  ['Company | Lamborghini', 'Company | Lamborghini', 'Azienda | Lamborghini', 'Unternehmen | Lamborghini', 'Entreprise | Lamborghini', 'Empresa | Lamborghini'],
  ['Lamborghini - Dealer Locator', 'Lamborghini - Dealer Locator', 'Lamborghini - Concessionari', 'Lamborghini - Händlersuche', 'Lamborghini - Concessionnaires', 'Lamborghini - Concessionárias'],
  ['Financials | Lamborghini', 'Financials | Lamborghini', 'Dati finanziari | Lamborghini', 'Finanzinformationen | Lamborghini', 'Informations financières | Lamborghini', 'Informações financeiras | Lamborghini'],
  ['Corporate Governance | Lamborghini', 'Corporate Governance | Lamborghini', 'Corporate governance | Lamborghini', 'Corporate Governance | Lamborghini', 'Gouvernance d’entreprise | Lamborghini', 'Governança corporativa | Lamborghini'],
  ['História | Lamborghini', 'History | Lamborghini', 'Storia | Lamborghini', 'Geschichte | Lamborghini', 'Histoire | Lamborghini', 'História | Lamborghini'],
  ['Museum | Lamborghini', 'Museum | Lamborghini', 'Museo | Lamborghini', 'Museum | Lamborghini', 'Musée | Lamborghini', 'Museu | Lamborghini'],
  ['Lamborghini Models', 'Lamborghini Models', 'Modelli Lamborghini', 'Lamborghini Modelle', 'Modèles Lamborghini', 'Modelos Lamborghini'],
  ['Search | Lamborghini', 'Search | Lamborghini', 'Cerca | Lamborghini', 'Suche | Lamborghini', 'Recherche | Lamborghini', 'Busca | Lamborghini'],
  ['Urus SE | Lamborghini', 'Urus SE | Lamborghini', 'Urus SE | Lamborghini', 'Urus SE | Lamborghini', 'Urus SE | Lamborghini', 'Urus SE | Lamborghini'],
  ['Warranty Extension | Lamborghini', 'Warranty Extension | Lamborghini', 'Estensione Garanzia | Lamborghini', 'Garantieverlängerung | Lamborghini', 'Extension de garantie | Lamborghini', 'Extensão de garantia | Lamborghini'],
  ['Miura SV | Lamborghini', 'Miura SV | Lamborghini', 'Miura SV | Lamborghini', 'Miura SV | Lamborghini', 'Miura SV | Lamborghini', 'Miura SV | Lamborghini'],
  ['Lamborghini Revuelto SV | Automobili Lamborghini', 'Lamborghini Revuelto SV | Automobili Lamborghini', 'Lamborghini Revuelto SV | Automobili Lamborghini', 'Lamborghini Revuelto SV | Automobili Lamborghini', 'Lamborghini Revuelto SV | Automobili Lamborghini', 'Lamborghini Revuelto SV | Automobili Lamborghini'],
  ['Configurador - Revuelto SV', 'Configurator - Revuelto SV', 'Configuratore - Revuelto SV', 'Konfigurator - Revuelto SV', 'Configurateur - Revuelto SV', 'Configurador - Revuelto SV'],
  ['VISION: BEING THE LEADER OF THE UNEXPECTED', 'VISION: BEING THE LEADER OF THE UNEXPECTED', 'VISIONE: ESSERE LEADER DELL’INATTESO', 'VISION: DIE FÜHRUNG BEIM UNERWARTETEN ÜBERNEHMEN', 'VISION : ÊTRE LE LEADER DE L’INATTENDU', 'VISÃO: LIDERAR O INESPERADO'],
  ['The greatest challenge ever: moving forward and always raising the bar, going beyond the status quo to build a brand new limitless world.', 'The greatest challenge ever: moving forward and always raising the bar, going beyond the status quo to build a brand new limitless world.', 'La sfida più grande: andare avanti alzando sempre l’asticella, oltrepassare lo status quo e costruire un mondo nuovo e senza limiti.', 'Die größte Herausforderung: immer weiterzugehen, die Maßstäbe anzuheben und über den Status quo hinaus eine grenzenlose neue Welt zu schaffen.', 'Le plus grand défi : avancer sans cesse, relever les exigences, dépasser le statu quo et bâtir un monde nouveau sans limites.', 'O maior desafio: seguir em frente e elevar sempre o padrão, superar o status quo e construir um mundo novo e sem limites.'],
  ['A brand that is a symbol of inspiration and motivation to empower the greatest virtue of mankind: always going beyond limits, standards and conventions, because this is what humanity has been doing ever since.', 'A brand that is a symbol of inspiration and motivation to empower the greatest virtue of mankind: always going beyond limits, standards and conventions, because this is what humanity has been doing ever since.', 'Un marchio simbolo di ispirazione e motivazione, che valorizza la più grande virtù umana: superare sempre limiti, standard e convenzioni, come l’umanità ha sempre fatto.', 'Eine Marke als Symbol für Inspiration und Motivation, die die größte menschliche Tugend stärkt: Grenzen, Maßstäbe und Konventionen immer wieder zu überwinden.', 'Une marque symbole d’inspiration et de motivation, qui célèbre la plus grande vertu humaine : dépasser sans cesse les limites, les normes et les conventions.', 'Uma marca que inspira e motiva, valorizando a maior virtude humana: ir além dos limites, padrões e convenções, como a humanidade sempre fez.'],
  ['Unequalled, limitless courage when faced with any challenge.', 'Unequalled, limitless courage when faced with any challenge.', 'Coraggio senza pari e senza limiti di fronte a ogni sfida.', 'Grenzenloser, unvergleichlicher Mut angesichts jeder Herausforderung.', 'Un courage sans égal et sans limites face à chaque défi.', 'Coragem incomparável e sem limites diante de qualquer desafio.'],
  ['Pushing back boundaries to bring the future into the present.', 'Pushing back boundaries to bring the future into the present.', 'Superare i confini per portare il futuro nel presente.', 'Grenzen verschieben, um die Zukunft in die Gegenwart zu holen.', 'Repousser les limites pour faire entrer le futur dans le présent.', 'Romper limites para trazer o futuro para o presente.'],
  ['An unique and original spirit. It follows no one but its authentic self.', 'A unique and original spirit. It follows no one but its authentic self.', 'Uno spirito unico e originale, che segue soltanto la propria autenticità.', 'Ein einzigartiger und origineller Geist, der nur seinem authentischen Selbst folgt.', 'Un esprit unique et original qui ne suit que sa propre authenticité.', 'Um espírito único e original, fiel apenas à sua própria essência.'],
  ['Ferruccio Lamborghini establishes his automotive company in Emilia-Romagna.', 'Ferruccio Lamborghini establishes his automotive company in Emilia-Romagna.', 'Ferruccio Lamborghini fonda la sua azienda automobilistica in Emilia-Romagna.', 'Ferruccio Lamborghini gründet sein Automobilunternehmen in der Emilia-Romagna.', 'Ferruccio Lamborghini fonde son entreprise automobile en Émilie-Romagne.', 'Ferruccio Lamborghini funda sua empresa automobilística na Emilia-Romagna.'],
  ['A mid-engine layout helps define a new generation of road-going supercars.', 'A mid-engine layout helps define a new generation of road-going supercars.', 'Il motore centrale contribuisce a definire una nuova generazione di supersportive stradali.', 'Der Mittelmotor prägt eine neue Generation straßentauglicher Supersportwagen.', 'Le moteur central contribue à définir une nouvelle génération de supercars de route.', 'O motor central ajuda a definir uma nova geração de superesportivos de rua.'],
  ['A radical wedge-shaped design becomes one of the marque’s defining silhouettes.', 'A radical wedge-shaped design becomes one of the marque’s defining silhouettes.', 'Il design radicale a cuneo diventa una delle silhouette simbolo del marchio.', 'Das radikale keilförmige Design wird zu einer der prägenden Silhouetten der Marke.', 'Son design radical en forme de coin devient l’une des silhouettes emblématiques de la marque.', 'O design radical em forma de cunha se torna uma das silhuetas marcantes da marca.'],
  ['Lamborghini takes its V12 engineering into an entirely different terrain.', 'Lamborghini takes its V12 engineering into an entirely different terrain.', 'Lamborghini porta la sua ingegneria V12 su un terreno completamente diverso.', 'Lamborghini bringt seine V12-Ingenieurskunst in völlig neues Terrain.', 'Lamborghini emmène son ingénierie V12 sur un terrain totalement différent.', 'A Lamborghini leva sua engenharia V12 a um terreno completamente diferente.'],
  ['A new flagship carries the brand into a new decade of performance.', 'A new flagship carries the brand into a new decade of performance.', 'Una nuova ammiraglia accompagna il marchio in un nuovo decennio di prestazioni.', 'Ein neues Spitzenmodell führt die Marke in ein neues Jahrzehnt der Performance.', 'Un nouveau modèle phare ouvre une nouvelle décennie de performances pour la marque.', 'Um novo modelo topo de linha leva a marca a uma nova década de desempenho.'],
  ['Lamborghini joins the Audi Group and begins a new phase of development.', 'Lamborghini joins the Audi Group and begins a new phase of development.', 'Lamborghini entra nel Gruppo Audi e avvia una nuova fase di sviluppo.', 'Lamborghini wird Teil des Audi Konzerns und beginnt eine neue Entwicklungsphase.', 'Lamborghini rejoint le groupe Audi et entame une nouvelle phase de développement.', 'A Lamborghini passa a integrar o Grupo Audi e inicia uma nova fase de desenvolvimento.'],
  ['A new flagship advances Lamborghini’s V12 tradition.', 'A new flagship advances Lamborghini’s V12 tradition.', 'Una nuova ammiraglia porta avanti la tradizione V12 di Lamborghini.', 'Ein neues Spitzenmodell führt Lamborghinis V12-Tradition fort.', 'Un nouveau modèle phare fait évoluer la tradition V12 de Lamborghini.', 'Um novo modelo topo de linha dá continuidade à tradição V12 da Lamborghini.'],
  ['The first Super SUV brings Lamborghini performance to a broader format.', 'The first Super SUV brings Lamborghini performance to a broader format.', 'Il primo Super SUV porta le prestazioni Lamborghini in un formato inedito.', 'Der erste Super SUV bringt Lamborghini Performance in ein vielseitigeres Format.', 'Le premier Super SUV transpose les performances Lamborghini dans un format inédit.', 'O primeiro Super SUV leva o desempenho Lamborghini a um formato mais amplo.'],
  ['Urus SE and Temerario mark another step in the brand’s evolving lineup.', 'Urus SE and Temerario mark another step in the brand’s evolving lineup.', 'Urus SE e Temerario segnano un nuovo passo nell’evoluzione della gamma.', 'Urus SE und Temerario markieren einen weiteren Schritt in der Weiterentwicklung der Modellpalette.', 'Urus SE et Temerario marquent une nouvelle étape dans l’évolution de la gamme.', 'Urus SE e Temerario representam mais um passo na evolução da linha da marca.'],
  ['No milestones are listed for this decade.', 'No milestones are listed for this decade.', 'Nessuna tappa è stata registrata per questo decennio.', 'Für dieses Jahrzehnt sind keine Meilensteine aufgeführt.', 'Aucun jalon n’est répertorié pour cette décennie.', 'Nenhum marco listado para esta década.'],
  ['ISO 9001:2015 — Quality management', 'ISO 9001:2015 — Quality management', 'ISO 9001:2015 — Gestione della qualità', 'ISO 9001:2015 — Qualitätsmanagement', 'ISO 9001:2015 — Management de la qualité', 'ISO 9001:2015 — Gestão da qualidade'],
  ['ISO/IEC 27001 — Information security', 'ISO/IEC 27001 — Information security', 'ISO/IEC 27001 — Sicurezza delle informazioni', 'ISO/IEC 27001 — Informationssicherheit', 'ISO/IEC 27001 — Sécurité de l’information', 'ISO/IEC 27001 — Segurança da informação'],
  ['ISO 27701 — Privacy information management', 'ISO 27701 — Privacy information management', 'ISO 27701 — Gestione delle informazioni sulla privacy', 'ISO 27701 — Datenschutzmanagement', 'ISO 27701 — Gestion des informations relatives à la vie privée', 'ISO 27701 — Gestão da privacidade da informação'],
  ['UNI/PDR 125:2022 — Gender equality', 'UNI/PDR 125:2022 — Gender equality', 'UNI/PDR 125:2022 — Parità di genere', 'UNI/PDR 125:2022 — Gleichstellung der Geschlechter', 'UNI/PDR 125:2022 — Égalité des genres', 'UNI/PDR 125:2022 — Igualdade de gênero'],
  ['ISO 14001:2015 — Environmental management', 'ISO 14001:2015 — Environmental management', 'ISO 14001:2015 — Gestione ambientale', 'ISO 14001:2015 — Umweltmanagement', 'ISO 14001:2015 — Management environnemental', 'ISO 14001:2015 — Gestão ambiental'],
  ['EMAS — Eco-management and audit scheme', 'EMAS — Eco-management and audit scheme', 'EMAS — Sistema di ecogestione e audit', 'EMAS — Umweltmanagement- und Auditsystem', 'EMAS — Système de management environnemental et d’audit', 'EMAS — Sistema de gestão e auditoria ambiental'],
  ['ISO 45001:2018 — Occupational health and safety', 'ISO 45001:2018 — Occupational health and safety', 'ISO 45001:2018 — Salute e sicurezza sul lavoro', 'ISO 45001:2018 — Arbeits- und Gesundheitsschutz', 'ISO 45001:2018 — Santé et sécurité au travail', 'ISO 45001:2018 — Saúde e segurança ocupacional'],
  ['ISO 50001:2018 — Energy management', 'ISO 50001:2018 — Energy management', 'ISO 50001:2018 — Gestione dell’energia', 'ISO 50001:2018 — Energiemanagement', 'ISO 50001:2018 — Management de l’énergie', 'ISO 50001:2018 — Gestão de energia'],
  ['CODE OF CONDUCT FOR BUSINESS PARTNERS', 'CODE OF CONDUCT FOR BUSINESS PARTNERS', 'CODICE DI CONDOTTA PER I PARTNER COMMERCIALI', 'VERHALTENSKODEX FÜR GESCHÄFTSPARTNER', 'CODE DE CONDUITE DES PARTENAIRES COMMERCIAUX', 'CÓDIGO DE CONDUTA PARA PARCEIROS DE NEGÓCIOS'],
  ['ORGANIZATIONAL MODEL 231/01 AND INDEPENDENT BODY', 'ORGANIZATIONAL MODEL 231/01 AND INDEPENDENT BODY', 'MODELLO ORGANIZZATIVO 231/01 E ORGANISMO DI VIGILANZA', 'ORGANISATIONSMODELL 231/01 UND UNABHÄNGIGES AUFSICHTSORGAN', 'MODÈLE ORGANISATIONNEL 231/01 ET ORGANE INDÉPENDANT', 'MODELO ORGANIZACIONAL 231/01 E ÓRGÃO INDEPENDENTE'],
  ['EXPERIENCE THE ICONS OF THE HOUSE OF SANT’AGATA BOLOGNESE', 'EXPERIENCE THE ICONS OF THE HOUSE OF SANT’AGATA BOLOGNESE', 'VIVI LE ICONE DELLA CASA DI SANT’AGATA BOLOGNESE', 'ERLEBEN SIE DIE IKONEN AUS SANT’AGATA BOLOGNESE', 'VIVEZ LES ICÔNES DE SANT’AGATA BOLOGNESE', 'VIVA OS ÍCONES DA CASA DE SANT’AGATA BOLOGNESE'],
  ['From October 1 to April 30, from 9:30 a.m. to 6 p.m. (last entrance at 5 p.m.)', 'From October 1 to April 30, from 9:30 a.m. to 6 p.m. (last entrance at 5 p.m.)', 'Dal 1° ottobre al 30 aprile, dalle 9:30 alle 18:00 (ultimo ingresso alle 17:00)', 'Vom 1. Oktober bis 30. April, von 9:30 bis 18:00 Uhr (letzter Einlass um 17:00 Uhr)', 'Du 1er octobre au 30 avril, de 9 h 30 à 18 h (dernière entrée à 17 h)', 'De 1º de outubro a 30 de abril, das 9h30 às 18h (última entrada às 17h)'],
  ['From May 2 to September 30, from 9:30 a.m. to 7 p.m. (last entrance at 6 p.m.)', 'From May 2 to September 30, from 9:30 a.m. to 7 p.m. (last entrance at 6 p.m.)', 'Dal 2 maggio al 30 settembre, dalle 9:30 alle 19:00 (ultimo ingresso alle 18:00)', 'Vom 2. Mai bis 30. September, von 9:30 bis 19:00 Uhr (letzter Einlass um 18:00 Uhr)', 'Du 2 mai au 30 septembre, de 9 h 30 à 19 h (dernière entrée à 18 h)', 'De 2 de maio a 30 de setembro, das 9h30 às 19h (última entrada às 18h)'],
  ['DAYS CLOSED IN 2026: October 6, 11 and 20.', 'DAYS CLOSED IN 2026: October 6, 11 and 20.', 'GIORNI DI CHIUSURA 2026: 6, 11 e 20 ottobre.', 'SCHLIESSUNGSTAGE 2026: 6., 11. und 20. Oktober.', 'JOURS DE FERMETURE EN 2026 : 6, 11 et 20 octobre.', 'DIAS FECHADOS EM 2026: 6, 11 e 20 de outubro.'],
  ['Legendary vehicles and exceptional one-offs from the Lamborghini history.', 'Legendary vehicles and exceptional one-offs from the Lamborghini history.', 'Vetture leggendarie e modelli unici della storia Lamborghini.', 'Legendäre Fahrzeuge und außergewöhnliche Einzelstücke aus der Geschichte Lamborghinis.', 'Des véhicules légendaires et des pièces uniques exceptionnelles de l’histoire Lamborghini.', 'Veículos lendários e exemplares únicos da história da Lamborghini.'],
  ['Hybrid technology, design and performance on a journey toward the future.', 'Hybrid technology, design and performance on a journey toward the future.', 'Tecnologia ibrida, design e prestazioni in un viaggio verso il futuro.', 'Hybridtechnologie, Design und Leistung auf einer Reise in die Zukunft.', 'Technologie hybride, design et performances pour un voyage vers l’avenir.', 'Tecnologia híbrida, design e desempenho em uma jornada rumo ao futuro.'],
  ['Every line, every detail and every finish built with precise Italian expertise.', 'Every line, every detail and every finish built with precise Italian expertise.', 'Ogni linea, dettaglio e finitura realizzati con la precisione e la competenza italiane.', 'Jede Linie, jedes Detail und jede Oberfläche entstehen mit italienischer Präzision und Expertise.', 'Chaque ligne, chaque détail et chaque finition témoignent du savoir-faire italien.', 'Cada linha, detalhe e acabamento são feitos com precisão e expertise italianas.'],
  ['The factory is the place where Automobili Lamborghini masterpieces are born. Guided tours begin at the Museum and bring you closer to the craftsmanship, technology and passion behind each super sportscar.', 'The factory is the place where Automobili Lamborghini masterpieces are born. Guided tours begin at the Museum and bring you closer to the craftsmanship, technology and passion behind each super sportscar.', 'La fabbrica è il luogo in cui nascono i capolavori Automobili Lamborghini. Le visite guidate partono dal Museo e raccontano la maestria, la tecnologia e la passione dietro ogni supersportiva.', 'In der Fabrik entstehen die Meisterwerke von Automobili Lamborghini. Die Führungen beginnen im Museum und vermitteln Handwerkskunst, Technologie und Leidenschaft hinter jedem Supersportwagen.', 'L’usine est le lieu où naissent les chefs-d’œuvre d’Automobili Lamborghini. Les visites guidées partent du musée et dévoilent le savoir-faire, la technologie et la passion derrière chaque supercar.', 'A fábrica é onde nascem as obras-primas da Automobili Lamborghini. As visitas guiadas começam no Museu e mostram o trabalho artesanal, a tecnologia e a paixão por trás de cada superesportivo.'],
  ['Our spaces were created to inspire, share ideas and connect people in a refined setting. Museo Automobili Lamborghini is the ideal place for events, conferences and memorable gatherings.', 'Our spaces were created to inspire, share ideas and connect people in a refined setting. Museo Automobili Lamborghini is the ideal place for events, conferences and memorable gatherings.', 'I nostri spazi ispirano, favoriscono la condivisione di idee e mettono in contatto le persone in un ambiente raffinato. Il Museo Automobili Lamborghini è il luogo ideale per eventi, conferenze e incontri memorabili.', 'Unsere Räumlichkeiten inspirieren, fördern den Austausch und verbinden Menschen in einem eleganten Ambiente. Das Museo Automobili Lamborghini ist ideal für Veranstaltungen, Konferenzen und unvergessliche Begegnungen.', 'Nos espaces inspirent, favorisent l’échange d’idées et réunissent les personnes dans un cadre raffiné. Le Museo Automobili Lamborghini est idéal pour des événements, conférences et rencontres mémorables.', 'Nossos espaços inspiram, promovem o compartilhamento de ideias e conectam pessoas em um ambiente sofisticado. O Museo Automobili Lamborghini é ideal para eventos, conferências e encontros memoráveis.'],
  ['School and university groups must book in advance.', 'School and university groups must book in advance.', 'I gruppi scolastici e universitari devono prenotare in anticipo.', 'Schul- und Hochschulgruppen müssen im Voraus buchen.', 'Les groupes scolaires et universitaires doivent réserver à l’avance.', 'Grupos escolares e universitários devem reservar com antecedência.'],
  ['The museum has lift access for limited mobility.', 'The museum has lift access for limited mobility.', 'Il museo dispone di ascensore per le persone con mobilità ridotta.', 'Das Museum verfügt über einen Aufzug für Personen mit eingeschränkter Mobilität.', 'Le musée dispose d’un ascenseur pour les personnes à mobilité réduite.', 'O museu tem elevador para pessoas com mobilidade reduzida.'],
  ['No touching vehicles, eating, or entry with animals except guide dogs.', 'No touching vehicles, eating, or entry with animals except guide dogs.', 'È vietato toccare le vetture, mangiare e introdurre animali, ad eccezione dei cani guida.', 'Fahrzeuge dürfen nicht berührt werden; Essen und Tiere sind nicht erlaubt, ausgenommen Assistenzhunde.', 'Il est interdit de toucher les véhicules, de manger ou d’entrer avec des animaux, sauf les chiens guides.', 'Não é permitido tocar nos veículos, comer ou entrar com animais, exceto cães-guia.'],
  ['Valid documentation must be shown at the entrance.', 'Valid documentation must be shown at the entrance.', 'È necessario presentare un documento valido all’ingresso.', 'Am Eingang muss ein gültiger Nachweis vorgelegt werden.', 'Un justificatif valide doit être présenté à l’entrée.', 'É necessário apresentar documentação válida na entrada.'],
  ['The Revuelto SV represents a revolutionary step in Lamborghini\'s history. Combining a naturally aspirated 6.5-liter V12 engine with three high-performance electric motors, it delivers an unmatched output of 1065 CV. Lightweight carbon fiber monocoque design and GT3-derived aerodynamics establish a new benchmark for super sports cars.', 'The Revuelto SV represents a revolutionary step in Lamborghini’s history. Combining a naturally aspirated 6.5-liter V12 engine with three high-performance electric motors, it delivers an unmatched output of 1065 CV. Lightweight carbon fiber monocoque design and GT3-derived aerodynamics establish a new benchmark for super sports cars.', 'La Revuelto SV segna un passo rivoluzionario nella storia Lamborghini. Il V12 aspirato da 6,5 litri, abbinato a tre motori elettrici ad alte prestazioni, eroga 1065 CV. Il monoscocca leggero in fibra di carbonio e l’aerodinamica derivata dalla GT3 definiscono un nuovo riferimento per le supersportive.', 'Der Revuelto SV ist ein revolutionärer Schritt in der Geschichte Lamborghinis. Ein 6,5-Liter-V12-Saugmotor und drei leistungsstarke Elektromotoren liefern 1065 CV. Das leichte Carbon-Monocoque und die von GT3 abgeleitete Aerodynamik setzen neue Maßstäbe.', 'La Revuelto SV marque une étape révolutionnaire dans l’histoire de Lamborghini. Son V12 atmosphérique de 6,5 litres associé à trois moteurs électriques développe 1065 CV. Sa monocoque en fibre de carbone et son aérodynamique inspirée de la GT3 établissent une nouvelle référence.', 'O Revuelto SV representa um passo revolucionário na história da Lamborghini. Com motor V12 aspirado de 6,5 litros e três motores elétricos, entrega 1065 CV. O monocoque de fibra de carbono e a aerodinâmica derivada da GT3 estabelecem um novo padrão para superesportivos.'],
  ['Every line of the Revuelto SV is sculpted for ultimate aerodynamic efficiency. Featuring a double-wing profile fixed rear spoiler and Y-shaped LED architecture, the body creates 80% more downforce compared to the standard model while providing optimal cooling to the high-revving hybrid engine.', 'Every line of the Revuelto SV is sculpted for ultimate aerodynamic efficiency. Featuring a double-wing profile fixed rear spoiler and Y-shaped LED architecture, the body creates 80% more downforce compared to the standard model while providing optimal cooling to the high-revving hybrid engine.', 'Ogni linea della Revuelto SV è scolpita per la massima efficienza aerodinamica. Lo spoiler posteriore fisso a doppio profilo e i LED a Y generano l’80% di deportanza in più rispetto al modello standard e raffreddano al meglio il motore ibrido ad alti regimi.', 'Jede Linie des Revuelto SV ist auf maximale aerodynamische Effizienz ausgelegt. Der feste Heckspoiler mit Doppelprofil und die Y-förmige LED-Architektur erzeugen 80 % mehr Abtrieb als beim Serienmodell und kühlen den hochdrehenden Hybridmotor optimal.', 'Chaque ligne de la Revuelto SV est sculptée pour une efficacité aérodynamique optimale. Son aileron arrière fixe à double profil et son architecture LED en Y génèrent 80 % d’appui supplémentaire par rapport au modèle standard, tout en refroidissant efficacement le moteur hybride à haut régime.', 'Cada linha do Revuelto SV foi esculpida para máxima eficiência aerodinâmica. O aerofólio traseiro fixo de perfil duplo e os LEDs em Y geram 80% mais downforce que no modelo padrão e refrigeram o motor híbrido de alta rotação.'],
  ['At the core lies the legendary mid-mounted V12 engine paired with an 8-speed dual-clutch transmission and dual front axial-flux electric motors. This architecture provides dynamic torque vectoring and instantaneous acceleration out of any corner.', 'At the core lies the legendary mid-mounted V12 engine paired with an 8-speed dual-clutch transmission and dual front axial-flux electric motors. This architecture provides dynamic torque vectoring and instantaneous acceleration out of any corner.', 'Al centro si trova il leggendario V12 in posizione centrale, abbinato a un cambio a doppia frizione a 8 rapporti e a due motori elettrici anteriori a flusso assiale. Questa architettura offre torque vectoring dinamico e accelerazione immediata in uscita da ogni curva.', 'Im Mittelpunkt steht der legendäre mittig angeordnete V12, kombiniert mit einem 8-Gang-Doppelkupplungsgetriebe und zwei axialen Elektromotoren an der Vorderachse. Diese Architektur ermöglicht dynamische Drehmomentverteilung und sofortige Beschleunigung aus jeder Kurve.', 'Au cœur du véhicule se trouve le légendaire V12 central, associé à une boîte à double embrayage à 8 rapports et à deux moteurs électriques avant à flux axial. Cette architecture assure une vectorisation dynamique du couple et des accélérations instantanées en sortie de virage.', 'No centro está o lendário motor V12 central, combinado a uma transmissão de dupla embreagem de 8 marchas e dois motores elétricos axiais dianteiros. Essa arquitetura proporciona vetorização dinâmica de torque e aceleração imediata nas curvas.'],
  ['THE FIRST V12 HYBRID HPEV SUPER VELOCE', 'THE FIRST V12 HYBRID HPEV SUPER VELOCE', 'LA PRIMA HPEV SUPER VELOCE IBRIDA V12', 'DER ERSTE V12-HYBRID-HPEV SUPER VELOCE', 'LA PREMIÈRE HPEV SUPER VELOCE HYBRIDE V12', 'O PRIMEIRO HPEV SUPER VELOCE HÍBRIDO V12'],
  ['“EXTENDED PROTECTION” FOR THE MAXIMUM PROTECTION', '“EXTENDED PROTECTION” FOR THE MAXIMUM PROTECTION', '“PROTEZIONE ESTESA” PER LA MASSIMA TUTELA', '„ERWEITERTER SCHUTZ“ FÜR MAXIMALE SICHERHEIT', '« PROTECTION ÉTENDUE » POUR UNE PROTECTION MAXIMALE', '“PROTEÇÃO ESTENDIDA” PARA MÁXIMA TRANQUILIDADE'],
  ['Your browser does not support HTML video.', 'Your browser does not support HTML video.', 'Il tuo browser non supporta i video HTML.', 'Ihr Browser unterstützt keine HTML-Videos.', 'Votre navigateur ne prend pas en charge les vidéos HTML.', 'Seu navegador não oferece suporte a vídeo HTML.'],
  ['This means guaranteed peace of mind for you from 0 to 3 years and 0 to infinite mileage. But it doesn’t have to end there because you can keep it for longer thanks to our Warranty Extension program. Or you can secure it through our Selezione program.', 'This means guaranteed peace of mind for you from 0 to 3 years and 0 to infinite mileage. But it doesn’t have to end there because you can keep it for longer thanks to our Warranty Extension program. Or you can secure it through our Selezione program.', 'Significa tranquillità garantita da 0 a 3 anni e con chilometraggio illimitato. E non deve finire qui: puoi prolungare la copertura con il programma Estensione Garanzia o tutelare la vettura con il programma Selezione.', 'Das bedeutet Sicherheit von 0 bis 3 Jahren und bei unbegrenzter Laufleistung. Mit unserem Garantieverlängerungsprogramm oder dem Selezione-Programm können Sie den Schutz weiter ausbauen.', 'Vous bénéficiez ainsi d’une tranquillité garantie de 0 à 3 ans et quel que soit le kilométrage. Vous pouvez prolonger cette protection grâce à notre programme d’extension de garantie ou à Selezione.', 'Isso significa tranquilidade garantida de 0 a 3 anos e para qualquer quilometragem. E a proteção pode continuar com nosso programa de Extensão de Garantia ou com o programa Selezione.'],
  ['*Warranty conditions may vary by country. Official Lamborghini Dealers and Service Points are able to provide detailed information on the terms and conditions of the warranty coverage provided for your vehicle.', '*Warranty conditions may vary by country. Official Lamborghini Dealers and Service Points are able to provide detailed information on the terms and conditions of the warranty coverage provided for your vehicle.', '*Le condizioni di garanzia possono variare in base al Paese. I concessionari e i centri assistenza ufficiali Lamborghini possono fornire informazioni dettagliate sulla copertura della vettura.', '*Die Garantiebedingungen können je nach Land variieren. Offizielle Lamborghini Händler und Service Points informieren Sie ausführlich über die für Ihr Fahrzeug geltenden Bedingungen.', '*Les conditions de garantie varient selon les pays. Les concessionnaires et centres de service Lamborghini officiels peuvent vous renseigner sur la couverture de votre véhicule.', '*As condições de garantia podem variar conforme o país. Concessionárias e pontos de serviço oficiais Lamborghini fornecem informações detalhadas sobre a cobertura do veículo.'],
  ['For information on the characteristics and duration of the specific options for each car, please contact an official Lamborghini Dealer or Service Point. Terms and conditions may vary depending on the specific market. The service may be provided by an insurance provider.', 'For information on the characteristics and duration of the specific options for each car, please contact an official Lamborghini Dealer or Service Point. Terms and conditions may vary depending on the specific market. The service may be provided by an insurance provider.', 'Per informazioni sulle caratteristiche e sulla durata delle opzioni per ogni vettura, contatta un concessionario o centro assistenza ufficiale Lamborghini. Termini e condizioni variano in base al mercato. Il servizio può essere fornito da una compagnia assicurativa.', 'Informationen zu Merkmalen und Laufzeiten der Optionen für jedes Fahrzeug erhalten Sie bei einem offiziellen Lamborghini Händler oder Service Point. Die Bedingungen variieren je nach Markt. Der Service kann von einem Versicherungsanbieter erbracht werden.', 'Pour connaître les caractéristiques et la durée des options disponibles, contactez un concessionnaire ou centre de service Lamborghini officiel. Les conditions varient selon les marchés. Le service peut être fourni par un assureur.', 'Para saber as características e a duração das opções, entre em contato com uma concessionária ou ponto de serviço oficial Lamborghini. Os termos variam conforme o mercado. O serviço pode ser prestado por uma seguradora.'],
  ['Experience the icons of the House of Sant’Agata Bolognese', 'Experience the icons of the House of Sant’Agata Bolognese', 'Vivi le icone della casa di Sant’Agata Bolognese', 'Erleben Sie die Ikonen aus Sant’Agata Bolognese', 'Vivez les icônes de la maison de Sant’Agata Bolognese', 'Viva os ícones da casa de Sant’Agata Bolognese'],
  ['40019 Sant’Agata Bolognese (Bologna) – Italy', '40019 Sant’Agata Bolognese (Bologna) – Italy', '40019 Sant’Agata Bolognese (Bologna) – Italia', '40019 Sant’Agata Bolognese (Bologna) – Italien', '40019 Sant’Agata Bolognese (Bologne) – Italie', '40019 Sant’Agata Bolognese (Bolonha) – Itália'],
  ['Welcome to the Lamborghini world! I’m your Virtual Assistant, ready to guide you through the world of Lamborghini.', 'Welcome to the Lamborghini world! I’m your Virtual Assistant, ready to guide you through the world of Lamborghini.', 'Benvenuto nel mondo Lamborghini! Sono il tuo assistente virtuale e sono pronto ad accompagnarti alla scoperta di Lamborghini.', 'Willkommen in der Welt von Lamborghini! Ich bin Ihr virtueller Assistent und begleite Sie durch die Welt von Lamborghini.', 'Bienvenue dans l’univers Lamborghini ! Je suis votre assistant virtuel et je vous accompagne à la découverte de Lamborghini.', 'Bem-vindo ao mundo Lamborghini! Sou seu assistente virtual e vou guiar você pelo universo Lamborghini.'],
  ['Welcome to the Lamborghini world! I\'m your Virtual Assistant, ready to guide you through the world of Lamborghini.', 'Welcome to the Lamborghini world! I’m your Virtual Assistant, ready to guide you through the world of Lamborghini.', 'Benvenuto nel mondo Lamborghini! Sono il tuo assistente virtuale e sono pronto ad accompagnarti alla scoperta di Lamborghini.', 'Willkommen in der Welt von Lamborghini! Ich bin Ihr virtueller Assistent und begleite Sie durch die Welt von Lamborghini.', 'Bienvenue dans l’univers Lamborghini ! Je suis votre assistant virtuel et je vous accompagne à la découverte de Lamborghini.', 'Bem-vindo ao mundo Lamborghini! Sou seu assistente virtual e vou guiar você pelo universo Lamborghini.'],
  ['© 2026 Automobili Lamborghini S.p.A. All rights reserved.', '© 2026 Automobili Lamborghini S.p.A. All rights reserved.', '© 2026 Automobili Lamborghini S.p.A. Tutti i diritti riservati.', '© 2026 Automobili Lamborghini S.p.A. Alle Rechte vorbehalten.', '© 2026 Automobili Lamborghini S.p.A. Tous droits réservés.', '© 2026 Automobili Lamborghini S.p.A. Todos os direitos reservados.'],
  ['Copyright © 2026 Automobili Lamborghini S.p.A. All rights reserved.', 'Copyright © 2026 Automobili Lamborghini S.p.A. All rights reserved.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Tutti i diritti riservati.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Alle Rechte vorbehalten.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Tous droits réservés.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Todos os direitos reservados.'],
  ['Copyright © 2026 Automobili Lamborghini S.p.A. Todos os direitos reservados.', 'Copyright © 2026 Automobili Lamborghini S.p.A. All rights reserved.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Tutti i diritti riservati.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Alle Rechte vorbehalten.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Tous droits réservés.', 'Copyright © 2026 Automobili Lamborghini S.p.A. Todos os direitos reservados.'],
  ['Lamborghini rewrites the rules every single time. Living for the extraordinary, unconventional and out-of-the-box.', 'Lamborghini rewrites the rules every single time. Living for the extraordinary, unconventional and out-of-the-box.', 'Lamborghini riscrive le regole ogni volta. Vive per lo straordinario, l’insolito e ciò che è fuori dagli schemi.', 'Lamborghini schreibt die Regeln jedes Mal neu. Die Marke lebt für das Außergewöhnliche, Unkonventionelle und Andersartige.', 'Lamborghini réécrit les règles à chaque fois. Elle vit pour l’extraordinaire, l’atypique et l’inédit.', 'A Lamborghini reinventa as regras a cada passo. Vive o extraordinário, o incomum e o que rompe padrões.'],
  ['BRAND', 'BRAND', 'MARCHIO', 'MARKE', 'MARQUE', 'MARCA'],
  ['MANIFESTO', 'MANIFESTO', 'MANIFESTO', 'MANIFEST', 'MANIFESTE', 'MANIFESTO'],
  ['UNEXPECTED', 'UNEXPECTED', 'INATTESO', 'UNERWARTET', 'INATTENDU', 'INESPERADO'],
  ['MISSION: TURNING HUMANS BEYOND', 'MISSION: TURNING HUMANS BEYOND', 'MISSIONE: SPINGERE LE PERSONE OLTRE', 'MISSION: MENSCHEN ÜBER SICH HINAUSWACHSEN LASSEN', 'MISSION : POUSSER LES HUMAINS À SE DÉPASSER', 'MISSÃO: LEVAR AS PESSOAS ALÉM'],
  ['BRAVE OUR PULSE', 'BRAVE OUR PULSE', 'CORAGGIO, IL NOSTRO IMPULSO', 'MUTIG – UNSER ANTRIEB', 'AUDACE, NOTRE ÉLAN', 'CORAGEM, NOSSO IMPULSO'],
  ['UNEXPECTED OUR IDEAS', 'UNEXPECTED OUR IDEAS', 'INASPETTATE LE NOSTRE IDEE', 'UNERWARTET – UNSERE IDEEN', 'INATTENDUES, NOS IDÉES', 'INESPERADAS, NOSSAS IDEIAS'],
  ['AUTHENTIC OUR BEING', 'AUTHENTIC OUR BEING', 'AUTENTICI NEL NOSTRO ESSERE', 'AUTHENTISCH – UNSER WESEN', 'AUTHENTIQUES, NOTRE ESSENCE', 'AUTÊNTICOS, NOSSO JEITO DE SER'],
  ['FAST FORWORLD', 'FAST FORWORLD', 'FAST FORWORLD', 'FAST FORWORLD', 'FAST FORWORLD', 'FAST FORWORLD'],
  ['ENTER NOW', 'ENTER NOW', 'ENTRA ORA', 'JETZT ENTDECKEN', 'ENTRER', 'ACESSAR'],
  ['Sustainability', 'Sustainability', 'Sostenibilità', 'Nachhaltigkeit', 'Durabilité', 'Sustentabilidade'],
  ['Club', 'Club', 'Club', 'Club', 'Club', 'Clube'],
  ['LAMBORGHINI', 'LAMBORGHINI', 'LAMBORGHINI', 'LAMBORGHINI', 'LAMBORGHINI', 'LAMBORGHINI'],
  ['ITALY / 2026', 'ITALY / 2026', 'ITALIA / 2026', 'ITALIEN / 2026', 'ITALIE / 2026', 'ITÁLIA / 2026'],
  ['LAMBORGHINI TOP EMPLOYER 2026', 'LAMBORGHINI TOP EMPLOYER 2026', 'LAMBORGHINI TOP EMPLOYER 2026', 'LAMBORGHINI TOP EMPLOYER 2026', 'LAMBORGHINI TOP EMPLOYER 2026', 'LAMBORGHINI TOP EMPLOYER 2026'],
  ['OUR RESPONSIBILITY', 'OUR RESPONSIBILITY', 'LA NOSTRA RESPONSABILITÀ', 'UNSERE VERANTWORTUNG', 'NOTRE RESPONSABILITÉ', 'NOSSA RESPONSABILIDADE'],
  ['GROW WITH US', 'GROW WITH US', 'CRESCI CON NOI', 'WACHSEN SIE MIT UNS', 'GRANDISSEZ AVEC NOUS', 'CRESÇA CONOSCO'],
  ['JOIN THE TEAM', 'JOIN THE TEAM', 'UNISCITI AL TEAM', 'WERDEN SIE TEIL DES TEAMS', 'REJOIGNEZ L’ÉQUIPE', 'FAÇA PARTE DO TIME'],
  ['EXPLORE OPEN POSITIONS', 'EXPLORE OPEN POSITIONS', 'SCOPRI LE POSIZIONI APERTE', 'OFFENE STELLEN ENTDECKEN', 'DÉCOUVRIR LES POSTES À POURVOIR', 'EXPLORE AS VAGAS'],
  ['VIEW CAREERS', 'VIEW CAREERS', 'SCOPRI LE OPPORTUNITÀ', 'KARRIERE ANSEHEN', 'VOIR LES CARRIÈRES', 'VER CARREIRAS'],
  ['‹ BACK TO COMPANY', '‹ BACK TO COMPANY', '‹ TORNA ALL’AZIENDA', '‹ ZURÜCK ZUM UNTERNEHMEN', '‹ RETOUR À L’ENTREPRISE', '‹ VOLTAR À EMPRESA'],
  ['CORPORATE GOVERNANCE', 'CORPORATE GOVERNANCE', 'CORPORATE GOVERNANCE', 'UNTERNEHMENSFÜHRUNG', 'GOUVERNANCE D’ENTREPRISE', 'GOVERNANÇA CORPORATIVA'],
  ['COMPANY PROFILE', 'COMPANY PROFILE', 'PROFILO AZIENDALE', 'UNTERNEHMENSPROFIL', 'PROFIL DE L’ENTREPRISE', 'PERFIL DA EMPRESA'],
  ['READ THE OFFICIAL PROFILE', 'READ THE OFFICIAL PROFILE', 'LEGGI IL PROFILO UFFICIALE', 'OFFIZIELLES PROFIL LESEN', 'LIRE LE PROFIL OFFICIEL', 'LEIA O PERFIL OFICIAL'],
  ['FROM 1963 TO TODAY', 'FROM 1963 TO TODAY', 'DAL 1963 A OGGI', 'VON 1963 BIS HEUTE', 'DE 1963 À AUJOURD’HUI', 'DE 1963 ATÉ HOJE'],
  ['ALL', 'ALL', 'TUTTI', 'ALLE', 'TOUS', 'TODOS'],
  ['A NEW COMPANY TAKES SHAPE', 'A NEW COMPANY TAKES SHAPE', 'NASCE UNA NUOVA AZIENDA', 'EIN NEUES UNTERNEHMEN ENTSTEHT', 'UNE NOUVELLE ENTREPRISE PREND FORME', 'UMA NOVA EMPRESA TOMA FORMA'],
  ['VIEW MORE', 'VIEW MORE', 'SCOPRI DI PIÙ', 'MEHR ANSEHEN', 'EN SAVOIR PLUS', 'VER MAIS'],
  ['MIURA CHANGES THE FORMULA', 'MIURA CHANGES THE FORMULA', 'MIURA CAMBIA LE REGOLE', 'MIURA VERÄNDERT DIE REGELN', 'MIURA CHANGE LA DONNE', 'MIURA MUDA A FÓRMULA'],
  ['COUNTACH ARRIVES', 'COUNTACH ARRIVES', 'ARRIVA COUNTACH', 'COUNTACH KOMMT', 'COUNTACH FAIT SON ENTRÉE', 'COUNTACH CHEGA'],
  ['THE LM002 GOES OFF-ROAD', 'THE LM002 GOES OFF-ROAD', 'LM002 FUORISTRADA', 'DER LM002 GEHT INS GELÄNDE', 'LE LM002 SORT DES SENTIERS BATTUS', 'O LM002 VAI PARA FORA DE ESTRADA'],
  ['DIABLO SETS A NEW PACE', 'DIABLO SETS A NEW PACE', 'DIABLO SEGNA UN NUOVO RITMO', 'DIABLO GIBT EIN NEUES TEMPO VOR', 'DIABLO IMPOSE UN NOUVEAU RYTHME', 'DIABLO DEFINE UM NOVO RITMO'],
  ['A NEW CHAPTER WITH AUDI', 'A NEW CHAPTER WITH AUDI', 'UN NUOVO CAPITOLO CON AUDI', 'EIN NEUES KAPITEL MIT AUDI', 'UN NOUVEAU CHAPITRE AVEC AUDI', 'UM NOVO CAPÍTULO COM A AUDI'],
  ['AVENTADOR V12 EVOLUTION', 'AVENTADOR V12 EVOLUTION', 'EVOLUZIONE V12 DI AVENTADOR', 'AVENTADOR V12-EVOLUTION', 'ÉVOLUTION V12 DE L’AVENTADOR', 'EVOLUÇÃO V12 DO AVENTADOR'],
  ['URUS OPENS A NEW SEGMENT', 'URUS OPENS A NEW SEGMENT', 'URUS APRE UN NUOVO SEGMENTO', 'URUS ERÖFFNET EIN NEUES SEGMENT', 'URUS OUVRE UN NOUVEAU SEGMENT', 'URUS ABRE UM NOVO SEGMENTO'],
  ['A NEW ERA OF ELECTRIFICATION', 'A NEW ERA OF ELECTRIFICATION', 'UNA NUOVA ERA DI ELETTRIFICAZIONE', 'EINE NEUE ÄRA DER ELEKTRIFIZIERUNG', 'UNE NOUVELLE ÈRE D’ÉLECTRIFICATION', 'UMA NOVA ERA DE ELETRIFICAÇÃO'],
  ['VIEW BIOGRAPHY', 'VIEW BIOGRAPHY', 'LEGGI LA BIOGRAFIA', 'BIOGRAFIE ANSEHEN', 'VOIR LA BIOGRAPHIE', 'VER BIOGRAFIA'],
  ['01 / GOVERNANCE', '01 / GOVERNANCE', '01 / GOVERNANCE', '01 / UNTERNEHMENSFÜHRUNG', '01 / GOUVERNANCE', '01 / GOVERNANÇA'],
  ['02 / REPORTS', '02 / REPORTS', '02 / REPORT', '02 / BERICHTE', '02 / RAPPORTS', '02 / RELATÓRIOS'],
  ['03 / PEOPLE', '03 / PEOPLE', '03 / PERSONE', '03 / MENSCHEN', '03 / PERSONNES', '03 / PESSOAS'],
  ['DOWNLOAD', 'DOWNLOAD', 'SCARICA', 'HERUNTERLADEN', 'TÉLÉCHARGER', 'BAIXAR'],
  ['OFFICIAL COMPANY PAGE', 'OFFICIAL COMPANY PAGE', 'PAGINA AZIENDALE UFFICIALE', 'OFFIZIELLE UNTERNEHMENSSEITE', 'PAGE OFFICIELLE DE L’ENTREPRISE', 'PÁGINA OFICIAL DA EMPRESA'],
  ['LAMBORGHINI FINANCIALS', 'LAMBORGHINI FINANCIALS', 'DATI FINANZIARI LAMBORGHINI', 'LAMBORGHINI FINANZINFORMATIONEN', 'INFORMATIONS FINANCIÈRES LAMBORGHINI', 'INFORMAÇÕES FINANCEIRAS LAMBORGHINI'],
  ['‹ BACK TO COMPANY', '‹ BACK TO COMPANY', '‹ TORNA ALL’AZIENDA', '‹ ZURÜCK ZUM UNTERNEHMEN', '‹ RETOUR À L’ENTREPRISE', '‹ VOLTAR À EMPRESA'],
  ['FROM 1963 TO TODAY', 'FROM 1963 TO TODAY', 'DAL 1963 A OGGI', 'VON 1963 BIS HEUTE', 'DE 1963 À AUJOURD’HUI', 'DE 1963 ATÉ HOJE'],
  ['AUTOMOBILI LAMBORGHINI · DESDE 1963', 'AUTOMOBILI LAMBORGHINI · SINCE 1963', 'AUTOMOBILI LAMBORGHINI · DAL 1963', 'AUTOMOBILI LAMBORGHINI · SEIT 1963', 'AUTOMOBILI LAMBORGHINI · DEPUIS 1963', 'AUTOMOBILI LAMBORGHINI · DESDE 1963'],
  ['MODELOS', 'MODELS', 'MODELLI', 'MODELLE', 'MODÈLES', 'MODELOS'],
  ['MUSEU', 'MUSEUM', 'MUSEO', 'MUSEUM', 'MUSÉE', 'MUSEU'],
  ['Serviços financeiros', 'Financial services', 'Servizi finanziari', 'Finanzdienstleistungen', 'Services financiers', 'Serviços financeiros'],
  ['PROPRIEDADE', 'OWNERSHIP', 'PROPRIETÀ', 'FAHRZEUGBESITZ', 'POSSESSION', 'PROPRIETÁRIOS'],
  ['Sustentabilidade', 'Sustainability', 'Sostenibilità', 'Nachhaltigkeit', 'Durabilité', 'Sustentabilidade'],
  ['Garantia', 'Warranty', 'Garanzia', 'Garantie', 'Garantie', 'Garantia'],
  ['CONCESSIONÁRIAS', 'DEALERSHIPS', 'CONCESSIONARI', 'HÄNDLER', 'CONCESSIONNAIRES', 'CONCESSIONÁRIAS'],
  ['História', 'History', 'Storia', 'Geschichte', 'Histoire', 'História'],
  ['Linhas em forma de cunha definem uma das silhuetas mais reconhecidas do mundo.', 'Wedge-shaped lines define one of the world’s most recognisable silhouettes.', 'Le linee a cuneo definiscono una delle silhouette più riconoscibili al mondo.', 'Die Keilform prägt eine der bekanntesten Silhouetten der Welt.', 'Ses lignes en coin définissent l’une des silhouettes les plus reconnaissables au monde.', 'Linhas em forma de cunha definem uma das silhuetas mais reconhecidas do mundo.'],
  ['A potência Lamborghini encontra um terreno completamente novo.', 'Lamborghini power takes on entirely new terrain.', 'La potenza Lamborghini affronta un terreno completamente nuovo.', 'Lamborghini Leistung erobert völlig neues Terrain.', 'La puissance Lamborghini s’aventure sur un terrain entièrement nouveau.', 'A potência Lamborghini encontra um terreno completamente novo.'],
  ['O novo topo de linha leva a marca a uma década de velocidade e expansão.', 'A new flagship leads the brand into a decade of speed and growth.', 'Una nuova ammiraglia porta il marchio in un decennio di velocità e crescita.', 'Ein neues Spitzenmodell führt die Marke in ein Jahrzehnt voller Geschwindigkeit und Wachstum.', 'Un nouveau modèle phare ouvre une décennie de vitesse et d’expansion.', 'O novo topo de linha leva a marca a uma década de velocidade e expansão.'],
  ['A Lamborghini inicia uma nova fase de desenvolvimento e crescimento internacional.', 'Lamborghini begins a new phase of development and international growth.', 'Lamborghini avvia una nuova fase di sviluppo e crescita internazionale.', 'Lamborghini beginnt eine neue Phase der Entwicklung und des internationalen Wachstums.', 'Lamborghini entame une nouvelle phase de développement et de croissance internationale.', 'A Lamborghini inicia uma nova fase de desenvolvimento e crescimento internacional.'],
  ['Uma nova geração leva a tradição do motor de doze cilindros adiante.', 'A new generation carries the twelve-cylinder tradition forward.', 'Una nuova generazione porta avanti la tradizione del dodici cilindri.', 'Eine neue Generation führt die Tradition des Zwölfzylinders fort.', 'Une nouvelle génération perpétue la tradition du moteur douze cylindres.', 'Uma nova geração leva a tradição do motor de doze cilindros adiante.'],
  ['O Super SUV combina o desempenho da marca a uma nova experiência de condução.', 'The Super SUV combines the brand’s performance with a new driving experience.', 'Il Super SUV unisce le prestazioni del marchio a una nuova esperienza di guida.', 'Der Super SUV verbindet die Performance der Marke mit einem neuen Fahrerlebnis.', 'Le Super SUV associe les performances de la marque à une nouvelle expérience de conduite.', 'O Super SUV combina o desempenho da marca a uma nova experiência de condução.'],
  ['Urus SE e Temerario apontam para o próximo capítulo da marca.', 'Urus SE and Temerario point to the brand’s next chapter.', 'Urus SE e Temerario indicano il prossimo capitolo del marchio.', 'Urus SE und Temerario weisen auf das nächste Kapitel der Marke hin.', 'Urus SE et Temerario annoncent le prochain chapitre de la marque.', 'Urus SE e Temerario apontam para o próximo capítulo da marca.'],
  ['CONHEÇA A ORIGEM', 'DISCOVER THE ORIGINS', 'SCOPRI LE ORIGINI', 'ENTDECKEN SIE DIE URSPRÜNGE', 'DÉCOUVRIR LES ORIGINES', 'CONHEÇA A ORIGEM'],
  ['A EVOLUÇÃO DO EMBLEMA', 'THE EVOLUTION OF THE EMBLEM', 'L’EVOLUZIONE DELL’EMBLEMA', 'DIE ENTWICKLUNG DES EMBLEMS', 'L’ÉVOLUTION DE L’EMBLÈME', 'A EVOLUÇÃO DO EMBLEMA'],
  ['VER CONQUISTAS', 'VIEW ACHIEVEMENTS', 'SCOPRI I SUCCESSI', 'ERFOLGE ANSEHEN', 'VOIR LES SUCCÈS', 'VER CONQUISTAS'],
  ['INÍCIO', 'HOME', 'HOME', 'STARTSEITE', 'ACCUEIL', 'INÍCIO'],
  ['CARREIRAS', 'CAREERS', 'LAVORA CON NOI', 'KARRIERE', 'CARRIÈRES', 'CARREIRAS'],
  ['SITE OFICIAL', 'OFFICIAL WEBSITE', 'SITO UFFICIALE', 'OFFIZIELLE WEBSITE', 'SITE OFFICIEL', 'SITE OFICIAL'],
  ['WARRANTY EXTENSION', 'WARRANTY EXTENSION', 'ESTENSIONE GARANZIA', 'GARANTIEVERLÄNGERUNG', 'EXTENSION DE GARANTIE', 'EXTENSÃO DE GARANTIA'],
  ['LAMBORGHINI AFTER-SALES', 'LAMBORGHINI AFTER-SALES', 'LAMBORGHINI POST-VENDITA', 'LAMBORGHINI AFTER-SALES', 'APRÈS-VENTE LAMBORGHINI', 'PÓS-VENDA LAMBORGHINI'],
  ['LAMBORGHINI SELEZIONE', 'LAMBORGHINI SELEZIONE', 'LAMBORGHINI SELEZIONE', 'LAMBORGHINI SELEZIONE', 'LAMBORGHINI SELEZIONE', 'LAMBORGHINI SELEZIONE'],
  ['ICONIC DESIGN', 'ICONIC DESIGN', 'DESIGN ICONICO', 'IKONISCHES DESIGN', 'DESIGN EMBLÉMATIQUE', 'DESIGN ICÔNICO'],
  ['THE BEGINNING OF A LEGEND', 'THE BEGINNING OF A LEGEND', 'L’INIZIO DI UNA LEGGENDA', 'DER ANFANG EINER LEGENDE', 'LE DÉBUT D’UNE LÉGENDE', 'O INÍCIO DE UMA LENDA'],
  ['THE LEGENDARY SUPERCAR', 'THE LEGENDARY SUPERCAR', 'LA SUPERCAR LEGGENDARIA', 'DER LEGENDÄRE SUPERCAR', 'LA SUPERCAR LÉGENDAIRE', 'O SUPERCARRO LENDÁRIO'],
  ['PURE', 'PURE', 'PUREZZA', 'PUR', 'PURE', 'PURO'],
  ['FORM', 'FORM', 'FORMA', 'FORM', 'FORME', 'FORMA'],
  ['THE LEGEND LIVES ON', 'THE LEGEND LIVES ON', 'LA LEGGENDA CONTINUA', 'DIE LEGENDE LEBT WEITER', 'LA LÉGENDE PERDURE', 'A LENDA CONTINUA'],
  ['BACK TO HOME', 'BACK TO HOME', 'TORNA ALLA HOME', 'ZURÜCK ZUR STARTSEITE', 'RETOUR À L’ACCUEIL', 'VOLTAR AO INÍCIO'],
  ['INFO AND BOOKING', 'INFO AND BOOKING', 'INFO E PRENOTAZIONI', 'INFO UND BUCHUNG', 'INFORMATIONS ET RÉSERVATION', 'INFORMAÇÕES E RESERVAS'],
  ['TOUR OF THE PRODUCTION LINES', 'TOUR OF THE PRODUCTION LINES', 'TOUR DELLE LINEE PRODUTTIVE', 'FÜHRUNG DURCH DIE PRODUKTIONSLINIEN', 'VISITE DES LIGNES DE PRODUCTION', 'TOUR PELAS LINHAS DE PRODUÇÃO'],
  ['OPEN EVERY DAY', 'OPEN EVERY DAY', 'APERTO TUTTI I GIORNI', 'TÄGLICH GEÖFFNET', 'OUVERT TOUS LES JOURS', 'ABERTO TODOS OS DIAS'],
  ['VIEW ON MAPS', 'VIEW ON MAPS', 'VISUALIZZA SULLE MAPPE', 'AUF DER KARTE ANSEHEN', 'VOIR SUR LA CARTE', 'VER NO MAPA'],
  ['ICONIC MODELS', 'ICONIC MODELS', 'MODELLI ICONICI', 'IKONISCHE MODELLE', 'MODÈLES EMBLÉMATIQUES', 'MODELOS ICÔNICOS'],
  ['INNOVATION', 'INNOVATION', 'INNOVAZIONE', 'INNOVATION', 'INNOVATION', 'INOVAÇÃO'],
  ['CRAFTSMANSHIP', 'CRAFTSMANSHIP', 'ARTIGIANALITÀ', 'HANDWERKSKUNST', 'SAVOIR-FAIRE', 'ARTESANATO'],
  ['FACTORY', 'FACTORY', 'FABBRICA', 'WERK', 'USINE', 'FÁBRICA'],
  ['PRIVATE EVENTS', 'PRIVATE EVENTS', 'EVENTI PRIVATI', 'PRIVATE VERANSTALTUNGEN', 'ÉVÉNEMENTS PRIVÉS', 'EVENTOS PRIVADOS'],
  ['AN EXCLUSIVE EXPERIENCE', 'AN EXCLUSIVE EXPERIENCE', 'UN’ESPERIENZA ESCLUSIVA', 'EIN EXKLUSIVES ERLEBNIS', 'UNE EXPÉRIENCE EXCLUSIVE', 'UMA EXPERIÊNCIA EXCLUSIVA'],
  ['DOWNLOAD THE EVENTS CATALOG', 'DOWNLOAD THE EVENTS CATALOG', 'SCARICA IL CATALOGO EVENTI', 'EVENTKATALOG HERUNTERLADEN', 'TÉLÉCHARGER LE CATALOGUE DES ÉVÉNEMENTS', 'BAIXAR O CATÁLOGO DE EVENTOS'],
  ['CONTACTS', 'CONTACTS', 'CONTATTI', 'KONTAKT', 'CONTACTS', 'CONTATOS'],
  ['VISIT THE MUSEUM', 'VISIT THE MUSEUM', 'VISITA IL MUSEO', 'DAS MUSEUM BESUCHEN', 'VISITER LE MUSÉE', 'VISITE O MUSEU'],
  ['INFORMATION', 'INFORMATION', 'INFORMAZIONI', 'INFORMATIONEN', 'INFORMATIONS', 'INFORMAÇÕES'],
  ['Educational visits:', 'Educational visits:', 'Visite didattiche:', 'Bildungsbesuche:', 'Visites pédagogiques :', 'Visitas educativas:'],
  ['Pictures and video shooting:', 'Pictures and video shooting:', 'Foto e riprese video:', 'Foto- und Videoaufnahmen:', 'Photos et vidéos :', 'Fotos e gravações de vídeo:'],
  ['Allowed for private use only.', 'Allowed for private use only.', 'Consentito solo per uso privato.', 'Nur für den privaten Gebrauch erlaubt.', 'Autorisé uniquement pour un usage privé.', 'Permitido apenas para uso privado.'],
  ['Architectural barriers:', 'Architectural barriers:', 'Barriere architettoniche:', 'Barrierefreiheit:', 'Accessibilité :', 'Barreiras arquitetônicas:'],
  ['Restrictions:', 'Restrictions:', 'Restrizioni:', 'Einschränkungen:', 'Restrictions :', 'Restrições:'],
  ['Reduced rates:', 'Reduced rates:', 'Tariffe ridotte:', 'Ermäßigte Tarife:', 'Tarifs réduits :', 'Tarifas reduzidas:'],
  ['Learn about your rights and guarantee: read the Legal Guarantee Notice and the EU GARAN label.', 'Learn about your rights and guarantee: read the Legal Guarantee Notice and the EU GARAN label.', 'Scopri i tuoi diritti e la garanzia: leggi l’Avviso legale sulla garanzia e l’etichetta EU GARAN.', 'Erfahren Sie mehr über Ihre Rechte und die Garantie: Lesen Sie den Garantiehinweis und das EU-GARAN-Label.', 'Découvrez vos droits et garanties : consultez l’avis légal de garantie et l’étiquette EU GARAN.', 'Saiba mais sobre seus direitos e garantia: leia o Aviso de Garantia Legal e o selo EU GARAN.'],
  ['L-Code', 'L-Code', 'L-Code', 'L-Code', 'L-Code', 'L-Code'],
  ['CARREGAR CONFIGURACAO', 'LOAD CONFIGURATION', 'CARICA CONFIGURAZIONE', 'KONFIGURATION LADEN', 'CHARGER LA CONFIGURATION', 'CARREGAR CONFIGURAÇÃO'],
  ['STRADA', 'STRADA', 'STRADA', 'STRADA', 'STRADA', 'STRADA'],
  ['SPORT', 'SPORT', 'SPORT', 'SPORT', 'SPORT', 'SPORT'],
  ['CORSA', 'CORSA', 'CORSA', 'CORSA', 'CORSA', 'CORSA'],
  ['NEVE', 'SNOW', 'NEVE', 'SCHNEE', 'NEIGE', 'NEVE'],
  ['TERRA', 'TERRA', 'TERRA', 'TERRA', 'TERRA', 'TERRA'],
  ['SUPER SUV', 'SUPER SUV', 'SUPER SUV', 'SUPER SUV', 'SUPER SUV', 'SUPER SUV'],
  ['THE NEW SUPER SUV', 'THE NEW SUPER SUV', 'IL NUOVO SUPER SUV', 'DER NEUE SUPER SUV', 'LE NOUVEAU SUPER SUV', 'O NOVO SUPER SUV'],
  ['FROM NOW ON, THE FUTURE', 'FROM NOW ON, THE FUTURE', 'DA ORA IN POI, IL FUTURO', 'AB JETZT DIE ZUKUNFT', 'DÈS MAINTENANT, LE FUTUR', 'DE AGORA EM DIANTE, O FUTURO'],
  ['DESIGN & AERODYNAMICS', 'DESIGN & AERODYNAMICS', 'DESIGN E AERODINAMICA', 'DESIGN UND AERODYNAMIK', 'DESIGN ET AÉRODYNAMIQUE', 'DESIGN E AERODINÂMICA'],
  ['TRANSMISSION', 'TRANSMISSION', 'TRASMISSIONE', 'GETRIEBE', 'TRANSMISSION', 'TRANSMISSÃO'],
  ['DRIVE SYSTEM', 'DRIVE SYSTEM', 'SISTEMA DI TRAZIONE', 'ANTRIEBSSYSTEM', 'TRANSMISSION', 'SISTEMA DE TRAÇÃO'],
  ['0-100 KM/H (0-62 MPH)', '0-100 KM/H (0-62 MPH)', '0-100 KM/H (0-62 MPH)', '0–100 KM/H (0–62 MPH)', '0-100 KM/H (0-62 MPH)', '0-100 KM/H (0-62 MPH)'],
  ['CHASSIS', 'CHASSIS', 'TELAIO', 'FAHRGESTELL', 'CHÂSSIS', 'CHASSI'],
  ['OPEN CONFIGURATOR', 'OPEN CONFIGURATOR', 'APRI IL CONFIGURATORE', 'KONFIGURATOR ÖFFNEN', 'OUVRIR LE CONFIGURATEUR', 'ABRIR CONFIGURADOR'],
  ['DEALER LOCATOR', 'DEALER LOCATOR', 'LOCALIZZATORE CONCESSIONARI', 'HÄNDLERSUCHE', 'LOCALISATEUR DE CONCESSIONNAIRES', 'LOCALIZADOR DE CONCESSIONÁRIAS'],
  ['FIND YOUR DEALER', 'FIND YOUR DEALER', 'TROVA IL TUO CONCESSIONARIO', 'HÄNDLER FINDEN', 'TROUVER VOTRE CONCESSIONNAIRE', 'ENCONTRE UMA CONCESSIONÁRIA'],
  ['TEMERARIO', 'TEMERARIO', 'TEMERARIO', 'TEMERARIO', 'TEMERARIO', 'TEMERARIO'],
  ['PADRAO', 'STANDARD', 'STANDARD', 'STANDARD', 'STANDARD', 'PADRÃO'],
  ['AD PERSONAM : AZZURRO THETYS', 'AD PERSONAM: AZZURRO THETYS', 'AD PERSONAM: AZZURRO THETYS', 'AD PERSONAM: AZZURRO THETYS', 'AD PERSONAM : AZZURRO THETYS', 'AD PERSONAM: AZZURRO THETYS'],
  ['AD PERSONAM : ROSSO MARS', 'AD PERSONAM: ROSSO MARS', 'AD PERSONAM: ROSSO MARS', 'AD PERSONAM: ROSSO MARS', 'AD PERSONAM : ROSSO MARS', 'AD PERSONAM: ROSSO MARS'],
  ['AD PERSONAM : BIANCO MONOCERUS', 'AD PERSONAM: BIANCO MONOCERUS', 'AD PERSONAM: BIANCO MONOCERUS', 'AD PERSONAM: BIANCO MONOCERUS', 'AD PERSONAM : BIANCO MONOCERUS', 'AD PERSONAM: BIANCO MONOCERUS'],
  ['MENU', 'MENU', 'MENU', 'MENÜ', 'MENU', 'MENU'],
  ['CORPORATE', 'CORPORATE', 'AZIENDALE', 'UNTERNEHMENS-', 'ENTREPRISE', 'CORPORATIVA'],
  ['GOVERNANCE', 'GOVERNANCE', 'GOVERNANCE', 'FÜHRUNG', 'GOUVERNANCE', 'GOVERNANÇA'],
  ['01 / INTEGRITY', '01 / INTEGRITY', '01 / INTEGRITÀ', '01 / INTEGRITÄT', '01 / INTÉGRITÉ', '01 / INTEGRIDADE'],
  ['ETHIC CODE', 'ETHIC CODE', 'CODICE ETICO', 'ETHIKKODEX', 'CODE D’ÉTHIQUE', 'CÓDIGO DE ÉTICA'],
  ['02 / PARTNERS', '02 / PARTNERS', '02 / PARTNER', '02 / PARTNER', '02 / PARTENAIRES', '02 / PARCEIROS'],
  ['03 / REPORTING', '03 / REPORTING', '03 / SEGNALAZIONI', '03 / MELDUNGEN', '03 / SIGNALEMENT', '03 / DENÚNCIAS'],
  ['WHISTLEBLOWER SYSTEM', 'WHISTLEBLOWER SYSTEM', 'SISTEMA DI SEGNALAZIONE', 'HINWEISGEBERSYSTEM', 'DISPOSITIF D’ALERTE', 'CANAL DE DENÚNCIAS'],
  ['04 / COMPLIANCE', '04 / COMPLIANCE', '04 / CONFORMITÀ', '04 / COMPLIANCE', '04 / CONFORMITÉ', '04 / CONFORMIDADE'],
  ['05 / RESPONSIBILITY', '05 / RESPONSIBILITY', '05 / RESPONSABILITÀ', '05 / VERANTWORTUNG', '05 / RESPONSABILITÉ', '05 / RESPONSABILIDADE'],
  ['BUSINESS AND HUMAN RIGHTS', 'BUSINESS AND HUMAN RIGHTS', 'IMPRESE E DIRITTI UMANI', 'WIRTSCHAFT UND MENSCHENRECHTE', 'ENTREPRISES ET DROITS HUMAINS', 'NEGÓCIOS E DIREITOS HUMANOS'],
  ['06 / TRANSPARENCY', '06 / TRANSPARENCY', '06 / TRASPARENZA', '06 / TRANSPARENZ', '06 / TRANSPARENCE', '06 / TRANSPARÊNCIA'],
  ['HUMAN RIGHTS STATEMENT', 'HUMAN RIGHTS STATEMENT', 'DICHIARAZIONE SUI DIRITTI UMANI', 'ERKLÄRUNG ZU MENSCHENRECHTEN', 'DÉCLARATION SUR LES DROITS HUMAINS', 'DECLARAÇÃO SOBRE DIREITOS HUMANOS'],
  ['TAX STRATEGY', 'TAX STRATEGY', 'STRATEGIA FISCALE', 'STEUERSTRATEGIE', 'STRATÉGIE FISCALE', 'ESTRATÉGIA TRIBUTÁRIA'],
  ['Cooperative compliance regime', 'Cooperative compliance regime', 'Regime di adempimento collaborativo', 'Kooperatives Compliance-System', 'Régime de conformité coopérative', 'Regime de conformidade cooperativa'],
  ['State grants', 'State grants', 'Contributi pubblici', 'Staatliche Zuschüsse', 'Aides publiques', 'Subsídios públicos'],
  ['Risk management', 'Risk management', 'Gestione dei rischi', 'Risikomanagement', 'Gestion des risques', 'Gestão de riscos'],
  ['Tax strategy', 'Tax strategy', 'Strategia fiscale', 'Steuerstrategie', 'Stratégie fiscale', 'Estratégia tributária'],
  ['Corporate governance', 'Corporate governance', 'Corporate governance', 'Unternehmensführung', 'Gouvernance d’entreprise', 'Governança corporativa'],
  ['Financial information', 'Financial information', 'Informazioni finanziarie', 'Finanzinformationen', 'Informations financières', 'Informações financeiras'],
  ['Careers', 'Careers', 'Lavora con noi', 'Karriere', 'Carrières', 'Carreiras'],
  ['EXPLORE THE FULL HISTORY', 'EXPLORE THE FULL HISTORY', 'ESPLORA LA STORIA COMPLETA', 'GESAMTE GESCHICHTE ENTDECKEN', 'DÉCOUVRIR TOUTE L’HISTOIRE', 'EXPLORE A HISTÓRIA COMPLETA'],
  ['COOKIES SETTINGS', 'COOKIES SETTINGS', 'IMPOSTAZIONI COOKIE', 'COOKIE-EINSTELLUNGEN', 'PARAMÈTRES DES COOKIES', 'CONFIGURAÇÕES DE COOKIES'],
  ['Cookie settings', 'Cookie settings', 'Impostazioni cookie', 'Cookie-Einstellungen', 'Paramètres des cookies', 'Configurações de cookies'],
  ['A REVOLUTION ON FOUR WHEELS', 'A REVOLUTION ON FOUR WHEELS', 'UNA RIVOLUZIONE SU QUATTRO RUOTE', 'EINE REVOLUTION AUF VIER RÄDERN', 'UNE RÉVOLUTION SUR QUATRE ROUES', 'UMA REVOLUÇÃO SOBRE QUATRO RODAS'],
  ['1963 — ATÉ HOJE', '1963 — TODAY', '1963 — OGGI', '1963 — HEUTE', '1963 — AUJOURD’HUI', '1963 — ATÉ HOJE'],
  ['DESIGN', 'DESIGN', 'DESIGN', 'DESIGN', 'DESIGN', 'DESIGN'],
  ['BOLD', 'BOLD', 'AUDACE', 'KRAFTVOLL', 'AUDACIEUX', 'OUSADA'],
  ['ATTITUDE', 'ATTITUDE', 'CARATTERE', 'AUFTRITT', 'ATTITUDE', 'ATITUDE'],
  ['EVERY ROAD.', 'EVERY ROAD.', 'OGNI STRADA.', 'JEDE STRASSE.', 'CHAQUE ROUTE.', 'CADA ESTRADA.'],
  ['YOUR WAY.', 'YOUR WAY.', 'A MODO TUO.', 'DEIN WEG.', 'À VOTRE FAÇON.', 'DO SEU JEITO.'],
  ['VISIT', 'VISIT', 'VISITA', 'BESUCHEN', 'VISITER', 'VISITE'],
  ['Phone:', 'Phone:', 'Telefono:', 'Telefon:', 'Téléphone :', 'Telefone:'],
  ['WARRANTY', 'WARRANTY', 'GARANZIA', 'GARANTIE', 'GARANTIE', 'GARANTIA'],
  ['EXTENSION', 'EXTENSION', 'ESTENSIONE', 'VERLÄNGERUNG', 'EXTENSION', 'ESTENDIDA'],
  ['HUMAN RIGHTS', 'HUMAN RIGHTS', 'DIRITTI UMANI', 'MENSCHENRECHTE', 'DROITS HUMAINS', 'DIREITOS HUMANOS'],
  ['INFO AND BOOKING', 'INFO AND BOOKING', 'INFO E PRENOTAZIONI', 'INFO UND BUCHUNG', 'INFORMATIONS ET RÉSERVATION', 'INFORMAÇÕES E RESERVAS'],
  ['VISIT', 'VISIT', 'VISITA', 'BESUCHEN', 'VISITER', 'VISITE'],
  ['L-Code', 'L-Code', 'L-Code', 'L-Code', 'L-Code', 'L-Code'],
];

const normalizePhrase = phrase => phrase.trim().replace(/\s+/g, ' ').replace(/[’‘]/g, "'").replace(/[“”]/g, '"');

const phraseTranslations = Object.fromEntries(
  Object.keys(translations).map((language, index) => [
    language,
    new Map([...pagePhrases, ...extendedPagePhrases].map(([source, ...values]) => [normalizePhrase(source), values[index]]))
  ])
);
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

function applyLanguage(lang) {
  const selectedLanguage = Object.hasOwn(translations, lang) ? lang : 'en';
  const langMap = translations[selectedLanguage];
  const phraseMap = phraseTranslations[selectedLanguage];
  const titleTranslation = phraseMap.get(normalizePhrase(originalDocumentTitle));
  if (titleTranslation) document.title = titleTranslation;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const textNode = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
    if (textNode && langMap[key]) {
      if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue);
      const source = originalText.get(textNode);
      textNode.nodeValue = `${source.match(/^\s*/)[0]}${langMap[key]}${source.match(/\s*$/)[0]}`;
    }
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim() || node.parentElement.closest('[data-i18n], script, style')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const phrase = normalizePhrase(source);
    const translated = phraseMap.get(phrase);
    if (translated) {
      node.nodeValue = `${source.match(/^\s*/)[0]}${translated}${source.match(/\s*$/)[0]}`;
    }
  }

  const translatedAttributes = ['placeholder', 'aria-label', 'title', 'alt'];
  document.querySelectorAll(translatedAttributes.map(attribute => `[${attribute}]`).join(',')).forEach(element => {
    translatedAttributes.forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      let sources = originalAttributes.get(element);
      if (!sources) {
        sources = {};
        originalAttributes.set(element, sources);
      }
      if (!Object.hasOwn(sources, attribute)) sources[attribute] = element.getAttribute(attribute);
      const translated = phraseMap.get(normalizePhrase(sources[attribute]));
      if (translated) element.setAttribute(attribute, translated);
    });
  });

  document.documentElement.lang = selectedLanguage === 'pt' ? 'pt-BR' : selectedLanguage;
  document.querySelectorAll('.lang-option').forEach(button => {
    const isActive = button.dataset.lang === selectedLanguage;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    if (button.matches('input[type="radio"]')) button.checked = isActive;
  });

  document.body.dataset.lang = selectedLanguage;
  localStorage.setItem('lamborghiniLanguage', selectedLanguage);
  const floatingLanguageButton = document.querySelector('.site-language-toggle');
  if (floatingLanguageButton) floatingLanguageButton.textContent = `${selectedLanguage.toUpperCase()} ▾`;
}

const originalDocumentTitle = document.title;

if (!document.querySelector('.lang-option')) {
  const languageSwitcher = document.createElement('div');
  languageSwitcher.className = 'site-language-switcher';
  languageSwitcher.innerHTML = `
    <button type="button" class="site-language-toggle" aria-label="Change language" aria-expanded="false">EN ▾</button>
    <div class="site-language-options" hidden>
      <button type="button" class="lang-option" data-lang="en">English</button>
      <button type="button" class="lang-option" data-lang="it">Italiano</button>
      <button type="button" class="lang-option" data-lang="de">Deutsch</button>
      <button type="button" class="lang-option" data-lang="fr">Français</button>
      <button type="button" class="lang-option" data-lang="pt">Português</button>
    </div>`;
  const languageStyles = document.createElement('style');
  languageStyles.textContent = `
    .site-language-switcher{position:fixed;top:18px;right:18px;z-index:10000;font:600 12px/1.2 Arial,sans-serif}
    .site-language-toggle,.site-language-options button{border:1px solid #777;background:#111;color:#fff;padding:10px 13px;cursor:pointer;letter-spacing:.06em}
    .site-language-toggle{min-width:58px}
    .site-language-options{display:grid;margin-top:4px;background:#111}
    .site-language-options[hidden]{display:none}
    .site-language-options button{border-color:#333;text-align:left}
    .site-language-options button:hover,.site-language-options button.active{background:#d6fd00;color:#111}
    .site-language-toggle:focus-visible,.site-language-options button:focus-visible{outline:2px solid #d6fd00;outline-offset:2px}
  `;
  document.head.append(languageStyles);
  document.body.append(languageSwitcher);
  const toggle = languageSwitcher.querySelector('.site-language-toggle');
  const options = languageSwitcher.querySelector('.site-language-options');
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(isExpanded));
    options.hidden = !isExpanded;
  });
  languageSwitcher.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', () => {
      options.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const storedLanguage = localStorage.getItem('lamborghiniLanguage') || 'en';
applyLanguage(storedLanguage);

document.querySelectorAll('.lang-option').forEach(button => {
  button.addEventListener('click', () => {
    applyLanguage(button.dataset.lang);
  });
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      applyLanguage(button.dataset.lang);
    }
  });
});

document.querySelectorAll('.lang-btn, .company-lang, .beyond-lang, .museum-lang, .models-lang').forEach(button => {
  const languageControl = button.closest('.menu-overlay, .company-menu, .beyond-menu, .museum-menu, .models-language');
  if (!languageControl) return;

  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const isOpen = languageControl.classList.toggle('language-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const companyLink = document.querySelector('a[href="company.html"]');
if (companyLink) {
  companyLink.setAttribute('aria-label', 'Open Company page');
}
