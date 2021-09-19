var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect("mongodb+srv://dbuser:dbuser123@cluster0.yk2r9.mongodb.net/todoDB?retryWrites=true&w=majority",{ 
    useNewUrlParser: true.valueOf,
    useUnifiedTopology: true 
    })
    .then(()=>console.log("DB Connected..."))
    .catch((err)=>{
        console.log(err);
    });

// Create a schema
var todoSchema = mongoose.Schema({
    item : String
});

var Todo = mongoose.model('Todo',todoSchema);
/*var itemOne = Todo({item:'buy tea'}).save(function(err){
    if(err) throw err;
    console.log("Item added");
})*/

//var data = [{item:"Cook Meal"},{item:"Learn Nodejs"},{item:"Watch mmovie"}];

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get("/todo",function(req,res){
        // Get data from MongoDB and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
        });    
        //res.render('todo',{todos:data});    
    });


    app.post("/todo",urlencodedParser,function(req,res){
        // Get item from view and pass it to collection
        var todo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data)
        });
        /*data.push(req.body);
        res.json(data);*/
    });

    app.delete("/todo/:item",function(req,res){
        // Find the item and delete it from MongoDB
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        })
        /*data = data.filter(function(todo){
            return todo.item.replace(/ /g, "-") !== req.params.item;
        })
        res.json(data);*/
    });
}