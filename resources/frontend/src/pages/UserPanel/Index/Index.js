import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/authContext";
import IndexBox from "../../../Components/UserPanel/IndexBox/IndexBox";
import { apiUrl } from "../../../config";

export default function Index() {
  const authContext = useContext(AuthContext);
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

  return (
    <div class="col-9">
      <div class="main">
        <div class="main__title">
          <span class="main__title-text">
            سلام <span class="main__title-name">{useInfo.nickname}</span>، به
            پنل کاربری خوش اومدی
          </span>
        </div>
        <p class="main__desc">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div class="main__links">
          <div class="row">
            <IndexBox title="دوره های خریداری شده" href="buyed" />
            <IndexBox title="جزئیات حساب کاربری" href="infos" />
          </div>
        </div>
      </div>
    </div>
  );
}
