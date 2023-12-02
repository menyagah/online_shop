"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * Product routes
 *
 */
router.get('/product', function (req, res) {
    res.json({ message: 'books' });
});
router.get('/product/:id', function () { });
router.post('/product', function () { });
router.delete('/product/:id', function () { });
exports.default = router;
//# sourceMappingURL=router.js.map