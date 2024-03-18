class todoClient{
    constructor(){
        this.url = "https://todo-tcwg.onrender.com/todo";
    }

    getAllTodoOfUserUrl() {
      return `${this.url}`;
    }

    createTaskUrl(){
      return this.url
    }

    deleteTaskUrl(){
      return this.url
  }

  editTodoPriority(){
    return `${this.url}/edit`;
  }
}
export default new todoClient();