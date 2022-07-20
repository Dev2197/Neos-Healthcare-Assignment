const User = require('../models/userModel')

const {getPostData} = require('../utils/utils')



//Get all Tasks
//@route GET api/tasks
async function getUsers(req,res){
    try {
        const users = await User.findAllUsers();

        res.writeHead(200,{'Content-Type': 'application/json'})
       return res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

//Get single Task
//@route GET api/task/:id
async function getUser(req,res,id){
    try {
        const user = await User.findUserById(id);

        if(!user){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'User not Found'}))
        }
        else{
            res.writeHead(200,{'Content-Type': 'application/json'})
           return res.end(JSON.stringify(user))
        }
        
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

//Create a Task
//@route POST api/createTask
async function createUser(req,res){
    try {
        const body = await getPostData(req);

        const { userName,email,password,phoneno } = JSON.parse(body);

        const user = await User.findUserByEmail(email) || await User.findUserByPhoneno(phoneno);
        if(user){
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User already exists" }));
            return;
        }
        const newUser = await User.create({
            userName,
            email,
            password,
            phoneno
        });
        res.writeHead(201,{'Content-Type': 'application/json'})
       return res.end(JSON.stringify(newUser));
    } catch (error) {
        console.log(error)
        res.end(error);
    }
}

async function loginUser(req,res){
    try {
        const body = await getPostData(req);

        const {email,password } = JSON.parse(body);
        const user = await User.findUserByEmail(email)

        if(!user){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'Wrong Email or Password'}))
        }
        
        if(user.password !== password)
        {
            res.writeHead(400,{'Content-Type': 'application/json'})
            return  res.end(JSON.stringify({message: 'Wrong Email or Password'}))
        }

        res.writeHead(200,{'Content-Type': 'application/json'})
        return  res.end(JSON.stringify(user))
        
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

//update Task
//@route PUT/PATCH api/updatetask/:id
async function updateUser(req,res,id){
    try {
        const user = await User.findUserById(id);

        if(!user){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'user not Found'}))
        }
        else{
            const body = await getPostData(req);

        const { userName, email, password,phoneno } = JSON.parse(body);

        const newUser = {
            userName : userName || user.userName,
            email : email || user.email,
            password : password || user.password,
            phoneno : phoneno || user.phoneno
        }

        const updateUser = await User.update(id,newUser);
        res.writeHead(201,{'Content-Type': 'application/json'})
       return res.end(JSON.stringify(updateUser));
        }
        
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

//Delete Task
//@route DELETE api/deletetask/:id
async function deleteUser(req,res,id){
    try {
        const user = await User.findUserById(id);

        if(!user){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'Task not Found'}))
        }
        else{
            await User.remove(id)
            res.writeHead(200,{'Content-Type': 'application/json'})
           return res.end(JSON.stringify({message:`product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
        res.end(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser
}