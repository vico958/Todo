const userManger = require("../../services/user/userManger")
const jwt = require("jsonwebtoken")
async function userLogin(req, res) {
    try{
        const { email, password }= req.body.userInfo;
        const userFromDb= await userManger.getUserByEmail(email);
        if(!userFromDb || userFromDb.password !== password){
            res.status(400).send(JSON.stringify("email or password does not match!"))
            res.send()
        }else{
            const jwtToken = jwt.sign({id: userFromDb._id, email:userFromDb.email}, "jwtFakeToken", { expiresIn: "24h" })
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
        const isAlreadyInSytem = await userManger.getUserByEmail(userToRegister.email);
        if(isAlreadyInSytem){
        res.status(400).send(JSON.stringify("Email already use"));
        res.end();
        }
        else{
            const returnedData = await userManger.register(userToRegister);
            const jwtToken = jwt.sign({id: returnedData._id, email:returnedData.email}, "jwtFakeToken", { expiresIn: "24h" })
            res.status(200).send(JSON.stringify({returnedData, token:jwtToken}));
            res.end();
        }
    }catch(error){
        console.log("nope", error)
    }
}

async function changePassword(req, res) {
    try{
        const {userId, newPassword, oldPassword} = req.body.user
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
        const {userId, password, fullName} = req.body.user
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
module.exports = {
    userLogin,
    userRegister,
    changePassword,
    changeFullName
}