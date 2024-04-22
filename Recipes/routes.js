import axios from 'axios';
import RecipeInteraction from './model.js';
import { addToLikedRecipes } from '../Users/dao.js';

export default function RecipeRoutes(app) {
  app.get('/recipe/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {

      // Check if the recipe interaction exists in the database
      let interaction = await RecipeInteraction.findById( id );

      const options = {
        method: 'GET',
        url: interaction.link,
      };
      const response = await axios(options);
      const recipe = response.data.recipe;

      // If interaction doesn't exist, create a new one with default values
      if (!interaction) {
        interaction = new RecipeInteraction({
          link: recipeId,
          likes: { count: 0, users: [] },
          comments: []
        });
        await interaction.save();
      }
      recipe.likes = interaction.likes;
      recipe.comments = interaction.comments;
      recipe.id = interaction._id;
      res.json(recipe);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  });
  app.get('/recipe', async (req, res) => {
    const query = req.query.q;
    const options = {
      method: 'GET',
      url: `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=ba862dc6&app_key=b31f0f05b60c26d5de478df582b1759a`,
    };
    
    try {
      const response = await axios(options);
      const recipes = response.data.hits;

      // Iterate over retrieved recipes
      for (const recipe of recipes) {
        const recipeId = recipe._links.self.href; // Assuming URI is used as recipe ID

        // Check if the recipe interaction exists in the database
        let interaction = await RecipeInteraction.findOne({ link: recipeId });

        // If interaction doesn't exist, create a new one with default values
        if (!interaction) {
          interaction = new RecipeInteraction({
            link: recipeId,
            likes: { count: 0, users: [] },
            comments: []
          });
          await interaction.save();
        }
        recipe.recipe.likes = interaction.likes;
        recipe.recipe.comments = interaction.comments;
        recipe.recipe.id = interaction._id;
      }
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/recipe/:uri/like', async (req, res) => {
    const recipeId = req.params.uri;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    try {
      let interaction = await RecipeInteraction.findById( recipeId );
      if (!interaction) {
        interaction = new RecipeInteraction({
          recipeId,
          likes: { count: 1, users: [currentUser._id] },
          comments: []
        });
        interaction.likes.users.push(currentUser._id);
        await interaction.save();
      } else {
        interaction.likes.count += 1;
        interaction.likes.users.push(currentUser._id);
        await interaction.save();
      }
      // Update the user's liked recipes
      await addToLikedRecipes(currentUser._id, recipeId);

      res.json({ message: 'Liked!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.post('/recipe/:uri/comment', async (req, res) => {
    const recipeId = req.params.uri;
    const comment = req.body.comment;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    try {
      let interaction = await RecipeInteraction.findById( recipeId);
      if (!interaction) {
        interaction = new RecipeInteraction({
          recipeId,
          likes: 0,
          comments: [{ text: comment, user: currentUser._id }]
        });
        await interaction.save();
      } else {
        interaction.comments.push({ text: comment, user: currentUser._id });
        await interaction.save();
      }
      res.json({ message: 'Comment added!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};

