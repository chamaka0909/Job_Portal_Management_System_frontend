/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, set } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import "./contactUs.css";
import NavBar from "./NavBar";
import "./userprofile.css";

function UpdateProfilePhoto() {
  const [uid, setUid] = useState("");

  const [file, setfile] = useState("");
  const [type, setType] = useState("");

  const [preview, setPreview] = useState();

  useEffect(() => {
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setUid(decoded._id);

    setType(decoded.type);

    setTimeout(() => {
      if (!file) {
        setPreview(undefined);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }, 0);
  }, [file]);

  const onChangeFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setfile(undefined);
      return;
    }

    setfile(e.target.files[0]);
  };

  const onChangeClick = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("file", file);

    axios
      .put(`http://localhost:5000/photo/${uid}`, formdata)
      .then((res) => {
        swal("Updated successfully!", "", "success").then((value) => {
          if (value) {
            window.location = "/userprofile/view";
          }
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="inq_container" style={{ minHeight: "100vh" }}>
      <NavBar />
      <div className="container bg-light border border-light rounded shadow mt-4 ">
        <div className="mt-4 mb-4 mx-4 my-4">
          <div>
            <br />
            <form onSubmit={onChangeClick} encType="multipart/form-data">
              <div class="mb-3">
                <label for="formFile" class="form-label">
                  {" "}
                  <strong> Profile Picture</strong>{" "}
                </label>

                <div className="row">
                  <div className="col-sm-4">
                    {file && (
                      <img
                        className="img shadow"
                        src={preview}
                        alt="select image"
                      />
                    )}
                  </div>

                  <div className="col-sm-8">
                    <input
                      class="form-control"
                      type="file"
                      id="file"
                      filename="file"
                      onChange={onChangeFile}
                      required
                    />
                  </div>
                </div>
              </div>

              <center>
                <button type="submit" class="btn btn-primary">
                  {" "}
                  <i class="fa fa-edit" aria-hidden="true">
                    {" "}
                    &nbsp;<strong>Update Photo</strong>
                  </i>
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfilePhoto;
