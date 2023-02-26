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

const path = require("path");
app.use('/public', express.static(path.join(__dirname, 'public')));

var food_data = {"Ferris": [], "John Jay": [], "JJ": []};
var users = {};

// for dining hall testing
fs.readFile('data/accounts.json', 'utf8', function (err, data) {
    var obj = JSON.parse(data);
    for (user in obj) {
        if ("demo-location" in obj[user]) {
            food_data[obj[user]["demo-location"]].push(user);
        }
    }
    console.log(food_data);
});

app.get("/", (req, res) => {
    res.render('login');
 });

app.post("/toggle", (req, res) => {
    var username = req.cookies["mealmate-user"];
    var toggle = "";
    if ("toggle" in req.body) {
        toggle = req.body.toggle;
    }
    if (username in users) {
        users[username].toggle = toggle;
        if ((!toggle) && ("dining_hall" in users[username])) {
            const index = food_data[users[username]["dining_hall"]].indexOf(username);
            food_data[users[username]["dining_hall"]].splice(index, 1);
            delete(users[username]["dining_hall"]);
        } 
    }
    res.status(204).send();
})

app.post("/location", (req, res) => {
    var username = req.cookies["mealmate-user"];
    var local_dininghall = "";
    if ("dining_hall" in req.body) {
        local_dininghall = req.body.dining_hall;
    }
    if ((username in users) && (users[username].toggle == true)) {
        // stays
        if (("dining_hall" in users[username]) && (local_dininghall in food_data) && (users[username]["dining_hall"] == local_dininghall)) {
            ;
        }
        
        // never there
        else if (!("dining_hall" in users[username]) && !(local_dininghall in food_data)) {
            ;
        }

        else {
            // leaving
            if ("dining_hall" in users[username]) {
                const index = food_data[users[username]["dining_hall"]].indexOf(username);
                food_data[users[username]["dining_hall"]].splice(index, 1);
                delete(users[username]["dining_hall"]);
            } 

            // entering
            if (local_dininghall in food_data) {
                food_data[req.body.dining_hall].push(username); 
                users[username]["dining_hall"] = req.body.dining_hall;
            }
        } 
        console.log(food_data);
    }
    var counts = {}
    for (location in food_data){
        counts[location] = food_data[location].length;
    }
    res.json(counts);
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