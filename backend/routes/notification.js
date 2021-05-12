let express = require('express');
let router = express.Router();

let database = require('../database/mongodb');
let { client } = require('../database/mongodb');

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1201902",
    key: "0a93d3b45b3ecc3479dd",
    secret: "0fa8e5d04d728f031d1e",
    cluster: "us3",
    useTLS: true
});

router.get('/getPolls', async function(req, res, next) {
    try {
        let result = await client.db('gamification').collection('polls').find({}).toArray();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/getUserPolls/:email', async function(req, res, next) {
    try {
        let email = req.params.email;
        let result = await client.db('gamification').collection('userPolls').find({ email: email }).toArray();
        let question1 = await client.db('gamification').collection('userPolls').aggregate([{ $group: { _id: "$question1", count : {$sum : 1}}},{ $sort : { "count" : -1 } }]).toArray();
        let question2 = await client.db('gamification').collection('userPolls').aggregate([{ $group: { _id: "$question2", count : {$sum : 1}}},{ $sort : { "count" : -1 } }]).toArray();
        let question3 = await client.db('gamification').collection('userPolls').aggregate([{ $group: { _id: "$question3", count : {$sum : 1}}},{ $sort : { "count" : -1 } }]).toArray();
        let user_poll;
        if (result.length > 0) {
            user_poll = result;
        } else {
            user_poll = [
                {
                    "question1": 0,
                    "question2": 0,
                    "question3": 0
                }
            ]
        }

        let data = {
            userPolls: user_poll,
            q1: [
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                [question1[0]._id, question1[0].count, '#b87333', null],
                [question1[1]._id, question1[1].count, 'silver', null],
                [question1[2]._id, question1[2].count, 'gold', null],
            ],
            q2: [
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                [question2[0]._id, question2[0].count, '#b87333', null],
                [question2[1]._id, question2[1].count, 'silver', null],
                [question2[2]._id, question2[2].count, 'gold', null],
                [question2[3]._id, question2[3].count, 'color: #e5e4e2', null],
            ],
            q3: [
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                [question3[0]._id, question3[0].count, '#b87333', null],
                [question3[1]._id, question3[1].count, 'silver', null],
                [question3[2]._id, question3[2].count, 'gold', null],
                [question3[3]._id, question3[3].count, 'color: #e5e4e2', null],
            ]
        };
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/vote', async function(req, res, next) {
    try {
        let email = req.params.email;
        let questionSelected = req.body.questionSelected;
        let optionSelected = req.body.optionSelected;
        let question1 = await client.db('gamification').collection('userPolls').aggregate([{ $group: { _id: "$question1", count : {$sum : 1}}},{ $sort : { "count" : -1 } }]).toArray();
        let question2 = await client.db('gamification').collection('userPolls').aggregate([{ $group: { _id: "$question2", count : {$sum : 1}}},{ $sort : { "count" : -1 } }]).toArray();
        let question3 = await client.db('gamification').collection('userPolls').aggregate([{ $group: { _id: "$question3", count : {$sum : 1}}},{ $sort : { "count" : -1 } }]).toArray();

        let data = {
            q1: [
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                [question1[0]._id, question1[0].count, '#b87333', null],
                [question1[1]._id, question1[1].count, 'silver', null],
                [question1[2]._id, question1[2].count, 'gold', null],
            ],
            q2: [
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                [question2[0]._id, question2[0].count, '#b87333', null],
                [question2[1]._id, question2[1].count, 'silver', null],
                [question2[2]._id, question2[2].count, 'gold', null],
                [question2[3]._id, question2[3].count, 'color: #e5e4e2', null],
            ],
            q3: [
                [
                    'Element',
                    'Density',
                    { role: 'style' },
                    {
                        sourceColumn: 0,
                        role: 'annotation',
                        type: 'string',
                        calc: 'stringify',
                    },
                ],
                [question3[0]._id, question3[0].count, '#b87333', null],
                [question3[1]._id, question3[1].count, 'silver', null],
                [question3[2]._id, question3[2].count, 'gold', null],
                [question3[3]._id, question3[3].count, 'color: #e5e4e2', null],
            ]
        };
        await pusher.trigger("my-channel", "my-event", {
            message: data
        });
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;