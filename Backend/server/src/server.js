const http = require("http");
const path = require('path');
// const tasks = require('../data/tasks.json');
const {getTasks,getTask,createTask,updateTask,deleteTask,getUserTasks} = require('./controllers/tasksController');
const {getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
     loginUser} = require('./controllers/userController')

const server = http.createServer((req,res)=>{

    
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET, POST, PUT, DELETE");
	res.setHeader('Access-Control-Allow-Headers', '*');
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}
	
  


    if(req.url === "/api/users" && req.method === "GET"){
        getUsers(req,res)
    }
    else if(req.url.match(/\/api\/users\/\w+/) && req.method === "GET")
    {
        const id = req.url.split('/')[3]
        // console.log(id)
        getUser(req,res,id)
    }
    else if(req.url === '/api/createuser' && req.method === "POST")
    {
        createUser(req,res)
    }
    else if(req.url === '/api/loginuser' && req.method === "POST")
    {
        loginUser(req,res)
    }
    else if(req.url.match(/\/api\/updateuser\/\w+/) && (req.method === "PATCH" || req.method === "PUT"))
    {
        const id = req.url.split('/')[3]
        updateUser(req,res,id)
    }
    else if(req.url.match(/\/api\/deleteuser\/\w+/) && req.method === "DELETE")
    {
        const id = req.url.split('/')[3]
        deleteUser(req,res,id)
    }
    else if (req.url === "/api/tasks" && req.method === "GET") {
        getTasks(req,res);
    }
    else if(req.url.match(/\/api\/tasks\/\w+/) && req.method === "GET")
    {
        const id = req.url.split('/')[3]
        // console.log(id)
        getTask(req,res,id)
    }
    else if(req.url === '/api/createtask' && req.method === "POST")
    {
        createTask(req,res)
    }
    else if(req.url.match(/\/api\/updatetask\/\w+/) && (req.method === "PATCH" || req.method === "PUT"))
    {
        const id = req.url.split('/')[3]
        updateTask(req,res,id)
    }
    else if(req.url.match(/\/api\/deletetask\/\w+/) && req.method === "DELETE")
    {
        const id = req.url.split('/')[3]
        deleteTask(req,res,id)
    }
    else if (req.url.match(/\/usertasks\/\w+/) && req.method === "GET") {
        const userId = req.url.split("/")[2];
        getUserTasks(req, res, userId);
    }

    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

