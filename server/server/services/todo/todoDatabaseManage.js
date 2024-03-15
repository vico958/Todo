const { todo } = require("../../storages/models/todo");


class todoDatabaseManage {
    getAllTodos = async (userId) => {
        try{
            return await todo.find({userId:userId})
        }catch(error){
            console.log("cant get from database, no idea yet why, wait you will know after this message "
            ,error)
        }
    }

    createTodo = async (newTodo) => {
        const newT = new todo({
            title:newTodo.title,
            description:newTodo.description,
            isPriority:newTodo.isPriority,
            userId: newTodo.userId
        })
        try{
            const result = await newT.save()
            return result;
        }catch(error){
            console.log("cant save new todo")
        }
    }

    deleteTodo = async (_id) => {
        try{
            await todo.deleteOne({_id:_id});
        }catch(error){
            console.log("i didd ", error)
        }
    }

    editTodoPriority = async (_id) => {
        try{
            const DbTodo = await todo.findOne({_id:_id})
            DbTodo.isPriority = !DbTodo.isPriority
            const result = await DbTodo.save();
            return result;
        }catch(error){
            console.log(error.message);
        }
    }
}

module.exports = todoDatabaseManage;