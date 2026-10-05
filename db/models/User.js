import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Snippet",
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
