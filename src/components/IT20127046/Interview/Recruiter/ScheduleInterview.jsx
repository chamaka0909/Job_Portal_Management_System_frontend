import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Main.css";
import swal from "sweetalert";
import NavBar from "../../../IT20128036/NavBar";
import jwt_decode from 'jwt-decode';

export default function ScheduleInterview() {
  
  const { id } = useParams();
  const { role } = useParams();
  const { name } = useParams();

  const [recruiterId, setRecruiterId] = useState("00");
  const [applicantId, setApplicantId] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewMode, setInterviewMode] = useState("");
  const [status, setStatus] = useState("Pending");

  const [fromValidate, setFromValidate] = useState("");
  const [validateAlert, setValidateAlert] = useState(false);

  useEffect(() => {
    document.title = "SchduleInterview";

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setRecruiterId(decoded._id);
    setApplicantId(id);
    setApplicantName(name);
    setJobTitle(role);
    setDescription("Dear Candidate, Software engineering is a systematic engineering approach to software development. A software engineer is a person who applies the principles of software engineering to design, develop, maintain, test, and evaluate computer software. Software engineering is a systematic engineering approach to software development. A software engineer is a person who applies the principles of software engineering to design, develop, maintain, test, and evaluate computer software. Meeting Link - https://zoom.us/24842 Thank You!");

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(applicantId === undefined || 
        applicantName === undefined || 
        jobTitle === '' || 
        interviewDate === '' || 
        interviewTime === '' ||
        interviewMode === ''
      ){
        setValidateAlert(true);
        setFromValidate("Please Input Required Fields");
    }
    else if(validateInterviewDate(interviewDate)){
      setValidateAlert(true);
      setFromValidate("Plase Input Valid Interview Date");
    }else {
      const data = {
        recruiterId: recruiterId,
        applicantId: applicantId,
        applicantName: applicantName,
        jobTitle: jobTitle,
        description: description,
        interviewDate: interviewDate,
        interviewTime: interviewTime,
        interviewMode: interviewMode,
        status: status,
      };
  
      saveInterview(data);
    }

  };

  // Validate interview date
  const validateInterviewDate = (interviewDate) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    let date1 = new Date(interviewDate).getTime();
    let date2 = new Date(today).getTime();

    if (date1 < date2){
      return true;
    }
    return false;
  }

  const saveInterview = (data) => {
    console.log(data);
    axios.post(`http://localhost:5000/interview/add`, data).then((res) => {
      if (res.data.success) {
        swal("Success!", "Details Addedd Successfull", "success")
          .then((value) => {
            window.location = "/interview/recruiter";
          });
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
            <i className="fa fa-plus"></i> Schedule a Interview
          </h4>
          <hr />

          <div>
            <div className="container bg-light shadow p-3 mb-5  rounded mt-3 col-lg-10 ">
              {validateAlert ? <p>
                <div class="alert alert-danger" role="alert">{fromValidate}</div>
              </p> : <p></p>}
            
              <form onSubmit={handleSubmit}>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Applicant ID*</strong>
                      <input
                        type="text"
                        className="form-control bg-light"
                        name="applicantId"
                        value={applicantId}
                        onChange={(e) => setApplicantId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Applicant Name*</strong>
                      <input
                        type="text"
                        className="form-control bg-light"
                        name="applicantName"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                &nbsp;
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Job Title*</strong>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        placeholder="Enter job title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Interview Mode*</strong>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="interviewMode"
                        value={interviewMode}
                        onChange={(e) => {
                          setInterviewMode(e.target.value);
                        }}
                      >
                        <option defaultValue>Select Mode</option>
                        <option value="Online">Online</option>
                        <option value="Physical">Physical</option>
                      </select>
                    </div>
                  </div>
                </div>
                &nbsp;
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Interview Date*</strong>
                      <input
                        type="date"
                        className="form-control"
                        name="interviewDate"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Interview Time*</strong>
                      <input
                        type="time"
                        className="form-control"
                        name="interviewTime"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                      />
                    </div>
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
                <div className=" my-3">
                  <div className="form-group ">
                    <a
                      className="btn btn-outline-primary col-md-2"
                      href={"/interview/recruiter"}
                    >
                      <i class="fa fa-arrow-left"></i>&nbsp;Back
                    </a>{" "}
                    &nbsp;
                    <button
                      className="btn btn-success col-md-2"
                      
                      type="submit"
                    >
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
