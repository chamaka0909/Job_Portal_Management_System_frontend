import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function RecruiterView() {
  let navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    document.title = "Interviews";

    // redirect to the login page if the user is not logged in
    if (!localStorage.userToken) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          navigate(`/user/login`);
          window.location.reload(false);
        }
      });
    }

    retriveInterviews();
  }, []);

  const retriveInterviews = () => {
    axios.get(`http://localhost:5000/interview/getAll`).then((res) => {
      if (res.data.success) {
        setInterviews(res.data.exsitingInterview);
        setFilteredResults(res.data.exsitingInterview);
        console.log(res.data.exsitingInterview);
      }
    });
  };

  const onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Cancel the interview?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/interview/delete/${id}`)
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
      const filteredData = interviews.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(interviews);
    }
  };

  const TableBody = (props) => {
    return (
      <tbody>
        {props.mapArray.slice(0).reverse().map((interview, index) => (
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

              <td className="text-center">
                <a
                  className="btn btn-success "
                  href={`/interview/view/${interview._id}`}
                >
                  <i className="fa fa-info-circle"></i> View
                </a>
              </td>
              <td className="text-center">
                <a
                  className="btn btn-success "
                  href={`/interview/update/${interview._id}`}
                >
                  <i className="fa fa-edit"></i> Edit
                </a>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  type="submit"
                  onClick={() => onDelete(interview._id)}
                >
                  <i className="fa fa-trash"></i> Cancel
                </button>
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
              <h3>
                <i className="fa fa-handshake-o"></i> Scheduled Interviews
              </h3>
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
              <a className="btn btn-dark" href="/assessment/recruiter">
                <i className="fa fa-file"></i>&nbsp; Manage Assessment
              </a>

              <a
                className="btn btn-primary"
                style={{ marginLeft: "10px" }}
                href="/interview/schdule"
              >
                <i className="fa fa-plus"></i>&nbsp; Schedule New Interview
              </a>

              <a
                className="btn btn-warning"
                style={{ marginLeft: "10px" }}
                href="/generateReport/interview"
              >
                <i className="fa fa-bar-chart"></i>&nbsp; Genarate Reports
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
                    <th scope="col">Applicant Name</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Data</th>
                    <th scope="col">Time</th>
                    <th scope="col">Mode</th>
                    <th scope="col">Status</th>
                    <th scope="col">View</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Cancel</th>
                  </tr>
                </thead>

                {search.length > 1 ? (
                  <TableBody mapArray={filteredResults} />
                ) : (
                  <TableBody mapArray={interviews} />
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
