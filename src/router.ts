import {Router} from 'express';
import { body, validationResult } from "express-validator";
import { handleInputErrors, handleInputs } from './modules/middleware';


const router = Router();


/**
 * Product routes
 * 
 */
router.get('/product', (req, res)=>{})
router.get('/product/:id', ()=>{})
router.post('/product', handleInputs('name','description', 'image', 'current_price', 'savings' ), handleInputErrors, (req, res)=>{})
router.put('/product/:id', handleInputs('current_price', 'savings'), handleInputErrors, (req, res) => {
})
router.delete('/product/:id', ()=>{})


/**
 * 
 * orders
 */

router.get('/order', ()=>{})
router.post('order/:id', ()=>{})
export default router;