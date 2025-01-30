import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProduct, setFilterProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [season, setSeason] = useState([]);
    const [sortType, setSortType] = useState('relavent');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSeasonCategory = (e) => {
        if (season.includes(e.target.value)) {
            setSeason(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSeason(prev => [...prev, e.target.value])
        }
    }



    const applyFilter = () => {

        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
        }
        if (season.length > 0) {
            productsCopy = productsCopy.filter(item => season.includes(item.season))
        }

        setFilterProduct(productsCopy);

    }


    const sortProduct = () => {

        let fpCopy = filterProduct.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProduct(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterProduct(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyFilter();
                break;
        }
    }


    useEffect(() => {
        applyFilter();
    }, [category, subCategory, season, search, showSearch, products])

    useEffect(() => {
        sortProduct();
    }, [sortType]);



    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter Options */}
            <div className='min-w-60 md:sticky md:top-0 md:max-h-screen mb-14'>
                <p className='my-2 text-xl text-start gap-2 cursor-pointer '>FILTERS
                    <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} onClick={() => setShowFilter(!showFilter)} />
                </p>
                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} /> Kids
                        </p>
                    </div>
                </div>

                {/* Season Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>SEASON</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Winter'} onChange={toggleSeasonCategory} /> Winter
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Summer'} onChange={toggleSeasonCategory} /> Summer
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Winter/Summer'} onChange={toggleSeasonCategory} /> Winter/Summer
                        </p>
                    </div>
                </div>

                {/* Sub Categories Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Sale'} onChange={toggleSubCategory} /> Sale
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Shirts'} onChange={toggleSubCategory} /> Shirts
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Trousers'} onChange={toggleSubCategory} /> Trousers
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Jewellery'} onChange={toggleSubCategory} /> Jewellery
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'BodySpray'} onChange={toggleSubCategory} /> BodySpray
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Perfumes'} onChange={toggleSubCategory} /> Perfumes
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Watches'} onChange={toggleSubCategory} /> Watches
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Bundles'} onChange={toggleSubCategory} /> Bundles
                        </p>

                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1 sm:overflow-y-auto'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/* Product Sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className='border border-gray-300 text-sm px-2 sm:w-1/2 md:w-1/3 lg:w-1/4'
                    >
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div
                    className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
                >
                    {filterProduct.map((item, index) => (
                        <ProductItem
                            key={index}
                            name={item.name}
                            id={item._id}
                            price={item.price}
                            salePrice={item.salePrice} // Pass salePrice if available
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collection
