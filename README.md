# MERN-stack-tutorial
./backend
`npm init -y`
`npm install express`

`npm install dotenv`

//odm object data modeling
`npm install mongoose`
library and odm stands for object data modeling it basically wraps mongodb with
an extra layer that allows us to use methods to read and write database
documents and it also gives us a way to declare models and schemas to ensure a more strict data structure

Testing: 
if we did some changes
1  `ctrl c` to cacel out of process and run it again
`node server.js`
2  `npm install -g nodemon`(install only once)
`nodemon server.js`
detect the change and re-run the file

3  "dev": "nodemon server.js"    // what kind of script wanna run when runing the dev command
`npm run dev` will do the same thing as nodemon server.js

`npx create-react-app frontend`