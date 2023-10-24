const express = require('express');
const app = express();

const dessertController = require('./src/MenuRequests/dessertController.js');
const entreeController = require('./src/MenuRequests/entreeController.js');
const platController = require('./src/MenuRequests/platController.js')

const customController = require('./src/MenuRequests/customController.js');


const API_PORT = 3000;

app.get('/dessert', dessertController.getDessertData);
app.get('/entree', entreeController.getEntreeData);
app.get('/plat', platController.getPlatData);

app.get('/custom/base', customController.getBaseCustomData);
app.get('/custom/ingredient', customController.getIngredientCustomData);

app.listen(API_PORT, () => {
    console.log('Server listening on port:', API_PORT);
});