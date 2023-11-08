const express = require('express');

const app = express();

app.use(express.json());
//get
const dessertController = require('./src/MenuRequests/dessertController.js');
const entreeController = require('./src/MenuRequests/entreeController.js');
const platController = require('./src/MenuRequests/platController.js')

const customController = require('./src/MenuRequests/customController.js');

const { getOrder } = require('./src/OrderRequests/orderController.js');
const { getClient } = require('./src/AdminRequests/getClientController.js');


//post
const loginController = require('./src/UserRequests/loginController.js');
const { postCreateUser } = require('./src/UserRequests/createUserController.js');
const { postCreateOrder } = require('./src/OrderRequests/createOrderController.js');

// put (update)
const { putStateOrder } = require('../API/src/OrderRequests/stateOrderController.js');

//delete
const { deleteUser } = require('./src/AdminRequests/deleteUserController.js');
const { deleteIngredient } = require('./src/AdminRequests/deleteIngredientController.js');

const API_PORT = 3000;

// get
app.get('/dessert', dessertController.getDessertData);
app.get('/entree', entreeController.getEntreeData);
app.get('/plat', platController.getPlatData);

app.get('/custom/base', customController.getBaseCustomData);
app.get('/custom/ingredient', customController.getIngredientCustomData);

app.get('/order', getOrder)
app.get('/user/client', getClient)


// post
app.post('/user/create', postCreateUser)
app.post('/login', loginController.postLogin)
app.post('/order/create', postCreateOrder)

// put (UPDATE)
app.put('/order/state/update', putStateOrder)

//delete
app.delete('/user/delete', deleteUser)
app.delete('/custom/base/ingredient/delete', deleteIngredient)

app.listen(API_PORT, () => {
    console.log('Server listening on port:', API_PORT);
});