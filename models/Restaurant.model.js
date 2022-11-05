const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    adress: String,
    rating: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
