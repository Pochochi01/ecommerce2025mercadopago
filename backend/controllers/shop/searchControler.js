const Product = require('../../models/product.model');



const searchProducts = async(req,res) =>{
    try {
        const {keyword} = req.params;
        console.log(keyword,'buscar productos')
        if(!keyword || typeof keyword !== 'string'){
            return res.status(400).json({
                success:false,
                message:'Debe ingresar un producto. Solo caracteres'
            })
        }

        const regEx = new RegExp(keyword, 'i');

        const createSearchQuery = {
            $or : [
                {title: regEx},
                {description: regEx},
                {category: regEx},
                {brand: regEx},
            ]
        }

        const searchResults = await Product.find(createSearchQuery);

        res.status(200).json({
            success: true,
            data: searchResults,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Producto no encontrado'
        })
    }
}

module.exports = {searchProducts}