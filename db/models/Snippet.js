import mongoose from "mongoose";
import "./Language";

const { Schema } = mongoose;

const SnippetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    installCommand: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Snippet ||
  mongoose.model("Snippet", SnippetSchema);
