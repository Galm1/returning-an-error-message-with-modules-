const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

app.get('/forms', function(req, res) {
  res.render('forms');
})

app.post('/register', function(req, res) {
  req.checkBody("name", "You must enter a username!").notEmpty();

  let errors = req.validationErrors();
  console.log(errors)
  if (errors) {
    let error = errors;
    console.log('there was an error')
    res.send(error);
  } else {
    let yourName = req.body.name;
    let error = `<p>Your name is: ${yourName}</p>`
    res.send(error);
    console.log(yourName)
  }
  res.render('forms', {
    errors
  })
});

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
