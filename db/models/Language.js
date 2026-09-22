import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
});

export default mongoose.models.Language ||
  mongoose.model("Language", LanguageSchema);
