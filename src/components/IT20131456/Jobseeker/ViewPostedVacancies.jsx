/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavBar from "../../IT20128036/NavBar";
import images from "../../../images/back1.jpg";
import ViewPostedVacanciesModal from "./ViewPostedVacanciesModal";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [0]);
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

  var imageBasePath =
    window.location.protocol + "//" + window.location.host + "/images/";

  return (
    <div>
      <NavBar />
      <ViewPostedVacanciesModal
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
      <div
        className="jumbotron"
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingBottom: "50px",
          paddingTop: "10px",
          backgroundImage: `url(${images})`,
          backgroundSize: "cover",
          margin: "0px 0px 0px 0px",
          height: "200vh",
          borderTop: "5px solid black",
        }}
      >
        <div
          className="jumbotron"
          style={{ background: "white", minHeight: "180vh" }}
        >
          <div className="container px-5">
            <div className="row">
              <div className="float-left col-lg-9 mt-2 mb-2">
                &nbsp;
                <h2>
                  Hot Jobs{" "}
                  <span className="fs-4">, Find your dream job here</span>
                </h2>
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
          </div>
          <div className="cardContainer mx-2 ">
            <Row xs={1} md={4} className="g-4 mt-2 mx-2">
              {searchInput.length > 1
                // eslint-disable-next-line array-callback-return
                ? filteredResults.map((item, index) => {
                    if (item.adminStatus === "Approve")
                      return (
                        <Col key="index">
                          <Card className="col-md-10 my-3 mx-5 shadow">
                            <Card.Img
                              style={{ height: "45vh", width: "100%" }}
                              src={imageBasePath + item.image}
                              className="CardImg"
                            />
                            <Card.Body>
                              <h4>{item.jobTitle}</h4>
                              <h5>({item.company}) </h5>
                              <div className="text-center ">
                                <button
                                  className="btn btn-primary col-md-6 my-3"
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
                                  More info
                                </button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                  })
                // eslint-disable-next-line array-callback-return
                : vacancy.map((item, index) => {
                    if (item.adminStatus === "Approve")
                      return (
                        <Col key={index}>
                          <Card className="col-md-10 my-3 mx-5 shadow ">
                            <Card.Img
                              style={{ height: "45vh", width: "100%" }}
                              src={imageBasePath + item.image}
                              className=" p-2"
                            />
                            <Card.Body>
                              <h4>{item.jobTitle}</h4>
                              <h5>({item.company}) </h5>

                              <div className="text-center ">
                                <button
                                  className="btn btn-primary col-md-6 my-3"
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
                                  More info
                                </button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                  })}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
