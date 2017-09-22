var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())

const API_KEY = process.env.API_KEY || "dev";
var fruits = [];

function addFruit(name, color){
    return {name:name, color:color};
}

fruits.push(addFruit('orange','orange'));
fruits.push(addFruit('pear','green'));

app.use(function(req,res,next){
  if(req.headers['api-key'] && req.headers['api-key']===API_KEY){
    next();
  }else{
    res.status(401);
    res.send({'message':'Not allowed'});
    res.end();
  }
});

app.get('/fruits', function (req, res) {
  console.log('get fruits');
  res.send(fruits);
});

app.get('/fruits/add/:name/:color', function (req, res) {
  console.log('add fruit');
  fruits.push(addFruit(req.params.name,req.params.color));
  res.send(fruits);
});

app.listen(process.env.PORT || 9999, function () {
  console.log('fruits service listening on port '+ (process.env.PORT || 9999));
});

