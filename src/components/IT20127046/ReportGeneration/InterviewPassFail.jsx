import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { VictoryPie } from "victory-pie";
import { useReactToPrint } from "react-to-print";

export default function InterviewPassFail() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [interviews, setInterviews] = useState([]);
  const [noOfInterviews, setNoOfInterviews] = useState();
  const [passCount, setPassCount] = useState();
  const [failCount, setFailCount] = useState();
  const [myData, setMyData] = useState([{x: "Pass", y: 0}, {x: "Fail", y: 0}]);

  useEffect(() => {
    retriveInterviews();
    
  }, []);

  const retriveInterviews = () => {
    axios.get(`http://localhost:5000/interview/getAll`).then((res) => {
      if (res.data.success) {
        setInterviews(res.data.exsitingInterview);
      }
    });
  };

  const handleReport = () => {
    getNoOfInterviews();
  }

  const getNoOfInterviews = () => {
    let count = 0;
    let pass = 0;
    let fail = 0;

    interviews.map((interview) => {
      if (interview.status === "Pass"){
        pass++;
      } 
      else if (interview.status === "Fail"){
        fail++;
      } 
      count++;
    });

    setNoOfInterviews(count);
    setPassCount(pass);
    setFailCount(fail);

    setMyData([{x: "Pass", y: pass}, {x: "Fail", y: fail}]);
  };

  return (
    <div>
      <div>
      <button onClick={handleReport} className="btn btn-danger" style={{ marginLeft: "10px" }}>
        Generate Report
      </button>

      <button onClick={handlePrint} className="btn btn-dark" style={{ marginLeft: "10px" }}>
        Print
      </button>
      
      </div>
      
      <br />
      <br />
      <div ref={componentRef}>
        <div
          className="container"
          style={{ border: "1px solid black", padding: "10px" }}
        >
          <h4> Total Number of Interviews - {noOfInterviews}</h4>
          <hr />

          <div className="row">
            <div className="col">
              <center>
                <div
                  style={{ height: "450px", width: "500px" }}
                  className="rounded mx-auto d-block"
                >
                  <VictoryPie
                    data={myData}
                    colorScale={[
                      "#1cd0bb",
                      "#dfdfdf",
                    ]}
                    radius={100}
                  />
                </div>
              </center>
            </div>
            <div className="col">
              <br />
              <div style={{ border: "1px solid black", padding: "10px", maxWidth: "300px" }}>
                    <p><b>Report :</b> Interview Pass Fail Count</p>
                    <p><b>Month  :</b> October</p>
              </div>
              <br />
              <div class="alert alert-primary" role="alert" style={{ maxWidth: "300px" }}>
              <h6>Pass Count - {passCount}</h6>
              </div>
              <div class="alert alert-primary" role="alert" style={{ maxWidth: "300px" }}>
              <h6>Fail Count - {failCount}</h6>
              </div>
              
              
            </div>
          </div>

          <div className="container" style={{ maxWidth: "1000px" }}>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Applicant Name</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Data</th>
                  <th scope="col">Time</th>
                  <th scope="col">Mode</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {interviews
                  .slice(0)
                  .reverse()
                  .map((interview, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{interview.applicantName}</td>
                      <td>{interview.jobTitle}</td>
                      <td>{interview.interviewDate}</td>
                      <td>{interview.interviewTime}</td>
                      <td>{interview.interviewMode}</td>

                      {interview.status == "Fail" ? (
                        <p
                          style={{ margin: "10px" }}
                          className="badge bg-warning text-dark"
                        >
                          {interview.status}
                        </p>
                      ) : (
                        <p
                          style={{ margin: "10px" }}
                          className="badge bg-success text-white"
                        >
                          {interview.status}
                        </p>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
