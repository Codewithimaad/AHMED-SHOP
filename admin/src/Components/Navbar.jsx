// import { assets } from "../admin_assets/assets"
import { Link } from "react-router-dom"
import { GoDotFill } from "react-icons/go";

const Navbar = ({ setToken }) => {
    return (
        <div className="flex items-center py-3 px-2 sm:px-[48px] justify-between">
            <Link to='/' >
                <h1 className='text-2xl prata-regular text-black'>
                    AHMED
                    <span className='text-blue-500 font-medium prata-regular'>
                        SHOP
                        <GoDotFill className='inline-block' />
                    </span>
                </h1>
                <span className="prata-regular text-green-500 text-sm relative top-[-10px]">Admin Panel</span>
            </Link>
            <button onClick={() => setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm ">Logout</button>
        </div>
    )
}

export default Navbar
