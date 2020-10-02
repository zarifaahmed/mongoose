// modules
var  dbconf = require('./dbConf')
var app = require('express');
var cors = require("cors");
var app = app()
app.use(cors())

var body_parser  = require("body-parser")
app.use(body_parser.json())
const {ObjectId} = require('mongodb');


var http = require('http').Server(app);


// port
var port = 4000;
// db configs
var dbName = 'services_db'
var collectionName = 'urls'


// 
dbconf.initialize(dbName, collectionName, function(dbcollection){
    app.post("/",function(req,res){
        var test;
        console.log(req.body)
        // console.log(`request ${req},response ${res}`)

        dbcollection.insert(req.body, function(err,result){
            console.log(err)
            if (err){
                return res.send(404)
            }
            // console.log(result)
            return res.json(result)
        })

        // return res.send(200);
    });
    // to all
    app.get("/",function(req,res){

        // console.log(req.body)
        // console.log(`request ${req},response ${res}`)
        // var  temp;
        dbcollection.find().toArray(function(err, result){
            // console.log(err)
            // console.log(result)
            // temp =result;
            return res.json(result)
        })

        // console.log("TEMP",temp)
        // return res.send(200)
    });



    app.delete("/:id",function(request,response){

        console.log("THE ID",request.params.id)
        // console.log(req.body)
        console.log(`request ${request},response ${response}`)
        // var  temp;
        const id = request.params.id;
        var myquery = { "_id": ObjectId(id) }

        dbcollection.deleteOne(myquery,function(er,result){
            console.log(er)
            console.log(result)
            return response.json({"result":true})

        })

        // console.log("TEMP",temp)
    })

    app.get("/:id",function(request,response){

        console.log("THE ID",request.params.id)
        // console.log(req.body)
        console.log(`request ${request},response ${response}`)
        // var  temp;
        const id = request.params.id;
        var myquery = { "_id": ObjectId(id) }

        dbcollection.findOne(myquery,function(er,result){
            console.log(er)
            console.log(result)
            return response.json({"result":true})

        })

       
    })

    app.put("/:id",function(request,response){

        console.log("THE ID",request.params.id)
        // console.log(req.body)
        console.log(`request ${request},response ${response}`)
        // var  temp;
        const id = request.params.id;
        var myquery = { "_id": ObjectId(id) }

        dbcollection.update(myquery,request.body,function(er,result){
            // console.log(er)
            console.log(result)
            return response.json({"result":true})

        })

       
    })
});


http.listen(port, function(){
    console.log(`http listen port ${port}`)
})
// { "_id" : ObjectId("5db6b24830f133b65dbbe457"), "name" : "Rocky", "age" : 3, "breed" : "Labrador" }