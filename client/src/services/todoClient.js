import { Toast } from "@chakra-ui/react";

class todoClient{
    constructor(){
        this.url = "http://localhost:3042/todo";
    }

    async getAllTodoOfUser(userId) {
      const json = await fetch(`${this.url}/${userId}`)
      .then((res) => res.json())
      .catch((error) => {
        // TODO: i dont know
      })
      return json;
    }

    async createTask(newTask){
      try{

        const res = await fetch(this.url, {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            newTask
          })
        })
        return res.status === 200
      }catch(error){
        console.log(error)
      }
    }

    async deleteTask(_id){
      const response = await fetch(this.url,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
    return response.status === 200
  }

  async editTodoPriority(_id){
    const response = await fetch(`${this.url}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      })
      return response.status === 200
  }
}
export default new todoClient();