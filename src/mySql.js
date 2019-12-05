const mysql = require('mysql');
const connection = mysql.createConnection({
    host : '3306',
    user:'root',
    password: 'epicodus',
    database: 'UserLocationsDB'
});

connection.connect((err) =>{
    if (err) throw err;
    console.log('Connected!');
});