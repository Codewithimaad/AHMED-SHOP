import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import AboutCard from '../components/AboutCard'

const About = () => {
    return (
        <div className='my-6'>
            <div className='text-center text-3xl py-2 mb-10'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12 w-full'>
                <div className='w-full'>
                    <img src={assets.about_img} alt="" className='w-full h-full object-cover' />
                </div>

                <div className='text-start text-gray-500 text-sm md:text-base w-full'>
                    <p className='mb-5'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>

                    <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>

                    <p className='text-1xl font-bold text-gray-700 mt-5'>Our Mission</p>

                    <p className='mt-5'>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
                </div>
            </div>

            <div className='text-start text-2xl py-2 mb-10 mt-10'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-row flex-wrap justify-center md:gap-5 lg:gap-0'>
                <AboutCard title={'Quality Assurance:'} content={'We meticulously select and vet each product to ensure it meets our stringent quality standards.'} />

                <AboutCard title={'Convenience:'} content={'With our user-friendly interface and hassle-free ordering process, shopping has never been easier.'} />

                <AboutCard title={'Exceptional Customer Service'} content={'Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.'} />

            </div>
        </div>
    )
}

export default About
