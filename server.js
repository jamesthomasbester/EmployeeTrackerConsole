//dependencies
const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
require('dotenv').config();

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASS,
    database: 'employeeTrackerDB'
});


const sql_query = (command) => new Promise((resolve, reject) => {
    connection.query(command, (err, res, fld)=>{
        if(err) return reject(err);
        else if(res) return resolve(res);
        else return resolve(fld);
    })
})

const a = []


class Department{
    constructor({id,name,employees,roles = []}){
        this.id = id;
        this.name = name;
        this.employees = employees;
        this.roles = roles;
    }
}

class Role{
    constructor({id, title, salary, employees}){
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.employees = employees;
    }
}

class Employee{
    constructor({id, first_name, last_name, role, department}){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.department = department;
    }
}

// sql_query('select * from roles;').then((result) => console.table(result))
// sql_query(`INSERT INTO roles (title, salary) values ('john','1000');`).then((result) => console.table(result))

function createNewDepartment(){
    inquirer.prompt({
        type: 'input',
        name: 'teamName',
        message: 'What is the team name?'
    }).then((answer) => {
        currentDepartment.name = answer.teamName;
        console.log(currentDepartment);
        createNewRole();
    })
}

function createNewRole(){
    var role = new Role({})
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: 'what is the role title?'
    }).then((answer) =>{
        role.title = answer.title;
        inquirer.prompt({
            type: 'checkbox',
            name: 'salary',
            message: 'what is the salary range for this role?',
            choices: ['-$24,999','$25,000-$49,999','$50,000-$74,999','$75,000-$99,000','$100,000-$124,999','$125,000-$149,999', '$150,000+']
        }).then((answer) =>{
            role.salary = answer.salary;
            currentDepartment.roles.push(role);
            inquirer.prompt({
                type: 'list',
                name: 'loop',
                message: 'Do you want to create another role?',
                choices: ['yes','no']
            }).then((answer) =>{
                if(answer.loop == 'yes')  createNewRole();
                else console.log(currentDepartment)
            })
        })
    })
}


function createNewEmployee(){
    var employee = new Employee({})
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the employees name?'
    }).then((answer) =>{
        employee.first_name = answer.name.split(' ')[0];
        employee.last_name = answer.name.split(' ')[1];
        inquirer.prompt({
            type: 'list',
            name: 'role',
            message: 'What is the employees position?',
            choices: [currentDepartment.roles.title]
        })
    })
}

inquirer.prompt({
    type: 'list',
    name: 'initialPrompt',
    message: 'Welcome to Employee Tracker',
    choices: ['Create new team','Edit existing team','View existing team']
}).then((result) => {
    console.log(result.initialPrompt);
    switch (result.initialPrompt){
        case 'Create new team':
            console.log('tets')
            createNewDepartment();
            break;
        case 'Edit existing team':
            break;
        case 'View existing team':
            break;
    }
});

var currentDepartment = new Department({});