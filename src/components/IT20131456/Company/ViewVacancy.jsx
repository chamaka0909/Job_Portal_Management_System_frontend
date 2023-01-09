/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import CreateVacancy from "./CreateVacancyModal";
import NavBar from "../../IT20128036/NavBar";
import image from "../../../images/back1.jpg";

export default function ViewVacancy() {
  const [vacancy, setVacancy] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const userToken = localStorage.userToken;
    const decoded = jwt_decode(userToken);
    setCompanyName(decoded.name);
    let name = companyName;

    axios
      .get(`http://localhost:5000/vacancy/get/name/${name}`)
      .then((response) => {
        setVacancy(response.data.exsitingVacancies);
      });
  }, [companyName]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:5000/vacancy/delete/${id}`).then((res) => {
      if (res.data.success) {
        swal("Are you sure to delete the vacancy?", "", "warning");
      }
      setTimeout(() => {
        window.location.reload();
      }, "6000");
    });
  };
  //search record

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = vacancy.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(vacancy);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="jumbotron"
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingBottom: "50px",
          paddingTop: "10px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          margin: "0px 0px 0px 0px",
          height: "120vh",
          borderTop: "5px solid black",
        }}
      >
        <div
          className="jumbotron"
          style={{ background: "white", minHeight: "100vh" }}
        >
          <br />

          <div className="container px-5 mb-5">
            <div className="row">
              <div className="float-left col-lg-9 mt-2 mb-2">
                &nbsp;
                <h2>Posted Vacancies - {companyName.toUpperCase()}</h2>
              </div>
              <div className="col-lg-3 mt-2 mb-2">
                &nbsp;
                <input
                  className="form-control border border-dark"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => searchItems(e.target.value)}
                ></input>
              </div>

              <hr />
            </div>
            <div>
              <CreateVacancy />
            </div>
            &nbsp;
            <table className="table table-striped shadow table-bordered ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Job ID</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Job Type</th>
                  <th scope="col" style={{ width: "10%" }}>
                    Closing Date
                  </th>
                  <th scope="col" style={{ width: "12%" }}>
                    No of Vacancy
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col" style={{ width: "20%" }}>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {searchInput.length > 1
                  ? filteredResults.map((item, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{item.jobId}</td>
                          <td>{item.jobTitle}</td>
                          <td>{item.jobType}</td>
                          <td>{item.closingDate}</td>
                          <td>{item.noOfVacancy}</td>
                          <td
                            style={{ marginLeft: "20%", marginTop: "10%" }}
                            className={
                              item.adminStatus == "Pending"
                                ? "badge bg-warning text-dark"
                                : item.adminStatus == "Approve"
                                ? "badge bg-success text-white"
                                : item.adminStatus == "Decline"
                                ? "badge bg-danger text-white"
                                : item.adminStatus == "Modified"
                                ? "badge bg-secondary text-white"
                                : ""
                            }
                          >
                            {item.adminStatus}
                          </td>
                          <td className="text-center">
                            <a
                              className="btn btn-outline-success "
                              href={`/update/vacancy/${item._id}`}
                            >
                              <i className="fa fa-edit"></i>&nbsp;Edit
                            </a>
                            &nbsp; &nbsp; &nbsp;
                            <button
                              className="btn btn-outline-danger"
                              type="submit"
                              onClick={() => onDelete(item._id)}
                            >
                              <i className="fa fa-trash"></i>&nbsp;Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : vacancy.map((item, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{item.jobId}</td>
                          <td>{item.jobTitle}</td>
                          <td>{item.jobType}</td>
                          <td>{item.closingDate}</td>
                          <td>{item.noOfVacancy}</td>
                          <td
                            style={{ marginLeft: "20%", marginTop: "10%" }}
                            className={
                              item.adminStatus == "Pending"
                                ? "badge bg-warning text-dark"
                                : item.adminStatus == "Approve"
                                ? "badge bg-success text-white"
                                : item.adminStatus == "Decline"
                                ? "badge bg-danger text-white"
                                : item.adminStatus == "Modified"
                                ? "badge bg-secondary text-white"
                                : ""
                            }
                          >
                            {item.adminStatus}
                          </td>
                          <td className="text-center">
                            <a
                              className="btn btn-success "
                              href={`/update/vacancy/${item._id}`}
                            >
                              <i className="fa fa-edit"></i>&nbsp;Edit
                            </a>
                            &nbsp; &nbsp; &nbsp;
                            <button
                              className="btn btn-danger"
                              type="submit"
                              onClick={() => onDelete(item._id)}
                            >
                              <i className="fa fa-trash"></i>&nbsp;Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
