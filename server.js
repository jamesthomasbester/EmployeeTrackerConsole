//dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const MYSQL_PASSWORD = "";

//mysql connection
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: MYSQL_PASSWORD,
    database: 'employeeTrackerDB'
});


const sql_query = (command) => new Promise((resolve, reject) => {
    connection.query(command, (err, res, fld)=>{
        if(err) return reject(err);
        else if(res) return resolve(res);
        else return resolve(fld);
    })
})


sql_query('select * from roles;').then((result) => console.table(result))
sql_query(`INSERT INTO roles (title, salary) values ('john','1000');`).then((result) => console.table(result))