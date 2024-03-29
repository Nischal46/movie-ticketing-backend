const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
// const {Server} = require('socket.io');
const setupSocketConnectionServer = require('./reusable/handleSocket')

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//       origin: ["http://localhost:5173"],

//   }
// });


const dotenv = require('dotenv');
dotenv.config({path: "./.env"})

const filimRoute = require("./route/filimRoute");
const userRoute = require("./route/userRoute");
const bookRoute = require('./route/bookingRoute')
const handleGlobalError = require('./controller/errorController')

const DB = require("./database/dbconnection");
const AppError = require("./reusable/handleAppError");


const corsOptions = {
  credentials: true,
  origin: '*',
  // allowedHeaders: ['Content-Type', 'Authorization'],
}


app.use(express.json());


DB.databaseConnection()
  .then(() => console.log("Database Connection Established Successfully"))
  .catch((err) => console.log("Database Connection Failed", err));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true
}));

app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

setupSocketConnectionServer(server);

// console.log(io);

// let totaluser = 0;

// const firstconnection = io.of('/connection1');
// const secondconnection = io.of('/connection2');
// const thirdconnection = io.of('/connection3');
// const fourthconnection = io.of('/connection4');

// let clientresponse = {}
// let userid = []




// io.on("connection", (socket) => {
//   socket.on('recordAction', function (data){
//     const { action, user } = data;

//     if (!userid.includes(user)) {
//       userid.push(user);
//     }

//     if (!clientresponse[user]) {
//       clientresponse[user] = []; // Initialize array for the user if it doesn't exist
//     }
//     // clientresponse[user] = {...clientresponse, action}
//     clientresponse[user].push(action);
//     clientresponse[user] = clientresponse[user][clientresponse[user].length - 1];

//     // console.log('the object of the response ', clientresponse);

//     const responseJSON = clientresponse;

//     console.log(responseJSON);

//     io.emit('alert', responseJSON);
//   });

//   socket.on('disconnect', () => {
//     // Handle disconnection if needed
//   });
// });

app.use("/api/v1/filim", filimRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/booking", bookRoute)

app.use('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})


app.use(handleGlobalError);

server.listen(8000, function () {
  console.log("App is running in port");
});
