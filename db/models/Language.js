import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const LanguageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  syntax: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
});

export default mongoose.models.Language ||
  mongoose.model("Language", LanguageSchema);
