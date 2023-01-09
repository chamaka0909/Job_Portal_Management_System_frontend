import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function ViewPostedVacanciesModal(props) {
  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images/";

  const [adminStatusAccept] = useState("Approve");
  const [adminStatusDecline] = useState("Decline");
  console.log(props.jobId);

  const onAccept = (e) => {
    e.preventDefault();
    const data = {
      adminStatus: adminStatusAccept,
    };

    axios
      .put(`http://localhost:5000/vacancy/update/${props.jobId}`, data)
      .then((res) => {
        if (res.data.success) {
          swal("Vacancy Post Accepted", "", "success");
          setTimeout(() => {
            window.location = "/view/vacancy/admin";
          }, "3000");
        }
      });
  };

  const onDecline = (e) => {
    e.preventDefault();
    const data = {
      adminStatus: adminStatusDecline,
    };

    console.log(data);
    axios
      .put(`http://localhost:5000/vacancy/update/${props.jobId}`, data)
      .then((res) => {
        if (res.data.success) {
          swal("Vacancy Post Rejected", "", "warning");
          setTimeout(() => {
            window.location = "/view/vacancy/admin";
          }, "3000");
        }
      });
  };

  return (
    <div>
      <div className="container">
        <div className="modal" id="exampleModal">
          <div className="modal-dialog modal-dialog-scrollable modal-xl pb-5">
            <div className="modal-content ">
              <div className="modal-header">
                <div className="text-center">
                  <h3 className="modal-title">
                    {props.jobTitle} - {props.company}
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="my-2 mb-5">
                      <img
                        style={{ height: "100%", width: "100%" }}
                        name="photo"
                        src={imageBasePath + props.image}
                        alt="Not loaded"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="my-2">
                      <span className="fs-5 fw-bold">Position : </span>
                      <span className="fs-5 font-normal">{props.jobTitle}</span>
                    </div>
                    <div className="my-2">
                      <span className="fs-5 fw-bold">Company : </span>
                      <span className="fs-5 font-normal"> {props.company}</span>
                    </div>
                    <div className="my-2">
                      <span className="fs-5 fw-bold">No of Vacancy : </span>
                      <span className="fs-5 font-normal">
                        {props.noOfVacancy}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="fs-5 fw-bold">Job Type : </span>
                      <span className="fs-5 font-normal"> {props.jobType}</span>
                    </div>
                    <div className="my-2">
                      <span className="fs-5 fw-bold">Description : </span>
                      <span className="fs-5 font-normal">
                        {props.description}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="fs-5 fw-bold">Work Place Type : </span>
                      <span className="fs-5 font-normal">
                        {props.workPlaceType}
                      </span>
                    </div>
                    <div className="my-2">
                      <span className="fs-5 fw-bold">Location : </span>
                      <span className="fs-5 font-normal">{props.location}</span>
                    </div>
                    <div className="my-2 mb-5">
                      <span className="fs-5 fw-bold">
                        Application Closing Date :
                      </span>
                      <span className="fs-5 font-normal">
                        {props.closingDate}
                      </span>
                    </div>
                    <div className="text-center my-4">
                      <button
                        type="submit"
                        class="btn btn-outline-success col-md-4"
                        onClick={onAccept}
                      >
                        <i class="fa fa-check-circle"></i>&nbsp;Accept
                      </button>
                      &nbsp;&nbsp;
                      <button
                        type="submit"
                        class="btn btn-outline-danger col-md-4"
                        onClick={onDecline}
                      >
                        <i class="fa fa-times-circle"></i>&nbsp;Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
