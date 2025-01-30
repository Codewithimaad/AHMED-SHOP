import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";
import { IoSearch, IoBagOutline } from "react-icons/io5";



const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logOut = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('');
        setCartItems({});
        toast.success('Logout Successfully')
    }


    return (
        <div className='flex items-center justify-between py-8 font-medium'>
            <div className='flex'>
                <Link to='/'>
                    <h1 className='text-base sm:text-2xl prata-regular'>
                        AHMED
                        <span className='text-blue-500 font-medium prata-regular'>
                            SHOP
                            <GoDotFill className='inline-block' />
                        </span>
                    </h1>
                </Link>

            </div>

            <ul className='hidden lg:flex gap-8 text-sm text-gray-700 items-center justify-center'>

                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p className='text-[15px] transition-all ease-in-out hover:text-blue-500'>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/collections' className='flex flex-col items-center gap-1'>
                    <p className='text-[15px] transition-all ease-in-out hover:text-blue-500'>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p className='text-[15px] transition-all ease-in-out hover:text-blue-500'>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p className='text-[15px] transition-all ease-in-out hover:text-blue-500'>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div>

            </div>

            <div className='flex items-center gap-6'>
                <p onClick={() => setShowSearch(true)} className='text-lg sm:text-2xl font-bold cursor-pointer transition-all ease-in-out hover:text-blue-600'><IoSearch /></p>
                <div className='group relative'>
                    <p onClick={() => token ? null : navigate('/login')} className='text-lg sm:text-2xl font-bold cursor-pointer transition-all ease-in-out hover:text-blue-600'><FaUser /></p>

                    {/* Dropdown Menu */}
                    {token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logOut} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }



                </div>
                {
                    token ? (
                        <Link to="/cart" className="relative">
                            <p src={assets.cart_icon} className='text-lg sm:text-2xl font-bold cursor-pointer transition-all ease-in-out hover:text-blue-600'><IoBagOutline /></p>
                            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded full text-[8px]">
                                {getCartCount()}
                            </p>
                        </Link>
                    ) : (
                        <div className="relative">
                            <p onClick={() => toast.error('Please login first to see your Cart')} className='text-lg sm:text-2xl font-bold cursor-pointer transition-all ease-in-out hover:text-blue-600'><IoBagOutline /></p>
                            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded full text-[8px] cursor-pointer">0</p>
                        </div>
                    )
                }


                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer lg:hidden' alt="" />
            </div>
            {/* Sidebar Menu For Mobile Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border hover:bg-black hover:text-white' >HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collections' className='py-2 pl-6 border hover:bg-black hover:text-white' >COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border hover:bg-black hover:text-white' >ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border hover:bg-black hover:text-white' >CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
