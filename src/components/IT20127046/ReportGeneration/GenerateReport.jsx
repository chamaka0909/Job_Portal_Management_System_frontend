import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../../IT20127046/Main.css";
import NavBar from "../../IT20128036/NavBar";
import jwt_decode from 'jwt-decode';

import InterviewPassFail from './InterviewPassFail';

export default function GenerateReport() {
    const [interviews, setInterviews] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const [interviewPassFailComponent, setInterviewPassFailComponent] = useState(false);
  
    useEffect(() => {
      retriveInterviews();
    }, []);
    
  
    const retriveInterviews = () => {
      axios.get(`http://localhost:5000/interview/getAll`).then((res) => {
        if (res.data.success) {
          setInterviews(res.data.exsitingInterview);
          console.log(res.data.exsitingInterview);
        }
      });
    };

    const handleInterviewReport = () => {
      setInterviewPassFailComponent(true);
    }

    return (
      <div>
        <NavBar />
  
        <div className="backgroudImage">
          <div className="container mainBody">
            <br />
  
            <div className="row">
              <div className="float-left col-lg-9 mt-2 mb-2">
                &nbsp;
                <h3><i className="fa fa-bar-chart"></i> Generate Reports</h3>
              </div>
              
              <hr />
            </div>
  
            <div className="container">
              <div>
                <a className="btn btn-dark" href="/interview/recruiter">
                  <i className="fa fa-arrow-left"></i>&nbsp; Back
                </a>
  
                <a className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={handleInterviewReport}>
                  <i className="fa fa-"></i>&nbsp; Get Interview Pass Fail Count Report
                </a>
  
              </div>
              <br />
  
              <div
                className="container bg-light shadow p-3 mb-5 rounded mt-3"
                style={{ borderRadius: "8px" }}
              >
                {interviewPassFailComponent ? <InterviewPassFail /> : <div></div>}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
