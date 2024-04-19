import express from 'express';
import cors from 'cors';
import Nutritionix from './Recipes/routes.js'; // Import your Nutritionix route handler
import UserRoutes from './Users/routes.js';
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
   );

   const sessionOptions = {
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false,
   };
   if (process.env.NODE_ENV !== "development") {
     sessionOptions.proxy = true;
     sessionOptions.cookie = {
       sameSite: "none",
       secure: true,
       domain: process.env.HTTP_SERVER_DOMAIN,
     };
   }
   app.use(session(sessionOptions));
app.use(express.json());


// Mount the Nutritionix route handler
Nutritionix(app);
UserRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});