import Query from "../models/query.model";
import Storage from "../models/storage.model";

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

const queryByID = async (req, res, next, id) => {
  try {
    let query = await Query.findById(id);
    if (!query)
      return res.status("400").json({
        error: "Query not found",
      });
    req.query = query;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve query",
    });
  }
};

const listByStorage = async (req, res) => {
  try {
    console.log(req.query.storageId);
    console.log(req.query.create)
    let storage = await Storage.findById("638871ee41d0942700c1d243");
    let queries = await Query.find({ storage: req.storage._id }).populate(
      "query",
      "_id name"
    );

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

// const read = (req, res) => {
//   return res.json(req.query);
// };

const update = async (req, res) => {
  try {
    let query = req.query;
    query = extend(query, req.body);
    query.updated = Date.now();
    await query.save();
    res.json(query);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let query = req.query;
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
  queryByID,
  listByStorage,
  listCategories,
  // read,
  remove,
  update,
};
