/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNavBar from "../../IT20128036/admin/AdminNavBar";
import RightSidePanel from "../../IT20128036/admin/slideBar";
import ViewVacancyAdminModal from "../Admin/ViewVacancyAdminModal";

export default function ViewVacancy() {
  const [vacancy, setVacancy] = useState([]);
  const { id } = useParams();
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [location, setLocation] = useState("");
  const [noOfVacancy, setNoOfVacancy] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [closingDate, setClosingDate] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/vacancy/getAll`).then((response) => {
      setVacancy(response.data.exsitingVacancy);
    });
  }, []);

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

  const onDisplay = (
    jobId = id,
    jobTitle,
    company,
    workPlaceType,
    location,
    noOfVacancy,
    jobType,
    description,
    image,
    closingDate
  ) => {
    setJobId(jobId);
    setJobTitle(jobTitle);
    setCompany(company);
    setWorkPlaceType(workPlaceType);
    setLocation(location);
    setNoOfVacancy(noOfVacancy);
    setJobType(jobType);
    setDescription(description);
    setImage(image);
    setClosingDate(closingDate);
  };

  return (
    <div className="container">
      <br />
      <AdminNavBar />
      <ViewVacancyAdminModal
        jobId={jobId}
        jobTitle={jobTitle}
        company={company}
        workPlaceType={workPlaceType}
        location={location}
        noOfVacancy={noOfVacancy}
        jobType={jobType}
        description={description}
        image={image}
        closingDate={closingDate}
      />

      <br />

      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <RightSidePanel />
          </div>

          <div className="col-sm-9">
            <div className="row">
              <div className="col-lg-9 mt-2 mb-2">
                <h2>Vacancies Submitted For Approval</h2>
              </div>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control border border-dark"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => searchItems(e.target.value)}
                ></input>
              </div>

              <hr />

              <br />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Job Type</th>
                  <th scope="col">No of Vacancy</th>
                  <th scope="col">Closing Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {searchInput.length > 1
                  ? filteredResults.map((item, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td style={{ width: "15%" }}>{item.company}</td>
                          <td style={{ width: "15%" }}>{item.jobTitle}</td>
                          <td>{item.jobType}</td>
                          <td>{item.noOfVacancy}</td>
                          <td>{item.closingDate}</td>
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
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() =>
                                onDisplay(
                                  item._id,
                                  item.jobTitle,
                                  item.company,
                                  item.workPlaceType,
                                  item.location,
                                  item.noOfVacancy,
                                  item.jobType,
                                  item.description,
                                  item.image,
                                  item.closingDate
                                )
                              }
                            >
                              <i className="fa fa-eye"></i>&nbsp;View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : vacancy.map((item, index) => {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td style={{ width: "15%" }}>{item.company}</td>
                          <td style={{ width: "15%" }}>{item.jobTitle}</td>
                          <td>{item.jobType}</td>
                          <td className="text-center">{item.noOfVacancy}</td>
                          <td>{item.closingDate}</td>
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
                            <button
                              className="btn btn-outline-primary"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() =>
                                onDisplay(
                                  item._id,
                                  item.jobTitle,
                                  item.company,
                                  item.workPlaceType,
                                  item.location,
                                  item.noOfVacancy,
                                  item.jobType,
                                  item.description,
                                  item.image,
                                  item.closingDate
                                )
                              }
                            >
                              <i className="fa fa-eye"></i>&nbsp;View
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
