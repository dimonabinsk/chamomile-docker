const Catalog = require("../models/Catalog");
const catalogMock = require("../mock/catalog.json");


module.exports = async () => {
  const catalog = await Catalog.find();

  if (catalog.length !== catalogMock.length) {
    await createInitialEntity(Catalog, catalogMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
