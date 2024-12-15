import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isSidebarOpen, setSidebar] = useState(false);
    const { cartItemCount, fetchCartData, rerender } = useContext(ShopContext);
    const [input, setInput] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartData();
        console.log(cartItemCount)
    }, [rerender]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate(`/Search/${input}`);
            setInput('');
            setIsSearchOpen(false);
        }
    }

    const handleLogOut = () => {
        const tokenKey = "jwtToken"
        localStorage.removeItem(tokenKey);
        navigate("/Log")
    }

    const navlinks = [
        { name: "Home", link: "/" },
        { name: "Orders", link: "/TotalOrders" },
        { name: "Cart", link: "/Cart" },
        { name: "Wishlists", link: "/Wishlists" },
        { name: "Help & Support", link: "/Help & Support" },
        { name: "Log In", link: "/Log" },
    ];

    const categories = [
        { name: "Men", link: "/Men" },
        { name: "Women", link: "/Women" },
        { name: "Kids", link: "/Kids" }
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setSidebar(true)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <FiMenu className="text-2xl" />
                        </button>
                        <Link to="/" className="text-2xl font-bold text-gray-800">GhEmAzOn</Link>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        {categories.map((category, index) => (
                            <Link key={index} to={category.link} className="text-gray-600 hover:text-gray-900 font-medium">
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <BsSearch className="text-xl" />
                        </button>
                        <Link to="/Profile" className="text-gray-600 hover:text-gray-900">
                            <CiUser className="text-2xl" />
                        </Link>
                        <Link to="/Cart" className="text-gray-600 hover:text-gray-900 relative">
                            <PiShoppingCartSimpleLight className="text-2xl" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.form
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            onSubmit={handleSearch}
                            className="mt-4"
                        >
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="w-full p-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <BsSearch className="text-gray-400" />
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setSidebar(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-5">
                                <button onClick={() => setSidebar(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                                    <IoMdClose className="text-2xl" />
                                </button>
                                <div className="mt-8 space-y-4">
                                    {navlinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            to={link.link}
                                            className="block text-gray-600 hover:text-gray-900 font-medium"
                                            onClick={() => setSidebar(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <button onClick={handleLogOut} className="block text-gray-600 hover:text-gray-900 font-medium">Log Out</button>
                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;