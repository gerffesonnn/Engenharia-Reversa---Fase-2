const models = {
  "revuelto-sv": {
    name: "REVUELTO",
    variant: "SV",
    title: "REVUELTO SV",
    images: {
      blue: "../imgs/revuelto-sv-azul.png",
      red: "../imgs/revuelto-sv-vermelho.png",
      white: "../imgs/revuelto-sv-branco.png"
    },
    specs: ["1065 CV", "345 KM/H", "2.4 S"],
    disclaimer: "O veículo ainda não está à venda e, portanto, não está sujeito à Diretiva 1999/94/CE. Os dados de consumo de combustível e emissões estão em fase de homologação.",
    hasColors: true
  },
  "urus-se-performante": {
    name: "URUS",
    variant: "SE PERFORMANTE",
    title: "URUS SE PERFORMANTE",
    image: "../imgs/urus-se-performante.png",
    specs: ["800 CV", "312 KM/H", "3.4 S"]
  },
  temerario: {
    name: "TEMERARIO",
    variant: "",
    title: "TEMERARIO",
    image: "../imgs/temerario.png",
    specs: ["920 CV", "343 KM/H", "2.7 S"]
  },
  revuelto: {
    name: "REVUELTO",
    variant: "",
    title: "REVUELTO",
    image: "../imgs/revuelto.png",
    specs: ["1015 CV", "350 KM/H", "2.5 S"]
  },
  "urus-se": {
    name: "URUS",
    variant: "SE",
    title: "URUS SE",
    image: "../imgs/urus-se.png",
    specs: ["800 CV", "312 KM/H", "3.4 S"]
  }
};

const modelId = new URLSearchParams(window.location.search).get("model") || "revuelto-sv";
const model = models[modelId];

if (!model) {
  const modelTitle = document.querySelector(".cfg-nome");
  const modelError = document.querySelector(".cfg-model-error");
  const car = document.querySelector(".cfg-carro");
  const colors = document.querySelector(".cfg-cores");
  const specs = document.querySelector(".cfg-specs");
  const start = document.querySelector(".cfg-start");

  document.title = "Modelo não encontrado - Configurador";
  modelTitle.textContent = "MODELO NÃO ENCONTRADO";
  modelError.hidden = false;
  car.hidden = true;
  colors.hidden = true;
  specs.hidden = true;
  start.hidden = true;
} else {
  const modelTitle = document.querySelector(".cfg-nome");
  const variant = document.createElement("span");
  variant.textContent = model.variant;
  modelTitle.textContent = model.name;
  if (model.variant) {
    modelTitle.append(" ", variant);
  }

  document.title = `Configurador - ${model.title}`;
  document.querySelector(".cfg-model-error").hidden = true;

  const specValues = document.querySelectorAll(".cfg-specs strong");
  model.specs.forEach((value, index) => {
    if (specValues[index]) {
      specValues[index].textContent = value;
    }
  });

  const carImages = document.querySelectorAll(".cfg-carro img");
  const [blueImage, redImage, whiteImage] = carImages;

  if (model.hasColors) {
    blueImage.src = model.images.blue;
    redImage.src = model.images.red;
    whiteImage.src = model.images.white;
  } else {
    blueImage.src = model.image;
    blueImage.alt = model.title;
    document.querySelector(".cfg-cores").hidden = true;
    document.querySelector(".cfg-rodape p").textContent =
      "Imagem ilustrativa. Cores, disponibilidade e especificações podem variar conforme o mercado.";
  }

  if (model.disclaimer) {
    document.querySelector(".cfg-rodape p").textContent = model.disclaimer;
  }
}
