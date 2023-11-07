const express = require('express');

const app = express();

app.use(express.json());
//get
const dessertController = require('./src/MenuRequests/dessertController.js');
const entreeController = require('./src/MenuRequests/entreeController.js');
const platController = require('./src/MenuRequests/platController.js')

const customController = require('./src/MenuRequests/customController.js');

//post
const loginController = require('./src/UserRequests/loginController.js');
const { postCreateUser } = require('./src/UserRequests/createUserController.js');
const { postCreateCommand } = require('./src/CommandRequests/createCommandController.js');

//delete
const { deleteUser } = require('./src/UserRequests/deleteController.js');

const API_PORT = 3000;

// get
app.get('/dessert', dessertController.getDessertData);
app.get('/entree', entreeController.getEntreeData);
app.get('/plat', platController.getPlatData);

app.get('/custom/base', customController.getBaseCustomData);
app.get('/custom/ingredient', customController.getIngredientCustomData);

// post
app.post('/create/user', postCreateUser)
app.post('/login', loginController.postLogin)
app.post('/create/command', postCreateCommand)

//delete
app.delete('/delete/user', deleteUser)

app.listen(API_PORT, () => {
    console.log('Server listening on port:', API_PORT);
});