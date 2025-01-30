import React from 'react'
import Title from './Title'

const DeliveryNote = ({ style }) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-2xl mb-3 text-center'>
                <Title text1={'DELIVERY'} text2={'NOTE'} />
            </div>
            <div className='border-gray-200 bg-gray-100 w-full md:w-[450px] border p-6'>
                <p className='text-sm text-gray-700'>We are delighted to provide free delivery on orders exceeding 5000, ensuring added value and convenience for our customers. Shop now and take advantage of this exclusive offer.</p>
            </div>
        </div>
    )
}

export default DeliveryNote
