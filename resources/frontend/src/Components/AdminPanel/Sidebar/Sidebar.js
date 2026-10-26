import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import swal from "sweetalert";

import "./Sidebar.css";
import { apiUrl } from "../../../config";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutAdmin = (event) => {
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
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="sessions">
              <span>جلسات</span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>کامنت‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="category">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          {/* <li>
            <Link to="contacts">
              <span>پیغام‌ها</span>
            </Link>
          </li> */}
          <li>
            <a href="#" onClick={logoutAdmin}>
              <span>خروج</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
