import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../validators/rules";
import axios from "axios";
import "./Courses.css";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../config";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState({});
  const [courseCover1, setCourseCover1] = useState({});
  const [progress, setProgress] = useState("");
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();

    fetch(apiUrl(`/categories`))
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories.content.data);
        console.log(allCategories.content.data);
      });
  }, []);

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    fetch(apiUrl("/courses"), {
      headers: {
        // Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses);
        setCourses(allCourses.content.data);
      });
  }

  const removeCourse = (courseID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    swal({
      title: "آیا از حذف دوره اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(apiUrl(`/courses/${courseID}`), {
          method: "DELETE",
          headers: {
            // Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "دوره موردنظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "حذف دوره با مشکلی مواجه شد",
              icon: "error",
              buttons: "اوکی",
            });
          }
        });
      }
    });
  };

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };
  const updateCourse = (id) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    let formData = new FormData();
    formData.append("title", formState.inputs.name.value);
    formData.append("content", formState.inputs.description.value);
    formData.append("category_id", courseCategory);
    formData.append("cost", formState.inputs.price.value);
    formData.append("index_img", courseCover);
    formData.append("video_img", courseCover1);
    formData.append("type", "unfree");

    swal({
      title: "آیا از آپدیت دوره اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(apiUrl(`/courses/${id}`), {
          method: "PUT",
          // headers: {
          //   Authorization: `Bearer ${localStorageData.token}`,
          // },
          body: formData,
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "دوره موردنظر با موفقیت آپدیت شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCourses();
            });
          } else {
            swal({
              title: "آپدیت دوره با مشکلی مواجه شد",
              icon: "error",
              buttons: "اوکی",
            });
          }
        });
      }
    });
  };
  const addNewCourse = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    let formData = new FormData();
    formData.append("title", formState.inputs.name.value);
    formData.append("content", formState.inputs.description.value);
    formData.append("category_id", courseCategory);
    formData.append("cost", formState.inputs.price.value);
    formData.append("index_img", courseCover);
    formData.append("index_video", courseCover1);
    formData.append("type", "unfree");

    if (courseCategory === "-1") {
      swal({
        title: "لطفا دسته بندی دوره را انتخاب کنید",
        icon: "error",
      });
    } else {
      console.log(formData);
      // axios.get()
      axios
        .post(apiUrl(`/courses`), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (e.bytes) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            swal({
              title: "دوره جدید با موفقیت اضافه شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCourses();
            });
          }
        });
    }
  };
const navigate=useNavigate()
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">ویدئو پیش نمایش دوره</label>
                <input
                  type="file"
                  id="file1"
                  onChange={(event) => {
                    setCourseCover1(event.target.files[0]);
                  }}
                />
                {progress ? `${progress}%` : ""}
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value="-1">لطفا دسته بندی را انتخاب نمایید</option>
                  {categories.map((category) => (
                    <option value={category.id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setCourseCover(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                {/* <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div> */}
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={addNewCourse} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>توضیح</th>
              {/* <th>مدرس</th> */}
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.title}</td>
                <td>{course.cost === 0 ? "رایگان" : course.cost}</td>
                <td>
                  {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                </td>
                <td>{course.content}</td>
                <td>
                  {categories &&
                    categories.find((item) => item.id == course.category_id)
                      ?.title}
                </td>
                {/* <td>{course.id}</td> */}
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => navigate('edit/'+course.id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCourse(course.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
