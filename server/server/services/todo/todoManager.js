const todoDatabaseManage = require("./todoDatabaseManage");

class todoManager {
    constructor () {
        this.todoDatabase = new todoDatabaseManage();
    }

    async getAllTodos (userId) {
        return await this.todoDatabase.getAllTodos(userId);
    }

    async createTodo(newTodo) {
        return await this.todoDatabase.createTodo(newTodo)
    }

    async deleteTodo (_id) {
        return await this.todoDatabase.deleteTodo(_id);
    }

    async editTodoPriority (_id) {
        return await this.todoDatabase.editTodoPriority(_id)
    }
}

module.exports = new todoManager();