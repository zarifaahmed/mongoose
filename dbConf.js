var mongo = require('mongodb').MongoClient;
const connectionString = "mongodb://localhost:27017"
function initialize(
    dbName,
    dbCollectionName,
    succesCallback,
    failureCallback,
){
    mongo.connect(connectionString, function(err, dbInstance){
        if(err){
            console.log('error')
            failureCallback(err)
        }else{
            const dbObject = dbInstance.db(dbName)
            const dbCollection = dbObject.collection(dbCollectionName)
            console.log('200 - SUCCES')
            succesCallback(dbCollection)
        }

    })
}

module.exports = {
    initialize
}