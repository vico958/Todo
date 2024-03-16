const express = require("express");
const auth = require("../../middleware/auth");
const { createTodo, getAllTodos, deleteTodo, editTodoPriority } = require("./todoFunctions");
const todoRouter = express.Router();

todoRouter.get("/", [auth], getAllTodos)
todoRouter.post("/", [auth], createTodo)
todoRouter.delete("/", [auth], deleteTodo)
todoRouter.put("/edit", [auth], editTodoPriority)

module.exports= todoRouter;