const { Schema, model } = require("mongoose");

const beerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default: 'https://static-verticommnetwork1.netdna-ssl.com/img/products/default-2061-full.png'

    },
    style: {
      type: String,

    },
    brewery: {
      type: String,

    },
    description: {
      type: String,
 
    },
    quantity: {
      type: String,

    },
    abv: {
      type: Number,

    },
    brand: {
      type: String,

    },
    restaurantId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("Beer", beerSchema);
