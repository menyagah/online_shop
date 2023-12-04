"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleware_1 = require("./modules/middleware");
var product_1 = require("./handlers/product");
var order_1 = require("./handlers/order");
var auth_1 = require("./modules/auth");
var router = (0, express_1.Router)();
/**
 * Product routes
 *
 */
router.get('/product', product_1.getProducts);
router.get('/product/:id', product_1.getOneProduct);
/**
 * Admin Access
 */
router.post('/product', (0, middleware_1.handleInputs)('name', 'description', 'image', 'original_price', 'current_price', 'savings'), (0, express_validator_1.body)('quantity').isInt(), middleware_1.handleInputErrors, product_1.createProduct);
router.put('/product/:id', (0, middleware_1.handleInputs)('current_price', 'savings'), middleware_1.handleInputErrors, product_1.updateProduct);
router.delete('/product/:id', product_1.deleteProduct);
/**
 *
 * orders
 */
router.get('/order', auth_1.protect, order_1.getOrders);
router.delete('/order/:id', auth_1.protect, order_1.deleteOrder);
router.post('/order', auth_1.protect, (0, middleware_1.handleInputs)('userId', 'productId'), (0, express_validator_1.body)('completed').isBoolean(), middleware_1.handleInputErrors, order_1.createOrder);
exports.default = router;
//# sourceMappingURL=router.js.map