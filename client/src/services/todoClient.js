class todoClient{
    constructor(){
        this.url = "http://localhost:3042/todo";
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