import React, { useState, useEffect } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { useParams, Link } from "react-router-dom";
import swal from "sweetalert";

import "./CourseInfo.css";
import { apiUrl, assetUrl } from "../../config";

export default function CourseInfo() {
  const [comments, setComments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseDetails, setCourseDetails] = useState({});
  const [courseTeacher, setCourseTeacher] = useState({});
  const [courseCategory, setCourseCategory] = useState({});
  const [relatedCourses, setRelatedCourses] = useState({});
  const [isbuyed, setisBuyse] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user") || "null")?.token;
    if (token) {
      fetch(apiUrl(`/users/courses`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const list = data.content?.courses?.data || [];
          setisBuyse(list.some((item) => String(item.id) === String(id)));
        })
        .catch(() => setisBuyse(false));
    }

    fetch(apiUrl(`/courses/${id}`))
      .then((res) => res.json())
      .then((allData) => {
        const course = allData.content || {};
        setRelatedCourses(course);
        if (course.category_id) {
          fetch(apiUrl(`/categories/${course.category_id}`))
            .then((res) => res.json())
            .then((d) => setCourseCategory(d.content || d))
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, [id]);
 

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");

    fetch(apiUrl(`/comments/get/${id}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: id,
        score: commentScore,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "کامنت موردنظر با موفقیت ثبت شد",
          icon: "success",
          buttons: "تایید",
        });
      });
  };

  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(apiUrl(`/courses/${id}`), {
            method: "POST",
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user") || "null")?.token
              }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              course_id: course.id,
            }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                // getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(apiUrl(`/buy`), {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user") || "null")?.token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course_id: relatedCourses.id,
                }),
              }).then((res) => {
                console.log(res);
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "اوکی",
                  }).then(() => {
                    // getCourseDetails();
                  });
                }
              });
            } else {
            }
          });
        }
      });
    }
  };

  return relatedCourses.id ? (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت‌اند",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوا اسکریپت",
            to: "course-info/js-expert",
          },
        ]}
      />

      <section className="course-info">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {courseCategory.content?.title ?? ""}
              </a>
              <h1 className="course-info__title">{relatedCourses.title}</h1>
              <p className="course-info__text">{relatedCourses.content}</p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-twitter course-info__icon"></i>
                </a>
                <a href="#" className="course-info__social-media-item">
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </a>
              </div>
            </div>

            <div className="col-6">
              <video
                src={assetUrl(relatedCourses.index_video)}
                poster={assetUrl(relatedCourses.index_img)}
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailBox
                      icon="graduation-cap"
                      title="وضعیت دوره:"
                      text={"به اتمام رسیده"}
                    />
                    <CourseDetailBox
                      icon="clock"
                      title="زمان برگزاری"
                      text={relatedCourses.created_at.slice(0, 10)}
                    />
                    <CourseDetailBox
                      icon="calendar-alt"
                      title="آخرین بروزرسانی:"
                      text={relatedCourses.updated_at.slice(0, 10)}
                    />
                  </div>
                </div>{" "}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="accordion">
                        <Accordion.Header>جلسات دوره</Accordion.Header>
                        {relatedCourses.sections.map((session, index) => (
                          <Accordion.Body
                            key={session._id}
                            className="introduction__accordion-body"
                          >
                            <>
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  {index + 1}
                                </span>
                                <i className="fab fa-youtube introduction__accordion-icon"></i>
                                <Link
                                  to={
                                    isbuyed
                                      ? `/${relatedCourses.id}/${session.id}`
                                      : "#"
                                  }
                                  className="introduction__accordion-link"
                                >
                                  {session.title}
                                </Link>
                              </div>
                              <div className="introduction__accordion-left">
                                {isbuyed ? (
                                  <span className="introduction__accordion-time">
                                    {session.time}
                                  </span>
                                ) : (
                                  // <i class=""></i>
                                  <i className="fa-solid fa-lock introduction__accordion-icon"></i>
                                )}
                              </div>
                            </>
                          </Accordion.Body>
                        ))}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img
                        src="/images/info/teacher.jfif"
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          {"محمد امین سعیدی راد"}
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                      <span className="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>
                {/* <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                /> */}
              </div>
            </div>

            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    {isbuyed === true ? (
                      <span className="course-info__register-title">
                        <i className="fas fa-graduation-cap course-info__register-icon"></i>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <span
                        className="course-info__register-title"
                        onClick={() => registerInCourse(courseDetails)}
                      >
                        ثبت نام در دوره
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">
                          {110}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <i className="far fa-comments course-info__total-comment-icon"></i>
                        <span className="course-info__total-comment-text">
                          67 دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <i className="far fa-eye course-info__total-view-icon"></i>
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <i className="fas fa-link course-info__short-url-icon"></i>
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a href="#" style={{ color: "blue", fontWeight: "bold" }}>
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                {/* {relatedCourses.length !== 0 && (
                  <div className="course-info">
                    <span className="course-info__courses-title">
                      دوره های مرتبط
                    </span>
                    <ul className="course-info__courses-list">
                      {relatedCourses.map((course) => (
                        <li className="course-info__courses-list-item">
                          <Link
                            to={`/course-info/${course.shortName}`}
                            className="course-info__courses-link"
                          >
                            <img
                              src={`#`}
                              alt="Course Cover"
                              className="course-info__courses-img"
                            />
                            <span className="course-info__courses-text">
                              {course.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  ) : (
    <>fgf</>
  );
  // <></>
}
