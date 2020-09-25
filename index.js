const express=require('express');
const path=require("path");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
let ejs=require('ejs');

app.set("view engine","ejs");

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

app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname,"/login.html"))
});

app.get("/reset-password",function(req,res){
    res.sendFile(path.join(__dirname,"/pass-reset.html"))
});

app.post("/register",function(req,res){
    var n=req.body.name;
    var e=req.body.email;
    var p1=req.body.pass1;
    var p2=req.body.pass2;
    var data={name:n,email:e,password:p1};
    if(p1==p2)
    {
        db.collection('newusers').findOne({email:{$eq:e}},function(err,r)
        {
            if(err)
                console.log(err);
            else if(r==null)
            {
                db.collection('newusers').insertOne(data,function(err,r){
                    if(err)
                    {
                        console.log("Cannot create an account");
                        res.sendFile(path.join(__dirname,"/reg.html"));
                    }
                    else
                        res.render("userhomepage",{name:n});
                });
            }
            else{
                res.send("Email already exists");
            }
        });
    }
    else    
        res.send("Passwords do not match");
});

app.post("/login",function(req,res)
{
    var e=req.body.email;
    var p=req.body.pass;   
    db.collection('newusers').findOne({email:{$eq: e},password:{$eq:p}},function(err,r){
        if(err){
            console.log(err);
        }
        else{
            var name=r.name;
            res.render("userhomepage",{name:name});
        }
    });
});

app.post("/reset-password",function(req,res)
{
    var e=req.body.email;
    db.collection('newusers').findOne({email:{$eq:e}},function(err,r){
        if(err)
            console.log(err);
        else
        {

        }
    })
}),

app.listen( process.env.PORT || 3000,function(req,res){
    console.log("started");
  });
  