import express from 'express';
import Nutritionix from './Nutritionix.js';
const app = express();
Nutritionix(app);
app.listen(4000);