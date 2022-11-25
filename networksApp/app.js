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

app.get('/', function(req,res){
  res.render('home', {title: "express"})
});

app.get('/hiking', function(req,res){
  res.render('hiking', {title: "express"})
});
app.get('/inca', function(req,res){
  res.render('inca', {title: "express"})
});
app.get('/annapurna', function(req,res){
  res.render('annapurna', {title: "express"})
});

app.get('/cities', function(req,res){
  res.render('cities', {title: "express"})
});
app.get('/paris', function(req,res){
  res.render('paris', {title: "express"})
});
app.get('/rome', function(req,res){
  res.render('rome', {title: "express"})
});

app.get('/islands', function(req,res){
  res.render('islands', {title: "express"})
});
app.get('/bali', function(req,res){
  res.render('bali', {title: "express"})
});
app.get('/santorini', function(req,res){
  res.render('santorini', {title: "express"})
});


app.get('/wanttogo', function(req,res){
  res.render('wanttogo', {title: "express"})
});


app.listen(3000);
