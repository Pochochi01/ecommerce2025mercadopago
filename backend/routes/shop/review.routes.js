const express = require('express');

const{addProductReview, getProductReview} = require('../../controllers/shop/productReviewControler')

const router = express.Router();

router.post('/add', addProductReview)
router.get('/:productId', getProductReview)

module.exports = router;
