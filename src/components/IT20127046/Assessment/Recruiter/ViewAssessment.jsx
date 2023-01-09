import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";
import jwt_decode from "jwt-decode";

export default function ViewAssessment() {

  const [assessments, setAssessments] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    retriveAssessments();
  }, []);

  const retriveAssessments = () => {
    axios.get(`http://localhost:5000/assessment/getAll`).then((res) => {
      if (res.data.success) {
        setAssessments(res.data.exsitingAssessment);
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

  const searchInterviews = (searchValue) => {
    setSearch(searchValue);
    if (search !== "") {
      const filteredData = assessments.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(assessments);
    }
  };

  const TableBody = (props) => {
    return (
      <tbody>
                  {props.mapArray.slice(0).reverse().map((assessment, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{assessment.title}</td>
                      <td>{assessment.jobTitle}</td>
                      <td>{assessment.description}</td>
                      <td>{assessment.driveLink}</td>
                      
                      <td className="text-center">
                        <a
                          className="btn btn-success "
                          href={`/assessment/update/${assessment._id}`}
                        >
                          <i className="fa fa-edit"></i> Edit
                        </a>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          type="submit"
                          onClick={() => onDelete(assessment._id)}
                        >
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </td>
                      <td className="text-center">
                        <a
                          className="btn btn-success "
                          href={`/assessment/send/${assessment._id}`}
                        >
                          <i className="fa fa-arrow"></i> Send
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
    );
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
              <h3><i className="fa fa-file"></i> Added Assessments</h3>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              &nbsp;
              <input
                className="form-control border border-dark"
                type="search"
                placeholder="Search"
                onChange={(e) => searchInterviews(e.target.value)}
              ></input>
            </div>
            <hr />
          </div>

          <div className="container">
            <div>
              <a className="btn btn-dark" href="/interview/recruiter">
                <i className="fa fa-handshake-o"></i>&nbsp; Manage Interviews
              </a>

              <a className="btn btn-success" style={{ marginLeft: "10px" }} href="/sendAssessment/recruiter/view">
                <i className="fa fa-file"></i>&nbsp; View Send Assessments
              </a>

              <a className="btn btn-primary" style={{ marginLeft: "10px" }} href="/assessment/add">
                <i className="fa fa-plus"></i>&nbsp; Add New Assessment
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
                    <th scope="col">Title</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Drive Link</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Send</th>
                  </tr>
                </thead>

                {search.length > 1 ? (
                  <TableBody mapArray={filteredResults} />
                ) : (
                  <TableBody mapArray={assessments} />
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
