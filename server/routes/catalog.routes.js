const express = require("express");
const Catalog = require("../models/Catalog");
const fs = require("fs/promises");
const chalk = require("chalk");

const {
  addCatalog,
  updateCatalog,
  deleteCatalog,
} = require("../catalog.controller");
const { send } = require("process");

const router = express.Router({ mergeParams: true });

// /api/
router
  .get("/", async (req, res) => {
    try {
      const list = await Catalog.find();
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        massage: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })
  // /api/upload
  .post("/upload", async (req, res) => {
    const files = req.files;
    const filename = req.body.fileName;

    const dirname = filename.split(".")[0];

    // console.log(req.body);
    const product = {
      idAt: req.body.idAt,
      method: req.body.method.split(","),
      group: req.body.group,
      genus: req.body.genus,
      family: req.body.family,
      name: req.body.name,
      images: [],
      price: +req.body.price,
      imgMain: "",
      descr: {
        title: req.body.name,
        p: req.body.descr,
      },
      care: {
        title: "Уход",
        subtitle: "Общий уход",
        p: req.body.care,
      },
    };

    try {
      await fs.mkdir(`public/images/main/${dirname}/`, {
        recursive: true,
      });
      console.log(chalk.cyanBright("Директория создана"));

      await fs.mkdir(`public/images/catalog/${dirname}/`, {
        recursive: true,
      });
      console.log(chalk.cyanBright("Директория создана"));
      for (const key in files) {
        //   console.log(key);
        const element = files[key];
        //   console.log(element);
        if (key === "img_main") {
          await element.mv(
            `public/images/main/${dirname}/${element.name}`,
            (err) => {
              if (err) {
                res
                  .status(500)
                  .send({ message: "Не удалось загрузить файл", code: 500 });
              }

              console.log(chalk.yellow("Файл был записан"));
            }
          );
          product.imgMain = `/images/main/${element.name}`;
        } else {
          await element.mv(
            `public/images/catalog/${dirname}/${element.name}`,
            (err) => {
              if (err) {
                res
                  .status(500)
                  .send({ message: "Не удалось загрузить файл", code: 500 });
              }

              console.log(chalk.yellow("Файл был записан"));
            }
          );
          product.images.push(`/images/catalog/${element.name}`);
        }
      }

      // console.log(product);
      await addCatalog(product);

      const productBase = await Catalog.create(product);

      // const list = await Catalog.find();
      // console.log(productBase);

      res.status(201).send(productBase);
    } catch (error) {
      res.status(500).json({
        massage: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })

  .patch("/:productId", async (req, res) => {
    const { productId } = req.params;
    console.log(productId);
    console.log(req.body);
    try {
      if (productId === req.body.payload._id) {
        const newProduct = await Catalog.findByIdAndUpdate(
          productId,
          {
            price: req.body.price,
          },
          { new: true }
        );
        await updateCatalog(req.body.idAt, { price: req.body.price });
        res.status(201).send(newProduct);
      }
    } catch (error) {
      res.status(500).json({
        massage: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  })

  .delete("/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
      const productById = await Catalog.findById(productId);
      await productById.remove();
      await deleteCatalog(productById.idAt);
      res.status(201).send({ id: productById._id });
    } catch (error) {
      res.status(500).json({
        massage: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports = router;
