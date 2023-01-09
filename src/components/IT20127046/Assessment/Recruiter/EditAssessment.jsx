import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";

export default function EditAssessment() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");

  useEffect(() => {
    retriveAssessment();
  }, []);

  const retriveAssessment = () => {
    axios.get(`http://localhost:5000/assessment/get/${id}`).then((res) => {
      if (res.data.success) {
        setTitle(res.data.exsitingAssessment.title);
        setJobTitle(res.data.exsitingAssessment.jobTitle);
        setDescription(res.data.exsitingAssessment.description);
        setDriveLink(res.data.exsitingAssessment.driveLink);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title,
      jobTitle: jobTitle,
      description: description,
      driveLink: driveLink,
    };

    updateAssessment(data);
  };

  const updateAssessment = (data) => {
    axios
      .put(`http://localhost:5000/assessment/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          swal("Success!", "Details Updated Successfull", "success").then(
            (value) => {
              window.location = "/assessment/recruiter";
            }
          );
        }
      });
  };

  return (
    <div>
      <NavBar />

      <div className="backgroudImage">
        <div className="container mainBody">
          <br />

          <h4>
            <i className="fa fa-edit"></i> Edit Interview Details
          </h4>
          <hr />

          <div>
            <div className="container bg-light shadow p-3 mb-5  rounded mt-3 col-lg-10 ">
              <form>
                <div className="col-md-6">
                  <div className="form-group">
                    <strong>Title </strong>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="col-md-6">
                  <div className="form-group">
                    <strong>Job Title</strong>
                    <input
                      type="text"
                      className="form-control"
                      name="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;
                <div className="form-group">
                  <strong>Description :</strong>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                &nbsp;
                <div className="col-md-6">
                  <div className="form-group">
                    <strong>Drive Link</strong>
                    <input
                      type="text"
                      className="form-control"
                      name="driveLink"
                      value={driveLink}
                      onChange={(e) => setDriveLink(e.target.value)}
                    />
                  </div>
                </div>
                &nbsp;
                <div className=" my-3">
                  <div className="form-group ">
                    <a
                      className="btn btn-outline-primary col-md-2"
                      href={"/assessment/recruiter"}
                    >
                      <i class="fa fa-arrow-left"></i>&nbsp;Back
                    </a>{" "}
                    &nbsp;
                    <button
                      className="btn btn-success col-md-2"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
