const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const Socket = require('./socket.js')

class Server{
  constructor(){
    this.server = express();
    this.PORT = process.env.PORT || 8080;
    this.global = {
      mySocket: new Socket()
    }
    this.setup(this.server)

  }
  setup(server){
    // view engine setup
    this.server.set('views', path.join(__dirname, 'views'));
    this.server.set('view engine', 'hbs');

    this.server.use(logger('dev'));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser());
    this.server.use(express.static(path.join(__dirname, 'public')));

    this.server.use('/', indexRouter);
    this.server.use('/users', usersRouter);

    this.server.listen(this.PORT, () => {
      console.log(`server listening on port ${this.PORT}`)
    })
  }
}

const server = new Server();

module.exports = server;