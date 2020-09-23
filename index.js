const express=require('express');
const path=require("path");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin-amala:Smash1551@cluster0.yzaqe.mongodb.net/Imagiminds?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true,useNewUrlParser: true });
client.connect(err => {
  //const col = client.db("Imagiminds").collection("newusers");
  console.log("connection successful");
  db = client.db("Imagiminds");
});


app.get("/register",function(req,res){
    res.sendFile(path.join(__dirname,"/reg.html"));
});

app.post("/register",function(req,res){
    var n=req.body.name;
    var e=req.body.email;
    var p1=req.body.pass1;
    var p2=req.body.pass2;
    var data={name:n,email:e,password:p1};
    if(p1==p2)
    {
        db.collection('newusers').insertOne(data,function(err,r){
            if(err)
            {
                console.log("Cannot create an account");
                res.sendFile(path.join(__dirname,"/reg.html"));
            }
            else
                res.send("registration successful");
        })
    }
    else    
        res.send("Passwords do not match");
})



app.listen( process.env.PORT || 3000,function(req,res){
    console.log("started");
  });
  