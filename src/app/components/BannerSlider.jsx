"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/banner/banner1.jpg",
    title: "Upgrade Your Skills",
    subtitle: "Learn from industry experts",
  },
  {
    id: 2,
    image: "/images/banner/banner2.jpg",
    title: "Build Your Career",
    subtitle: "Get job-ready with real skills",
  },
  {
    id: 3,
    image: "/images/banner/banner3.jpg",
    title: "Master New Technologies",
    subtitle: "Stay ahead in the digital world",
  },
  {
    id: 4,
    image: "/images/banner/banner4.jpg",
    title: "Learn Anytime Anywhere",
    subtitle: "Flexible online learning",
  },
];

export default function BannerSlider() {
  return (
    <div className="h-[90vh] w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[90vh] w-full">
              
              <Image
                src={slide.image}
                alt="banner"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-lg text-gray-300">
                    {slide.subtitle}
                  </p>

                  <button className="mt-6 rounded-full bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700">
                    Start Learning
                  </button>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}