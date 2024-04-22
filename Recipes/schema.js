import mongoose from 'mongoose';

const recipeInteractionSchema = new mongoose.Schema({
  link: { type: String, required: true },
  likes: {
    count: { type: Number, default: 0 },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  comments: [{ 
    text: String, user: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}],
}, { collection: 'recipeInteractions' });


export default recipeInteractionSchema;