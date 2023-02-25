const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// set view engine
app.set("view engine", "ejs");

var food_data = {"Ferris": [], "John Jay": [], "JJ": []};
var users = {};

app.get("/", (req, res) => {
    res.render('login');
 });

app.post("/location", (req, res) => {
    var username = req.cookies["mealmate-user"];
    if ((username in users) && (users[username].toggle == true) && (req.body.dining_hall in food_data)){
        food_data[req.body.dining_hall].push(username);
        var location = req.body.dining_hall;
        console.log(username, location);
        console.log(food_data);
    }
    res.status(204).send();
}); 

app.post("/login", (req, res) => {
    fs.readFile('data/accounts.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        console.log(obj);
        if (req.body.uname in obj) {
            if (req.body.psw == obj[req.body.uname].password) {
                users[req.body.uname] = {"toggle": obj[req.body.uname].toggle};
                res.cookie("mealmate-user", req.body.uname);
                res.render('home', {food_data: food_data});
                return;
            }
            else {
                res.render('login');
                return;
            }
        }
        else {
            res.render('login');
            return;
        }
    });
 });

app.listen(8080, "0.0.0.0");
console.log('Server is running at http://localhost:3000/');