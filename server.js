import mongoose from 'mongoose';

console.log('Hello, World!');

// Define the MongoDB connection URI
const mongoURI = 'mongodb+srv://gavinjdunkin:ER3Gcev6TycRdRT8@nutrition-server.lmm1dhg.mongodb.net/?retryWrites=true&w=majority&appName=nutrition-server';

// Connect to MongoDB
mongoose.connect(mongoURI);

// Get the default connection
const db = mongoose.connection;

// Check if the connection is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


export default mongoose;