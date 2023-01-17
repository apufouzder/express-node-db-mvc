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

// post tool in database
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

// Load tool with specific id
module.exports.getToolsDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id"});
    }

    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });
    
    if (!tool) {
      return res.status(404).json({ success: false, error: "Couldn't find a tool with id" });
    }

    res.status(200).json({success: true, data: tool})
  } catch (error) {
    next(error);
  }
  
};

// update tool with tool id
module.exports.updateTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id"});
    }

    const tool = await db.collection("tools").updateOne({ _id: ObjectId(id) }, {$set: req.body});
    // const tool = await db.collection("tools").updateMany({ age: {$exists: false} }, {$set: {age: 5}});
    
    
    if (!tool.modifiedCount) {
      return res.status(404).json({ success: false, error: "Couldn't update tool!" });
    }

    res.status(200).json({success: true, messages: "Successfully updated data!"});
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Not a valid id"});
    }

    const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });
    
    
    if (!tool.deleteCount) {
      return res.status(404).json({ success: false, error: "Couldn't delete tool!" });
    }

    res.status(200).json({success: true, messages: "Successfully deleted data!"});
  } catch (error) {
    next(error);
  }
};


module.exports.test = async (req, res, next) => {
  for (let i = 0; i < 10000; i++) {
    const db = getDb();
    db.collection("test").insertOne({ "name": `Test ${i}`, age: i });
  }
};

module.exports.getTest = async (req, res, next) => {
  const db = getDb();

  const result = await db.collection('test').find({ age: 9999 }).toArray();
  res.json(result);
};
