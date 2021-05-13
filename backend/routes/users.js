let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let { client } = require('../database/mongodb');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let result = await client.db('gamification').collection('user').find({}).toArray();
    res.status(200).send(result);
  }catch(e) {
    res.status(500).send(e);
  }
});

/* POST create user for fitness gamification */
router.post('/createuser', async function(req, res, next) {
  let fullName = req.body.fullName;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let organization = req.body.organization;
  let password = req.body.password;
  let data = { fullName: fullName, username: username, phone: phone, organization: organization, email: email, password: password, creationTime: new Date()};

  try {
    let result = await client.db('gamification').collection('user').findOne({email: email});
    if (result) {
      throw Error('User already exists');
    } else {
      result = await client.db('gamification').collection('user').insertOne(data);
      let result1 = await client.db('gamification').collection('user').findOne({email: email});
      res.status(200).send(result1);
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
  let organization = req.body.organization;
  let password = req.body.password;

  let data1 = { email: email };
  let data2 = { fullName: fullName, username: username, phone: phone, organization : organization, password: password, creationTime: new Date()};
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
    let result = await client.db('gamification').collection('userActivities').find({email: email, createdDateTime: { $gte: start, $lte: end}}).toArray();
    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});

router.get('/getEvents/:email', async function(req, res, next) {
  let email = req.params.email;
  let end = new Date();
  end.setHours(0,0,0,0);
  try {
    let result = await client.db('gamification').collection('userEvents').find({email: email, expirationDateTime: { $gte: end }}).toArray();
    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});

router.get('/getStatistics/:email', async function(req, res, next) {
  let email = req.params.email;
  let end = new Date();
  end.setDate(end.getDate() - 30);
  end.setHours(0,0,0,0);
  try {
    let result = await client.db('gamification').collection('userStatistics').find({email: email, createdDateTime: { $gte: end }}).toArray();
    console.log(result);
    let data = [];
    data.push(['x', 'walking', 'running']);
    let temp = [];
    for (let i = 0; i < result.length; i++){
      temp = [];
      temp.push(i);
      temp.push(result[i].walking);
      temp.push(result[i].running);
      data.push(temp)
    }
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});


router.post('/addUserStatistics', async function(req, res, next) {
  let email = req.body.email;
  let statisticsDate = new Date(req.body.statisticsDate);
  statisticsDate.setHours(24,0,0,0);
  let walking = parseInt(req.body.walking);
  let running = parseInt(req.body.running);

  try {
    let result = await client.db('gamification').collection('userStatistics').find({email: email, createdDateTime: statisticsDate }).toArray();
    console.log(result);
    if (result.length > 0){
      let myquery = { email: email, createdDateTime: statisticsDate };
      let newvalues = { $set: {walking: walking, running: running } };
      let result_new = await client.db('gamification').collection('userStatistics').updateOne(myquery, newvalues, function(err, data) {
        if (err){
          throw (err.message);
        } else {
          res.status(200).send("user statistics added successfully");
        }
      });
    } else {
      let myobj = { walking: walking, running: running, email: email, createdDateTime: new Date().getDate() };
      let result_new = await client.db('gamification').collection('userStatistics').insertOne(myobj,function(err, data) {
        if (err){
          throw (err.message);
        } else {
          res.status(200).send("user statistics added successfully");
        }
      });
    }
  } catch (e) {
    console.log(e);
    if (e.message.includes('User with email doesnt exist') || e.message.includes('Wrong password')) {
      res.status(500).send(e.message);
    }else {
      res.status(500).send(e);
    }
  }
});

router.post('/createChallenge', async function (req, res, next) {
  try {
    console.log(req.body);
    let result = await client.db('gamification').collection('challenges').insertOne(req.body);
    res.status(200).send("Challenge created successfully!");
  }catch(e) {
    res.status(500).send(e);
  }
});

router.post('/createLocationHub', async function (req, res, next) {
  try {
    console.log(req.body);
    let result = await client.db('gamification').collection('stations').insertOne(req.body);
    res.status(200).send("LocationHub created successfully!");
  }catch(e) {
    res.status(500).send(e);
  }
});

module.exports = router;