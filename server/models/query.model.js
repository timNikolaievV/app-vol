import mongoose from "mongoose";
import crypto from "crypto";
import { isInteger } from "lodash";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  amount: {
    type: Number,
    requierd: "Amount is required",
  },
  category: { type: mongoose.Schema.ObjectId, ref: "Category" },
  
  storage: { type: mongoose.Schema.ObjectId, ref: "Storage" },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods = {};

export default mongoose.model("User", UserSchema);
