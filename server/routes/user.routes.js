const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const fs = require("fs/promises");
const chalk = require("chalk");
// const config = require("config");

// const BASE_URL = config.get("BASE_URL");
const BASE_URL = process.env.BASE_URL;
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.body.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body.data, {
        new: true,
      });
      res.status(201).send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/avatar", auth, async (req, res, next) => {
  const avatar = req.files.avatar;
  const userId = req.user._id;

  const avatarName = req.files.avatar.name;

  const path = `${BASE_URL}/images/users/${userId}/${avatarName}`;

  try {
    await fs.mkdir(`public/images/users/${userId}/`, {
      recursive: true,
    });
    console.log(chalk.cyanBright("Директория создана"));

    await avatar.mv(`public/images/users/${userId}/${avatarName}`, (err) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Не удалось загрузить файл", code: 500 });
      }
      console.log(chalk.yellow("Файл был записан"));
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: path },
      {
        new: true,
      }
    );

    res.status(201).send(updatedUser);
  } catch (error) {
    console.log(chalk.red(error.message));
    res.status(500).send({ message: error.message, code: 500 });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
