import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";

export default function ViewAssessmentJobSeeker() {
  const [assessments, setAssessments] = useState([]);
  const [AddedAssessments, setAddedAssessments] = useState([]);
  const [applicantId, setApplicantId] = useState("01");
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");

  useEffect(() => {
    retriveJobSeekerAssessments();
    retriveAssessments();
  }, []);

  const retriveJobSeekerAssessments = () => {
    axios.get(`http://localhost:5000/sendAssessment/getAll`).then((res) => {
      if (res.data.success) {
        setAssessments(res.data.exsitingAssessment);
      }
    });
  };

  const retriveAssessments = () => {
    axios.get(`http://localhost:5000/assessment/getAll`).then((res) => {
      if (res.data.success) {
        setAddedAssessments(res.data.exsitingAssessment);
        console.log(res.data.exsitingAssessment);
      }
    });
  };

  const expendSection = (userInterview) => {
    if (selected === userInterview) {
      return setSelected(null);
    }

    setSelected(userInterview);
  };

  const handleSendAnswer = (e) => {
    e.preventDefault();

    const answerData = {
      answer: answer
    }

    console.log(answerData);

    axios.put(`http://localhost:5000/sendAssessment/update/${answerId}`, answerData).then((res) => {
        if (res.data.success) {
          swal("Success!", "Send Successfull", "success");
        }
      });
  }

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
              <i className="fa fa-handshake-o"></i> My Assessments
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
                      <a
                        className="btn btn-outline-success"
                        style={{ margin: "0 10px 10px 10px" }}
                        href="/interview/jobseeker/notification"
                      >
                        <i className="fa fa-bell"></i>
                      </a>
                    </center>
                  </div>
                  <div className="col-9">
                    <center>
                      <a
                        className="btn btn-outline-success"
                        style={{ margin: "0 10px 10px 10px" }}
                        href="/interview/jobseeker"
                      >
                        <i className="fa fa-document"></i>&nbsp; My Interviews
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
                    {assessments.map((interview, index) => (
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
                  {assessments.map((userInterview, index) => (
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
                          <div
                            className="bg-light shadow p-3 mb-5  rounded"
                            style={moreDetailsSection}
                          >
                            <div className="row">
                              <div className="col">
                                <p>
                                  <b>Assessment</b> -{" "}
                                  {userInterview.assessmentName}
                                </p>
                                <p>
                                  <b>About</b> -
                                  {AddedAssessments.map((assess) => {
                                    if (userInterview.assessmentName ===assess.title) {
                                      return <p>{assess.description}</p>;
                                    }
                                  })}
                                </p>
                              </div>
                            </div>

                            <b>Send Solutions &nbsp;</b>
                            <br/>
                            <form onSubmit={handleSendAnswer}>
                              <div className="">
                                <div className="form-group">
                                  <div className="container">
                                    <strong>Answers </strong>
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      name="answer"
                                      value={answer}
                                      onChange={(e) => setAnswer(e.target.value)}
                                    />
                                    <br/>
                                    <button className="btn btn-outline-success" onClick={()=> setAnswerId(userInterview._id)}> Send </button>
                                  </div>
                                </div>
                                
                            </div>
                            </form>
                            
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
