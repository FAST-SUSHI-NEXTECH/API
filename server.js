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
app.use('/doc/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//get
const dessertController = require('./src/MenuRequests/dessertController.js');
const appetizerController = require('./src/MenuRequests/appetizerController.js');
const platController = require('./src/MenuRequests/platController.js')

const customController = require('./src/MenuRequests/customController.js');

const { getOrder } = require('./src/OrderRequests/orderController.js');
const { postOrderById } = require('./src/OrderRequests/getOrderByIdController.js');
const { getClient } = require('./src/AdminRequests/getClientController.js');
const { postPickerById } = require('./src/PickerRequests/getPickerById.js');
const { getAllProduct } = require('./src/MenuRequests/getAllProductsController.js');
const { getInfoUser } = require('./src/UserRequests/getInfoUserController.js');
const { getOrderStateByIdUser } = require('./src/OrderRequests/getOrderStateByIdUserController.js');

const { getLeaderboard } = require('./src/PickerRequests/getLeaderboardController.js');
const { getUserCount } = require('./src/AdminRequests/getCountUserController.js');





//post
const { postOrderDetails } = require('./src/OrderRequests/orderDetailsController.js')
const loginController = require('./src/UserRequests/loginController.js');
const { postCreateUser } = require('./src/UserRequests/createUserController.js');
const { postCreateOrder } = require('./src/OrderRequests/createOrderController.js');
const { postClientById } = require('./src/AdminRequests/getClientByIdController.js');
const { getProductById } = require('./src/MenuRequests/productByIdController.js');
const { postAvatarUser } = require('./src/UserRequests/addPictureController.js');
const { postProductImage } = require('./src/AdminRequests/addProductImageController.js');
const { postPickerByUsername } = require('./src/PickerRequests/getPickerByUsernameController.js');
const { getOrderByIdClient } = require('./src/OrderRequests/getOrderByIdClientController.js');
const { postCountOrderByIdPicker } = require('./src/PickerRequests/totalOrderByPickerIdController.js');



// put (update)
const { putStateOrder } = require('../API/src/OrderRequests/stateOrderController.js');
const { putIngredient } = require('./src/AdminRequests/putIngredientController.js');
const { putPickerToOrderById } = require('./src/OrderRequests/putPickerToOrderByIdController.js');
const { putUser } = require('./src/AdminRequests/updateUserController.js');



//delete
const { deleteUser } = require('./src/AdminRequests/deleteUserController.js');
const { deleteIngredient } = require('./src/AdminRequests/deleteIngredientController.js');

// need to change port for prod
const API_PORT = 3001;

// Apply the JWT middleware to routes that require admin authentication
app.use(['/user/delete', '/custom/ingredient/delete', '/user/client', '/custom/ingredient/update', '/product/upload/image', '/user/update', '/user/count'], verifyToken('admin'));
// Apply the JWT middleware to routes that require picker authentication
app.use(['/order/state/update', '/user/picker/id', '/order/all', '/order/picker/update', '/user/picker/username', '/user/picker/leaderboard', '/order/picker/count'], verifyToken('picker'));
// Apply the JWT middleware to routes that require user authentication
app.use(['/user/info','/order/create', '/order/details','/order/id','/user/client/id','/user/upload/avatar','/order/state', '/order/id/user'], verifyToken('user'));

// Redirect / to /home
app.get('/', (req, res) => {
    res.redirect('/doc/api');
});

// get
// doesn't get middleware ! Because we need these requests to retrieve data for 
app.get('/dessert', dessertController.getDessertData);
app.get('/appetizer', appetizerController.getAppetizerData);
app.get('/plate', platController.getPlatData);
app.get('/product', getAllProduct)
app.post('/product/id', getProductById)


app.get('/custom/base', customController.getBaseCustomData);
app.get('/custom/ingredient', customController.getIngredientCustomData);
// Stop here! (no middleware above us)

app.get('/order/all', getOrder)
app.get('/user/client', getClient)
app.get('/user/info', getInfoUser)
app.get('/order/id/user', getOrderByIdClient)
app.get('/user/count', getUserCount)


// picker get
app.get('/user/picker/leaderboard', getLeaderboard)


// post
app.post('/user/create', postCreateUser)
// doesn't get middleware ! Because we need this request to get the jwt token
app.post('/login', loginController.postLogin)
app.post('/order/create', postCreateOrder)
app.post('/order/details', postOrderDetails)
app.post('/order/id', postOrderById)
app.post('/user/client/id', postClientById)
app.post('/user/upload/avatar', postAvatarUser)
app.post('/product/upload/image', postProductImage)
app.post('/user/picker/username', postPickerByUsername)
app.post('/user/picker/id', postPickerById)
app.post('/order/state', getOrderStateByIdUser)
app.post('/order/picker/count', postCountOrderByIdPicker)

// put (UPDATE)
app.put('/order/state/update', putStateOrder)
app.put('/custom/ingredient/update', putIngredient)
app.put('/order/picker/update', putPickerToOrderById)
app.put('/user/update', putUser)

//delete
app.delete('/user/delete', deleteUser)
app.delete('/custom/ingredient/delete', deleteIngredient)

app.listen(API_PORT, () => {
    console.log('Server listening on port:', API_PORT);
});