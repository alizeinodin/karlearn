import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import Input from "../../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../validators/rules";
import { useForm } from "./../../../hooks/useForm";
import swal from "sweetalert";
import Cookies from "js-cookie";
import "./Category.css";
import axios from "axios";
import { apiUrl } from "../../../config";
export default function Category() {
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortname: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    fetch(apiUrl(`/categories`))
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories.content.data);
      });
  }

  const createNewCategory = (event) => {
    event.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");

    const newCategoryInfo = {
      title: formState.inputs.title.value,
    };
    fetch(apiUrl("/categories"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCategories();
        });
      })
      .catch((err) => console.log(err));
  };

  const removeCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    swal({
      title: "آیا از حذف دسته بندی اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(apiUrl(`/categories/${categoryID}`), {
          method: "DELETE",
          // headers: {
          //   Authorization: `Bearer ${localStorageData.token}`,
          // },
        })
          .then((res) => res.json())
          .catch((result) => {
            getAllCategories();
          });
      }
    });
  };

  const updateCategory = (categoryID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "null");
    swal({
      title: "عنوان جدید دسته بندی را وارد نمایید",
      content: "input",
      buttons: "ثبت عنوان جدید",
    }).then((result) => {
      if (result.trim().length) {
        fetch(apiUrl(`/categories/${categoryID}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorageData.token}`,
          },
          body: JSON.stringify({
            title: result,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            swal({
              title: "دسته بندی مورد نظر با موفقیت ویرایش شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCategories();
            });
          });
      }
    });
  };

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">عنوان</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="title"
                  placeholder="لطفا عنوان را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              {/* <div class="name input">
                <label class="input-title">اسم کوتاه</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="shortname"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  validations={[minValidator(5), maxValidator(20)]}
                />
                <span class="error-message text-danger"></span>
              </div> */}
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دسته‌بندی‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => updateCategory(category.id)}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCategory(category.id)}
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
