//dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const MYSQL_PASSWORD = "password";

//mysql connection
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: MYSQL_PASSWORD,
    database: 'employeeTrackerDB'
});

connection.query(
    'SELECT * FROM roles;', (err, res, fld) =>{
        if (err){
            console.error(err);
        }
        if (res){
            console.table(res)
        }
        if (fld){
            console.table(fld);
        }
    }
)