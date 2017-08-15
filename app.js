const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

//Listening on root
app.get('/todo/', function (req, res) {
let myData = [
  {'todoItem':' call mom', 'done':false},
  {'todoItem':' wash dishes', 'done':false},
  {'todoItem':' turn myself into a pickle', 'done':false},
  {'todoItem':' give bailey a highfive!', 'done':true},

];
res.render('todo', {data: myData})
});


app.listen(3000, function () {
  console.log('Successfully started express application!');
})
