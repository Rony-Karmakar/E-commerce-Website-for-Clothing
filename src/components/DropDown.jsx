import { useState } from "react"
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const DropDown = ({toggleCategory, categories, types}) => {
    const [isOpen, setIsOpen]= useState(false)
    const [checked, setChecked]= useState(false)
    return <div>
        <button onClick={() => setIsOpen((prev)=> !prev)}className="p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent">
            {categories}
            {
                isOpen ? (
                    <IoCaretDown className="h-8"/>
                ) : (
                    <IoCaretUp className="h-8"/>
                )
            }
        </button>
        {isOpen && <div>
            {types.map((type, i) => (
                <div key={i} className="text-center top-20 flex flex-row justify-between items-start rounded-lg p-2 w-full">
                    <h3 className="flex gap-2">
                        <input className="w-3" type="checkbox" value={type} onChange={toggleCategory}/>
                        {type}
                        </h3>
                </div>
            ))}
            </div>}
    </div>
}
export default DropDown