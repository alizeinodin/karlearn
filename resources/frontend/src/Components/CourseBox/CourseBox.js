import React, { useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./CourseBox.css";
import { assetUrl } from "../../config";

export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImageLoaded = () => setIsImgShow(true);

  const onImageError = () => {
    // Codes
  };

  return (
    <div className="col-4" style={{ width: `${props.isSlider && "100%"}`}}>
      <div className="course-box">
        <Link to={`/course-info/${props.id}`}>
          <img
            src={assetUrl(props.index_img)}
            alt="Course img"
            className="course-box__img"
            onLoad={onImageLoaded}
            onError={onImageError}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link to={`/course-info/${props.id}`} className="course-box__title">
            {props.title}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">
                {"محمد امین سعیدی راد"}
              </a>
            </div>
            <div className="course-box__rating">
              {Array(5 - 5)
                .fill(0)
                .map((item) => (
                  <img
                    src="/images/svgs/star.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
              {Array(5)
                .fill(0)
                .map((item) => (
                  <img
                    src="/images/svgs/star_fill.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{110}</span>
            </div>
            <span className="course-box__price">
              {props.price === 0 ? "رایگان" : props.price}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link
            to={`/course-info/${props.id}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
        {/* {props.price !== 0 && props.discount && ( */}
        <span class="courses-box__discount">%10</span>
        {/* )} */}
      </div>
    </div>
  );
}
