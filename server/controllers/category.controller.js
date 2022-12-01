import Category from "../models/category.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

const categoryByID = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    if (!category)
      return res.status("400").json({
        error: "Category not found",
      });
    req.profile = category;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve category",
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const list = async (req, res) => {
  try {
    let categorys = await Category.find().select("name updated created");
    res.json(categorys);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  categoryByID,
  read,
  list,
};
