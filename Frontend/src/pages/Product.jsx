import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, navigate } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                return null;
            }
        });
    };


    const handleAddToCart = () => {
        addToCart(productData._id, size, productData.subCategory);
        if (!size) {
            return null
        }
        else {
            navigate('/cart');
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    // Categories that do not require size selection
    const noSizeRequiredCategories = ['Perfumes', 'Watches', 'Jewellery', 'BodySpray'];
    const shouldDisplaySize = !noSizeRequiredCategories.includes(productData?.subCategory);

    return productData ? (
        <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer'
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' alt="" />
                    </div>
                </div>

                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>
                        {productData.salePrice ? (
                            <>
                                <span className='line-through text-gray-400 ml-2'>{currency}{productData.price}</span>
                                <span className='text-black ml-2'>{currency}{productData.salePrice}</span>
                            </>
                        ) : (
                            `${currency}${productData.price}`
                        )}
                    </p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

                    {/* Conditionally show size selection */}
                    {shouldDisplaySize && (
                        <div className='flex flex-col gap-4 my-8'>
                            <p>Select Size</p>
                            <div className='flex gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                                        key={index}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className='bg-black mt-5 text-white px-8 py-3 text-sm active:bg-gray-700'
                    >
                        ADD TO CART
                    </button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original Product</p>
                        <p>Cash on delivery on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reprehenderit eius repudiandae consequuntur voluptatem veritatis, quo quibusdam reiciendis, fuga fugit, beatae aliquam optio voluptatibus doloremque! Corrupti quos pariatur alias enim consectetur voluptates necessitatibus dolor, harum et praesentium distinctio.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quos dolor facilis ipsum illum nesciunt alias impedit ipsam, cumque et, repellat officia dolorum illo ab doloremque, animi iure est vel assumenda. Repudiandae aut consequuntur dolorem eligendi nobis repellat quaerat aliquid.</p>
                </div>
            </div>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className='opacity-0'></div>;
};

export default Product;
