let express = require('express');
let router = express.Router();

let { client } = require('../database/mongodb');

router.get('/getCommunities', async function(req, res, next) {
  try {
    let result = await client.db('gamification').collection('communities').find({}).toArray();
    
    res.status(200).send(result);
  }catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;