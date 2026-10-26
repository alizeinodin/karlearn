import React, { useEffect, useState } from "react";

import "./Courses.css";
import CourseBox from "./../../../Components/CourseBox/CourseBox";
import { apiUrl } from "../../../config";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showCourseState, setShowCourseState] = useState("all");
  const [shownCourses, setShownCourses] = useState([]);

  useEffect(() => {
    fetch(apiUrl(`/users/courses`), {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user") || "null")?.token
        }`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCourses(data.content.courses.data);
        setShownCourses(data.content.courses.data);
      });
  }, []);
  console.log(shownCourses);
  const filterCourses = (state) => {
    switch (state) {
      case "all": {
        setShownCourses(courses);
        break;
      }
      case "free": {
        const filteredCourses = courses.filter(
          (course) => course.course.price === 0
        );
        setShownCourses(filteredCourses);
        break;
      }
      case "money": {
        const filteredCourses = courses.filter(
          (course) => course.course.price !== 0
        );
        setShownCourses(filteredCourses);
        break;
      }
      default: {
        setShownCourses(courses);
      }
    }
  };

  return (
    <div class="col-9">
      <div class="courses">
        <div class="courses-header__panel">
          <span class="courses-header__title">دوره های ثبت نام شده</span>
          <ul class="courses-header__list">
            <li
              class="courses-header__item"
              onClick={(event) => {
                event.preventDefault();
                setShowCourseState("all");
                filterCourses("all");
              }}
            >
              <a
                class={`courses-header__link__panel ${
                  showCourseState === "all"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                همه دوره ها
              </a>
            </li>
          </ul>
        </div>
        <div class="main">
          <div class="row">
            <div class="col-12">
              {shownCourses.length ? (
                <>
                  {shownCourses.map((course) => (
                    <CourseBox {...course} key={course.id} />
                  ))}
                </>
              ) : (
                <div className="alert alert-danger">
                  دوره‌ای جهت نمایش برای این فیلتر وجود ندارد
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
