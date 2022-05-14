//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');

//mysql connection
const connection = mysql.createConnection({
    host: localhost,
    user: root,
    password: password,
    database: employeeTracketDB
});