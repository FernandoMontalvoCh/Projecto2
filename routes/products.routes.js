const express = require('express');

// Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');
const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require('../controllers/categories.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const {
  createProductValidations,
  checkValidations,
} = require('../middlewares/validators.middlewares');
const {
  protectProductOwner,
  productExists,
} = require('../middlewares/products.middlewares');

// Utils
const { upload } = require('../utils/multer.util');

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);

productsRouter.get('/categories', getAllCategories);

productsRouter.get('/:id', productExists, getProductById);

productsRouter.use(protectSession);

productsRouter.post(
  '/',
  upload.array('productImgs', 5),
  createProductValidations,
  checkValidations,
  createProduct
);

productsRouter.post('/categories', createCategory);

productsRouter.patch('/categories/:id', updateCategory);

productsRouter
  .use('/:id', productExists)
  .route('/:id')
  .patch(protectProductOwner, updateProduct)
  .delete(protectProductOwner, deleteProduct);

module.exports = { productsRouter };
