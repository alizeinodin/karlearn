import React, { useContext } from "react";
import AuthContext from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { apiUrl } from "../../../config";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();

    swal({
      title: "آیا از خروج اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      fetch(apiUrl("/logout"), {
        method: "post",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user") || "null")?.token
          }`,
        },
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "با موفقیت خارج شدید",
            icon: "success",
            buttons: "اوکی",
          }).then(() => {
            authContext.logout();
            localStorage.setItem("user", JSON.stringify({ token: "" }));
            navigate("/");
          });
        }
      });
    });
  };

  return (
    <div class="col-3">
      <div class="sidebar">
        {/* <span class="sidebar__name">کاربر</span> */}
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <Link class="sidebar__link" to="/my-account">
              پیشخوان
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="orders">
              سفارش‌ها
            </Link>
          </li>

          <li class="sidebar__item">
            <Link class="sidebar__link" to="edit-account">
              جزئیات حساب کاربری
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="buyed">
              دوره های خریداری شده
            </Link>
          </li>

          <li class="sidebar__item" onClick={logoutUser}>
            <b class="sidebar__link" href="#">
              خروج از سیستم
            </b>
          </li>
        </ul>
      </div>
    </div>
  );
}
