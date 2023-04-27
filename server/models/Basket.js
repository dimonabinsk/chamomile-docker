const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: String,
    email: String,
    totalQuantity: Number,
    totalPrice: Number,
    basket: {},
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Basket", schema);
