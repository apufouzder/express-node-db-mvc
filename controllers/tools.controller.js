const { getDb } = require("../utils/dbConnect");
const { ObjectId } = require("mongodb");

module.exports.getAllTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { limit, page } = req.query;

    // cursor => toArray(), forEach()
    const tool = await db
      .collection("tools")
      .find()
      .skip(+page*limit)
      .limit(Number(limit))
      .toArray();
    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
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

module.exports.getToolsDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id"});
    }
    
    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });
    
    res.status(200).json({success: true, data: tool})
  } catch (error) {
    next(error);
  }
  
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
