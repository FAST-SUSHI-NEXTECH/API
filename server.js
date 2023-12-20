const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/HomePage/swaggerConfig.js');
const { verifyToken } = require('./src/jwtChecker.js');

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Documentation
app.use('/home', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//get
const dessertController = require('./src/MenuRequests/dessertController.js');
const appetizerController = require('./src/MenuRequests/appetizerController.js');
const platController = require('./src/MenuRequests/platController.js')

const customController = require('./src/MenuRequests/customController.js');

const { getOrder } = require('./src/OrderRequests/orderController.js');
const { postOrderById } = require('./src/OrderRequests/getOrderByIdController.js');
const { getClient } = require('./src/AdminRequests/getClientController.js');
const { postPickerById } = require('./src/UserRequests/getPickerById.js');
const { getAllProduct } = require('./src/MenuRequests/getAllProductsController.js');


//post
const { postOrderDetails } = require('./src/OrderRequests/orderDetailsController.js')
const loginController = require('./src/UserRequests/loginController.js');
const { postCreateUser } = require('./src/UserRequests/createUserController.js');
const { postCreateOrder } = require('./src/OrderRequests/createOrderController.js');
const { generateTokenRequest } = require('./src/AdminRequests/token.js'); 
const { postClientById } = require('./src/AdminRequests/getClientByIdController.js');



// put (update)
const { putStateOrder } = require('../API/src/OrderRequests/stateOrderController.js');
const { putIngredient } = require('./src/AdminRequests/putIngredientController.js');


//delete
const { deleteUser } = require('./src/AdminRequests/deleteUserController.js');
const { deleteIngredient } = require('./src/AdminRequests/deleteIngredientController.js');

const API_PORT = 3000;

// Apply the JWT middleware to routes that require authentication
app.use(['/user/delete', '/custom/ingredient/delete', '/user/client', '/custom/ingredient/update'], verifyToken);

// get
app.get('/dessert', dessertController.getDessertData);
app.get('/appetizer', appetizerController.getAppetizerData);
app.get('/plate', platController.getPlatData);
app.get('/product', getAllProduct)

app.get('/custom/base', customController.getBaseCustomData);
app.get('/custom/ingredient', customController.getIngredientCustomData);

app.get('/order', getOrder)
app.get('/user/client', getClient)
app.post('/user/picker/id', postPickerById)


// post
app.post('/user/create', postCreateUser)
app.post('/login', loginController.postLogin)
app.post('/order/create', postCreateOrder)
app.post('/order/details', postOrderDetails)
app.post('/token', generateTokenRequest);
app.post('/order/id', postOrderById)
app.post('/user/client/id', postClientById)

// put (UPDATE)
app.put('/order/state/update', putStateOrder)
app.put('/custom/ingredient/update', putIngredient)

//delete
app.delete('/user/delete', deleteUser)
app.delete('/custom/ingredient/delete', deleteIngredient)

app.listen(API_PORT, () => {
    console.log('Server listening on port:', API_PORT);
});