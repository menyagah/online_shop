import {Router} from 'express';
import { handleInputErrors, handleInputs } from './modules/middleware';
import { getOneProduct, getProducts, createProduct, updateProduct, deleteProduct } from './handlers/product';
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
router.post('/product', handleInputs('name','description', 'image','original_price' ,'current_price', 'savings' ), handleInputErrors, createProduct)
router.put('/product/:id', handleInputs('current_price', 'savings'), handleInputErrors, updateProduct)
router.delete('/product/:id', deleteProduct)


/**
 * 
 * orders
 */

router.get('/order', ()=>{})
router.post('order/:id', ()=>{})
export default router;