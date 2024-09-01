import React from 'react'
import {ImageSlider} from '../components/ImageSlider'
import {Offers} from '../components/Offers'

const Home = () => {
    const slides= [
        "./Amazon_in_ Clothing _ Top brands_ Clothing & Accessories.jpeg",
        "./Amazon-Fashion-Wardrobe-Refresh-Sale-India-1024x536.png",
        "./EOSS-Min50._CB410624090_.jpg",
        "./flat-design-second-hand-shop-template_23-2150563685.jpg"
    ]
    return (
        <div>
            <div > 
                <ImageSlider>
                        {
                            slides.map((s, i) =>( <img key={i} src={s} className="w-full h-full flex-shrink-0 object-cover "/>))
                        }
                </ImageSlider>
            </div>
            <div>
                <Offers/>
            </div>
        </div>
    )
}

export default Home