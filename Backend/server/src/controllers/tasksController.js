const Tasks = require('../models/tasksModel');

const {getPostData} = require('../utils/utils')

//Get all Tasks
//@route GET api/tasks
async function getTasks(req,res){
    try {
        const tasks = await Tasks.findAllTasks();

        res.writeHead(200,{'Content-Type': 'application/json'})
       return res.end(JSON.stringify(tasks))
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

//Get single Task
//@route GET api/task/:id
async function getTask(req,res,id){
    try {
        const task = await Tasks.findTaskById(id);

        if(!task){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'Task not Found'}))
        }
        else{
            res.writeHead(200,{'Content-Type': 'application/json'})
           return res.end(JSON.stringify(task))
        }
        
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

//Create a Task
//@route POST api/createTask
async function createTask(req,res){
    try {
        const body = await getPostData(req);

        const { title,userId } = JSON.parse(body);

        const newTask = await Tasks.create({
            title,
            userId
        });
        res.writeHead(201,{'Content-Type': 'application/json'})
       return res.end(JSON.stringify(newTask));
    } catch (error) {
        console.log(error)
        res.end(error);
    }
}

//update Task
//@route PUT/PATCH api/updatetask/:id
async function updateTask(req,res,id){
    try {
        const task = await Tasks.findTaskById(id);

        if(!task){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'Task not Found'}))
        }
        else{
            const body = await getPostData(req);

        const { title, status,userId } = JSON.parse(body);

        const newtask = {
            title : title || task.title,
            status : status || task.status,
            userId : userId || task.userId
        }

        const updateTask = await Tasks.update(id,newtask);
        res.writeHead(201,{'Content-Type': 'application/json'})
       return res.end(JSON.stringify(updateTask));
        }
        
    } catch (error) {
        console.log(error)
       return res.end(error);
    }
}

async function getUserTasks(req, res, id) {
    try {
      const tasks = await Tasks.findByUserId(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(tasks));
    } catch (error) {
      console.log(error);
    }
  }

//Delete Task
//@route DELETE api/deletetask/:id
async function deleteTask(req,res,id){
    try {
        const task = await Tasks.findTaskById(id);

        if(!task){
            res.writeHead(400,{'Content-Type': 'application/json'})
          return  res.end(JSON.stringify({message: 'Task not Found'}))
        }
        else{
            await Tasks.remove(id)
            res.writeHead(200,{'Content-Type': 'application/json'})
           return res.end(JSON.stringify({message:`product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
        res.end(error);
    }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getUserTasks
}