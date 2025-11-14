const Order = require('../../models/order.model')


const getAllOrdersOfAdmin = async(req,res)=>{

    try {

        const orders = await Order.find({})

        if(!orders.length){
            return res.status(404).json({
                success: false,
                message: 'No se encontraron ordenes de compra'
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio algun error'
        })
        
    }
}

const getOrdersDetailsForAdmin = async(req,res)=>{
    try {
        const {id} = req.params;
        const order = await Order.findById(id)
        console.log(order, 'orden detalle')

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'No se encontro la orden de compra'
            })
        }

        res.status(200).json({
            success: true,
            data: order,
        })

    } catch(error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio algun error'
        })
        
    }
}

const updateOrderStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro el pedido'
            })
        } 

        await Order.findByIdAndUpdate(id,{orderStatus})

            res.status(200).json({
            success: true,
            message: 'El estado del pedido se actualizo correctamente',
        })
    

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio algun error'
        })
    }
}

module.exports = {getAllOrdersOfAdmin, getOrdersDetailsForAdmin, updateOrderStatus}