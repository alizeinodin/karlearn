import React, { useEffect, useState } from "react";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import { minValidator } from "../../../validators/rules";
import swal from "sweetalert";
import axios from "axios";
import { apiUrl } from "../../../config";
export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [sessionVideo, setSessionVideo] = useState();
  const [sessions, setSessions] = useState([]);
  const [isSessionFree, setIsSessionFree] = useState(0);
  const [resourse, setResourse] = useState();
  const [progress, setProgress] = useState("");
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllSessions();

    fetch(apiUrl("/courses"))
      .then((res) => res.json())
      .then((allCourses) => {
        console.log(allCourses.content.data);
        setCourses(allCourses.content.data);
      });
  }, []);

  function getAllSessions() {
    fetch(apiUrl("/courses/sessions"))
      .then((res) => res.json())
      .then((allSessions) => setSessions(allSessions));
  }

  const createSession = (event) => {
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");

    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.time.value);
    formData.append("video", sessionVideo);
    formData.append("type", "unfree");
    formData.append("course_id", sessionCourse);
    formData.append("resources", resourse);
    axios
      .post(apiUrl(`/sections`), formData, {
        headers: {
          // Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          if (e.bytes) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        },
      })
      .then((res) => {
        if (res.status == 201) {
          swal({
            title: "جلسه مورد نظر با موفقیت اضافه شد",
            icon: "success",
            buttons: "اوکی",
          }).then(() => {
            getAllSessions();
          });
        }
      });
  };

  const removeSession = (sessionID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");

    swal({
      title: "آیا از حذف جلسه اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://panel:4000/v1/courses/sessions/${sessionID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "جلسه مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then((result) => {
              getAllSessions();
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
            <span>افزودن جلسه جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  validations={[minValidator(5)]}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات جلسه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="time"
                  validations={[minValidator(5)]}
                  placeholder="لطفا توضیحات جلسه را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  class="select"
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course.id} key={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title">ویدئو جلسه</label>
                <input
                  type="file"
                  onChange={(event) => {
                    setSessionVideo(event.target.files[0]);
                    console.log(event.target.files[0]);
                  }}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="col-6">
                <div class="name input">
                  <label class="input-title">فایل جلسه</label>
                  <input
                    type="file"
                    onChange={(event) => setResourse(event.target.files[0])}
                  />
                  <>{progress && `${progress}%`}</>
                  <span class="error-message text-danger"></span>
                </div>
              </div>

              {/* <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>غیر رایگان</span>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>رایگان</span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input type="submit" value="افزودن" onClick={createSession} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* <DataTable title="جلسات">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>تایم</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session._id}>
                <td>{index + 1}</td>
                <td>{session.title}</td>
                <td>{session.time}</td>
                <td>{session.course.name}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeSession(session._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable> */}
    </>
  );
}
