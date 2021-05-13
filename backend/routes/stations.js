let express = require('express');
let router = express.Router();

let { client } = require('../database/mongodb');

router.get('/getStations', async function(req, res, next) {
  try {
    let result = await client.db('gamification').collection('stations').find({}).toArray();
    
    res.status(200).send(result);
  }catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;