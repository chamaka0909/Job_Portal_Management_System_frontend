import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import "./contactUs.css";
import NavBar from "./NavBar";

export default class ViewInquiries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inquiries: [],
      name: "",
    };
  }

  componentDidMount() {
    document.title = "User Inquiries";

    if (!localStorage.userToken) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/user/login`);
          window.location.reload();
        }
      });
    }

    //get uname using the user token
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    const uname = decoded.name;
    this.setState({
      name: uname,
    });

    setTimeout(() => {
      this.retrieveInquiries();
    }, 1000);
  }

  retrieveInquiries() {
    const name = this.state.name;
    console.log(name);
    axios
      .get(`http://localhost:5000/inquiries/get/name/${name}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            inquiries: res.data.exsitingInquiries,
          });

          console.log(this.state.inquiries);
        }
      });
  }

  onDelete = (id) => {
    //with a confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this details",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/inquiries/delete/${id}`)
          .then((res) => {
            swal("Inquiry Deleted Permanently!", "", "success").then(
              (value) => {
                if (value) {
                  this.retrieveInquiries();
                }
              }
            );
          });
      } else {
        swal("Cancelled. The user details are safe!");
      }
    });
  };

  render() {
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
            <div className="">
              <div className="row">
                <div className="col-sm-3 ">
                  <div className="mt-3 mb-2">
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
                        <a href="#">
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
                              <i
                                class="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>
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
                              <i aria-hidden="true"></i>&nbsp;&nbsp; No 27/3,
                              Galle Road, Colombo
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

                <div className="col-sm-9">
                  <div className="row">
                    <div className="col-lg-9 mt-4 mb-2">
                      <h4>My Inquiries</h4>
                    </div>

                    <hr />
                    <br />
                  </div>

                  <table className="table">
                    <thead>
                      <tr></tr>
                    </thead>

                    <tbody>
                      {this.state.inquiries.map((Inquiries, index) => (
                        <tr key={index}>
                          <div class="card mt-4 bg-white">
                            <h5 class="card-header">{Inquiries.title}</h5>
                            <div class="card-body">
                              <div className="row">
                                <div className="col-sm-6">
                                  <h6>Message</h6>
                                  <p class="card-title">{Inquiries.msg}</p>
                                </div>
                                <div className="col-sm-6">
                                  <h6>Reply</h6>
                                  <p class="card-text">{Inquiries.reply}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
