import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Watches = () => {

    const { products } = useContext(ShopContext);

    const [watch, setWatch] = useState([]);

    useEffect(() => {
        const watches = products.filter((item) => (item.subCategory === 'Watches'));
        setWatch(watches.slice(0, 10));
    }, [products])


    return (
        <div className='mb-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={''} text2={'WATCHES'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quasi iure culpa incidunt, cum nulla?
                </p>
            </div>

            {/* Rendering Products on Sale */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {watch.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default Watches
