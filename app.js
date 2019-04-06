const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ejslint = require('ejs-lint');
const app = express();
const playerRoutes = require('./routes/playerroutes');
const cors = require('./utils/middlewares/cors');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors);
app.set('view engine','ejs');
ejslint.lint();
app.use('/',playerRoutes);
app.listen(process.env.PORT || 1236, () => {
    console.log('Server Strat....');
});