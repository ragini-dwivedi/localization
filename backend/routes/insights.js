let express = require('express');
let router = express.Router();

let { client } = require('../database/mongodb');

router.get('/getUsers', async function(req, res, next) {
  try {
    let result = await client.db('gamification').collection('user').find({}).toArray();
    
    res.status(200).send(result);
  }catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});


router.get('/getUserActivities', async function(req, res, next) {
  try {
    let result = await client.db('gamification').collection('userActivities').find({}).toArray();
    
    res.status(200).send(result);
  }catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;