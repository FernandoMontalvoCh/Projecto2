const express = require('express');

// Middlewares
const {
  userExists,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validators.middlewares');

const { productExists } = require('../middlewares/products.middlewares');
const { orderExists } = require('../middlewares/orders.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
  getUserProducts,
  getUserOrders,
  getUserOrderById,
} = require('../controllers/users.cotroller');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidations, checkValidations, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter.get('/me', productExists, getUserProducts);

usersRouter.get('/orders', orderExists, getUserOrders);

usersRouter.get('/orders/:id', orderExists,  getUserOrderById);

usersRouter.get('/check-token', checkToken);

usersRouter
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter };
