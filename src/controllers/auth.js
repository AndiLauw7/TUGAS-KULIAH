const { user } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const usersExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!usersExist) {
      const newUser = await user.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
        image: null,
      });

      const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
      res.status(201).send({
        status: "success",
        message: "Register Succeess",
        data: {
          user: {
            id: newUser.id,
            fullname: newUser.fullname,
            image: newUser.image,
            token,
          },
        },
      });
    } else {
      return res.status(400).send({
        status: "failed",
        message: "user already exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server Eror",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    res.status(400)({
      error: {
        message: error.details[0].message,
      },
    });
  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createAt", "updateAt"],
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password and email not match!!!",
      });
    }
    const token = jwt.sign({ id: userExist }, process.env.SECRET_KEY);
    res.status(200).send({
      status: "succes",
      message: "login Success",
      data: {
        id: userExist.id,
        fullname: userExist.fullname,
        image: userExist.image,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;
    const dataUser = await user.findOne({
      where: { id },
      attributes: {
        exclude: ["createAt", "updateAt", "password"],
      },
    });
    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          fullname: dataUser.fullname,
          image: dataUser.image,
        },
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "server Eror",
    });
  }
};
