const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const models = require('./models/models.js');
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const url = 'mongodb://localhost:27017/todo';

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

let database;

app.get('/', function (req, res) {
  let collection = database.collection('todos');
  collection.find({}).toArray(function(err, todoList) {
    console.log("Found the following records");
    console.log(todoList);
    res.render('todo.mustache', {data:todoList});
  });
});

app.post('/', function (req, res) {
  const newTodoItem = req.body.newItem;
  let newItem = {'todoItem': newTodoItem, 'done':false}
  let collection = database.collection('todos');
  collection.insertOne(newItem), function(err, result) {
    console.log("Found the following records");
    console.log(todoList);
    res.render('todo.mustache', newItem);
 }
   res.redirect('/');
});


app.post('/:id', function(req, res) {
  let id = parseInt(req.params.id);

  myData.forEach( function(listItem){
  if(id === listItem.id){
    listItem.done = true;
  }
})
res.render('todo.mustache', {data: myData});
})


app.listen(3000, function () {
  console.log('Successfully started express application!');
})

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to mongodb");
  database = db;
});

process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function () {
    console.log('mongodb disconnected on app termination');
    process.exit(0);
  });
});
