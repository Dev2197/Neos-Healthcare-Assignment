let data = require('../data/data.json')
const path = require("path");
const crypto = require("crypto");
const {writeDataToFile} = require('../utils/utils.js')

function findAllTasks(){
    return new Promise((resolve,reject)=>{
        resolve(data.tasks)
    })
}

function findTaskById(id){
    return new Promise((resolve,reject)=>{
        const task = data.tasks.find((e)=>e.id==id)
        resolve(task)
    })
}

function create(task) {
    return new Promise((resolve, reject) => {
      const newTask = {
        id: crypto.randomBytes(16).toString("hex"),
        status:false,
        ...task
      };
      data.tasks.push(newTask);
      writeDataToFile(path.join(__dirname, "../data/data.json"), data);
      resolve(newTask);
    });
  }

  function update(id,task){
    return new Promise((resolve, reject) => {
        const index = data.tasks.findIndex(e=>e.id === id)
         data.tasks[index] = {id, ...task}

        writeDataToFile(path.join(__dirname, "../data/data.json"), data);
       resolve(data.tasks[index]);
      });
  }

  function remove(id){
    return new Promise((resolve, reject) => {
        let newtodos = data.tasks.filter(e=>e.id !== id)
        data.tasks = newtodos

        writeDataToFile(path.join(__dirname, "../data/data.json"), data);
       resolve();
      });
  }

  function findByUserId(userId) {
    return new Promise((resolve, reject) => {
      const tasks = data.tasks.filter((ele) => ele.userId === userId);
      resolve(tasks);
    });
  }
module.exports = {
    findAllTasks,
    findTaskById,
    create,
    update,
    remove,
    findByUserId
}