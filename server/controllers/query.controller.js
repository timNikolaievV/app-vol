import Storage from "../models/storage.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
  const storage = new Storage(req.body);
  try {
    await storage.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const queryeByID = async (req, res, next, id) => {
  try {
    let storage = await Storage.findById(id);
    if (!storage)
      return res.status("400").json({
        error: "Storage not found",
      });
    req.storage = storage;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve storage",
    });
  }
};

const listByStorage = async (req, res) => {
  try {
    let queries = await Query.find({ storage: req.storage._id }).populate(
      "storage",
      "_id name"
    );

    res.json(queries);
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
//   return res.json(req.storage);
// };

// const list = async (req, res) => {
//   try {
//     let storages = await Storage.find().select(
//       "name location contactPerson updated created"
//     );
//     res.json(storages);
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

// const update = async (req, res) => {
//   try {
//     let storage = req.storage;
//     storage = extend(storage, req.body);
//     storage.updated = Date.now();
//     await storage.save();
//     storage.hashed_password = undefined;
//     storage.salt = undefined;
//     res.json(storage);
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

// const remove = async (req, res) => {
//   try {
//     let storage = req.storage;
//     let deletedStorage = await storage.remove();
//     deletedStorage.hashed_password = undefined;
//     deletedStorage.salt = undefined;
//     res.json(deletedStorage);
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

export default {
  create,
  queryeByID,
  listByStorage,
  listCategories,
  // read,
  // list,
  // remove,
  // update,
};
