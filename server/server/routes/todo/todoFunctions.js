const todoManager = require("../../services/todo/todoManager");

async function getAllTodos(req, res) {
    try{
        const userId = req.params.userId
        const todos = await todoManager.getAllTodos(userId);
        res.status(200).send(JSON.stringify(todos))
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function createTodo(req, res) {
    try{
        const returnedData = await todoManager.createTodo(req.body.newTask)
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch (error) {
        console.log(error)
    }
}

async function deleteTodo (req,res){
    try{
        const {_id} = req.body
        const returnedData = await todoManager.deleteTodo(_id)
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.log(error);
    }
}

async function editTodoPriority (req, res) {
    try{
        const {_id} = req.body
        const returnedData = await todoManager.editTodoPriority(_id)
        res.status(200).send(JSON.stringify(returnedData));
        res.end();
    }catch(error){
        console.log(error);
    }
    // TODO or to delete
}

module.exports = {
    getAllTodos,
    createTodo,
    deleteTodo,
    editTodoPriority
}