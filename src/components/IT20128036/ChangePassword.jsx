import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import swal from "sweetalert";
import "./userprofile.css";
import NavBar from "./NavBar";

export default class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",

      dateRegistered: "",
      type: "",
      password: "",
      enteredPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
  }

  componentDidMount() {
    document.title = "Change Password";

    // redirect to the login page if the user is not logged in
    if (!localStorage.userToken) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/user/login`);
          window.location.reload();
        }
      });
    }

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    this.setState({
      _id: decoded._id,
    });
    const id = decoded._id;
    this.retrieveProfile(id);
  }

  retrieveProfile(id) {
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          dateRegistered: res.data.user.dateRegistered,
          type: res.data.user.type,
          password: res.data.user.password,
        });
      }
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { _id, type, password } = this.state;

    let data = {
      uid: _id,
      type: type,
      password: password,
    };

    // validations----------------------------------------------------------
    let validated = true;
    if (this.state.confirmNewPassword != this.state.newPassword) {
      validated = false;
      swal({
        title: "",
        text: "Please check the new password and repeated new password",
        icon: "warning",
      });
    } else if (
      this.state.enteredPassword != "" &&
      this.state.newPassword === ""
    ) {
      validated = false;
      swal({
        title: "",
        text: "Please enter a new password",
        icon: "warning",
      });
    } else if (
      this.state.enteredPassword === "" &&
      this.state.newPassword != ""
    ) {
      validated = false;
      swal({
        title: "",
        text: "Please enter your existing password",
        icon: "warning",
      });
    } else if (
      this.state.enteredPassword != "" &&
      this.state.newPassword.length < 8
    ) {
      validated = false;
      swal({
        title: "",
        text: "Password should have at least 8 characters",
        icon: "warning",
      });
    }

    // console.log(data)

    if (validated) {
      data.enteredPassword = this.state.enteredPassword;
      data.newPassword = this.state.newPassword;

      axios
        .put(`http://localhost:5000/user/updateprofile/${_id}`, data)
        .then((res) => {
          if (res.data.success) {
            swal("Password updated successfully!", "", "success").then(
              (value) => {
                if (value) {
                  window.location = "/userprofile/view";
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "",
            text: "Something went wrong! Please check the entered passwords",
            icon: "warning",
          });
        });
    }
  };

  render() {
    return (
      <div className="inq_container" style={{ minHeight: "100vh" }}>
        <NavBar />
        <div
          className="container"
          style={{
            background: "white",
            minHeight: "80vh",
          }}
        >
          <div className="col-lg-9 mt-2 mb-2"></div>
          <hr />
          <div className="col-md-8 mt-4 mx-auto">
            <br />
            <form className="needs-validation" noValidate>
              <h5>
                <b>Change Password</b>
              </h5>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <b>Existing password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="enteredPassword"
                  value={this.state.enteredPassword}
                  placeholder="Enter Your Existing Password"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <b>New password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={this.state.newPassword}
                  placeholder="Enter Your New Password"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <b>Confirm New password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmNewPassword"
                  value={this.state.confirmNewPassword}
                  placeholder="Confirm Your New Password"
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="row mt-4">
                <div className="col-sm-4">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    style={{ maeginTop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="far fa-check-square"></i>
                    &nbsp; <b>Change Password</b>
                  </button>
                </div>

                <div className="col-sm-4">
                  <a
                    href="/userprofile/view"
                    className="btn btn-outline-dark"
                    style={{ maeginTop: "15px" }}
                  >
                    <i className="fa fa-arrow-left"></i>
                    &nbsp; <b>Back</b>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
