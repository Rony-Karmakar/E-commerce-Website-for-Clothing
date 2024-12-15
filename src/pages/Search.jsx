import React, { useEffect, useState } from 'react';
import DropDown from '../components/DropDown';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const API = "http://localhost:5454/api/products/search";
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}?q=${name}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        if (res.data) {
          console.log(res.data);
          setProducts(res.data);
          setSortedProducts(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [name]);

  if (!products.length) {
    return <p className="text-center py-10">No products found...</p>;
  }

  const parentCategory = [...new Set(products.map(item => item.category?.parentCategory?.parentCategory?.name))];
  const colorCategory = [...new Set(products.map(item => item.color))];
  const brandCategory = [...new Set(products.map(item => item.brand))];

  const handleSort = (e) => {
    const value = e.target.value;
    let sorted = [...products];
    if (value === 'low-high') {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'high-low') {
      sorted = sorted.sort((a, b) => b.price - a.price);
    } else if (value === 'new-added') {
      sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setSortedProducts(sorted);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter sidebar for larger screens */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4 border border-gray-200 rounded-lg p-4">
            <Filters filter="Color" types={colorCategory} setfn={setColor} />
            <Filters filter="Brand" types={brandCategory} setfn={setBrand} />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <button
              className="lg:hidden mb-4 sm:mb-0 px-4 py-2 bg-gray-200 rounded-md"
              onClick={toggleFilter}
            >
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <select
              className="border-2 border-gray-300 text-sm px-4 py-2 rounded-md"
              onChange={handleSort}
            >
              <option value="high-low">Sort by: High to Low</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="new-added">Newly Added</option>
            </select>
          </div>

          {/* Filter sidebar for mobile */}
          {isFilterOpen && (
            <div className="lg:hidden mb-6 border border-gray-200 rounded-lg p-4">
              <Filters filter="Color" types={colorCategory} setfn={setColor} />
              <Filters filter="Brand" types={brandCategory} setfn={setBrand} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts
              .filter((item) => item.title.toLowerCase().includes(name.toLowerCase()))
              .filter((item) => !brand || item.brand === brand)
              .filter((item) => !color || item.color === color)
              .map((item, index) => (
                <ProductCard
                  key={index}
                  id={item.id}
                  image={item.imageUrl}
                  name={item.title}
                  price={item.price}
                  sizes={item.sizes}
                  discountPercent={item.discountPercent}
                  discountedPrice={item.discountedPrice}
                  brand={item.brand}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

