import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);

    const [orderData, setOrderData] = useState([]);


    const loadOrderData = async () => {
        try {

            if (!token) {
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['orderId'] = order._id; // Store order ID for cancellation
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item);
                    })
                })
                setOrderData(allOrdersItem.reverse());

            }


        }
        catch (error) {
            console.log(error);

        }
    }

    // Cancel Order Function
    const cancelOrder = async (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${backendUrl}/api/order/cancelorder`, { orderId }, { headers: { token } });

                    if (response.data.success) {
                        Swal.fire("Canceled!", "Your order has been canceled.", "success");
                        setOrderData(orderData.filter(order => order.orderId !== orderId)); // Remove canceled order
                    } else {
                        Swal.fire("Error!", "Failed to cancel order!", "error");
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire("Error!", "Something went wrong!", "error");
                }
            }
        });
    };



    useEffect(() => {
        loadOrderData();
    }, [token])



    return orderData && orderData.length > 0 ? (
        <div className="border-t pt-16">
            <div className="text-2xl">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {orderData.map((item, index) => (
                    <div
                        key={index}
                        className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >
                        <div className="flex items-start gap-6 text-sm">
                            <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                            <div>
                                <p className="sm:text-base font-medium">{item.name}</p>
                                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                    <p>
                                        {currency}
                                        {item.price}
                                    </p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className="mt-2">
                                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                                </p>
                                <p className="mt-1">
                                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                                </p>
                            </div>
                        </div>

                        <div className="md:w-1/2 flex justify-between">
                            <div className="flex items-center gap-2">
                                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                                <p className="text-sm md:text-base">{item.status}</p>
                            </div>

                            <button onClick={loadOrderData} className="border px-4 h-8 rounded-sm text-sm leading-none hover:bg-black hover:text-white transition-all ease-in">
                                Track Order
                            </button>

                            {item.status === 'Packing' || item.status === 'Shipped' || item.status === 'Out for Delivery' || item.status === 'Delivered' ? (
                                <button
                                    onClick={() => toast.warning(`You can't cancel the order right now because it is already ${item.status}`)}
                                    className="border px-4 h-8 rounded-sm text-sm leading-none hover:bg-gray-500 hover:text-white transition-all ease-in"
                                >
                                    Cancel Order
                                </button>
                            ) : (
                                <button
                                    onClick={() => cancelOrder(item.orderId)}
                                    className="border px-4 h-8 rounded-sm text-sm leading-none hover:bg-red-500 hover:text-white transition-all ease-in"
                                >
                                    Cancel Order
                                </button>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div className="w-full max-w-lg lg:max-w-sm mx-auto text-center p-5 mt-10">
            {/* No Orders Icon */}
            <div className="flex justify-center items-start mb-5">
                <span className="text-8xl text-red-500">
                    <ImCross />
                </span>
            </div>

            {/* No Orders Message */}
            <div className="flex justify-center items-start mb-5">
                <p className="text-4xl font-medium leading-snug">NO ORDERS FOUND.</p>
            </div>

            <p className="text-sm text-gray-600">
                You have not placed any orders yet. Browse our collection and place your first order today!
            </p>

            {/* Go to Collections Button */}
            <div className="flex justify-center items-start mt-10">
                <Link to="/collections">
                    <p className="text-center text-sm sm:text-base w-full max-w-xs sm:w-52 rounded-full bg-black py-2 px-4 text-white font-bold transition-all ease-in hover:bg-gray-800">
                        Explore Collections ➜
                    </p>
                </Link>
            </div>
        </div>
    )
};

export default Orders;




