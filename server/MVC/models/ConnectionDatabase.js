const mysql = require('mysql');


// sql conncetion
const database = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"masooda",
    charset: "utf8mb4"
});
module.exports = {database};