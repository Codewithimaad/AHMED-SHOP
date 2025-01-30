import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
// import Stripe from 'stripe';


// Global variables
const currency = 'pkr'
// const deliveryCharge = 50


// Gateway initilize
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



// Placing Order using Stripe method
const placedOrderStripe = async (req, res) => {
    try {

        const { userId, items, address, amount } = req.body;

        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        const savedOrder = await newOrder.save(); // Wait for the save() method to complete

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${savedOrder._id}`, // Use the savedOrder object
            cancel_url: `${origin}/verify?success=false&orderId=${savedOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// Placing Order using COD method
const placedOrderCOD = async (req, res) => {

    try {

        const { userId, items, address, amount } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        res.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



// Placing Order using Razorpay method
const placedOrderRazorpay = async (req, res) => {

}

// All Orders for admin Panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});
        res.json({ success: true, orders })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// User Order Data for frontend Specific User
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update Order status from admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated Successfully" })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { placedOrderCOD, placedOrderStripe, placedOrderRazorpay, allOrders, userOrders, updateStatus }