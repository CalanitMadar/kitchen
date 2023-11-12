const serviceInventory = require("../models/InventoryDB");
const serviceProducts = require("../models/ProductsDB");
const serviceEmojis = require("../models/EmojiDB");

//get data from server sql




const getInventory = async (req, res) => {
    let data = await serviceInventory.getInventory()
    res.send(data);
   
}
//===========================================================
const getProducts = async (req, res) => {
    //console.log(req.params.inventoryId);
    let data = await serviceProducts.getProducts(req.params.inventoryId);
    res.send(data);
   
}
//===========================================================
const updatePercentData = async (req, res) => {
    //console.log(req.body);
    let data = await serviceInventory.updatePercentData(req.body.percent, req.body.Inventoryid);
    res.send(data);
   
}
//===========================================================
const getProductsByNameAndIDUser = async (req, res) => {
    console.log(req.params);
    let data = await serviceProducts.getProductsByNameAndIDUser(req.params.Namep, req.params.Inventoryid);
    res.send(data);
   
}
//===========================================================
const createStorageUnit = async (req, res) => {
    let data = await serviceInventory.createStorageUnit(req.body.json);
    res.send(data);
   
}
//===========================================================
const editStorageUnit = async (req, res) => {
    let data = await serviceInventory.editStorageUnit(req.body.json1);
    res.send(data);
   
}
//===========================================================
const getEmojis = async (req, res) => {
    let data = await serviceEmojis.getEmojis();//get all emojies list
    res.send(data);
   
}
//===========================================================
const createProduct = async (req, res) => {
    let data = await serviceProducts.createProduct(req.body.json);
    res.send(data);
}

module.exports =  {
    getInventory,
    getProducts,
    updatePercentData,
    getProductsByNameAndIDUser,
    createStorageUnit,
    editStorageUnit,
    getEmojis,
    createProduct
};