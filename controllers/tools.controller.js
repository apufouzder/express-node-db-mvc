const { getDb } = require("../utils/dbConnect");

let tools = [
  { id: 1, name: "apu" },
  { id: 2, name: "rana" },
  { id: 3, name: "Pranto" },
  { id: 4, name: "joy" },
  { id: 5, name: "ratan" },
];

module.exports.getAllTools = (req, res, next) => {
  const { limit, page } = req.query;
  console.log(limit, page);
  res.json(tools);
};

module.exports.saveATools = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;

    const result = await db.collection("tools").insertOne(tool);
    console.log(result);

    if (!result.insertedId) {
      res.status(400).send({ error: false, error: "Something went wrong!" });
    }
    res.send({
      success: true,
      messages: `Tools added with id ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getToolsDetails = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const fTools = tools.find((tool) => tool.id === Number(id));

  // Data send/response Structure for front-end
  res.status(200).send({
    success: true,
    messages: "Successfully",
    data: fTools,
  });
  // res.status(500).send({
  //     success: false,
  //     messages: "Internal Server Error",
  // });
};

module.exports.updateTools = (req, res, next) => {
  const { id } = req.params;
  const newData = tools.find((tool) => tool.id === Number(id));
  newData.id = id;
  newData.name = req.body.name;
  res.send(tools);
};

module.exports.deleteTools = (req, res, next) => {
  const { id } = req.params;
  // const filter = { _id: id };
  tools = tools.filter((tool) => tool.id !== Number(id));

  res.send(tools);
};
