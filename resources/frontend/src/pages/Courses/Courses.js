import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagination from "./../../Components/Pagination/Pagination";
import "./Courses.css";
import { apiUrl } from "../../config";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);

  useEffect(() => {
    fetch(apiUrl(`/courses`))
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses.content?.data || []))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.map((course) => (
                  <CourseBox {...course} key={course.id} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={6}
            pathname="/courses"
            setShownCourses={setShownCourses}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
