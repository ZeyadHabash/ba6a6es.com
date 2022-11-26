var express = require('express');
var path = require('path');
const { title } = require('process');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Get Requests 
app.get('/', function(req,res){
  res.render('login', {title: "Login"})
});

app.get('/registration', function(req,res){
  res.render('registration', {title: "Registration"})
});

app.get('/hiking', function(req,res){
  res.render('hiking', {title: "Hiking"})
});
app.get('/inca', function(req,res){
  res.render('inca', {title: "Inca"})
});
app.get('/annapurna', function(req,res){
  res.render('annapurna', {title: "Annapurna"})
});

app.get('/cities', function(req,res){
  res.render('cities', {title: "Cities"})
});
app.get('/paris', function(req,res){
  res.render('paris', {title: "Paris"})
});
app.get('/rome', function(req,res){
  res.render('rome', {title: "Rome"})
});

app.get('/islands', function(req,res){
  res.render('islands', {title: "Islands"})
});
app.get('/bali', function(req,res){
  res.render('bali', {title: "Bali"})
});
app.get('/santorini', function(req,res){
  res.render('santorini', {title: "Santorini"})
});


app.get('/wanttogo', function(req,res){
  res.render('wanttogo', {title: "express"})
});


// Post Requests
app.post('/', function(req,res){
  res.render('home', {title : "Home"})
})

app.post('/search', function(req,res){
  res.render('searchresults', {title : "Home"})
})

app.post('/register', function(req,res){
  var usernameVar = req.body.username;
  var passwordVar = req.body.password;
  var exists = false;
  MongoClient.connect("mongodb://0.0.0.0:27017",function(err,client){
    if (err) throw err;
    var db = client.db("appDB");

    db.collection('Users').find().toArray(function(err,results){
      for (let i = 0; i < results.length; i++){
        console.log("inloop" + i);
        if(results[i]["username"] == usernameVar){
          exists = true;
          break;
        }
      }
      console.log(usernameVar);
      if(!exists){
        res.redirect('/');
        console.log("doesnt exist");
      }
      else
        console.log("exists!");
      });
  });
})


// Mongo stuff
MongoClient.connect("mongodb://0.0.0.0:27017",function(err,client){
  if (err) throw err;
  var db = client.db("appDB");
 // db.collection('Users').insertOne({username: 'abab', password: 'xyxy'});

  // db.collection('Users').find().toArray(function(err,results){
  //   console.log(results);
  // });
});

app.listen(3000);
