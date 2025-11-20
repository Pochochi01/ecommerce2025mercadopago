const Order = require('../../models/order.model');
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const {MercadoPagoConfig, Preference} = require("mercadopago");


const createOrder = async (req, res) => {

    const mercadoPago = new MercadoPagoConfig({
        accessToken:'APP_USR-7127313862060433-090914-ad385fc625344ac34978fead21475333-2682535062'
    })


  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    const items = cartItems.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));

    const preference =  await new Preference(mercadoPago).create({
    body:{
      items,
      back_urls: {
        success: "https://sendasalud.cloud/shop/mercadoPagoReturn",
        failure: "http://sendasalud.cloud/shop/mercadopago-failure",
        pending: "http://sendasalud.cloud/shop/mercadopago-pending",
      },
      auto_return: "approved",
      external_reference: userId,
      //notification_url:"https://1567a1d0bd88.ngrok-free.app/mercadoPagoReturnel"
    }});
 
    console.log('Preferencia creada : ', preference)
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId: null,
      payerId: null,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: preference.init_point,
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error al crear la preferencia de MercadoPago",
    });
  }
};


const capturePayment = async (req, res) => {
  try {
    const { paymentId, /*payerId,*/ orderId } = req.body;
    let order = await Order.findById(orderId);
    if (!orderId) {
      return res.status(404).json({
        success: false,
        message: "Orden de Compra no encontrada",
      });
    }

    order.paymentStatus = "Pagado";
    order.orderStatus = "Confirmado";
    order.paymentId = paymentId;
    /*order.payerId = payerId;*/

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Sin Stock suficiente para este producto: ${product.title}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();
    res.status(200).json({
      success: true,
      message: "Orden Confirmada",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ocurrio un error",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron ordenes de compra",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ocurrio algun error",
    });
  }
};

const getOrdersDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No se encontro la orden de compra",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ocurrio algun error",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrdersDetail,
};
