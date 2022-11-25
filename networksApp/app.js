var express = require('express');
var path = require('path');
const { title } = require('process');
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

app.listen(3000);
