import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export const ProductCard = ({id, image, name, price}) => {
    const {handleWishlistToggle, wishlist} = useContext(ShopContext)
    return (
        <div>
            <Link to={`/Product/${id}`} className="text-gray-700 cursor-pointer ">
                <div className="overflow-hidden">
                    <img className="hover:scale-110 transition ease-in-out" src={image} alt="" />
                </div>
                <p className="pt-3 pb-1 text-sm">{name}</p>
                <p className=" text-sm font-medium">{price}</p>
            </Link>
            <button
            className={`mt-2 p-2 text-white rounded-md ${
                wishlist.map(item => item._id).includes(id)
                ? 'bg-red-500'
                : 'bg-green-500'
            }`}
            onClick={() => handleWishlistToggle(id)}>
            {wishlist.includes(id) ? 'Remove from Wishlist' : 'Add to Wishlist'}    
            </button>
        </div>
    )
}

export default ProductCard