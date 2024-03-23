const userManger = require("../../services/user/userManger")
const jwt = require("jsonwebtoken")
async function userLogin(req, res) {
    try{
        const { password }= req.body.userInfo;
        let { email }= req.body.userInfo;
        email = email.toLowerCase();
        const userFromDb= await userManger.getUserByEmail(email);
        if(!userFromDb || userFromDb.password !== password){
            res.status(400).send(JSON.stringify("email or password does not match!"))
            res.send()
        }else{
            const jwtToken = jwt.sign({id: userFromDb._id, email:userFromDb.email}, process.env.jwtToken, { expiresIn: "24h" })
            res.status(200).send(JSON.stringify({message:"nice to see you again", token:jwtToken, user:userFromDb}))
            res.send()
        }
    }catch(error){
        console.log(error);
    }
}

async function userRegister(req, res) {
    try{
        const { userToRegister} = req.body;
        const emailInLowerCase = userToRegister.email.toLowerCase()
        const isAlreadyInSytem = await userManger.getUserByEmail(emailInLowerCase);
        if(isAlreadyInSytem){
        res.status(400).send(JSON.stringify("Email already use"));
        res.end();
        }
        else{
            console.log("e before", userToRegister.email)
            userToRegister.email = emailInLowerCase;
            console.log("e after", userToRegister.email)
            const returnedData = await userManger.register(userToRegister);
            const jwtToken = jwt.sign({id: returnedData._id, email:returnedData.email}, process.env.jwtToken, { expiresIn: "24h" })
            res.status(200).send(JSON.stringify({returnedData, token:jwtToken}));
            res.end();
        }
    }catch(error){
        console.log("nope", error)
    }
}

async function changePassword(req, res) {
    try{
        const {newPassword, oldPassword} = req.body.user;
        const userId = req.user.id;
        const user = await userManger.getUserById(userId)
        if(oldPassword === user.password){
            const returnedData = await userManger.changePassword(userId, newPassword)
            res.status(200).send(JSON.stringify("Password changed"));
            res.end();
        }else{
            //TODO: ERROR OR SOMETHING
            res.status(400).send(JSON.stringify("old password doesnt match"));
            res.end();
        }
    }catch(error){

    }
}

async function changeFullName(req, res) {
    try{
        const {password, fullName} = req.body.user
        const userId = req.user.id;
        const user = await userManger.getUserById(userId)
        if(password === user.password){
            const returnedData = await userManger.changeFullName(userId, fullName)
            res.status(200).send(JSON.stringify("Full Name changed"));
            res.end();
        }else{
            //TODO: ERROR OR SOMETHING
            res.status(400).send(JSON.stringify("password doesnt match with user password"));
            res.end();
        }
    }catch(error){
        
    }
}

async function helloWorld(req, res){
    res.status(200).json("hello world");
    res.send();
}
module.exports = {
    userLogin,
    userRegister,
    changePassword,
    changeFullName,
    helloWorld
}