let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_simple_crud_2'
});

connection.connect(function(err){
    if(!!err) {
        console.error(err);
    }else{
        console.log('connection established');
    }
});

module.exports = connection;