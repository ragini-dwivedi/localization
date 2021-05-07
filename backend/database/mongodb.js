const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://cmpe280:cmpe280@cmpe280.hbb1z.mongodb.net/gamification?retryWrites=true&w=majority';
let cursor;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// How to make connection - https://docs.mongodb.com/drivers/node/fundamentals/connection/
// How to use promise, await with Mongo - https://docs.mongodb.com/drivers/node/fundamentals/promises/
const run = async () => {
    try {
        result = await client.connect();
        console.log('Connected successfully to server');
    } catch(e) {
        console.log('connection creation failed');
    }
}

run();

function findOne(query, collection, callback) {
    if (client){
        data = client.db("gamification").collection(collection);
        if (data != undefined){
            data.findOne(query, function(err,doc){
                if(err){
                    callback(err, null);
                }
                if(doc)
                    callback(null, doc);
                else
                    callback(new Error("Record does not exist"), null);
            });
        }
    } else {
        callback(new Error('Mongodb client is null'), cursor);
    }
}

async function findMany(query, filter, collection, callback) {
    if (client){
        data = client.db("gamification").collection(collection);
        if (data != undefined){
            let result = [];
            let cursor = client.db("gamification").collection(collection).find(query).limit(parseInt(filter.limit)).skip(parseInt(filter.skip));
            for await (const doc of cursor) {
                result.push(doc);
            }

            callback(null, result)
        }
    } else {
        callback(new Error('Mongodb client is null'), cursor);
    }
}

function insertOneData(query, collection, callback){
    if (client){
        data = client.db("gamification").collection(collection);
        if (data != undefined){
            cursor = data.insertOne(query);
        }

        callback(null, cursor);
    } else {
        callback(new Error('Mongodb client is null'), cursor);
    }
}

function insertMultipleData(query, collection, callback){
    if (client){
        data = client.db("gamification").collection(collection);
        if (data != undefined){
            cursor = data.insertMany(query);
        }

        callback(null, cursor);
    } else {
        callback(new Error('Mongodb client is null'), cursor);
    }
}

function updateOneData(filter, query, collection, callback){
    if (client){
        data = client.db("gamification").collection(collection);
        if (data != undefined){
            cursor = data.updateOne(
                filter,
                {
                    $set: query,
                    $currentDate: { lastModified: true }
                }
            )
        }

        callback(null, cursor);
    } else {
        callback(new Error('Mongodb client is null'), cursor);
    }
}

function deleteOneData(query, collection, callback){
    if (client){
        data = client.db("gamification").collection(collection);
        if (data != undefined){
            cursor = data.deleteOne(query);
        }

        callback(null, cursor);
    } else {
        callback(new Error('Mongodb client is null'), cursor);
    }
}

module.exports.findOne = findOne;
module.exports.findMany = findMany;
module.exports.insertOneData = insertOneData;
module.exports.insertMultipleData = insertMultipleData;
module.exports.updateOneData = updateOneData;
module.exports.deleteOneData = deleteOneData;
module.exports.client = client;