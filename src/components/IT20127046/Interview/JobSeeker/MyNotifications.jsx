import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Main.css";
import NavBar from "../../../IT20128036/NavBar";

export default function MyNotifications() {
  const [messages, setMessage] = useState([]);
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    retriveJobSeekerMessages();
  }, []);

  const retriveJobSeekerMessages = () => {
    axios.get(`http://localhost:5000/interviewMsg/getAll`).then((res) => {
      if (res.data.success) {
        setMessage(res.data.exsitingMessages);
        console.log(res.data.exsitingMessages);
      }
    });
  };

  const mianPanel = {
    border: "none",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "10px",
  };

  return (
    <div>
      <NavBar />

      <div className="backgroudImage">
        <div className="container mainBody">
          <br />

          <center>
            <h4>
              <i className="fa fa-handshake-o"></i> My Interviews
            </h4>
          </center>

          <hr />

          <div
            className="container bg-light shadow p-3 mb-5 rounded mt-3"
            style={{ borderRadius: "8px" }}
          >
            <div className="row">
              <div className="col-3">
                <center>
                  <a
                    className="btn btn-outline-dark"
                    style={{ margin: "0 10px 10px 10px" }}
                    href="/interview/jobseeker"
                  >
                    <i className="fa fa-arrow-left"></i>&nbsp; Back
                  </a>
                </center>
              </div>

              <div className="col-9">
                <div className="row">
                  <div className="btn-group mb-2">
                    <a
                      href="#"
                      className="btn btn-outline-dark"
                      aria-current="page"
                    >
                      All
                    </a>
                  </div>
                  <br />
                </div>

                <div className="container" style={mianPanel}>
                  {messages.map((msg, index) => (
                    <div class="alert alert-primary" role="alert">
                      <div className="col">
                        <h6 style={{ float: "left" }}>{msg.mesgTitle}</h6>
                        <button
                          className="btn btn-outline-danger"
                          type="submit"
                          style={{ float: "right" }}
                        >
                         X
                        </button>
                      </div>

                      <br />

                      <hr />
                      <div className="container">
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
