const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    idAt: String,
    method: [],
    group: String,
    genus: String,
    family: String,
    name: String,
    images: [],
    imgMain: String,
    price: Number,
    descr: Object,
    care: Object,
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("catalogs", schema);
