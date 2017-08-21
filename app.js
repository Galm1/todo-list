const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const models = require('./models/models.js');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

//make an array for my todo items
// let myData = [
//   //when making the todoItems i give them an id of a number so i can work with each item later
//   {'todoItem':' give bailey a highfive!', 'done':false, 'id':1},
//   {'todoItem':' call mom', 'done':false, 'id':2},
//   {'todoItem':' gossip', 'done':false, 'id':3},
//   {'todoItem':' wash dishes', 'done':false, 'id':4},
//   {'todoItem':' turn myself into a pickle', 'done':false, 'id':5},
//   {'todoItem':' wake up morty', 'done':false, 'id':6}
// ];
//getting the root ('/') page and returning a req and a res
app.get('/', function (req, res) {
  //after getting the root page i then render my mustache page to it and assign 'mydata' to data. now i can use {{data}} in my mustache file that links with app.js
res.render('todo.mustache', {data:models.todos})
});

// i am now posting on my root ('/')
app.post('/', function (req, res) {
  // here i am setting newTodoItem to the value of the newItem input in the req
  const newTodoItem = req.body.newItem;
  // maxId will now equal the length of my array
  let maxId = myData.length;
  // newItem is the new object that i will put into myData and then take the id number and assigns one that is +1 higher
  let newItem = {'todoItem': newTodoItem, 'done':false, 'id': maxId + 1}
  // then i push newItem into mtData array
  myData.push(newItem);
  // then redirect the page to the home.
  res.redirect('/')
})

// i am posting into the {{id}} that is on my root page then return a response and a request
app.post('/:id', function(req, res) {
// grab the req and find the 'id' param within it. then parse it into an interger and assign it to 'id'
  let id = parseInt(req.params.id);

// making a forEach loop to go through the array 'myData'. within funtion set my paramater to listItem so i can use it in the loop. 'listItem' now represent each seperate item in my array.
  myData.forEach( function(listItem){
// if my parseInt'd item 'id' is the exact same as the id in each listItem then set done within listItem to true. making it complete in my todo list.
  if(id === listItem.id){
    listItem.done = true;
  }
})
// if not then render listItem to the mustache page and set 'data' to represent the array 'myData'
res.render('todo.mustache', {data: myData});
})


app.listen(3000, function () {
  console.log('Successfully started express application!');
})
