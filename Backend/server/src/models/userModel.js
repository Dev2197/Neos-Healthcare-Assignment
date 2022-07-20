let data = require('../data/data.json')
const path = require("path");
const crypto = require("crypto");
const {writeDataToFile} = require('../utils/utils.js')

function findAllUsers(){
    return new Promise((resolve,reject)=>{
        resolve(data.users)
    })
}

function create(user) {
    return new Promise((resolve, reject) => {
      const newUser = {
        id: crypto.randomBytes(16).toString("hex"),
        ...user
      };
      // console.log(newUser)
        data.users.push(newUser);
        writeDataToFile(path.join(__dirname, "../data/data.json"), data);
        resolve(newUser);
      
      
    });
  }

  function findUserById(id){
    return new Promise((resolve,reject)=>{
        const user = data.users.find((e)=>e.id==id)
        resolve(user)
    })
}

function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const user = data.users.find((e) => e.email == email);
      resolve(user);
    });
  }

function findUserByPhoneno(phoneno) {
    return new Promise((resolve, reject) => {
      const user = data.users.find((e) => e.phoneno === phoneno);
      resolve(user);
    });
  }

  function update(id,user){
    return new Promise((resolve, reject) => {
        const index = data.users.findIndex(e=>e.id === id)
         data.users[index] = {id, ...user}

        writeDataToFile(path.join(__dirname, "../data/data.json"), data);
       resolve(data.users[index]);
      });
  }

  function remove(id){
    return new Promise((resolve, reject) => {
        let users = data.users.filter(e=>e.id !== id)

        data.users = users;

        writeDataToFile(path.join(__dirname, "../data/data.json"), data);
       resolve();
      });
  }

  module.exports ={
    findAllUsers,
    findUserById,
    findUserByEmail,
    findUserByPhoneno,
    create,
    update,
    remove
  }



