import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";

export default function JobSeekerView() {
  const [interviews, setInterviews] = useState([]);
  const [applicantId, setApplicantId] = useState("01");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    retriveJobSeekerInterviews();
  }, []);

  const retriveJobSeekerInterviews = () => {
    axios.get(`http://localhost:5000/interview/getAll`).then((res) => {
      if (res.data.success) {
        setInterviews(res.data.exsitingInterview);
      }
    });
  };

  const expendSection = (userInterview) => {
    if (selected === userInterview) {
      return setSelected(null);
    }

    setSelected(userInterview);
  };

  const searchPanel = {
    border: "none",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "10px",
  };

  const mianPanel = {
    border: "none",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "10px",
  };

  const titleSection = {
    margin: "20px 40px 20px 40px",
  };

  const titleBar = {
    backgroundColor: "DodgerBlue",
    color: "white",
    padding: "10px",
    fontFamily: "Sans-Serif",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "5px 5px 0 0",
  };

  const moreDetailsSection = {
    
    padding: "10px",
    borderRadius: "0 0 5px 5px",
  };

  return (
    <div>
      <NavBar />

      <div className="backgroudImage">
        <div className="container mainBody">
          <br />

          <center>
            <h4>
              <i className="fa fa-handshake-o"></i> My Interviews
            </h4>
          </center>

          <hr />

          <div
            className="container bg-light shadow p-3 mb-5 rounded mt-3"
            style={{ borderRadius: "8px" }}
          >

            <div className="row">
              <div className="col-3">
                <div className="row">
                  <div className="col-3">
                  <center>
                  <a className="btn btn-outline-success" style={{ margin: "0 10px 10px 10px" }} href="/interview/jobseeker/notification">
                    <i className="fa fa-bell"></i>
                  </a>
                </center>
                  </div>
                  <div className="col-9">
                  <center>
                  <a className="btn btn-outline-success" style={{ margin: "0 10px 10px 10px" }} href="/sendAssessment/jobseeker">
                    <i className="fa fa-document"></i>&nbsp; My Assessments
                  </a>
                </center>
                  </div>
                </div>
                
              
                <div className="container" style={searchPanel}>

                  <center>
                    <h5>Your Job Roles</h5>
                  </center>

                  <br />
                  <div>
                    {interviews.map((interview, index) => (
                      <div key={index}>
                        <button className="btn btn-outline-primary mb-2">
                          {interview.jobTitle}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-9">
                <div className="row">
                  <div className="btn-group mb-2">
                    <a
                      href="#"
                      className="btn btn-outline-dark"
                      aria-current="page"
                    >
                      All
                    </a>
                  </div>
                  <br />
                </div>

                <div className="container" style={mianPanel}>
                  {interviews.map((userInterview, index) => (
                    <div style={titleSection}>
                      <div
                        style={titleBar}
                        onClick={() => expendSection(userInterview)}
                      >
                        <h5> IFS - {userInterview.jobTitle}</h5>
                        <span>{selected === userInterview ? "-" : "+"}</span>
                      </div>
                      <div>
                        {selected === userInterview ? (
                          <div className="bg-light shadow p-3 mb-5  rounded" style={moreDetailsSection}>
                            <div className="row">
                              <div className="col">
                                <p>
                                  <b>Date</b> - {userInterview.interviewDate}
                                </p>
                                <p>
                                  <b>Time</b> - {userInterview.interviewTime}
                                </p>
                              </div>
                              <div className="col">
                                <p>
                                  <b>Mode</b> - {userInterview.interviewMode}
                                </p>

                              </div>
                              <div>
                                <p>{userInterview.description}</p>
                              </div>
                            </div>

                            <b>Send Response &nbsp;</b>
                            <div className="btn-group">
                              <button className="btn btn-outline-primary">
                                Yes
                              </button>
                              <button className="btn btn-outline-primary">
                                Maybe
                              </button>
                              <button className="btn btn-outline-primary">
                                No
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
