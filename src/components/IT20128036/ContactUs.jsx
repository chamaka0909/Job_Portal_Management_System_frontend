import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./contactUs.css";
import swal from "sweetalert";
import NavBar from "./NavBar";

export default function ContactUs() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setType(decoded.type);
    setName(decoded.name);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: type,
      name: name,
      title: title,
      msg: msg,
      reply: "pending",
    };




    let validated = true;
    if (title === ""){
      validated = false;
      swal({
        title: "",
        text: "Please select subject",
        icon: "warning",
      });
    } else if(msg === ""){
      validated = false;
      swal({
        title: "",
        text: "Please enter your message",
        icon: "warning",
      });

    } 





if(validated === true ){
    axios.post("http://localhost:5000/inquiries/add", data).then((res) => {
      if (res.data.success) {
        swal("Send successfully!", "", "success").then((value) => {
          if (value) {
            window.location = "/user/inq";
            setMsg("");
            setTitle("");
          }
        });
      }
    });
  }
  };

  return (
    <div>
      <NavBar />

      <div
        className="inq_container"
        style={{
          minWidth: "100%",
          minHeight: "100vh",
          opacity: "1",
          borderTop: "1px solid white",
        }}
      >
        <div className="container bg-white mt-4">
          <div className="row">
            <div className="col-sm-3">
              <div>
                <div className="p-3 mb-2 mt-3 text-dark slidebar">
                  <p className="h6">
                    <i class="fa fa-address-book" aria-hidden="true"></i>
                    &nbsp;&nbsp;Contact Us
                  </p>
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
                        <a className="btn text-dark" href="#">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          &nbsp;&nbsp;+94 117654323
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
                          &nbsp;&nbsp;job4me@mail.com
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
                          <i class="fa fa-map-marker" aria-hidden="true"></i>
                          &nbsp;&nbsp;SriLanka
                        </a>
                      </div>
                    </a>
                  </div>

                  <div>
                    <a href="/student/group/view">
                      <div
                        className="p-2 mb-2 text-white"
                        style={{
                          background: "#FFFFFF",
                          textDecoration: "none",
                        }}
                      >
                        <a className="btn text-dark">
                          <i class="fa fa-address-card" aria-hidden="true"></i>
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
                          <i aria-hidden="true"></i>&nbsp;&nbsp; No 27/3, Galle
                          Road, Colombo
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

                  <div className="p-3 mb-2 bg-light text-dark">
                    <a href="#" style={{ textDecoration: "none" }}>
                      <p className="h6">
                        <i class="fa fa-comments" aria-hidden="true"></i>
                        &nbsp;&nbsp;feedback
                      </p>
                    </a>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-9 ">
              <h4 className="mt-5 text-center"></h4>

              <div className=" mb-2 ">
                <form>
                  <input
                    className="form-control"
                    type="hidden"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled
                  />

                  <label htmlFor="subject" className="mt-2 mb-2">
                    Subject
                  </label>

                  <select
                    className="form-select"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  >
                    <option title="not selected yet" selected>
                      Select Subject
                    </option>
                    <option title=" Service Inquiries">
                      Service Inquiries
                    </option>
                    <option title="Job Inquiries">Job Inquiries</option>
                    <option title="Companies Inquiries">
                      Companies Inquiries
                    </option>
                    <option title="Other Inquiries">Other Inquiries</option>
                  </select>

                  <label htmlFor="message" className="mt-2 mb-2">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    type="text"
                    className="form-control"
                    id="msg"
                    name="msg"
                    placeholder="Enter Message Here"
                    onChange={(e) => setMsg(e.target.value)}
                    
                  />
                  <div className="row">
                    <div className="col-sm-1 mt-2">
                      <button
                        type="submit"
                        onClick={onSubmit}
                        className="btn btn-dark mt-2 mb-2"
                      >
                        Send
                      </button>
                    </div>

                    <div className="col-sm-3 mt-2">
                      <a
                        href="/user/view/inq"
                        className="btn btn-dark mt-2 mb-2"
                      >
                        Previous Inqueries
                      </a>
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
