class userClient {
    constructor(){
        this.url = "http://localhost:3042/user/";
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