var express = require('express');
var path = require('path');
const { title } = require('process');
var fs = require('fs');
const { Session } = require('inspector'); // idk what this is for
const session = require('express-session');
const alert = require('alert');
//const popups = require('popups'); // not needed

var MongoClient = require('mongodb').MongoClient;
var MongoURL = 'mongodb://127.0.0.1:27017/';
var client = new MongoClient(MongoURL);
var database = client.db("myDB");
var collection = database.collection("myCollection");

var app = express();

app.use(session({secret:'secretbatates',saveUninitialized:true, resave : true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Get Requests 
app.get('/', function(req,res){
  if(!req.session.username){
    req.session.destroy();
    //session = req.session;
    res.render('login', {title: "Login"})
  }else{
    res.render('home', {title : "Home"});
  }
});

app.get('/registration', function(req,res){
  req.session.destroy();
  res.render('registration', {title: "Registration"})
});

app.get('/hiking', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('hiking', {title: "Hiking"});
});
app.get('/inca', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
  res.render('inca', {title: "Inca"});
});
app.get('/annapurna', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('annapurna', {title: "Annapurna"});
});

app.get('/cities', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('cities', {title: "Cities"});
});
app.get('/paris', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('paris', {title: "Paris"});
});
app.get('/rome', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('rome', {title: "Rome"});
});

app.get('/islands', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('islands', {title: "Islands"});
});
app.get('/bali', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('bali', {title: "Bali"});
});
app.get('/santorini', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    res.render('santorini', {title: "Santorini"});
});


app.get('/wanttogo', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else{
    var userDoc = await collection.findOne({username: req.session.username});
    var wanttogoList = userDoc.wanttogo;
    res.render('wanttogo', {locations: wanttogoList});
  }
});


// Post Requests
app.post('/', async function(req,res){
  var usernameVar = req.body.username;
  var passwordVar = req.body.password;
  if(usernameVar && passwordVar){
      var user;
      user = await collection.findOne({username: usernameVar,password: passwordVar})
      if(user){
        //session = req.session;
        req.session.username = usernameVar;
        res.render('home', {title : "Home"});
      }else{
        alert('Invalid Username or Password. Please Login Again');
        res.render('login');
      }
  }else{
      alert('Username and Password Fields cannot be empty');
  }
})

const locationNames = ["annapurna", "inca", "bali", "santorini", "paris", "rome"];
const fullLocationNames = ["Annapurna Circuit", "Inca Trail to Machu Picchu", "Bali Island", "Santorini Island", "Paris", "Rome"];
app.post('/search', function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else{
    var search = req.body.Search;
    search = search.toLowerCase();
    var locations = [];
    var fullNames = [];
    for(var i=0 ;i<fullLocationNames.length;i++)
    {
      if(fullLocationNames[i].toLowerCase().includes(search)){
        locations.push(locationNames[i]);
        fullNames.push(fullLocationNames[i]);
      }
    }
    res.render('searchresults', {locations:locations, fullNames: fullNames});
  }
})

app.post('/register', async function(req,res){
  var usernameVar = req.body.username;
  var passwordVar = req.body.password;
  if(usernameVar && passwordVar){
      var user;
      user = await collection.findOne({username: usernameVar})
      console.log(user);
      if(!user){
        collection.insertOne({username: usernameVar, password: passwordVar, wanttogo: []})
        alert('Account Successfully Created');
        res.redirect('/');
      }else{
        alert('Username already exists. Please choose another username');
        res.render('registration');
      }
  }else{
      alert('Username and Password Fields cannot be empty');
  }
})

// add to want to go get requests
app.post('/annapurna', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    addToWantToGoList("annapurna", req, res);
  }
)
app.post('/inca', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    addToWantToGoList("inca", req, res);
  }
)
app.post('/paris', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    addToWantToGoList("paris", req, res);
  }
)
app.post('/rome', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    addToWantToGoList("rome", req, res);
  }
)
app.post('/bali', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    addToWantToGoList("bali", req, res);
  }
)
app.post('/santorini', async function(req,res){
  if(!req.session.username)
    res.redirect('/')
  else
    addToWantToGoList("santorini", req, res);
  }
)

async function addToWantToGoList (location,req,res){ 
  var userDoc = await collection.findOne({username: req.session.username});
  var wanttogoList = userDoc.wanttogo;
  
  var exists = false;
  for(var i=0;i<wanttogoList.length;i++)
  {
    if(wanttogoList[i]==location)
      {
        exists = true;
        alert(location.concat(" is already in your want to go list"))
        break;
      }
  }
  if(!exists)
  {
    alert(location.concat(" successfully added to your want to go list"))
    wanttogoList.push(location);
    collection.updateOne({username: req.session.username}, {$set: {wanttogo: wanttogoList}});
  }   
}

app.listen(3000);
