import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Main.css";
import swal from "sweetalert";
import NavBar from "../../../IT20128036/NavBar";
import jwt_decode from "jwt-decode";

export default function SendAssessment() {
  const { id } = useParams();

  const [recruiterId, setRecruiterId] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [assessmentId, setAssessmentId] = useState("");
  const [assessmentName, setAssessmentName] = useState("");
  const [answer, setAnswer] = useState("");

  const [jobSekeer, setJobSekeer] = useState([]);

  useEffect(() => {
    document.title = "SendAssessment";

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setRecruiterId(decoded._id);

    retriveAssessment(id);
    retriveJobSeekers();
  }, []);

  const retriveAssessment = (id) => {
    axios.get(`http://localhost:5000/assessment/get/${id}`).then((res) => {
      if (res.data.success) {
        setAssessmentName(res.data.exsitingAssessment.title);
        setAssessmentId(res.data.exsitingAssessment._id);
        setJobTitle(res.data.exsitingAssessment.jobTitle);
      }
    });
  };

  const retriveJobSeekers = () => {
    axios.get(`http://localhost:5000/interview/getAll`).then((res) => {
      if (res.data.success) {
        setJobSekeer(res.data.exsitingInterview);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      recruiterId: recruiterId,
      applicantId: applicantId,
      applicantName: applicantName,
      jobTitle: jobTitle,
      assessmentId: assessmentId,
      assessmentName: assessmentName,
      answer: answer,
    };

    sendAssessment(data);
  };

  const sendAssessment = (data) => {
    console.log(data);
    axios.post(`http://localhost:5000/sendAssessment/add`, data).then((res) => {
      if (res.data.success) {
        swal("Success!", "Assessment Send Successfull", "success").then(
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
            <i className="fa fa-plus"></i> Send Assessment
          </h4>
          <hr />

          <div>
            <div className="container bg-light shadow p-3 mb-5  rounded mt-3 col-lg-5 ">
              <form onSubmit={handleSubmit}>
                <div className="col">
                  <div className="form-group">
                    <strong>Job Title </strong>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="col">
                  <div className="form-group">
                    <strong>Assessment</strong>
                    <input
                      type="text"
                      className="form-control"
                      name="jobTitle"
                      value={assessmentName}
                      onChange={(e) => setAssessmentName(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="col">
                  <div className="form-group">
                    <strong>Select Job Seeker</strong>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setApplicantId(e.target.value)}
                    >
                      <option selected>Select Job Seeker</option>
                      {jobSekeer.map((jobseeker, index) => (
                        <option value={jobseeker.applicantId}>
                          {jobseeker.applicantName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                &nbsp;
                <div className="my-3">
                  <div className="form-group ">
                    <a
                      className="btn btn-outline-primary col-md-2"
                      href={"/assessment/recruiter"}
                    >
                      <i class="fa fa-arrow-left"></i>&nbsp;Back
                    </a>{" "}
                    &nbsp;
                    <button className="btn btn-success col-md-2" type="submit">
                      Send
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
