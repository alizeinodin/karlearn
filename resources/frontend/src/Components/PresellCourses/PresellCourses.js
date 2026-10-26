import React, { useEffect, useState } from "react";
import SectionHeader from "./../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from "./../../Components/CourseBox/CourseBox";

import "swiper/css";
import "swiper/css/pagination";

import "./PresellCourses.css";
import { apiUrl } from "../../config";

export default function PresellCourses() {
  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    fetch(apiUrl("/courses/"))
      .then((res) => res.data.json())
      .then((allPresellCourses) => {
        setPresellCourses(allPresellCourses);
      });
  }, []);
  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دوره های پیش فروش"
        />

        <div className="courses-content">
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="mySwiper"
              >
                {presellCourses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <CourseBox {...course} isSlider={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
