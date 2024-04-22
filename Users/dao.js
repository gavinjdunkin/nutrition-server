import model from "./model.js";
export const createUser = (user) => {
    delete user._id
    return model.create(user);
  }
  
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const addToLikedRecipes = async (userId, recipeId) => {
  try {
    // Find the user by ID
    const user = await model.findById(userId);
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the recipe ID already exists in the liked recipes array
    if (user.likedRecipes.includes(recipeId)) {
      return;
    }

    // Add the recipe ID to the liked recipes array
    user.likedRecipes.push(recipeId);

    // Save the updated user object
    await user.save();
  } catch (error) {
    throw new Error(`Error adding recipe to liked recipes: ${error.message}`);
  }
};
export const findAllLikedRecipesByUser = async (userId) => {

  try {
    // Find the user by ID
    const user = await model.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch all the liked recipes using the liked recipe IDs
    const likedRecipes = (await model.findById(user._id)).likedRecipes;
    return likedRecipes;
  } catch (error) {
    throw new Error(`Error fetching liked recipes: ${error.message}`);
  }
};
export const followUser = async (userId, followUserId) => {
  try {
    // Find the user by ID
    const user = await model.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the follow user ID already exists in the following array
    if (user.following.includes(followUserId)) {
      return;
    }

    // Add the follow user ID to the following array
    user.following.push(followUserId);

    // Save the updated user object
    await user.save();
  } catch (error) {
    throw new Error(`Error following user: ${error.message}`);
  }
}
