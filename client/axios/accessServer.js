import Axios from 'axios';



const port = process.env.REACT_APP_BASE_PORT;



//==================================================
export const getInventory = async()=>{
  //let response = await Axios.post(`http://localhost:${port}/getInventory`);
  let response = await Axios.get(`http://localhost:3001/getInventory`);
  return response;
}
//==================================================
export const getProducts = async(inventoryId)=>{
  let response = await Axios.get(`http://localhost:3001/getProducts/`+inventoryId);
  return response;
}
//==================================================
export const updatePercentData = async(percent, Inventoryid)=>{

  let response = await Axios.put(`http://localhost:3001/updatePercentData`,{percent, Inventoryid});
  return response;
}
//==================================================
export const getProductsByNameAndIDUser = async(Namep, Inventoryid)=>{

  let response = await Axios.get(`http://localhost:3001/getProductsByNameAndIDUser/`+Namep+`/`+Inventoryid);
  return response;
}
//==================================================
export const createStorageUnit = async(json)=>{

  let response = await Axios.post(`http://localhost:3001/createStorageUnit`,{json});
  return response;
}
//==================================================
export const editStorageUnit = async(json1)=>{

  let response = await Axios.put(`http://localhost:3001/editStorageUnit`,{json1});
  return response;
}
//==================================================
export const getEmojis = async()=>{
  let response = await Axios.get(`http://localhost:3001/getEmojis`);
  return response;
}
//==================================================
export const createProduct = async(json)=>{
  console.log(json);
  let response = await Axios.post(`http://localhost:3001/createProduct`, {json});
  return response;
}



