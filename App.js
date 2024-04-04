import express from 'express';
import cors from 'cors';
import Nutritionix from './Nutritionix.js'; // Import your Nutritionix route handler

const app = express();

// Enable CORS middleware
app.use(cors());
app.use(express.json());


// Mount the Nutritionix route handler
Nutritionix(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});