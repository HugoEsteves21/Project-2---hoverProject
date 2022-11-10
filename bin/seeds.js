const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hoverProject";

const restaurants = [
  {
    name: "Quimera Brewpub",
    image:
      "https://lifecooler.com/files/artigos/21954/a4a07b4e8a5db34e9081d786b232b9c5.jpg",
    location: {
      adress: "Rua Prior do Crato, 6",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.3,
    beerId: [],
  },

  {
    name: "Dois Corvos",
    image:
      "https://gottakeepmovin.com/wp-content/uploads/2017/01/2017-01-18-05.54.08-1-1-1024x684.jpg",
    location: {
      adress: "Rua Capitão Leitão, 94",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.6,
    beerId: [],
  },

  {
    name: "O Purista",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/07/76/5a/01/the-interior.jpg",
    location: {
      adress: "Rua Nova da Trindade, 16",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.3,
    beerId: [],
  },

  {
    name: "Oitava Colina",
    image:
      "https://www.nit.pt/wp-content/uploads/2021/08/fa70e4707eca421f00b5315b821f25f2.jpg",
    location: {
      adress: "Rua Damasceno Monteiro, 8A",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.6,
    beerId: [],
  },

  {
    name: "Boteco Dona Luzia",
    image:
      "https://lisboasecreta.co/wp-content/uploads/2022/01/boteco-dona-luzia-na-grac%CC%A7a-@botecodonaluzia4-1024x691.jpeg",
    location: {
      adress: "Avenida 5 de Outubro, 36D",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.2,
    beerId: [],
  },

  {
    name: "The Couch Sports Bar",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/11/18/c5/0b/the-bar.jpg",
    location: {
      adress: "Rua do Alecrim, 21A",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.8,
    beerId: [],
  },

  {
    name: "Irish & Co.",
    image: "https://lifecooler.com/files/registos/imagens/437103/265281.jpg",
    location: {
      adress: "Rua da Pimenta 57-61",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.3,
    beerId: [],
  },

  {
    name: "Lx Brewery",
    image:
      "https://lxfactory.com/wp-content/uploads/2021/12/9Z1A0372-1-770x513.jpg",
    location: {
      adress: "Rua do Funchal, 5",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.4,
    beerId: [],
  },

  {
    name: "Fábrica da Musa",
    image: "https://media.timeout.com/images/105434324/1024/576/image.jpg",
    location: {
      adress: "Rua do Açúcar, 83",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.2,
    beerId: [],
  },

  {
    name: "Lince",
    image:
      "https://www.nit.pt/wp-content/uploads/2021/07/5a8d866955c656fe839aff35ed682767-754x394.jpg",
    location: {
      adress: "Rua Capitão Leitão, 1B",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.6,
    beerId: [],
  },

  {
    name: "Delirium Café Lisboa",
    image:
      "https://www.reportergourmet.com.br/wp-content/uploads/2018/10/43788780_2172093593073059_6737716850244714496_n.jpg",
    location: {
      adress: "Calçada Nova de São Francisco, 2A",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.5,
    beerId: [],
  },

  {
    name: "Sacarrabos Beer Co.",
    image:
      "https://offloadmedia.feverup.com/lisboasecreta.co/wp-content/uploads/2021/08/06053956/%40sacarrabos.jpg",
    location: {
      adress: "Rua da Moeda, 12",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.3,
    beerId: [],
  },

  {
    name: "Tasca do Chico",
    image:
      "https://i.pinimg.com/564x/d1/ab/54/d1ab5407ea1d7bde5209d3a9791b4062.jpg",
    location: {
      adress: "Rua Diário de Notícias, 39",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.6,
    beerId: [],
  },

  {
    name: "DeBru",
    image: "https://media.timeout.com/images/105388396/image.jpg",
    location: {
      adress: "Rua Luciano Cordeiro, 2C",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.5,
    beerId: [],
  },

  {
    name: "Cerveteca",
    image:
      "https://media.cntraveler.com/photos/5bd0d898d3112f75d8d184a6/16:9/w_2560,c_limit/CervetecaLisboa-03_Maique-Madeira.jpg",
    location: {
      adress: "Praça das Flores, 63",
      latLong: {
        latitude: [],
        longitude: [],
      },
    },
    rating: 4.8,
    beerId: [],
  },
];

async function seeds() {
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(`Connected to: ${x.connections[0].name}`);

    const createdRestaurants = await Restaurant.create(restaurants);

    console.log(`Successfuly created ${createdRestaurants.length} restaurants`);

    x.disconnect();
  } catch (error) {
    console.log(error);
  }
}

seeds();
