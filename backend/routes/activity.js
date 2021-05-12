let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let { client } = require('../database/mongodb');


router.get('/getActivities/:email', async function(req, res, next) {
    let email = req.params.email;
    let start = new Date();
    start.setHours(0,0,0,0);
    let end = new Date();
    end.setHours(23,59,59,999);
    try {
        let result1 = await client.db('gamification').collection('activities').find({}).toArray();
        let result2 = await client.db('gamification').collection('userActivities').find({email: email, createdDateTime: { $gte: start, $lte: end}}).toArray();
        let data = [];
        let j = 0;
        for (let i = 0; i < result1.length; i++){
            result1[i].buttonDisabled = false;
            if (result2.some(item => item.activityName.includes(result1[i].activityName))) {
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


router.post('/addUserActivity', async function(req, res, next) {
    let email = req.body.email;
    let activityURL = req.body.activityURL;
    let activityName = req.body.activityName;
    let activityScore = parseInt(req.body.activityScore);
    let start = new Date();
    start.setHours(0,0,0,0);

    try{
        let myobj = { activityImage: activityURL, activityScore: activityScore, email: email, activityName: activityName, createdDateTime: start };
        let result_new = await client.db('gamification').collection('userActivities').insertOne(myobj,function(err, data) {
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

router.get('/getWeeklyDetails/:email', async function(req, res, next) {
    try {
        let email = req.params.email;
        let start = new Date();
        start.setHours(0,0,0,0);
        start.setDate(start.getDate() - 7 );
        let end = new Date();
        end.setHours(0,0,0,0);
        let result = await client.db('gamification').collection('leaderBoard').aggregate([{ "$match": { "creationDateTime": { $gte: start, $lte: end }}},{ $group: { _id: "$email", count: { $sum: "$score" } }},{ $sort : { "count" : -1 } }]).toArray();
        let rank = 0;
        let score = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i]._id === email){
                rank = i + 1;
                score = result[i].count;
            }
        }

        console.log({"rank": rank, "score": score });
        res.status(200).send({"rank": rank, "score": score });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/getOverAllDetails/:email', async function(req, res, next) {
    try {
        let email = req.params.email;
        let start = new Date();
        start.setHours(0,0,0,0);
        start.setDate(start.getDate() - 7 );
        let end = new Date();
        end.setHours(0,0,0,0);
        let result = await client.db('gamification').collection('leaderBoard').aggregate([{ $group: { _id: "$email", count: { $sum: "$score" }}},{ $sort : { "count" : -1 } }]).toArray();
        let rank = 0;
        let score = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i]._id === email){
                rank = i + 1;
                score = result[i].count;
            }
        }

        console.log({"rank": rank, "score": score });
        res.status(200).send({"rank": rank, "score": score });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/getAllDetailsForDashboard/:type', async function(req, res, next) {
    try {
        let result;
        let type = req.params.type;
        let start = new Date();
        start.setHours(0,0,0,0);
        start.setDate(start.getDate() - 7 );
        let end = new Date();
        end.setHours(0,0,0,0);
        if (type === 1 || type === "1") {
            //db.leaderBoard.aggregate( [   {     $group: {        _id: "$email",        count: { $sum: "$score" }     }   } ] );
            result = await client.db('gamification').collection('leaderBoard').aggregate([{ "$match": { "creationDateTime": { $gte: start, $lte: end }}},{ $group: { _id: "$email", count: { $sum: "$score" } }},{ $sort : { "count" : -1 } }]).toArray();
        } else {
            result = await client.db('gamification').collection('leaderBoard').aggregate([{ $group: { _id: "$email", count: { $sum: "$score" }}},{ $sort : { "count" : -1 } }]).toArray();
        }

        let data = [];
        for (let i = 0; i < result.length; i++) {
            let temp = {};
            temp["user"] = result[i]._id;
            temp["count"] = result[i].count;
            temp["rank"] = i + 1;
            data.push(temp);
        }

        console.log(data);
        res.status(200).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = router;