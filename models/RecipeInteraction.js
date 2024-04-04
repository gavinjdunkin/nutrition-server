import mongoose from '../server.js';

const recipeInteractionSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ text: String, user: String }]
});

const RecipeInteraction = mongoose.model('RecipeInteraction', recipeInteractionSchema);

export default RecipeInteraction;