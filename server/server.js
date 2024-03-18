require("dotenv").config()
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
const port = process.env.port || "1";


const dbURI = process.env.dbConnection;

mongoose.connect(dbURI)
.then(() => app.listen(port, () =>{
    console.log("Server started on port", port)
}))
.catch((err) => console.log(err))

app.get("/", (req, res) =>{
    res.send("hello world")
})