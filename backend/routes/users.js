let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let { client } = require('../database/mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({ message: 'respond with a resource', error: null});
});

/* POST create user for fitness gamification */
router.post('/createuser', async function(req, res, next) {
  let fullName = req.body.fullName;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;
  let data = { fullName: fullName, username: username, phone: phone, email: email, password: password, creationTime: new Date()};

  try {
    let result = await client.db('gamification').collection('user').findOne({email: email});
    if (result) {
      throw Error('User already exists');
    } else {
      result = await client.db('gamification').collection('user').insertOne(data);
      res.status(200).send();
    }
  } catch (e) {
    if (e.message.includes('User already exists')) {
      res.status(500).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }

});

/* GET get user details for login */
router.post('/login', async function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  try {
    let result = await client.db('gamification').collection('user').findOne({email: email});
    console.log(result);
    if (!result) {
      throw Error('User with email doesnt exist');
    } else {
      if (result.password === password) {
        res.status(200).send(result);
      } else {
        throw Error('Wrong password');
      }
    }
  } catch (e) {
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});

router.get('/getuser/:email', async function(req, res, next) {
  let email = req.params.email;
  try {
    let result = await client.db('gamification').collection('user').findOne({email: email});
    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});

/* POST update user for fitness gamification */
router.post('/updateuser', function(req, res, next) {
  let fullName = req.body.fullName;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;

  let data1 = { email: email };
  let data2 = { fullName: fullName, username: username, phone: phone, password: password, creationTime: new Date()};
  database.updateOneData(data1, data2, 'user', function (err, details) {
    if (err){
      res.send({
        message: err.stack,
        error: err
      });
    } else {
      res.send({
        message: "user updated successfully",
        error: null
      });
    }
  });
});

/* DELETE update user for fitness gamification */
router.delete('/deleteuser', function(req, res, next) {
  let email = req.body.email;
  let query = { email: email };
  database.deleteOneData(query, 'user', function (err, details) {
    if (err){
      res.send({
        message: err.stack,
        error: err
      });
    } else {
      res.send({
        message: "user deleted successfully",
        error: null
      });
    }
  });
});

router.get('/getActivities/:email', async function(req, res, next) {
  let email = req.params.email;
  let start = new Date();
  start.setHours(0,0,0,0);

  let end = new Date();
  end.setHours(23,59,59,999);
  try {
    let data = [];
    let result = await client.db('gamification').collection('activities').find({email: email, createdDateTime: { $gte: start, $lte: end}});
    while(result.hasNext()) {
      data.push(result.next())
    }

    res.status(200).send(data);
  } catch (e) {
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});

module.exports = router;