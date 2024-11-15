'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ProductCard from '../components/ProductCard'  
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_URL = "http://localhost:5454/api/products"

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    color: '',
    size: '',
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    sort: '',
    stock: '',
    pageNumber: 0,
    pageSize: 100
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(API_URL, { 
        params: filters,
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}` 
        }
      })
      if (response.data && Array.isArray(response.data.content)) {
        setProducts(response.data.content)
      } else {
        console.error('Unexpected response format:', response.data)
        toast.error('Error fetching products. Please try again.')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Error fetching products. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateFilters = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar filters={filters} updateFilters={updateFilters} />
        <ProductGrid products={products} updateFilters={updateFilters} isLoading={isLoading} />
      </div>
      <ToastContainer />
    </div>
  )
}

function Sidebar({ filters, updateFilters }) {
  return (
    <div className="w-full md:w-1/4">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <ColorFilter
        selectedColor={filters.color}
        onChange={(value) => updateFilters('color', value)}
      />
      <PriceRange
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onChange={(min, max) => {
          updateFilters('minPrice', min)
          updateFilters('maxPrice', max)
        }}
      />
      <DiscountFilter
        minDiscount={filters.minDiscount}
        onChange={(value) => updateFilters('minDiscount', value)}
      />
    </div>
  )
}

function ColorFilter({ selectedColor, onChange }) {
  const [isOpen, setIsOpen] = useState(true)
  const colorOptions = ['Red', 'Blue', 'Green', 'Black', 'White']

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full text-left font-semibold mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        Color
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="space-y-2">
          {colorOptions.map((color) => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedColor === color}
                onChange={() => onChange(color)}
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function PriceRange({ minPrice, maxPrice, onChange }) {
  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  const handleChange = () => {
    onChange(localMin, localMax)
  }

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={localMin}
          onChange={(e) => setLocalMin(Number(e.target.value))}
          className="w-24 p-2 border rounded"
          placeholder="Min"
        />
        <span>to</span>
        <input
          type="number"
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          className="w-24 p-2 border rounded"
          placeholder="Max"
        />
      </div>
      <button
        onClick={handleChange}
        className="mt-2 bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
      >
        Apply
      </button>
    </div>
  )
}

function DiscountFilter({ minDiscount, onChange }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Minimum Discount</h3>
      <input
        type="number"
        value={minDiscount}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border rounded"
        placeholder="Minimum discount %"
      />
    </div>
  )
}

function ProductGrid({ products, updateFilters, isLoading }) {
  const sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'discount_desc', label: 'Discount: High to Low' },
  ]

  if (isLoading) {
    return <div className="w-full md:w-3/4 flex justify-center items-center">Loading...</div>
  }

  return (
    <div className="w-full md:w-3/4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <select
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort by</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                id={product.id}
                image={product.imageUrl}
                brand={product.brand}
                name={product.title}
                price={product.price}
                discountPersent={product.discountPercent}
                discountedPrice={product.discountedPrice}
                sizes={product.sizes || []}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No products found.</div>
      )}
    </div>
  )
}