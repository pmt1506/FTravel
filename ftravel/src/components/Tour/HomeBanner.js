import React from "react";
import Slider from "react-slick";
import '../../css/banner.css';
const HomeBanner = () => {
  const placeholderImages = [
    "https://images.unsplash.com/photo-1553702446-a39d6fbee6cb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553649033-3fbc8d0fa3cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553748024-d1b27fb3f960?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553969420-fb915228af51?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1553901753-215db344677a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573126617899-41f1dffb196c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const captions = [
    "Explore breathtaking landscapes",
    "Discover hidden gems",
    "Embark on unforgettable adventures",
    "Experience local culture and traditions",
    "Relax and unwind in stunning destinations",
    "Create memories that last a lifetime",
    "Escape to paradise",
    "Indulge in luxury travel experiences",
  ];

  const descriptions = [
    "Uncover stunning natural wonders and picturesque landscapes on your journey.",
    "Find hidden gems off the beaten path and immerse yourself in local culture.",
    "Embark on thrilling adventures and create unforgettable memories.",
    "Immerse yourself in the vibrant culture and traditions of your destination.",
    "Relax and rejuvenate in beautiful settings, surrounded by nature's beauty.",
    "Capture special moments and create memories to cherish forever.",
    "Experience luxury travel and indulge in world-class amenities and services.",
    "Escape to idyllic destinations and experience the ultimate in relaxation and luxury.",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {placeholderImages.map((imageUrl, index) => (
        <div key={index}>
          <img
            src={imageUrl}
            alt={`Slide ${index + 1}`}
            className="img-fluid"
            style={{ height: "500px", width: "100%" }}
          />
          <div className="caption text-center">
            <h3>{captions[index]}</h3>
            <p>{descriptions[index]}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HomeBanner;
