const db = require( "./ConnectionDatabase");
require('dotenv').config();//to .env file



//==================================================
const getProducts = async (inventoryId)=>
{
    return new Promise((resolve,reject) =>
    {
        //console.log(inventoryId);
        db.database.query("(SELECT * FROM Products WHERE Inventoryid = ? )",
        [inventoryId],
        function(err, result, fields){
            if(err)
            {
                reject(err);                
            }
            else
            {
                resolve(result);
            }
         }
         )
        
        
        })
}

//====================================================
const getProductsByNameAndIDUser = async (Namep, Inventoryid)=>
{
    return new Promise((resolve,reject) =>
    {
        
        db.database.query("(SELECT * FROM Products WHERE Inventoryid = ? )",
        [ Inventoryid],
        function(err, result, fields){
            if(err)
            {
                reject(err);                
            }
            else
            {
                resolve(result);
            }
         }
         )
        
        
        })
}
//=====================================
const createProduct = async (json)=>
{
    console.log(json);
    const Inventoryid = json.Inventoryid;
    const productName = json.productName;
    const quantity = json.quantity;
    const brand = json.brand;
    const unit = json.unit;
    const expirationDate = json.expirationDate;
    const deliveryDate = json.deliveryDate;
    const isChecked = json.isChecked;
    const alertValue = json.alertValue;

    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO products (pid, Inventoryid, Namep, Quantity, QuantityExist, Brand, Expiers, Deliverd, Unit, AlertBelow, Alert) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.database.query(sql, [Inventoryid, productName, quantity, quantity, brand, expirationDate, deliveryDate,  unit, alertValue, isChecked], 
        function(err, result, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}
module.exports = { getProducts, getProductsByNameAndIDUser, createProduct};