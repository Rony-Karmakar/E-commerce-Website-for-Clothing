import { useState } from "react";

const Filters = ({filter, types, setProperty, setfn }) => {
    console.log(filter);
    const [isCheck, setIsCheck] = useState(0)

    const handler = (e) => {
        console.log(e.target.value);
        setIsCheck(!isCheck);
        if(!isCheck){
            setfn(e.target.value) 
        } else setfn(''); 
    }

    return (
        <div>
            <div className="p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent">
                {filter}
            </div>
            <div>
                {types.map((categoryName, i) => (
                <div key={i} className="text-center top-20 flex flex-row justify-between items-start rounded-lg p-2 w-full">
                    <h3 className="flex gap-2">
                    <input className="w-3" type="checkbox" value={categoryName} onClick={(e) => handler(e)}/>
                        {categoryName} 
                    </h3>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Filters;