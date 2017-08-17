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

let myData = [
  {'todoItem':' give bailey a highfive!', 'done':false, 'id':1},
  {'todoItem':' call mom', 'done':false, 'id':2},
  {'todoItem':' gossip', 'done':false, 'id':3},
  {'todoItem':' wash dishes', 'done':false, 'id':4},
  {'todoItem':' turn myself into a pickle', 'done':false, 'id':5},
  {'todoItem':' wake up morty', 'done':false, 'id':6}
];

app.get('/', function (req, res) {
res.render('todo.mustache', {data: myData})
});

app.post('/', function (req, res) {
  const newTodoItem = req.body.newItem;
  let maxId = myData.length;
  let newItem = {'todoItem': newTodoItem, 'done':false, 'id': maxId + 1}
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
