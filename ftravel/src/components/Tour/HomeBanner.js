import React from "react";
import Slider from "react-slick";
import "../../css/banner.css";
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
    "Khám phá những cảnh đẹp tuyệt vời",
    "Khám phá những viên ngọc ẩn mình",
    "Bắt đầu những cuộc phiêu lưu đáng nhớ",
    "Trải nghiệm văn hóa và truyền thống địa phương",
    "Thư giãn và nghỉ ngơi trong những điểm đến tuyệt vời",
    "Tạo ra những kỷ niệm không thể nào quên",
    "Trốn chạy đến thiên đường",
    "Thưởng thức những trải nghiệm du lịch sang trọng",
  ];

  const descriptions = [
    "Khám phá những kỳ quan tự nhiên tuyệt đẹp và những bức tranh cảnh đẹp trên hành trình của bạn.",
    "Tìm ra những viên ngọc ẩn mình nằm ngoài lối đi chính và ngâm mình trong văn hóa địa phương.",
    "Bắt đầu những cuộc phiêu lưu hồi hộp và tạo ra những kỷ niệm khó quên.",
    "Ngâm mình vào văn hóa sôi động và truyền thống của điểm đến của bạn.",
    "Thư giãn và làm mới bản thân trong những cảnh đẹp, bao quanh bởi vẻ đẹp của tự nhiên.",
    "Ghi lại những khoảnh khắc đặc biệt và tạo ra những kỷ niệm để trân trọng mãi mãi.",
    "Trải nghiệm du lịch sang trọng và thưởng thức các tiện nghi và dịch vụ đẳng cấp thế giới.",
    "Trốn chạy đến những điểm đến thiên đường và trải nghiệm điều tuyệt vời nhất về thư giãn và xa hoa.",
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
