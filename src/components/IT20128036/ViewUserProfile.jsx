import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import jwt_decode from "jwt-decode";
import "./contactUs.css";
import NavBar from "./NavBar";

import "./userprofile.css";

export default function ViewUserProfile() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [uid, setUID] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [field, setField] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  // const [file, setFile] = useState("Cell-Row-0-Col-0.png");
  const [file, setFile] = useState("1234.png");

  const [website, setWebsite] = useState("update your website");
  const [csize, setCsize] = useState("update company size");
  const [founded, setFounded] = useState("update founded");
  const [dob, setDob] = useState("update date of birth");
  const [sex, setSex] = useState("update sex");

  const [about, setAbout] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
  );

  const [valid, setValid] = useState(false);
  //   const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setUID(decoded._id);
    console.log(uid);

    axios.get(`http://localhost:5000/user/${uid}`).then((res) => {
      // setUsers(response.data.user);
      if (res.data.success) {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setMobile(res.data.user.mobile);
        setField(res.data.user.field);
        setAddress(res.data.user.address);
        setType(res.data.user.type);
        setFile(res.data.user.file);
        setAbout(res.data.user.about);
        setWebsite(res.data.user.website);
        setCsize(res.data.user.csize);
        setFounded(res.data.user.founded);
        setDob(res.data.user.dob);
        setSex(res.data.user.sex);
        console.log(res.data.user.file);
        setValid(true);
      }
    });
  }, [uid]);

  return (
    <div className="inq_container" style={{ minHeight: "140vh" }}>
      <NavBar />
      <div className="">
        <div className="container">
          <div className="col-sm-12 bg-light border border-light rounded shadow mt-4 ">
            <div className="row">
              <div className="col-sm-4">
                <div>
                  <div className="p-3 mb-4 mt-4 my-4 mx-4 text-dark slidebar">
                    {valid ? (
                      <div>
                        <h1>
                          <img
                            className="img shadow-lg"
                            src={require(`../../../../backend/uploads/${file}`)}
                            alt="alt"
                          />
                        </h1>
                      </div>
                    ) : (
                      <div>
                        <h6>
                          <img
                            className="img"
                            src={require(`../../../../backend/uploads/${file}`)}
                            alt="alt"
                          />
                        </h6>
                      </div>
                    )}
                    <div className="text-center">
                      <a
                        href="/userprofile/update/photo"
                        className="btn btn-outline-light "
                      >
                        Update Photo
                      </a>
                    </div>
                    <hr />

                    <div>
                      <a href="/admin/userroles">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            &nbsp;&nbsp;{name}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                            &nbsp;&nbsp;{email}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i class="fa fa-mobile" aria-hidden="true"></i>
                            &nbsp;&nbsp;{mobile}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="#">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i
                              class="fa fa-address-card"
                              aria-hidden="true"
                            ></i>
                            &nbsp;&nbsp;Address<br></br>
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {address}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div></div>

                    <div className="p-3 mb-2 bg-light text-dark">
                      <a
                        href="/user/change/password"
                        style={{ textDecoration: "none" }}
                      >
                        <p className="h6">
                          <i class="fa fa-key" aria-hidden="true"></i>
                          &nbsp;&nbsp;change password
                        </p>
                      </a>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-8">
                <div className="mt-4 mb-4 mx-4 my-4">
                  <h5>
                    <strong>About Me</strong>
                  </h5>
                  <p1>{about}</p1>

                  <div className="row">
                    <div className="col-sm-6 mt-5">
                      <h5>
                        <strong>Field Of Interest</strong>
                      </h5>
                      <p>{field}</p>
                    </div>
                    <div className="col-sm-6 mt-5">
                      <h5>
                        <strong>Website</strong>
                      </h5>
                      <p>{website}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 mt-5">
                      {type === "Job Seeker" && (
                        <span>
                          <h5>
                            <strong>Date Of Birth </strong>
                          </h5>
                          <p>{dob} </p>
                        </span>
                      )}

                      {type === "Job Recruiter" && (
                        <span>
                          <h5>
                            <strong>Company Size </strong>
                          </h5>
                          <p>{csize} </p>
                        </span>
                      )}
                    </div>

                    <div className="col-sm-6 mt-5">
                      {type === "Job Seeker" && (
                        <span>
                          <h5>
                            <strong>Sex </strong>
                          </h5>
                          <p>{sex} </p>
                        </span>
                      )}

                      {type === "Job Recruiter" && (
                        <span>
                          <h5>
                            <strong>Founded </strong>
                          </h5>
                          <p>{founded} </p>
                        </span>
                      )}
                    </div>

                    <div className="col-sm-4 mt-5">
                      {type === "Job Seeker" && (
                        <span>
                          <div className="">
                            {" "}
                            <a
                              href="/resume"
                              className="btn btn-primary rounded-sm btn-lg"
                            >
                              My Resume
                            </a>
                          </div>
                        </span>
                      )}

                      {type === "Job Recruiter" && (
                        <span>
                          <div className="">
                            {" "}
                            <button className="btn btn-primary rounded-sm btn-lg">
                              Vacancies
                            </button>
                          </div>
                        </span>
                      )}
                    </div>
                    <div className="col-sm-5 mt-5">
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{ textDecoration: "none" }}
                        >
                          <a className="btn text-dark">
                            <i
                              class="fa fa-facebook-square"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <a className="btn text-dark">
                            <i class="fa fa-whatsapp" aria-hidden="true"></i>
                          </a>
                          <a className="btn text-dark">
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                          <a className="btn text-dark">
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </div>
                      </a>
                    </div>

                    <div className="col-sm-3 mt-5">
                      <a href="/userprofile" className="btn btn-white">
                        <i class="fa fa-pencil-square-o" aria-hidden="true">
                          Edit
                        </i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
