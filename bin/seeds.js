const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hoverProject';

const restaurants = [
    { "name": "Quimera Brewpub",
      "image": "https://lifecooler.com/files/artigos/21954/a4a07b4e8a5db34e9081d786b232b9c5.jpg",
      "location": {
        "adress": "Rua Prior do Crato, 6",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.3,
      "beerId": []
    },

    { "name": "Dois Corvos",
      "image": "",
      "location": {
        "adress": "Rua Capitão Leitão, 94",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.6,
      "beerId": []
    },

    { "name": "O Purista",
      "image": "",
      "location": {
        "adress": "Rua Nova da Trindade, 16",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.3,
      "beerId": []
    },

    { "name": "Oitava Colina",
      "image": "",
      "location": {
        "adress": "Rua Damasceno Monteiro, 8A",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.6,
      "beerId": []
    },

    { "name": "Boteco Dona Luzia",
      "image": "",
      "location": {
        "adress": "Avenida 5 de Outubro, 36D",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.2,
      "beerId": []
    },

    { "name": "The Couch Sports Bar",
      "image": "",
      "location": {
        "adress": "Rua do Alecrim, 21A",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.8,
      "beerId": []
    },

    { "name": "Irish & Co.",
      "image": "",
      "location": {
        "adress": "Rua da Pimenta 57-61",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.3,
      "beerId": []
    },

    { "name": "Lx Brewery",
      "image": "",
      "location": {
        "adress": "Rua do Funchal, 5",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.4,
      "beerId": []
    },

    { "name": "Fábrica da Musa",
      "image": "",
      "location": {
        "adress": "Rua do Açúcar, 83",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.2,
      "beerId": []
    },

    { "name": "Lince",
      "image": "",
      "location": {
        "adress": "Rua Capitão Leitão, 1B",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.6,
      "beerId": []
    },

    { "name": "Delirium Café Lisboa",
      "image": "",
      "location": {
        "adress": "Calçada Nova de São Francisco, 2A",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.5,
      "beerId": []
    },

    { "name": "Sacarrabos Beer Co.",
      "image": "",
      "location": {
        "adress": "Rua da Moeda, 12",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.3,
      "beerId": []
    },

    { "name": "Tasca do Chico",
      "image": "",
      "location": {
        "adress": "Rua Diário de Notícias, 39",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.6,
      "beerId": []
    },

    { "name": "DeBru",
      "image": "",
      "location": {
        "adress": "Rua Luciano Cordeiro, 2C",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.5,
      "beerId": []
    },
    
    { "name": "Cerveteca",
      "image": "",    
      "location": {
        "adress": "Praça das Flores, 63",
        "latLong": {
          "latitude": [],
          "longitude": []
        }
      },
      "rating": 4.8,
      "beerId": []
    }
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