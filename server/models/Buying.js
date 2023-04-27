const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    userId: {
      //   Кто оставил комментарий
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buying: Object,
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Buying", schema);
