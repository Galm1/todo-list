const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

//make an array for my todo items
let myData = [
  //when making the todoItems i give them an id of a number so i can work with each item later
  {'todoItem':' give bailey a highfive!', 'done':false, 'id':1},
  {'todoItem':' call mom', 'done':false, 'id':2},
  {'todoItem':' gossip', 'done':false, 'id':3},
  {'todoItem':' wash dishes', 'done':false, 'id':4},
  {'todoItem':' turn myself into a pickle', 'done':false, 'id':5},
  {'todoItem':' wake up morty', 'done':false, 'id':6}
];
//getting the root page and returning a req and a res
app.get('/', function (req, res) {
  //after getting the root page i then render my mustache page to it and assigning 'mydata' to data. now i can use {{data}} in my mustache that links with app.js
res.render('todo.mustache', {data: myData})
});

// i am now posting on my root ('/')
app.post('/', function (req, res) {
  // here i am setting newTodoItem to the value of the newItem input in the req
  const newTodoItem = req.body.newItem;
  //my maxId will now equal the length of my array
  let maxId = myData.length;
  // now newItem is the new object that i will put into myData and it then take the id number an assigns one the is +1 higher
  let newItem = {'todoItem': newTodoItem, 'done':false, 'id': maxId + 1}
  //then i push newItem into mtData array
  myData.push(newItem);
  res.redirect('/')
})

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
