import express from 'express'
import { placedOrderCOD, placedOrderRazorpay, placedOrderStripe, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const orderRouter = express.Router();


// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);


// Payment Features
orderRouter.post('/place-cod', authUser, placedOrderCOD);
orderRouter.post('/place-stripe', authUser, placedOrderStripe);
orderRouter.post('/place-razorpay', authUser, placedOrderRazorpay);

// User Features
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter



