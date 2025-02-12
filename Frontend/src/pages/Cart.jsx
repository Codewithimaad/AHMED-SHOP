import Title from '../components/Title'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom'
import DeliveryNote from '../components/DeliveryNote'
import { BsCartX } from "react-icons/bs";
import { toast } from 'react-toastify';



const Cart = () => {

    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {

        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })
                    }
                }
            }

            setCartData(tempData);
        }



    }, [cartItems, products])


    return cartData && cartData.length > 0 ? (
        <div className="border-t pt-14">
            {/* Cart Title */}
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            {/* Cart Items */}
            <div>
                <div>
                    {cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div
                                key={index}
                                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                {/* Product Image & Details */}
                                <div className="flex items-start gap-6">
                                    {productData && (
                                        <>
                                            <img
                                                className="w-16 sm:w-20"
                                                src={productData.image?.[0] || "/placeholder.jpg"}
                                                alt={productData.name || "Product"}
                                            />
                                            <div>
                                                <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                                                <div className="flex items-center gap-5 mt-5">
                                                    <p>{currency}{productData.price}</p>
                                                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-200">{item.size}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Quantity Input */}
                                <input
                                    onChange={(e) =>
                                        e.target.value === "" || e.target.value === "0"
                                            ? null
                                            : updateQuantity(item._id, item.size, Number(e.target.value))
                                    }
                                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-2"
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />

                                {/* Delete Item */}
                                <p
                                    onClick={() => {
                                        updateQuantity(item._id, item.size, 0);
                                        toast.success('Item removed from cart!')
                                    }}
                                    className="text-2xl mr-4 cursor-pointer transition-all ease-in-out hover:text-blue-500"
                                >
                                    <AiFillDelete />
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Cart Summary & Checkout */}
                <div className="flex flex-col-reverse lg:flex-row justify-between gap-5 my-20">
                    {/* Delivery Note */}
                    <div className="w-full sm:w-[450px] mt-8 sm:mt-0">
                        <DeliveryNote />
                    </div>

                    {/* Cart Total */}
                    <div className="w-full sm:w-[450px]">
                        <CartTotal />
                    </div>
                </div>

                {/* Proceed to Checkout Button */}
                <div className="w-full text-end">
                    <button
                        onClick={() => navigate("/place-order")}
                        className="bg-black text-white text-sm my-2 px-8 py-3"
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full max-w-lg lg:max-w-sm mx-auto text-center p-5 mt-10">
            {/* Empty Cart Icon */}
            <div className="flex justify-center items-start mb-5">
                <span className="text-8xl">
                    <BsCartX />
                </span>
            </div>

            {/* Empty Cart Message */}
            <div className="flex justify-center items-start mb-5">
                <p className="text-4xl font-medium leading-snug">YOUR CART IS EMPTY.</p>
            </div>


            <p className="text-sm text-gray-600">
                Before proceeding to checkout, you must add some products to your shopping cart.
                You will find a lot of interesting products on our 'Collection' page.
            </p>

            {/* Go to Collection Button */}
            <div className="flex justify-center items-start mt-10">
                <Link to="/collections">
                    <p className="text-center text-sm sm:text-base w-full max-w-xs sm:w-52 rounded-full bg-black py-2 px-4 text-white font-bold transition-all ease-in hover:bg-gray-800">
                        Go to Collections ➜
                    </p>
                </Link>
            </div>
        </div>
    );

}

export default Cart