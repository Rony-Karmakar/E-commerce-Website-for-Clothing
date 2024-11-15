import React, { useContext, useEffect, useState } from 'react'
import DropDown from '../components/DropDown';
import ProductCard from '../components/ProductCard';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
    const { products } = useContext(ShopContext);
    const [currentItems, setCurrentItems] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);
    const [collectionCategory, setCollectionCategory] = useState([]);

    const toggleCategory = (e) => {
        if (collectionCategory.includes(e.target.value)) {
            setCollectionCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCollectionCategory(prev=> [...prev, e.target.value])
        }
    }

    useEffect(()=> {
        setCurrentItems(products.slice())
    },[])
    
    useEffect(() => {
        setFilterProducts();
    },[])

    const productAttributes = [
        {
          type: 'Collection',
          options: ['T-shirt', 'Sweatshirt', 'Hoodie', 'Jacket'],
        },
        {
          type: 'Size',
          options: ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large'],
        },
        {
          type: 'Fit',
          options: ['Slim Fit', 'Regular Fit', 'Relaxed Fit'],
        },
        {
          type: 'Pattern',
          options: ['Solid', 'Striped', 'Checked', 'Printed'],
        },
        {
          type: 'Color',
          options: ['Red', 'Blue', 'Black', 'White', 'Green'],
        },
        {
          type: 'Occasion',
          options: ['Casual', 'Formal', 'Party', 'Sport'],
        },
      ];
    return<div className='flex flex-row-2 px-2 py-1'>
        <div className='flex-col border border-bg-gray'>
            {
                productAttributes.map((productAttribute, i) => (<DropDown key={i} toggleCategory={toggleCategory} categories={productAttribute.type} types={productAttribute.options}/>))
            }
        </div>
        
        <div>
            <div className='flex flex-row-reverse'>
                <select className='border-2 border-gray-300 text-sm px-2'>
                    <option value="low-high">sort by: High to low</option>
                    <option value="high-low">sort by: low to high</option>
                    <option value="new-added">Newly Added</option>
                </select>
            </div>
            <div className='py-5 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6'>
                {
                    products.map((item, index)=> (
                        <ProductCard key={index} id={item.id} image={item.image} name={item.title} price={item.price}/>
                    ))
                }
                
            </div>
        </div>
    </div>
    
}
export default Product;