const express = require('express');
const {getInventory, getProducts, updatePercentData, getProductsByNameAndIDUser, createStorageUnit, editStorageUnit, getEmojis, createProduct} = require('../controllers/User');
const router = express.Router();

router.get('/getInventory', getInventory);
router.get('/getProducts/:inventoryId', getProducts);
router.put('/updatePercentData', updatePercentData);
router.get('/getProductsByNameAndIDUser/:Namep/:Inventoryid', getProductsByNameAndIDUser);
router.post('/createStorageUnit', createStorageUnit);
router.put('/editStorageUnit', editStorageUnit);
router.get('/getEmojis', getEmojis);
router.post('/createProduct', createProduct);










module.exports = router;