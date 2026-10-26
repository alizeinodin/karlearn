import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../Components/AdminPanel/Topbar/Topbar";

import "./index.css";
import { apiUrl } from "../../config";

export default function Index() {
  
  // useEffect(() => {
  //   fetch(apiUrl("/sanctum/csrf-cookie"),{headers:{
  //     Accept:'application/json'
  //   }})
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <>
      <div id="content">
        <Sidebar />

        <div id="home" class="col-10">
          <Topbar />

          <div class="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
