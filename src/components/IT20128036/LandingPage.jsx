import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import image from "../../images/land.png";
import NavBar from "./NavBar";

export default class LandingPage extends Component {
  componentDidMount() {
    document.title = "Home";
  }
  render() {
    return (
      <div>
        <NavBar />

        <div className="" style={{ minHeight: "100vh" }}>
          <div
            className="mx-1 my-1"
            style={{ position: "relative", textAlign: "center" }}
          >
            <img
              src={image}
              class="img-fluid"
              alt="JOB4ME"
              style={{ minWidth: "100%", minHeight: "100vh", opacity: "0.7" }}
            ></img>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
