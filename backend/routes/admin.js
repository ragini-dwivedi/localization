let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let { client } = require('../database/mongodb');


router.post('/addActivity', async function(req, res, next) {
    let activityURL = req.body.activityURL;
    let activityName = req.body.activityName;
    let activityScore = parseInt(req.body.activityScore);

    try{
        let myobj = { activityName: activityName, activityScore: activityScore, activityImage: activityURL };
        let result_new = await client.db('gamification').collection('activities').insertOne(myobj,function(err, data) {
            if (err){
                throw (err.message);
            } else {
                res.status(200).send("Activity added successfully");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.post('/addEvent', async function(req, res, next) {
    let eventURL = req.body.eventURL;
    let eventName = req.body.eventName;
    let eventDescription = req.body.eventDescription;
    let expirationDateTime = new Date(req.body.expirationDateTime);

    try{
        let myobj = { eventImage: eventURL, eventDescription: eventDescription, eventName: eventName, expirationDateTime: expirationDateTime };
        let result_new = await client.db('gamification').collection('events').insertOne(myobj,function(err, data) {
            if (err){
                throw (err.message);
            } else {
                res.status(200).send("Event added successfully");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.post('/addCommunity', async function(req, res, next) {
    let location = req.body.location;
    let communityName = req.body.communityName;
    let communityURL = req.body.communityURL;

    try{
        let myobj = { community_name: communityName, location: location, image: communityURL, members: [] };
        let result_new = await client.db('gamification').collection('communities').insertOne(myobj,function(err, data) {
            if (err){
                throw (err.message);
            } else {
                res.status(200).send("Community added successfully");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.post('/addBadge', async function(req, res, next) {
    let badgeName = req.body.badgeName;
    let badgeScore = parseInt(req.body.badgeScore);
    let badgeImageURL = req.body.badgeImageURL;

    try{
        let myobj = { name: badgeName, badges: badgeScore, image: badgeImageURL };
        let result_new = await client.db('gamification').collection('all_badges').insertOne(myobj,function(err, data) {
            if (err){
                throw (err.message);
            } else {
                res.status(200).send("Badge added successfully");
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;