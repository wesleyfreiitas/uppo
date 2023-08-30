const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const usersController = require("./users/UsersController");
const homesController = require("./homes/HomesControllers");
const integrationController = require("./integration/IntegrationsController");

const User = require('./users/User');

// View engine
app.set('view engine','ejs');

// Sessions

app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 30000000 }
}))

// Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })


app.use("/",usersController);
app.use("/",homesController);
app.use("/",integrationController);

app.listen(3000, (req,res) => {
    console.log("O servidor está rodando!")
})