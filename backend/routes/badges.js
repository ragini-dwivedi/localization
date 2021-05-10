let express = require('express');
let router = express.Router();

let { client } = require('../database/mongodb');

router.get('/getBadges', async function(req, res, next) {
  try {
    let data_all = await client.db('gamification').collection('all_badges').find({}).toArray();
    let data_personal = await client.db('gamification').collection('user_badges').find({}).toArray();
    
    res.status(200).send({data_all, data_personal});
  }catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;

