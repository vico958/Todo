class userClient {
    constructor(){
        this.url = "https://todo-tcwg.onrender.com/user/";
    }

    registerUrl () {
        return `${this.url}register`
    }

    loginUrl () {
        return `${this.url}login`;
    }

    changePasswordUrl (){
        return `${this.url}change-password`
    } 

    changeFullNameUrl (){
        return `${this.url}change-full-name`;
    }
}

export default new userClient();