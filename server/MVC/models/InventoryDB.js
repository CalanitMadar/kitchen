const db = require( "./ConnectionDatabase");
require('dotenv').config();//to .env file


//new client register
 const getInventory = async ()=>{
    return new Promise((resolve,reject) =>
    {
        db.database.query("SELECT * FROM Inventory1",
         function(err, data){
            if(err)
            {
                resolve (err); 
            }
            else
            {
                resolve(data);
            }
         }
         );
    })  
}


//=====================================
const updatePercentData = async (percent, Inventoryid)=>
{
   
    percent = (percent | 0); // convert doble to int

    return new Promise((resolve,reject) =>
    {
        var sql = "UPDATE Inventory1 SET AmountPercent = " + percent + " WHERE Inventoryid = " + Inventoryid;

        db.database.query(sql,
            function(err, result, fields){
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(result);
                }
            })
    })
}

//=====================================
const createStorageUnit = async (json)=>
{
    let percent = 0;
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Inventory1 (Inventoryid, IDUser, Emoji, UnitType, Temperature, AllergyInformation, AlertStock, UnitName, AmountPercent) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.database.query(sql, [json.idUser, json.emoji, json.typeUnit, json.temperature, json.allergyInformation, json.alertWhenStockIs, json.unitName, percent], function(err, result, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}
//=====================================
const editStorageUnit = async (json)=>
{
    const emoji = json.emoji;
    const unitType = json.typeUnit;
    const temperature = json.temperature;
    const allergyInformation = json.allergyInformation;
    const unitName = json.unitName;
    const inventoryId = json.inventoryId;
    
    
    return new Promise((resolve,reject) =>
    {
        const query = `UPDATE inventory1 SET Emoji = '${emoji}', UnitType = '${unitType}', Temperature = ${temperature}, AllergyInformation = '${allergyInformation}', UnitName = '${unitName}' WHERE Inventoryid = ${inventoryId};`;
        db.database.query( query,
            function(err, result, fields){
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve(result);
                }
            })
    })
}
module.exports = {getInventory, updatePercentData, createStorageUnit, editStorageUnit};