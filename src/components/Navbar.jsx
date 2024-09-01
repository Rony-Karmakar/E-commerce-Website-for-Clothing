import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';

export const Navbar = () => {
    const [isSidebarOpen, setSidebar] = useState(false)
    const [input, setInput] = useState('');
    const [result, setResult] = useState([]);

    const fetchData =async (value) => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            const results = response.data.filter((user) => {
              return (
                value &&
                user &&
                user.name &&
                user.name.toLowerCase().includes(value.toLowerCase())
              );
            });
            setResult(results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const HandleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    const navlinks = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Orders",
            link: "/Orders"
        },
        {
            name: "Cart",
            link: "/Cart"
        },
        {
            name: "Wishlists",
            link: "/Wishlists"
        },
        {
            name: "Help & Support",
            link: "/Help & Support"
        },
        {
            name: "Log In",
            link: "/Log"
        }
    ]

    return (
        
        <nav >
            <div className="flex justify-between px-3 md:px-8 gap-2 items-center py-4">
            <section className='flex items-center gap-1 md:gap-4'>
                <FiMenu className='text-3xl cursor-pointer' onClick={()=> setSidebar(true)}/>
                <Link to="/" className='text-3xl md:text-4xl font-mono'>logo</Link>
            </section>
            {/* Sidebar */}
            <div className={clsx(
                'fixed h-full w-screen bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all z-50',
                isSidebarOpen && "translate-x-0"
            )}>
                <section className='text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex'>
                    <IoMdClose
                    onClick={()=> setSidebar(false)} className='mt-0 mb-8 text-3xl cursor-pointer'/>
                    {
                        navlinks.map((links, i) => (
                            <Link key={i} to={links.link} className='font-bold'>
                                {links.name}
                            </Link>
                        ))
                    }
                </section>
            </div>
            
            <div className='flex justify-between gap-4 lg:gap-10 xl:gap-16 '>
                <Link to='/Men' className='font-bold hover:bg-gray-400 rounded-lg px-2 py-1'>
                    Men
                </Link>

                <Link to='/Women' className='font-bold hover:bg-gray-400 rounded-lg px-2 py-1'>
                    Women
                </Link>

                <Link to='/Kids' className='font-bold hover:bg-gray-400 rounded-lg px-2 py-1'>
                    Kids
                </Link>
            </div>
            <div>
                <form>
                    <div className="w-25 md:w-60 xl:w-96 flex text-gray-900 border border-gray-700 rounded-3xl p-1 pl-3 text-sm pr-2">
                        <input  id="default-search" className="w-full text-black border-none outline-none" placeholder="Search" required  onChange={(e) => {const value= e.target.value; HandleChange(e.target.value)}}/>
                        <button className="text-black-400 font-bold py-2 px-4 rounded inline-flex items-center"> 
                            <BsSearch className="w-4 h-4"/>
                        </button>
                        
                    </div>
                </form>
            </div>
            <div>
                <section className='flex items-center gap-4'>
                    <Link to="/Cart" className='text-3xl'>
                        <PiShoppingCartSimpleLight />
                    </Link>
                </section>
            </div>
            </div>
            <hr className='border border-gray-200'/>
        </nav>
        
    )
}