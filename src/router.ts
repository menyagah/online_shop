import {Router} from 'express';
import { body, validationResult } from "express-validator";
import { handleInputErrors, handleInputs } from './modules/middleware';


const router = Router();


/**
 * Product routes
 * 
 */
router.get('/product', (req, res)=>{
    res.json({message: 'books'});
})
router.get('/product/:id', ()=>{})
router.post('/product', (req, res)=>{
    res.json({
        "message": "it works"
    })
})
router.put('/product/:id', handleInputs('current_price', 'savings'), handleInputErrors, (req, res) => {
})
router.delete('/product/:id', ()=>{})

export default router;