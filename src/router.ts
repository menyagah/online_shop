import {Router} from 'express';


const router = Router();


/**
 * Product routes
 */
router.get('/product', (req, res)=>{
    res.json({message: 'books'});
})
router.get('/product/:id', ()=>{})
router.post('/product', ()=>{})
router.delete('/product/:id', ()=>{})

export default router;