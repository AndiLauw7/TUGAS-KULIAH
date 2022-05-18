const { barangkeluar, user } = require("../../models");

exports.addbarangkeluar = async (req, res) => {
  try {
    const data = {
      iduser: req.body.iduser,
      kodebarang: req.body.kodebarang,
      tgl: req.body.tgl,
      jumlah: req.body.jumlah,
    };
    console.log(data);

    let newKeluar = await barangkeluar.create(data);
    console.log(newKeluar);

    let keluarData = await barangkeluar.findOne({
      where: {
        id: newKeluar.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "iduser"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    keluarData = JSON.parse(JSON.stringify(keluarData));

    res.status(201).send({
      status: "succes",
      data: {
        ...keluarData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.editbarangkeluar = async (req, res) => {
  try {
    const { id } = req.params;
    let data = {
      iduser: req?.body?.iduser,
      kodebarang: req?.body?.kodebarang,
      tgl: req?.body?.tgl,
      jumlah: req?.body?.jumlah,
    };
    await barangkeluar.update(data, {
      where: {
        id,
      },
    });
    let databarang = await barangkeluar.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createAt", "updateAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
    });
    res.send({
      status: "success",
      data: {
        id,
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deletebarangkeluar = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.params;
    await barangkeluar.destroy({
      where: {
        id,
      },
    });

    res.status(201).send({
      status: "success",
      message: `delete item ${id} complete`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getbarangkeluars = async (req, res) => {
  try {
    let data = await barangkeluar.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "server error",
    });
  }
};

exports.getbarangkeluar = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await barangkeluar.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "server error",
    });
  }
};
