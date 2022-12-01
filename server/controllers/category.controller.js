import Category from "../models/category.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const list = async (req, res) => {
  try {
    let categorys = await Category.find().select("name location contactPerson updated created");
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
