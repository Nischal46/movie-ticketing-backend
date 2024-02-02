const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: ["http://localhost:5173"],

  }
});


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

console.log(io);

io.on("connection", (socket) => {
  console.log('a user connected');
  // console.log(socket.handshake);

  socket.on('recordAction', (data) => {
    console.log('Action recorded:', data.action);
    socket.emit('actionRecorded', 'Action recorded successfully'); // Send confirmation back to the client
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


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
