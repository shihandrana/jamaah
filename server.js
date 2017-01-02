// require and instantiate express
var express = require('express')
var app = express()
const reload = require('reload');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var configDB = require('./config/database.js');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// required for passport
// app.use(session({
//     secret: 'ilovescotchscotchyscotchscotch', // session secret
//     resave: true,
//     saveUninitialized: true
// }));
var sess = {
    secret: 'ta-awuuna',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

// set up our express application
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static('public'));
app.use(session(sess))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.urlencoded({
    extended: true
})); // get information from html forms

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
const server = app.listen(port, function() {
    console.log('Magic happens on port: ' + port);
});

const io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('notify-donate', function(msg) {
        console.log('message: ' + msg);
        io.emit('notify-donate', msg);
    });
});

reload(server, app);