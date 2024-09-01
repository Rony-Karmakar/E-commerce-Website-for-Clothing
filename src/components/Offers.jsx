import { Link } from "react-router-dom"

export const Offers = () => {
    const offers=["80% off on Men T-shirt", "60% off on Women Footwear", "30% off on H&M jeans", "Buy 1 get 1 free", "Summar Sale", "Great Indian Sale"]
    return <div className="grid grid-cols-3 gap-3 px-4 py-4">
        {offers.map((offer,i)=> (<Link to='/Products' key={i} className="h-60 w-60 border border-2 border-black-500 text-center">{offer}</Link>))}   
    </div>
}

