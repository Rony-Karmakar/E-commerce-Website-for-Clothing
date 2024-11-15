import { useState } from "react"
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const DropDown = ({ categories, types}) => {
    console.log(types[0].category.parentCategory.parentCategory.name);
    const [isOpen, setIsOpen]= useState(false)
    const [checked, setChecked]= useState(false)
    console.log(types);
    return <div>
        
        <div className="p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent">
            {categories}
        </div>
            <div>
                {Array.from(new Set(
                types
                    .filter((type) => type.category?.parentCategory?.parentCategory && type.category.parentCategory.parentCategory.name === categories)
                    .map((type) => type.category.name) // Map to category names
                )).map((categoryName, i) => (
                <div key={i} className="text-center top-20 flex flex-row justify-between items-start rounded-lg p-2 w-full">
                    <h3 className="flex gap-2">
                    <input className="w-3" type="checkbox" value={categoryName} />
                    {categoryName} {/* Display unique category name */}
                    </h3>
                </div>
                ))}
            </div>
    </div>
}
export default DropDown

{/* <button onClick={() => setIsOpen((prev)=> !prev)}className="p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent">
            {categories}
            {
                isOpen ? (
                    <IoCaretDown className="h-8"/>
                ) : (
                    <IoCaretUp className="h-8"/>
                )
            }
        </button>
        {isOpen && (
            <div>
                {Array.from(new Set(
                types
                    .filter((type) => type.category?.parentCategory?.parentCategory && type.category.parentCategory.parentCategory.name === categories)
                    .map((type) => type.category.name) // Map to category names
                )).map((categoryName, i) => (
                <div key={i} className="text-center top-20 flex flex-row justify-between items-start rounded-lg p-2 w-full">
                    <h3 className="flex gap-2">
                    <input className="w-3" type="checkbox" value={categoryName} />
                    {categoryName} {/* Display unique category name */}
                    