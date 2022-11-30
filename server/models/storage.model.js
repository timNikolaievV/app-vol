import mongoose from "mongoose";

const StorageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  location: {
    type: String,
    trim: true,
    requierd: "Amount is required",
  },
  contactPerson: {
    type: String,
    requierd: "Contact person is required",
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

StorageSchema.methods = {};

export default mongoose.model("Storage", StorageSchema);
