// code away!

//import or require the express module
const express = require('express');

//import user router
const userRouter = require('./users/userRouter.js')

//create an express application using the express module
const server = express();

//global middleware - looks at every request coming in to the server and is usually called on the server or the router
//a middleware function takes 3 parameters: the request and response objects and a function (next()) that points to the 
//next middleware 
function logger(req, res, next){
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`
        );

    next();
}

//set up global middleware
server.use(logger);

//middleware to use json
server.use(express.json());

//mount the user router
server.use('/api/users', userRouter);

/*************************************CUSTOM MIDDLEWARE********************************/





//set up API port and have server listen on the port
const port = 8000;
server.listen(port, ()=> console.log(`Server is listening on port ${port}.`));

