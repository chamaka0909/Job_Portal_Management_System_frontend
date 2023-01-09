import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Main.css";
import swal from "sweetalert";
import NavBar from "../../../IT20128036/NavBar";
import jwt_decode from "jwt-decode";

export default function AddAssessment() {
  const [recruiterId, setRecruiterId] = useState("");
  const [title, setTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");

  const [fromValidate, setFromValidate] = useState("");
  const [validateAlert, setValidateAlert] = useState(false);

  useEffect(() => {
    document.title = "AddAssessment";

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setRecruiterId(decoded._id);
    setJobTitle("Software Engineer");
    setDescription(
      "Dear Candidate, Software engineering is a systematic engineering approach to software development. A software engineer is a person who applies the principles of software engineering to design, develop, maintain, test, and evaluate computer software. Software engineering is a systematic engineering approach to software development. A software engineer is a person who applies the principles of software engineering to design, develop, maintain, test, and evaluate computer software. Meeting Link - https://zoom.us/24842 Thank You!"
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if( title === '' || 
        jobTitle === ''
    ){
      setValidateAlert(true);
      setFromValidate("Please Input Required Fields");
    }
    else {
      const data = {
        recruiterId: recruiterId,
        title: title,
        jobTitle: jobTitle,
        description: description,
        driveLink: driveLink,
      };
  
      saveAssessment(data);
    }

  };

  const saveAssessment = (data) => {
    console.log(data);
    axios.post(`http://localhost:5000/assessment/add`, data).then((res) => {
      if (res.data.success) {
        swal("Success!", "Assessment Addedd Successfull", "success").then(
          (value) => {
            window.location = "/assessment/recruiter";
          }
        );
      }
    });
  };

  return (
    <div>
      <NavBar />

      <div className="backgroudImage">
        <div className="container mainBody">
          <br />

          <h4>
            <i className="fa fa-plus"></i> Add a New Assessment
          </h4>
          <hr />

          <div>
            <div className="container bg-light shadow p-3 mb-5  rounded mt-3 col-lg-10 ">
            {validateAlert ? <p>
                <div class="alert alert-danger" role="alert">{fromValidate}</div>
              </p> : <p></p>}
              <form onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <div className="form-group">
                    <strong>Title*</strong>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;

                <div className="col-md-6">
                  <div className="form-group">
                    <strong>Job Title*</strong>
                    <input
                      type="text"
                      className="form-control"
                      name="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;

                <div className="form-group">
                  <strong>Description</strong>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                &nbsp;

                <div className="col-md-6">
                  <div className="form-group">
                    <strong>Drive Link</strong>
                    <input
                      type="text"
                      className="form-control"
                      name="driveLink"
                      value={driveLink}
                      onChange={(e) => setDriveLink(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;

                <div className=" my-3">
                  <div className="form-group ">
                    <a
                      className="btn btn-outline-primary col-md-2"
                      href={"/assessment/recruiter"}
                    >
                      <i class="fa fa-arrow-left"></i>&nbsp;Back
                    </a>{" "}
                    &nbsp;
                    <button className="btn btn-success col-md-2" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
