const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
let db            = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('Successfully connected to the DB server!');

    // connect to 'myproject' database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, status: true};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}
function userdata(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// verify the user / login
function login(email){
    return new Promise((resolve, reject) => {
        const collection = db
        .collection('users')
        .findOne({ email: email })
        .then((doc)=> resolve(doc))
        .catch((err)=> reject(err));
    })
}

function deposit(email, amount) {
    return new Promise((resolve, reject) => {
        
            const user = db
                .collection('users')
                .findOne({ email: email })
                .then((doc)=> {
                    db.collection('users')
                    .updateOne(
                            {email: email}, 
                            {$set: {balance: Number(doc.balance) + Number(amount)}},
                        ).then(res => {
                            resolve(db.collection('users').findOne({email: email}))
                        });
                    }).
                    catch((err) =>  {
                        reject(err)
                    })
    });
}
function withdraw(email, amount) {
    return new Promise((resolve, reject) => {
        
            const user = db
                .collection('users')
                .findOne({ email: email })
                .then((doc)=> {
                    db.collection('users')
                    .updateOne(
                            {email: email}, 
                            {$set: {balance: Number(doc.balance) - Number(amount)}},
                        ).then(res => {
                            resolve(db.collection('users').findOne({email: email}))
                        });
                    }).
                    catch((err) =>  {
                        reject(err)
                    })
    });
}
module.exports = {create, all, login, deposit, withdraw, userdata};