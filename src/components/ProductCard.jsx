import { Link } from "react-router-dom";

export const ProductCard = ({id, image, name, price}) => {
    return (
        <Link to={`/Product/${id}`} className="text-gray-700 cursor-pointer ">
            <div className="overflow-hidden">
                <img className="hover:scale-110 transition ease-in-out" src={image} alt="" />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className=" text-sm font-medium">{price}</p>
        </Link>
    )
}

export default ProductCard