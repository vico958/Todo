const express = require("express");
const cors = require("cors");
const logger = require("./server/middleware/logger");
const bodyParser = require("body-parser");
const todo = require("./server/routes/todo/todo");
const user = require("./server/routes/user/user")
const mongoose= require("mongoose")

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/todo", todo)
app.use("/user", user)
const port = "3042";


const dbURI = "mongodb+srv://vikolearning1:fYLuf91X3iSMkqzj@todo.ex24ncd.mongodb.net/"
mongoose.connect(dbURI)
.then(() => app.listen(port, () =>{
    console.log("Server started on port", port)
}))
.catch((err) => console.log(err))

app.get("/", (req, res) =>{
    res.send("hello world")
})


//db password fYLuf91X3iSMkqzj

//db user name vikolearning1