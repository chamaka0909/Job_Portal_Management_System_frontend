/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useReactToPrint } from "react-to-print";
import image from "../../../images/back1.jpg";
import NavBar from "../../IT20128036/NavBar";
import { VictoryPie } from "victory-pie";

export default function GenarateVacancyReport() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [vacancy, setVacancy] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [total, setTotal] = useState(0);
  const [myData, setMyData] = useState([]);

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

  useEffect(() => {
    let sumVacancies = 0;
    for (let i = 0; i < vacancy.length; i++) {
      sumVacancies += +vacancy[i].noOfVacancy;
      setTotal(sumVacancies);
    }
  }, [vacancy]);

  useEffect(() => {
    const data = myData.slice();
    for (let i = 0; i < vacancy.length; i++) {
      var jobTitle = vacancy[i].jobTitle;
      var noOfVacancy = vacancy[i].noOfVacancy;
      data.push({
        x: jobTitle,
        y: noOfVacancy,
      });
    }
    setMyData(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacancy]);

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
          height: "170vh",
          borderTop: "5px solid black",
        }}
      >
        <div
          className="jumbotron"
          style={{ background: "white", minHeight: "150vh" }}
        >
          <br />

          <div className="container px-5 mb-5">
            <div className="row">
              <div className="float-left col-lg-9  mb-2">&nbsp;</div>
              <div className="col-lg-3  mb-2">
                &nbsp;
                <select
                  className="form-select"
                  name="workPlaceType"
                  onChange={(e) => searchItems(e.target.value)}
                  required
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="2020">All</option>
                  <option value="2021">2020</option>
                  <option value="2022">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
            </div>
            <div>
              <button onClick={handlePrint} className="btn btn-danger col-md-1">
                Print
              </button>
            </div>
            <div ref={componentRef} className="mt-3 mx-5">
              <h2 className="text-center">
                Vacancy Report Of {companyName.toUpperCase()}
              </h2>
              &nbsp;
              <div
                style={{ height: "450px", width: "750px" }}
                className="rounded mx-auto d-block"
              >
                <VictoryPie
                  data={myData}
                  colorScale={[
                    "#1cd0bb",
                    "#dfdfdf",
                    "#ffa400",
                    "red",
                    "yellow",
                  ]}
                  radius={100}
                />
              </div>
              <h4> Total Number of Vacancies - {total}</h4>
              <br />
              <table className="table table-striped shadow table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Job ID</th>
                    <th scope="col">Job Title</th>
                    <th scope="col">Job Type</th>
                    <th scope="col" style={{ width: "12%" }}>
                      No of Vacancy
                    </th>
                    <th scope="col">Date</th>
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
                            <td>{item.noOfVacancy}</td>
                            <td>{item.closingDate}</td>
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
                            <td>{item.noOfVacancy}</td>
                            <td>{item.closingDate}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
