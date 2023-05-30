const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const compression = require('compression');
const carImportRouter = require('./routes/car_model');

const electricRouter = require('./routes/electric_index');
const gasRouter = require('./routes/gas_index');
const importCarRouter = require('./routes/import_car');
const adminRouter = require('./routes/admin');
var UserModel = require("./models/CustomerModel");
var gasModelSchema = require("./models/GasModel");
const app = express();


//Connecting to Mongodb
const db = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/autorizz', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log("MongoDB connected");

    } catch (err) {
        console.log("MongoDB Error : Failed to connect");
        console.log(err);
        process.exit(1);
    }
}

db();


// view engine setup
app.engine('.hbs', exphbs({
    defaultLayout: 'layout', extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

console.log("App running on Localhost:5000");


// Routing
app.get('/', (req, res) => {
    res.redirect('/home');
});


// Define a route for the contact page
app.get('/contact', (req, res) => {
    // Sample contact information
    const contactInfo = {
      name: 'Car Nation Automart',
      email: 'info@carnationautomart.com',
      phone: '+254707222777, +254703840814, +254719848282',
      address: 'Langata Road, Off Southern Bypass, Opposite Uhuru gardens',
      mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d-74.123456!3d40.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIwJzM1LjIiTiA3NMKwNTcnNDYuNyJX!5e0!3m2!1sen!2sus!4v1622592800000!5m2!1sen!2sus',
    };
  
    // Render the contact page template with the contact information
    res.render('contact', { contactInfo });
  });
app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/routes/home.html");
});

app.use('/admin', adminRouter);
app.use('/electric', electricRouter);
app.use('/gas', gasRouter);
app.use('/import-car', importCarRouter);
app.use('/car-import', carImportRouter);


//Users
app.post('/customer', async (req, res) => {

    const user = new UserModel({
        name: req.body.username,
        email: req.body.useremail,
        phone: req.body.userphone
    })

    const user_res = await user.save();
    console.log(user_res);
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
