import axios from 'axios';
import RecipeInteraction from './models/RecipeInteraction.js';

const Nutritionix = (app) => {
  app.get('/nutritionix', async (req, res) => {
    const query = req.query.q;
    const options = {
      method: 'GET',
      url: 'https://api.edamam.com/search',
      params: {
        q: query,
        app_id: 'ba862dc6',
        app_key: 'b31f0f05b60c26d5de478df582b1759a'
      },
    };
    
    try {
      const response = await axios(options);
      const recipes = response.data.hits;

      // Iterate over retrieved recipes
      for (const recipe of recipes) {
        const recipeId = recipe.recipe.uri; // Assuming URI is used as recipe ID

        // Check if the recipe interaction exists in the database
        let interaction = await RecipeInteraction.findOne({ recipeId });

        // If interaction doesn't exist, create a new one with default values
        if (!interaction) {
          interaction = new RecipeInteraction({
            recipeId,
            likes: 0,
            comments: []
          });
          await interaction.save();
        }
        recipe.recipe.likes = interaction.likes;
        recipe.recipe.comments = interaction.comments;
      }
      console.log(recipes)
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/recipe/:uri/like', async (req, res) => {
    const recipeId = req.params.uri;
    try {
      let interaction = await RecipeInteraction.findOne({ recipeId });
      if (!interaction) {
        interaction = new RecipeInteraction({
          recipeId,
          likes: 1,
          comments: []
        });
        await interaction.save();
      } else {
        interaction.likes += 1;
        await interaction.save();
      }
      res.json({ message: 'Liked!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/recipe/:uri/comment', async (req, res) => {
    const recipeId = req.params.uri;
    const comment = req.body.comment;
    try {
      let interaction = await RecipeInteraction.findOne({ recipeId });
      if (!interaction) {
        interaction = new RecipeInteraction({
          recipeId,
          likes: 0,
          comments: [{ text: comment, user: 'Anonymous' }]
        });
        await interaction.save();
      } else {
        interaction.comments.push({ text: comment, user: 'Anonymous' });
        await interaction.save();
      }
      res.json({ message: 'Comment added!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

export default Nutritionix;
