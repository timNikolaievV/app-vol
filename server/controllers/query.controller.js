import Query from "../models/query.model";
import Storage from "../models/storage.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
  const query = new Query(req.body);
  try {
    await query.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const read = async (req, res) => {
  try {
    let query = await Query.findById(req.params.queryId);
    if (!query)
      return res.status("400").json({
        error: "Query not found",
      });
    res.json(query);
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve query",
    });
  }
};

const listByStorage = async (req, res) => {
  try {
    let storage = await Storage.findById(req.storage._id);
    const query = {};

    //if (req.query.search) {
    if (req.query.search)
      query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category != "All")
      query.category = req.query.category;
    if (req.query.collectedNotZero === "true") query.collected = { $gt: 0 };
    console.log(req.query.collectedNotZero === "true")
    //}
    query.storage = req.storage._id;
    console.log(query);
    let queries = await Query.find(query).populate("query", "_id name");
    res.json({ queries: queries, storage: storage });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listCategories = async (req, res) => {
  try {
    let queries = await Query.distinct("category", {});
    res.json(queries);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  try {
    console.log(req.params.queryId);
    let query = await Query.findById(req.params.queryId);
    if (!query)
      return res.status("400").json({
        error: "Query not found",
      });
    query = extend(query, req.body);
    query.updated = Date.now();
    await query.save();
    res.json(query);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let query = await Query.findById(req.params.queryId);
    if (!query)
      return res.status("400").json({
        error: "Query not found",
      });
    let deletedQuery = await query.remove();
    res.json(deletedQuery);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  read,
  listByStorage,
  listCategories,
  remove,
  update,
};
