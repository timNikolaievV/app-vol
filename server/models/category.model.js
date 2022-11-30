import mongoose from "mongoose";
import crypto from "crypto";
import { isInteger } from "lodash";
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Category is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.methods = {};

export default mongoose.model("Category", CategorySchema);
