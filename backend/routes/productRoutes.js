import express from 'express';
import {getProducts, getProductsById} from '../controllers/productController.js';


const router = express.Router();

// Fetch all Products

router.route('/').get(getProducts);

// Fetch Product by Id

router.route('/:id').get(getProductsById);

export default router;