const Clients = require("../models/Clients");

exports.newClient = async (req, res, next) => {
  // console.log(req.body);
  const client = new Clients(req.body);

  try {
    await client.save();
    res.json({
      message: "Se guardó el cliente nuevo",
    });
  } catch (error) {
    res.send(error);
    next();
  }
};

exports.Clients = async (req, res, next) => {
  try {
    const clients = await Clients.find({});
    res.json(clients);
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.idClients = async (req, res, next) => {
  const idClient = await Clients.findById(req.params.id);

  if (!idClient) {
    res.json({
      message: "El cliente no existe",
    });
    next();
  }

  res.json(idClient);
};
exports.updateClient = async (req, res, next) => {
  try {
    const client = await Clients.findByIdAndUpdate(
      { _id: req.params.idClient },
      req.body,
      {
        new: true,
      }
    );
    res.json("El cliente se actualizó");
  } catch (error) {
    console.log(error);
    next();
  }
};
exports.deleteClient = async (req, res, next) => {
  try {
    await Clients.findByIdAndDelete({ _id: req.params.idClient });
    res.json({
      message: "El cliente ha sido eliminado",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
