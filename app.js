var express = require('express');
var todoController = require("./controllers/todoController");
var app = express();

// Set up view engine
app.set('view engine','ejs');

// Middleware for static files such as css,images
app.use(express.static('./public'));

// Fire controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log("Server listening at Port 3000");