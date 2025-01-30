import React from 'react'

const AboutCard = ({ title, content }) => {
    return (
        <div className='w-full h-60 md:w-1/3 border border-gray-300 p-10 text-center flex flex-col justify-center items-center'>
            <p className='font-bold text-base text-gray-900 mb-2'>{title}</p>
            <p className='text-sm lg:text-1xl text-gray-500'>{content}</p>
        </div>
    )
}

export default AboutCard
