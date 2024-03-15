const express = require("express");
const { createTodo, getAllTodos, deleteTodo, editTodoPriority } = require("./todoFunctions");
const todoRouter = express.Router();

todoRouter.get("/:userId", getAllTodos)
todoRouter.post("/", createTodo)
todoRouter.delete("/", deleteTodo)
todoRouter.put("/edit", editTodoPriority)

module.exports= todoRouter;