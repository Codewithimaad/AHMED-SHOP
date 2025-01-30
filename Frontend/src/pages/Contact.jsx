import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <div className='my-6'>
            <div className='text-center text-3xl py-2 mb-20'>
                <Title text1={'CONTACT'} text2={'US'} />
            </div>

            <div className='flex flex-wrap md:flex-nowrap gap-10 items-center w-full'>
                {/* left Side */}
                <div className='w-full'>
                    <img className='w-full h-full object-cover' src={assets.contact_img} alt="" />
                </div>


                {/* Right Side */}
                <div className='w-full text-gray-500 text-sm md:text-lg flex flex-col gap-8'>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-600 mb-5'>Our Store</h2>
                        <p>Board Bazar Brt Station</p>
                        <p className='mb-5'>Peshawar, Pakistan</p>

                        <p>Tel: (415) 555-0132</p>
                        <p>Email: admin@forever.com</p>
                    </div>

                    <div>
                        <h2 className='text-2xl tracking-wide font-bold text-gray-600 mb-5'>Careers at ShopEase</h2>
                        <p className='mb-8'>Learn more about our teams and job openings.</p>

                        <Link className='border border-gray-600 px-4 py-4 text-sm text-center text-black hover:bg-black hover:text-white transition-all ease-in-out'>Explore Jobs</Link>
                    </div>

                </div>

            </div>



        </div>
    )
}

export default Contact
