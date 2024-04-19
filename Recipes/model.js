import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("RecipeInteractionModel", schema);
export default model;