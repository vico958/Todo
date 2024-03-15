const { user } = require("../../storages/models/user")

class userDatabaseManage {
    register = async (userToRegister) => {
        const newUser = new user({
            email:userToRegister.email,
            password:userToRegister.password,
            fullName:userToRegister.fullName
        })
        try{
            const result = await newUser.save()
            return result;
        } catch(error){
            console.log("shame", error)
        }
    }

    getUserByEmail = async (email) => {
        try{
            return await user.findOne({email:email});
        }catch(error){
            console.log(error);
        }
    }

    changePassword = async (userId, newPassword) => {
        try{
            return await user.findByIdAndUpdate({_id:userId}, {password:newPassword}, {new:true})
        }catch(error){
            console.log(error)
        }
    }

    getUserById = async (userId) => {
        try{
            return await user.findOne({_id:userId});
        }catch(error){
            console.log(error);
        }
    }

    changeFullName = async (userId, newFullName) => {
        try{
            return await user.findByIdAndUpdate({_id:userId}, {fullName:newFullName})
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = userDatabaseManage