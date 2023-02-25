var http = require('http');
const express = require('express');
const app = express();
// set view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render('login');
 });

app.post("login", (req, res) => {
    console.log(req);
    res.render('home');
 });

app.listen(80);
console.log('Server is running at http://localhost:80/');