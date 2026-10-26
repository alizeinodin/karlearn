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
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../../config";

export default function AdminEditCourses() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState();
  const [courseCover1, setCourseCover1] = useState();
  const [progress, setProgress] = useState("");
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: courses.title,
        isValid: true,
      },
      description: {
        value: courses.content,
        isValid: true,
      },

      price: {
        value: courses.cost,
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    fetch(apiUrl(`/categories`))
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories.content.data);
      });
  }, []);
  useEffect(() => {
    if (id) {
      axios.get(apiUrl("/courses/") + id).then((res) => {
        setCourses(res.data.content);
      });
    }
  }, [id]);
  //   console.log(courses);
  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };
  const updateCourse = (id) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    let formData = new FormData();
    if (formState.inputs.name.value) {
      formData.append("title", formState.inputs.name.value);
    }
    if (formState.inputs.description.value) {
      formData.append("content", formState.inputs.description.value);
    }
    if (courseCategory!=-1) {
      formData.append("category_id", courseCategory);
    }
    if (formState.inputs.price.value) {
      formData.append("cost", formState.inputs.price.value);
    }
    if (courseCover) {
      formData.append("index_img", courseCover);
    }
    if (courseCover1) {
      formData.append("index_video", courseCover1);
    }

    // formData.append("type", "unfree");

    swal({
      title: "آیا از آپدیت دوره اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        axios
          .put(
            apiUrl(`/courses/${id}`),

            formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
              onUploadProgress: (e) => {
                if (e.bytes) {
                  setProgress(Math.round((e.loaded / e.total) * 100));
                }
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              swal({
                title: "دوره موردنظر با موفقیت آپدیت شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                navigate("/p-admin/courses");
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

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>ویرایش دوره</span>
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
                  placeholder={courses.title}
                  //   value={courses.title}
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
                  placeholder={courses.content}
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
                  placeholder={courses.cost}
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
                <select onChange={selectCategory} value={courses.category_id}>
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
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="ثبت تغییرات"
                    onClick={(e) => {
                      e.preventDefault();
                      updateCourse(id);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
