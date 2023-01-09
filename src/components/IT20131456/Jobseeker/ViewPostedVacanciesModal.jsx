import React from "react";

export default function ViewPostedVacanciesModal(props) {
  const onNavigate = () => {
    window.location = `/application/${props.jobId}`;
  };

  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images/";

  return (
    <div>
      <div className="container">
        <div className="modal" id="exampleModal">
          <div className="modal-dialog modal-dialog-scrollable modal-lg pb-5">
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
                <div className="my-2 mb-5">
                  <img
                    style={{ height: "100%", width: "100%" }}
                    name="photo"
                    src={imageBasePath + props.image}
                    alt=""
                  />
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">Position : </span>
                  <span className="fs-5 font-normal"> {props.jobTitle}</span>
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">Company : </span>
                  <span className="fs-5 font-normal"> {props.company}</span>
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">No of Vacancy : </span>
                  <span className="fs-5 font-normal"> {props.noOfVacancy}</span>
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">Job Type : </span>
                  <span className="fs-5 font-normal"> {props.jobType}</span>
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">Description : </span>
                  <span className="fs-5 font-normal"> {props.description}</span>
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">Work Place Type : </span>
                  <span className="fs-5 font-normal">
                    {" "}
                    {props.workPlaceType}
                  </span>
                </div>
                <div className="my-2">
                  <span className="fs-5 fw-bold">Location : </span>
                  <span className="fs-5 font-normal"> {props.location}</span>
                </div>
                <div className="my-2 mb-5">
                  <span className="fs-5 fw-bold">
                    Application Closing Date :
                  </span>
                  <span className="fs-5 font-normal"> {props.closingDate}</span>
                </div>
                <div className="text-center ">
                  <button
                    className="btn btn-primary col-md-5 my-3"
                    onClick={() => onNavigate()}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
