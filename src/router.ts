import {Router} from 'express';
import { body } from 'express-validator';
import { handleInputErrors, handleInputs } from './modules/middleware';
import { getOneProduct, getProducts, createProduct, updateProduct, deleteProduct } from './handlers/product';
import { createOrder, deleteOrder, getOrders } from './handlers/order';
import {protect} from './modules/auth';


const router = Router();



/**
 * Product routes
 * 
 */

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)


/**
 * Admin Access
 */
router.post('/product', handleInputs('name','description', 'image','original_price' ,'current_price', 'savings' ), body('count').isInt(), handleInputErrors, createProduct)
router.put('/product/:id', handleInputs('current_price', 'savings'), handleInputErrors, updateProduct)
router.delete('/product/:id', deleteProduct)


/**
 * 
 * orders
 */

router.get('/order', protect, getOrders)
router.delete('/order/:id', protect, deleteOrder)
router.post('/order', protect, handleInputs('userId', 'productId'), body('completed').isBoolean(), handleInputErrors, createOrder)
export default router;