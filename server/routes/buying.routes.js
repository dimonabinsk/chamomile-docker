const express = require("express");
const auth = require("../middleware/auth.middleware");
const Buying = require("../models/Buying");

const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    console.log(req);
    const list = await Buying.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newBuying = await Buying.create(req.body);
    console.log(newBuying);
    res.status(201).send(newBuying);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
