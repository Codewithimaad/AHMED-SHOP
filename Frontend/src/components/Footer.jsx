import React from 'react'
import { GoDotFill } from "react-icons/go";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='mt-52'>

            <div className='w-full border-b-2 border-gray-200 h-1'></div>

            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>

                <div>
                    <div className='flex'>
                        <Link to='/'>
                            <h1 className='text-2xl prata-regular'>
                                AHMED
                                <span className='text-blue-500 font-medium prata-regular'>
                                    SHOP
                                    <GoDotFill className='inline-block' />
                                </span>
                            </h1>
                        </Link>
                    </div>

                    <p className="w-full md:w-2/3 text-gray-500">
                        Welcome to our shop, your one-stop destination for all your lifestyle needs! Explore our exclusive collection of stylish clothing for men, women, and kids, designed to cater to every season and occasion. Indulge in our premium range of perfumes, crafted to leave a lasting impression, and discover elegant watches that combine timeless design with modern functionality. Whether you're looking for daily essentials or luxurious bundles, we have something special for everyone. Shop now and elevate your style with our carefully curated products!
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+92 3167865435</li>
                        <li>contact@shopease.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ ShopEase.com - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer
