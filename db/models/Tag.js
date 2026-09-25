import mongoose from "mongoose";
const TagSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: ture }
);

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
