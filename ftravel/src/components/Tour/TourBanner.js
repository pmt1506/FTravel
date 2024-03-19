import React from "react";
import Slider from "react-slick";

const TourBanner = () => {
  const placeholderImages = [
    "https://images.pexels.com/photos/13588741/pexels-photo-13588741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/626749/pexels-photo-626749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/629167/pexels-photo-629167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/458917/pexels-photo-458917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12485969/pexels-photo-12485969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12360777/pexels-photo-12360777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1033729/pexels-photo-1033729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/449283/pexels-photo-449283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  // Shuffle the array of placeholder images
  const shuffledImages = placeholderImages.sort(() => Math.random() - 0.5);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Slider {...settings}>
            {shuffledImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`slide ${index + 1}`}
                  className="img-fluid"
                  style={{
                    height: "500px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TourBanner;
