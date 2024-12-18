const cors = require("cors");
const express = require("express");
const passport = require("passport");
const { Server } = require('socket.io');
require("./middlewares/passeport-middleware")
const { createServer } = require("node:http");
const cookieParser = require("cookie-parser");
const { PORT, CLIENT_URL, ADMIN_URL } = require("./constants");

//Megatron's initialize Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: [CLIENT_URL, ADMIN_URL],credentials: true}));
app.use(passport.initialize());
const server = createServer(app);

//Megatron's import routes
const authRoute = require("./routes/authentification");
const eventsRoute = require("./routes/eventsRoute");
const postRoute = require("./routes/postsRoutes");

//here, Megatron is initializing routes
app.use("/api", authRoute);
app.use("/api", eventsRoute);
app.use("/api", postRoute);

//Megatron is initializing the socket server

const messages = [];

const io = new Server(server);
io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  socket.on('message', (data) => {
    const message = {
      message: data.message,
      senderUsername: username,
      sentAt: Date.now()
    }
    messages.push(message)
    io.emit('message', message)

  })
});

const appStart = ()=>{
    try {
      server.listen(PORT, ()=>{
        console.log(`server is running at http://localhost:${PORT}`);
      })  
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}

appStart();