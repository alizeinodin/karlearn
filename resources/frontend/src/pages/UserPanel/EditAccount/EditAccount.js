import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./../../../context/authContext";
import swal from "sweetalert";

import "./EditAccount.css";
import { apiUrl } from "../../../config";

export default function EditAccount() {
  // const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useInfo, setUserInfo] = useState({});

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    fetch(apiUrl("/users/get"), {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setUserInfo(res.content));
  }, []);

  // const editAccount = (event) => {
  //   event.preventDefault();

  //   const userNewInfos = {
  //     name,
  //     username,
  //     email,
  //     password,
  //     phone,
  //   };

  //   fetch(`http://user:4000/v1/users/`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${
  //         JSON.parse(localStorage.getItem("user") || "null")?.token
  //       }`,
  //     },
  //     body: JSON.stringify(userNewInfos),
  //   }).then((res) => {
  //     if (res.ok) {
  //       swal({
  //         title: "اطلاعات اکانت شما با موفقیت ویرایش شد",
  //         icon: "success",
  //         buttons: "خیلی هم عالی",
  //       });
  //     }
  //   });
  // };

  return (
    <div class="col-9">
      <div class="edit">
        <form class="edit__form" action="#">
          <div class="edit__personal">
            <div class="row">
              <div class="col-12">
                <label class="edit__label">شماره موبایل *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={useInfo.phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                />
              </div>

              <div class="col-12">
                <label class="edit__label">نام و نام خانوادگی *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={useInfo.nickname}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
              <div class="col-12">
                <label class="edit__label">نام کاربری (نمایشی) *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={useInfo.username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
                <span class="edit__help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div class="col-12">
                <label class="edit__label">آدرس ایمیل *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={useInfo.email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
            </div>
          </div>
          {/* <div class="edit__password">
            <span class="edit__password-title">تغییر گذرواژه</span>
            <div class="row">
              <div class="col-12">
                <label class="edit__label">تکرار گذرواژه جدید</label>
                <input
                  class="edit__input"
                  type="text"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="تکرار گذرواژه جدید"
                />
              </div>
            </div>
          </div>
          <button class="edit__btn" type="submit" onClick={editAccount}>
            ذخیره تغییرات
          </button> */}
        </form>
      </div>
    </div>
  );
}
