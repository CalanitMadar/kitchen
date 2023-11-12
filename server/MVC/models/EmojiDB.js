const db = require( "./ConnectionDatabase");
require('dotenv').config();//to .env file



//==================================================
//get all list of emojis
const getEmojis = async ()=>
{
    return new Promise((resolve,reject) =>
    {
        db.database.query("(SELECT * FROM emojis)",
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

module.exports = { getEmojis};