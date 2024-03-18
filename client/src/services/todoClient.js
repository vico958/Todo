class todoClient{
    constructor(){
        // this.url = "http://localhost:3042/todo";
        this.url = "https://todo-tcwg.onrender.com/todo";
    }

    async getAllTodoOfUser(token) {
      const json = await fetch(this.url, {
        method:"GET",
        headers:{
          "authorization": `Bearer ${token}`
        }
      })
    .then((res) => res.json())
    .catch((error) => {
      console.log("eerr", error.message)
      throw new Error("failed to fetch data")
    })
      return json;
    }

    async createTask(newTask, token){
      try{

        const res = await fetch(this.url, {
          method:"POST",
          headers: {
            "authorization": `Bearer ${token}`,
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

    async deleteTask(_id, token){
      const response = await fetch(this.url,
    {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
    return response.status === 200
  }

  async editTodoPriority(_id, token){
    const response = await fetch(`${this.url}/edit`,
      {
        method: "PUT",
        headers: {
          "authorization": `Bearer ${token}`,
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