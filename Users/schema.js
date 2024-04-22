import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",},
      following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { collection: "users" });
export default userSchema;