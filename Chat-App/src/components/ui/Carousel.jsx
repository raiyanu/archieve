// Carousel.js

import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Advance to the next slide
            sliderRef.current.slickNext();
        }, 2000); // Change the interval (in milliseconds) as needed

        return () => {
            clearInterval(interval);
        };
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: null,
        prevArrow: null,
    };

    return (
        <Slider ref={sliderRef} {...settings} className='w-[500px] mx-auto mt-[5rem] p-3 overflow-hidden'>
            <div className=" h-[20rem] flex items-center justify-center">
                <img src="assets/social.svg" style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt="" />
            </div>
            <div className=" h-[20rem] flex items-center justify-center">
                <img src="assets/notification.svg" style={{ height: '100%', width: '100%', objectFit: 'cover' }} alt="" />
            </div>
        </Slider>
    );
};

export default Carousel;
