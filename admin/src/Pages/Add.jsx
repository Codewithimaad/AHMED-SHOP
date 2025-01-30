import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../admin_assets/assets';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [bestSeller, setBestSeller] = useState(false);
    const [season, setSeason] = useState('');
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Validate sale price
        if (salePrice && Number(salePrice) >= Number(price)) {
            toast.error('Sale price must be less than the original price.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('salePrice', salePrice);
            formData.append('season', season);
            formData.append('category', category);
            formData.append('subCategory', subCategory);
            formData.append('bestSeller', bestSeller);
            formData.append('sizes', sizes);

            image1 && formData.append('image1', image1);
            image2 && formData.append('image2', image2);
            image3 && formData.append('image3', image3);
            image4 && formData.append('image4', image4);

            const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setSalePrice('');
                setCategory('');
                setSubCategory('');
                setSeason('');
                setBestSeller(false);
                setSizes([]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Something went wrong!');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div>
                <p className="mb-2">Upload Images</p>
                <div className="flex gap-2">
                    {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
                        <label htmlFor={`image${index + 1}`} key={index}>
                            <img
                                className="w-20"
                                src={!eval(`image${index + 1}`) ? assets.upload_area : URL.createObjectURL(eval(`image${index + 1}`))}
                                alt=""
                            />
                            <input
                                type="file"
                                id={`image${index + 1}`}
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Type Here"
                    required
                />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full max-w-[500px] px-3 py-2"
                    placeholder="Write content here"
                    required
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full px-3 py-2"
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {['Men', 'Women', 'Kids'].map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className="mb-2">Season Category</p>
                    <select
                        onChange={(e) => setSeason(e.target.value)}
                        value={season}
                        className="w-full px-3 py-2"
                        required
                    >
                        <option value="" disabled>
                            Select Season
                        </option>
                        {['Winter', 'Summer', 'Winter/Summer'].map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>



                <div>
                    <p className="mb-2">Sub Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        value={subCategory}
                        className="w-full px-3 py-2"
                        required
                    >
                        <option value="" disabled>
                            Select Sub Category
                        </option>
                        {[
                            'Topwear',
                            'Bottomwear',
                            'Winterwear',
                            'Summerwear',
                            'Winter/Summer',
                            'Shirts',
                            'Jewellery',
                            'Watches',
                            'Sale',
                            'Trousers',
                            'BodySpray',
                            'Perfumes',
                            'Bundles',
                        ].map((sub) => (
                            <option key={sub} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className="mb-2">Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-3 py-2 sm:w-[120px]"
                        type="number"
                        placeholder="Price"
                        required
                    />
                </div>

                <div>
                    <p className="mb-2">Sale Price</p>
                    <input
                        onChange={(e) => setSalePrice(e.target.value)}
                        value={salePrice}
                        className="w-full px-3 py-2 sm:w-[120px]"
                        type="number"
                        placeholder="Sale Price"
                    />
                </div>
            </div>

            <div>
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prevSizes) =>
                                    prevSizes.includes(size)
                                        ? prevSizes.filter((item) => item !== size)
                                        : [...prevSizes, size]
                                )
                            }
                        >
                            <p
                                className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                                    } px-3 py-1 cursor-pointer`}
                            >
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    onChange={() => setBestSeller((prev) => !prev)}
                    checked={bestSeller}
                    type="checkbox"
                    id="bestSeller"
                />
                <label className="cursor-pointer" htmlFor="bestSeller">
                    Add to Bestseller
                </label>
            </div>

            <button className="w-28 py-3 mt-4 bg-black text-white" type="submit">
                ADD
            </button>
        </form>
    );
};

export default Add;
