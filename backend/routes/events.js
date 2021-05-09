let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let { client } = require('../database/mongodb');

router.get('/getEvents/:email', async function(req, res, next) {
    let email = req.params.email;
    let end = new Date();
    end.setHours(0,0,0,0);
    try {
        let result1 = await client.db('gamification').collection('events').find({expirationDateTime: { $gte: end }}).toArray();
        let result2 = await client.db('gamification').collection('userEvents').find({email: email, expirationDateTime: { $gte: end }}).toArray();
        let data = [];
        let j = 0;
        for (let i = 0; i < result1.length; i++){
            result1[i].buttonDisabled = false;
            if (result2.some(item => item.eventName.includes(result1[i].eventName))) {
                result1[i].buttonDisabled = true;
                data[j] = result1[i];
            }else{
                data[j] = result1[i];
            }
            j = j + 1;
        }

        console.log(data);
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

router.post('/addUserEvent', async function(req, res, next) {
    let email = req.body.email;
    let eventURL = req.body.eventURL;
    let eventName = req.body.eventName;
    let eventDescription = req.body.eventDescription;
    let expirationDateTime = new Date(req.body.expirationDateTime);

    try{
        let myobj = { eventImage: eventURL, eventDescription: eventDescription, email: email, eventName: eventName, expirationDateTime: expirationDateTime };
        let result_new = await client.db('gamification').collection('userEvents').insertOne(myobj,function(err, data) {
            if (err){
                throw (err.message);
            } else {
                res.status(200).send("user event added successfully");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});



module.exports = router;