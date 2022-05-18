const { barangmasuk, user } = require("../../models");

exports.addBarangmasuk = async (req, res) => {
  try {
    console.log(req.user);
    const data = {
      iduser: req.body.iduser,
      kodebarang: req.body.kodebarang,
      tgl: req.body.tgl,
      jumlah: req.body.jumlah,
    };
    console.log(data);

    let newMasuk = await barangmasuk.create(data);
    console.log(newMasuk);
    let masukData = await barangmasuk.findOne({
      where: {
        id: newMasuk.id,
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

    masukData = JSON.parse(JSON.stringify(masukData));

    res.send({
      status: "success",
      data: {
        ...masukData,
      },
    });
    // const newMasuk = await barangmasuk.create(req.body);
    // res.send({
    //   status: "status success",
    //   data: {
    //     id: newMasuk.id,
    //     iduser: newMasuk.iduser,
    //     kodebarang: newMasuk.kodebarang,
    //     tgl: newMasuk.tgl,
    //     jumlah: newMasuk.jumlah,
    //   },
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.editbarangmasuks = async (req, res) => {
  try {
    const { id } = req.params;
    let data = {
      iduser: req?.body?.iduser,
      kodebarang: req?.body?.kodebarang,
      tgl: req?.body?.tgl,
      jumlah: req?.body?.jumlah,
    };
    await barangmasuk.update(data, {
      where: {
        id,
      },
    });
    let databarang = await barangmasuk.findOne({
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

exports.deletebarangmasuks = async (req, res) => {
  try {
    const { id } = req.params;
    await barangmasuk.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete Item ${id} Complete `,
    });
  } catch (error) {}
};

exports.getBarangmasuks = async (req, res) => {
  try {
    let data = await barangmasuk.findAll({
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
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getbarangmasuk = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await barangmasuk.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updateAt", "password"],
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

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
