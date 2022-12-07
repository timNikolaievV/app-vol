import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  demand: {
    type: Number,
    requierd: "Demand is required",
  },
  collected: {
    type: Number,
    requierd: "Collected is required",
  },
  unitOfMeasure: {
    type: String,
    requierd: "Unit of measure is required",
  },
  category: {
    type: String,
    requierd: "Category is required",
  },

  storage: { type: mongoose.Schema.ObjectId, ref: "Storage" },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

QuerySchema.methods = {};

export default mongoose.model("Query", QuerySchema);
