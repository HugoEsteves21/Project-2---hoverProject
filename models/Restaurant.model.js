const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://i.ibb.co/zxRZ9FC/pub-5537449-1280.jpg'
    },

    location: {},
    rating: Number,
    beerId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Beer",
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
