import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default function CreateVacancy() {
  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [location, setLocation] = useState("");
  const [noOfVacancy, setNoOfVacancy] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [adminStatus, setAdminStatus] = useState("Pending");
  const [companyId, setCompanyId] = useState("");
  const [fileName, setFileName] = useState("");
  const [checkbox, setcheckBox] = useState("");
  const [fromValidate, setFromValidate] = useState("");
  const [fromValidateSuccess, setfromValidateSuccess] = useState("");
  const [validateAlert, setValidateAlert] = useState(false);
  const [validateAlertSuccess, setValidateAlertSuccess] = useState(false);

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (jobTitle === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Job Title");
    } else if (workPlaceType === "") {
      setValidateAlert(true);
      setFromValidate("Please Input WorkPlaceType");
    } else if (location === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Location");
    } else if (noOfVacancy === "") {
      setValidateAlert(true);
      setFromValidate("Please Input No Of Vacancy");
    } else if (jobType === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Job Type");
    } else if (description === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Description");
    } else if (fileName === "") {
       setValidateAlert(true);
       setFromValidate("Please Input Image");
    } else if (closingDate === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Closing Date");
    } else if (checkbox === "") {
      setValidateAlert(true);
      setFromValidate("Please Fill the Checkbox");
    } else {
      setValidateAlertSuccess(true);
      setfromValidateSuccess("Successfully Data Added!");
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("jobTitle", jobTitle);
      formData.append("company", company);
      formData.append("workPlaceType", workPlaceType);
      formData.append("location", location);
      formData.append("noOfVacancy", noOfVacancy);
      formData.append("jobType", jobType);
      formData.append("description", description);
      formData.append("image", fileName);
      formData.append("closingDate", closingDate);
      formData.append("adminStatus", adminStatus);
      formData.append("companyId", companyId);

      axios.post(`http://localhost:5000/vacancy/add`, formData).then((res) => {
        if (res.formData.success) {
          swal("Vacancy created successfully", "", "success");

          setTimeout(() => {
            window.location = "/view/vacancy";
          }, "3000");

          setJobId("");
          setJobTitle("");
          setCompany("");
          setWorkPlaceType("");
          setLocation("");
          setNoOfVacancy("");
          setJobType("");
          setDescription("");
          setClosingDate("");
          setAdminStatus("");
          setFileName("");
        }
      });
    }
  };
  useEffect(() => {
    const userToken = localStorage.userToken;
    const decoded = jwt_decode(userToken);
    setCompanyId(decoded._id);
    setCompany(decoded.name);

    axios.get(`http://localhost:5000/vacancy/getAll`).then((response) => {
      setJobId("J" + String(response.data.exsitingVacancy.length + 1));
    });
  }, []);


  return (
    <div>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa fa-plus"></i>&nbsp; Add New Vacancy
        </button>
        &nbsp;&nbsp;
        <a className="btn btn-warning" href={"/genarate/vacancy/report"}>
          <i class="fa fa-bar-chart"></i>&nbsp;Genarate Report
        </a>
        <div className="modal" id="exampleModal">
          <div className="modal-dialog modal-dialog-scrollable modal-lg pb-5">
            <div className="modal-content ">
              <div className="modal-header">
                <div className="text-center">
                  <h3 className="modal-title">
                    <i className="fa fa-briefcase"></i>&nbsp;Find A Great Hire
                    ,Fast
                  </h3>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <br />
              <div className="mx-2">
                {validateAlert ? (
                  <p>
                    <div class="alert alert-danger" role="alert">
                      {fromValidate}
                    </div>
                  </p>
                ) : (
                  <p></p>
                )}
                {validateAlertSuccess ? (
                  <p>
                    <div class="alert alert-success" role="alert">
                      {fromValidateSuccess}
                    </div>
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit} encType="multipart/form-data">
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        Job Title <span className="_label" />
                      </strong>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        placeholder="Enter job title"
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                      <small className="text-muted">
                        Start each word with a capital letter
                      </small>
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        Company Name <span className="_label" />
                      </strong>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        placeholder="Enter company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        Work Place Type <span className="_label" />
                      </strong>
                      <select
                        className="form-select"
                        name="workPlaceType"
                        onChange={(e) => setWorkPlaceType(e.target.value)}
                      >
                        <option value="Not Selected">Not Selected</option>
                        <option value="On-Site">On-Site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>Location (Optional)</strong>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter location"
                        name="location"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        No of Vacancy <span className="_label" />
                      </strong>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter number"
                        name="noOfVacancy"
                        pattern="[0-9]{1,2}"
                        title="Please input the number"
                        onChange={(e) => setNoOfVacancy(e.target.value)}
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group ">
                      <strong>
                        Job Type :<span className="_label" />
                      </strong>
                      <div className="mt-2 fs-6">
                        <input
                          type="radio"
                          name="jobType"
                          value="Full time"
                          style={{ width: "30px", height: "1em" }}
                          onChange={(e) => setJobType(e.target.value)}
                        />
                        &nbsp;&nbsp;Full time&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          name="jobType"
                          value="Part time"
                          style={{ width: "35px", height: "1em" }}
                          onChange={(e) => setJobType(e.target.value)}
                        />
                        &nbsp;&nbsp;Part time&nbsp;&nbsp;&nbsp;
                        <input
                          type="radio"
                          name="jobType"
                          value="Internship"
                          style={{ width: "35px", height: "1em" }}
                          onChange={(e) => setJobType(e.target.value)}
                        />
                        &nbsp;&nbsp;Internship&nbsp;&nbsp;&nbsp;
                      </div>
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        Job Description (Maximum word 1000){" "}
                        <span className="_label" />
                      </strong>
                      <textarea
                        class="form-control"
                        name="description"
                        rows="2"
                        maxLength="1000"
                        placeholder="Enter a short description of your vacancy"
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        Choose a photo <span className="_label" />
                      </strong>
                      <input
                        type="file"
                        filename="image"
                        className="form-control"
                        onChange={onChangeFile}
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12">
                    <div className="form-group">
                      <strong>
                        Application Closing Date
                        <span className="_label" />
                      </strong>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Pick a date"
                        name="closingDate" 
                        min={new Date().toJSON().slice(0, 10)}                   
                        onChange={(e) => setClosingDate(e.target.value)}
                      />
                    </div>
                  </div>
                  &nbsp;
                  <div className="col-md-12 mt-4">
                    <div className="form-group">
                      <strong>Agree term and conditions&nbsp;&nbsp;</strong>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => setcheckBox(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" my-4 mx-3">
                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary col-md-4"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
