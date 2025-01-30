import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify'
import { assets } from '../admin_assets/assets';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);


    const fetchAllOrders = async () => {

        if (!token) {
            return null;
        }

        try {

            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });

            if (response.data.success) {
                setOrders(response.data.orders.reverse());
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const statusHandler = async (e, orderId) => {
        try {

            const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: e.target.value }, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchAllOrders();
            }

        }
        catch (error) {
            console.log(error);
            toast.error(response.data.message)
        }

    }


    useEffect(() => {
        fetchAllOrders();
    }, [token])



    return (
        <div>
            <h3>Order Page</h3>
            <div>
                {
                    orders.map((order, index) => (
                        <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                            <img className='w-12' src={assets.parcel_icon} alt="" />
                            <div>

                                <div>
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return <div key={index}>
                                                    <p className='py-0.5 font-semibold' > {item.name}</p>
                                                    <p>Quantity: <span className='font-semibold text-sm'>{item.quantity}</span></p>
                                                    <p>Size: <span className='font-semibold text-sm'>{item.size}</span></p>
                                                </div>
                                            }
                                            else {
                                                return <div key={index}>
                                                    <p className='py-0.5 font-semibold' > {item.name}</p>
                                                    <p>Quantity: <span className='font-semibold text-sm'>{item.quantity}</span></p>
                                                    <p>Size: <span className='font-semibold text-sm'>{item.size}</span></p>
                                                </div>
                                            }
                                        })
                                    }
                                </div>
                                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div>
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + ", " + order.address.province + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                </div>
                                <p>{order.address.phone}</p>
                            </div>
                            <div>
                                <p className='text-sm sm:text-[15px]'>Items: <span className='font-semibold'>{order.items.length}</span></p>
                                <p className='mt-3 '>Method: <span className='font-semibold'>{order.paymentMethod}</span></p>
                                <p className='mt-2'>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                <p className='mt-2'>Date: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <p className='text-sm sm:text-[15px]'><span className='font-bold'>{currency}{order.amount}</span></p>
                            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="OrderPlaced">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>

                    ))
                }
            </div>
        </div >
    )
}

export default Orders
