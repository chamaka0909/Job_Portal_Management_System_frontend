import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";
import jwt_decode from "jwt-decode";

export default function ViewSentAssessment() {
    const [sendAssessments, setSendAssessments] = useState([]);

    useEffect(() => {
      retriveSentAssessments();
    }, []);
  
    const retriveSentAssessments = () => {
      axios.get(`http://localhost:5000/sendAssessment/getAll`).then((res) => {
        if (res.data.success) {
            setSendAssessments(res.data.exsitingAssessment);
        }
      });
    };
  
    const onDelete = (id) => {
      swal({
        title: "Are you sure?",
        text: "Delete this Assessment?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`http://localhost:5000/assessment/delete/${id}`)
            .then((res) => {
              if (res.data.success) {
                window.location.reload();
              }
            });
        } else {
        }
      });
    };
    return (
      <div>
        <NavBar />
  
        <div className="backgroudImage">
          <div className="container mainBody">
            <br />
  
            <div className="row">
              <div className="float-left col-lg-9 mt-2 mb-2">
                &nbsp;
                <h3><i className="fa fa-handshake-o"></i> Sent Assessments</h3>
              </div>
              <div className="col-lg-3 mt-2 mb-2">
                &nbsp;
                <input
                  className="form-control border border-dark"
                  type="search"
                  placeholder="Search"
                ></input>
              </div>
              <hr />
            </div>
  
            <div className="container">
              <div>
                <a className="btn btn-dark" href="/assessment/recruiter">
                  <i className="fa fa-arrow-left"></i>&nbsp; Back
                </a>
              </div>
              <br />
  
              <div
                className="container bg-light shadow p-3 mb-5 rounded mt-3"
                style={{ borderRadius: "8px" }}
              >
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Applicant ID</th>
                      <th scope="col">Applicant Name</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Assessment Name</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sendAssessments.slice(0).reverse().map((assessment, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{assessment.applicantId}</td>
                        <td>{assessment.applicantName}</td>
                        <td>{assessment.jobTitle}</td>
                        <td>{assessment.assessmentName}</td>
                        <td>{assessment.answer}</td>
                        
                        <td className="text-center">
                          <button
                            className="btn btn-danger"
                            type="submit"
                            onClick={() => onDelete(assessment._id)}
                          >
                            <i className="fa fa-trash"></i> Delete
                          </button>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
