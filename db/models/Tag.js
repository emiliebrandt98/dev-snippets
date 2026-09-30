import mongoose from "mongoose";
const TagSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

TagSchema.index({ userId: 1, label: 1 }, { unique: true });

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
