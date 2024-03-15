class userClient {
    constructor(){
        this.url = "http://localhost:3042/user/";
    }

    async register (userToRegister) {
        const res = await fetch(`${this.url}register`, {
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userToRegister
            })
          })
          const jsonToReturn = await res.json();
          if(res.status !== 200){
            throw new Error(jsonToReturn);
          }
          return jsonToReturn;
    }

    async login (userInfo) {
        const res = await fetch(`${this.url}login`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                userInfo
            })
        })
        const jsonToReturn = await res.json();
          if(res.status !== 200){
            throw new Error(jsonToReturn);
          }
          return jsonToReturn;
    }

    async changePassword (userId, oldPassword, newPassword){
        const user = {
            userId:userId,
            oldPassword:oldPassword,
            newPassword:newPassword
        }
        const res = await fetch(`${this.url}change-password`,{
            method:"put",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                user
            })
        })
        console.log(res)
        const jsonToReturn = await res.json();
          if(res.status !== 200){
            throw new Error(jsonToReturn);
          }
          return jsonToReturn;
    } 

    async changeFullName (userId, password, fullName){
        const user = {
            userId:userId,
            password:password,
            fullName:fullName
        }
        const res = await fetch(`${this.url}change-full-name`,{
            method:"put",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                user
            })
        })
        console.log(res)
        const jsonToReturn = await res.json();
          if(res.status !== 200){
            throw new Error(jsonToReturn);
          }
          return jsonToReturn;
    }
}

export default new userClient();