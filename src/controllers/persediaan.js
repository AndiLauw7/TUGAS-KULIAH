const { persediaan, user, barangmasuk, barangkeluar } = require("../../models");
exports.addPersediaan = async (req, res) => {
  try {
    console.log(data);
    const data = {
      iduser: req.body.iduser,
      kodebarang: req.body.kodebarang,
      idmasuk: req.body.idmasuk,
      stokawal: req.body.stokawal,
      idkeluar: req.body.idkeluar,
      stokakhir: req.body.stokakhir,
    };
    let newPersediaan = await persediaan.create(data);
    // console.log(newPersediaan);
    let stockData = await persediaan.findOne({
      where: {
        id: newPersediaan.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: barangmasuk,
          as: "barangmasuk",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: barangkeluar,
          as: "barangkeluar",
          exclude: ["createdAt", "updatedAt"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "iduser"],
      },
    });

    stockData = JSON.parse(JSON.stringify(stockData));
    console.log(stockData);
    res.status(201).send({
      status: "success",
      data: {
        ...stockData,
        // data: {
        //   iduser: req.body.iduser,
        //   kodebarang: req.body.kodebarang,
        //   idmasuk: req.body.idmasuk,
        //   stokawal: req.body.stokawal,
        //   idkeluar: req.body.idkeluar,
        //   stokakhir: req.body.stokakhir,
        // },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "server error",
    });
  }
};
