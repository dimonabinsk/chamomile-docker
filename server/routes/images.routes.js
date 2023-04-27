const express = require("express");
const fsPromises = require("fs/promises");
const router = express.Router({ mergeParams: true });

router
  .get("/main/:fileName", async (req, res) => {
    const { fileName } = req.params;
    const dirname = req.url.split("/")[1];
    const name = fileName.split(".")[0];
    try {
      const img = await fsPromises.readFile(
        `./public/images/${dirname}/${name}/${fileName}`
      );

      res.send(img);
    } catch (error) {
      res.status(500).send({ message: error.message, code: 500 });
    }
  })

  .get("/banner/:fileName", async (req, res) => {
    const { fileName } = req.params;
    const dirname = req.url.split("/")[1];
    const name = fileName.split(".")[0];
    try {
      const img = await fsPromises.readFile(
        `./public/images/${dirname}/${name}/${fileName}`
      );

      res.send(img);
    } catch (error) {
      res.status(500).send({ message: error.message, code: 500 });
    }
  })

  .get("/bg-link/:fileName", async (req, res) => {
    const { fileName } = req.params;
    const dirname = req.url.split("/")[1];
    const name = fileName.split(".")[0];
    try {
      const img = await fsPromises.readFile(
        `./public/images/${dirname}/${name}/${fileName}`
      );

      res.send(img);
    } catch (error) {
      res.status(500).send({ message: error.message, code: 500 });
    }
  })

  .get("/catalog/:fileName", async (req, res) => {
    const { fileName } = req.params;
    const dirname = req.url.split("/")[1];
    const name = fileName.split(".")[0].split("-")[0];
    try {
      const img = await fsPromises.readFile(
        `./public/images/${dirname}/${name}/${fileName}`
      );

      res.send(img);
    } catch (error) {
      res.status(500).send({ message: error.message, code: 500 });
    }
  })
  .get("/users/:dirname/:fileName", async (req, res) => {
    const { dirname, fileName } = req.params;
    try {
      const img = await fsPromises.readFile(
        `./public/images/users/${dirname}/${fileName}`
      );
      res.send(img);
    } catch (error) {
      res.status(500).send({ message: error.message, code: 500 });
    }
  });

module.exports = router;
