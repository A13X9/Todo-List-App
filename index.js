var express = require("express"),
    app = express(),
    port = process.env.PORT,
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"))
app.use(express.static(__dirname + "/public"))


app.get("/", function(req, res) {
    res.sendFile("index.html")
})

app.listen(port, function() {
    console.log("****************************")
    console.log("APP is running on Port " + port)
    console.log("****************************")
})

app.use("/api/todos", todoRoutes);
