"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
  { imgUrl: '/assets/images/hero-1.svg', alt: 'smartwatch'},
  { imgUrl: '/assets/images/hero-2.svg', alt: 'bag'},
  { imgUrl: '/assets/images/hero-3.svg', alt: 'lamp'},
  { imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer'},
  { imgUrl: '/assets/images/hero-5.svg', alt: 'chair'},
]

const HeroCarousel = () => {
  return (
    <div className="hero-carousel relative">
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-2 bg-dark-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs text-dark-text">Live Tracking</span>
        </div>
      </div>
      
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <div key={image.alt} className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/30 to-transparent rounded-20"></div>
            <Image 
              src={image.imgUrl}
              alt={image.alt}
              width={484}
              height={484}
              className="object-contain p-8"
            />
          </div>
        ))}
      </Carousel>

      <div className="absolute -left-[15%] bottom-8 z-10 hidden xl:block">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent-green/20 rounded-full"></div>
          <Image 
            src="/assets/icons/arrow-curved.svg"
            alt="arrow"
            width={175}
            height={175}
            className="filter invert"
          />
          <div className="absolute top-12 left-12 text-sm text-dark-text bg-dark-card/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            Start Tracking
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroCarousel