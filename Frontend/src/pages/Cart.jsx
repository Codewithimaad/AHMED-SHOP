import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartTotal from '../components/CartTotal'
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import DeliveryNote from '../components/DeliveryNote'


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


    return (
        <div className='border-t pt-14'>

            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {
                cartData && cartData.length > 0 ? (
                    <div>
                        <div className=''>
                            {
                                cartData.map((item, index) => {

                                    const productData = products.find((product) =>
                                        product._id === item._id);

                                    return (

                                        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                                            <div className='flex items-start gap-6'>
                                                <img className='w-16 sm:w-20 ' src={productData.image[0]} alt="" />
                                                <div>
                                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                                    <div className='flex items-center gap-5 mt-5'>
                                                        <p>{currency}{productData.price}</p>
                                                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-200'>{item.size}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-2' type="number" min={1} defaultValue={item.quantity} />
                                            <p onClick={() => updateQuantity(item._id, item.size, 0)} className='text-2xl mr-4 cursor-pointer transition-all ease-in-out hover:text-blue-500 '><AiFillDelete />
                                            </p>
                                        </div>

                                    )

                                })
                            }
                        </div>

                        <div className='flex flex-col-reverse lg:flex-row justify-between gap-5 my-20'>
                            <div className='w-full sm:w-[450px] mt-8 sm:mt-0'>
                                <DeliveryNote />
                            </div>

                            <div className='w-full sm:w-[450px]'>
                                <CartTotal />
                            </div>


                        </div>

                        <div className='w-full text-end'>
                            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-2 px-8 py-3'>PROCEED TO CHECKOUT</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='w-full border border-gray-100 py-2 bg-gray-200'>
                            <p className='text-center text-gray-600 font-semibold '>Your Cart is Empty please add some Products.</p>
                        </div>
                        <div>
                            <Link to='/collections'>
                                <p className='text-center w-full sm:w-52 bg-black py-2 text-white font-bold mt-10 transition-all ease-in hover:bg-gray-800'>Go to Collections  ➜
                                </p>
                            </Link>
                        </div>
                    </div>


                )
            }




        </div>
    )
}

export default Cart
