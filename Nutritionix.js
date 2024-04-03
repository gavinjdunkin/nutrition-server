import axios from 'axios';

const Nutritionix = (app) => {
  app.get('/nutritionix', async (req, res) => {
    const query = req.query.q;
    const options = {
      method: 'GET',
      url: 'https://trackapi.nutritionix.com/v2/search/instant/',
      params: {
        query: query
      },
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'd4a49423',
        'x-app-key': '5c8a3eb72f1a86b6543720c3d1c9551b'
      }
    };
    
    axios(options)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
};

export default Nutritionix;
