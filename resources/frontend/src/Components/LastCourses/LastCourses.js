import React, { useEffect, useState } from "react";
import CourseBox from "../CourseBox/CourseBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastCourses.css";
import { apiUrl } from "../../config";

export default function LastCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(apiUrl(`/courses`))
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses.content.data))
      .catch((e) => console.log(e));
  }, []);
  console.log(courses);
  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row d-flex d-flex-wrap">
                {courses.map((course) => (
                  <CourseBox {...course} key={course._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
