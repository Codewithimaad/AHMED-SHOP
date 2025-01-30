import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, salePrice }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden w-full h-44 flex items-center justify-center">
                <img
                    className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
                    src={image[0]}
                    alt={name}
                />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <div className="text-sm font-medium">
                {salePrice ? (
                    <div>
                        <span className="line-through text-gray-500 mr-2">{currency} {price}</span>
                        <span className="text-black">{currency} {salePrice}</span>
                    </div>
                ) : (
                    <span>{currency} {price}</span>
                )}
            </div>
        </Link>
    );
};

export default ProductItem;
