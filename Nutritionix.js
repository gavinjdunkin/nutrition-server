import axios from 'axios';

const Nutritionix = (app) => {
  app.get('/nutritionix', async (req, res) => {
    try {
      // Get the query parameter from the request
      const query = req.query.q;

      // Make a request to the Nutritionix API
      const response = await axios.get('https://api.nutritionix.com/v1_1/search', {
        params: {
          q: query,
          appId: 'd4a49423',
          appKey: '5c8a3eb72f1a86b6543720c3d1c9551b'
        }
      });

      // Send the response from Nutritionix API to the client
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data from Nutritionix API:', error);
      // Send an error response to the client
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default Nutritionix;
