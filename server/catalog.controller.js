const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const catalogPath = path.join(__dirname + "/mock", "catalog.json");

async function getCatalog() {
  const catalog = await fs.readFile(catalogPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(catalog)) ? JSON.parse(catalog) : [];
}

async function addCatalog(product) {
  const catalog = await getCatalog();
  catalog.push(product);
  await fs.writeFile(catalogPath, JSON.stringify(catalog));
  console.log(chalk.bgGreen("Товар был добавлен!"));
}

async function updateCatalog(id, data) {
  const catalog = await getCatalog();
  if (catalog.length > 0) {
    const newCatalog = catalog.map((prod) => {
      if (prod.idAt === id) {
        console.log(chalk.yellowBright(`Продукт '${prod.name}' был изменён!`));
        return {
          ...prod,
          ...data,
        };
      }
      return prod;
    });

    await fs.writeFile(catalogPath, JSON.stringify(newCatalog));
  }
}

async function deleteCatalog(id) {
  const catalog = await getCatalog();
  if (catalog.length > 0) {
    const newCatalog = catalog.filter((prod) => {
      if (prod.idAt !== id) {
        return prod;
      } else {
        console.log(chalk.yellowBright(`Продукт '${prod.name}' был удалён!`));
      }
    });

    await fs.writeFile(catalogPath, JSON.stringify(newCatalog));
  }
}

module.exports = {
  getCatalog,
  addCatalog,
  updateCatalog,
  deleteCatalog,
};
