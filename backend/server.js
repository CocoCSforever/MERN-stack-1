//node_modules: express package and all its dependencies installed

// attach environment variables for us to the process object
require('dotenv').config()

// create express application
// 1. require express package
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts') // no need to put extension

// 2. start up the express app
const app = express()

// 3. listen for request
// specific port number, say 4000

// app.listen(process.env.PORT, () => {
//     // message which be displayed in the terminal
//     console.log("listening on port", process.env.PORT)
// })

// 6. middleware
// for every request that comes in, it looks if it has some body to the request/any data we
// are sending to the server, if it does, it passes and attaches it to the request object
// so we can access it in the request handler
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// 4. set up routes handler/react to request
// respond to a get request
// '/' if go to local host port 40000, forward slash the root of domain,
// it's gonna fire a function to handle the request(the second argument)
// take in 
//  req: request object which has info about the request
//  res: reponse object which we use to send back a response
//      res.josn send back a json string
// go to localhost:40000

// app.get('/', (req, res) =>{
//     res.json({mssg: 'Welcome to the app'})
// })

// grabs all the diff routes we attach to the router in workouts.js and uses them on the app
// only fire these routes when we come to a specific path
// place another argument before, to specify a path
app.use('/api/workouts', workoutRoutes)


// connect to db(asynchronous and returns a promise)
// .then fire a functiom when it's complete. only be listening for those requests once we connected to the db
// .catch catch any kind of error(eg. URI/password is incorrect)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            // message which be displayed in the terminal
            console.log("connected to db & listening on port", process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })

// 5. try to store these constants like "40000" in an environment variable
// we use .env file and add it to git.ignore to hide these variables
// npm install dotenv
// dotenv is a package loads environments variables from a .env file into the process.env object
// available to us globally in a node.js environment
// once installed, we require the package at the top and directly invoke the config method on it 
// process.env

// Testing: 
// if we did some changes
// 1
// ctrl c to cacel out of process and run it again
// node server.js
// 2
// npm install -g nodemon(install only once)
// nodemon server.js
// detect the change and re-run the file

// 3
// "dev": "nodemon server.js"
// what kind of script wanna run when runing the dev command
// npm run dev
// will do the same thing as nodemon server.js

// npx create-react-app frontend