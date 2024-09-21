import React,{useState} from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export const ImageSlider = ({children : slides}) => {
    const [curr, setCurr] = useState(0)

    const prev = () => setCurr((curr) => (curr === 0 ? slides.length-1 : curr - 1))
    const next = () => setCurr((curr) => (curr === slides.length-1 ? 0 : curr + 1))
    return (
        <div className='overflow-hidden relative max-w'>
            <div className='flex transition-tranform ease-out duration-10' style={{ transform: `translateX(-${curr*100}%)`}}>
                {slides}
            </div>
            <div className='absolute inset-0 flex items-center justify-between p-4'>
                <button onClick={prev} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                    <FaChevronLeft />
                </button>
                <button onClick={next} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}