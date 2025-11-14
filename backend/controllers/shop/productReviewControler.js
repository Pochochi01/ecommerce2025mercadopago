const Order = require('../../models/order.model');
const Product = require('../../models/product.model');
const ProductReview = require('../../models/reviews.model')


const addProductReview =  async(req,res)=>{
    try {
        const {productId, userId, userName, reviewMessage, reviewValue} = req.body
        const order = await Order.findOne({
            userId,
            'cartItems.productId' : productId,
            orderStatus: 'confirmed'
        })
        if(!order){
            return res.status(403).json({
                success: false,
                message:'Necesitas comprar un producto para poder reseñarlo!!'
            })
        }

        const checkExistingReview = await ProductReview.findOne({productId, userId})

        if(checkExistingReview){
            return res.status(400).json({
                success: false,
                message: 'El usuario ya escribio una reseña del producto'
            })
        }

        const newReview = new ProductReview({
            productId, userId, userName,
        })

        await newReview.save();

        const reviews = await ProductReview.find({productId});
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem)=> sum + reviewItem.reviewValue,0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId,{averageReview});

        res.status(201).json({
            success: true,
            data: newReview
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agregar comentario'
        })
    }
}


const getProductReview =  async(req,res)=>{
    try {
        
        const {productId} = req.params;
        const reviews = await ProductReview.find({productId});
        
        res.status(200).json({
            success: true,
            data: reviews
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al solicitar comentario'
        })
    }
}

module.exports = {addProductReview, getProductReview} 