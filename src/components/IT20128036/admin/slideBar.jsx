import React, { Component } from "react";

export default class RightSidePanel extends Component {
  render() {
    return (
      <div>
        <div className="p-3 mb-2 bg-light text-dark">
          <p className="h6">
            <i class="fa fa-external-link" aria-hidden="true"></i>
            &nbsp;&nbsp;Manage Functions
          </p>
          <hr />

          <div>
            <a href="/admin/userroles">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Users
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="/student/group/view">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white" href="/view/vacancy/admin">
                  <i class="fa fa-users" aria-hidden="true"></i>
                  &nbsp;&nbsp;Vacancies
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="/admin/applicationreports">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-book" aria-hidden="true"></i>
                  &nbsp;&nbsp;Applications
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-file-text" aria-hidden="true"></i>
                  &nbsp;&nbsp;Assesments
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-question-circle" aria-hidden="true"></i>
                  &nbsp;&nbsp;Interviews
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-table" aria-hidden="true"></i>
                  &nbsp;&nbsp;Generates Reports
                </a>
              </div>
            </a>
          </div>

          <div className="p-3 mb-2 bg-light text-dark">
            <a href="/admin/inquiries" style={{ textDecoration: "none" }}>
              <p className="h6">
                <i class="fa fa-comments" aria-hidden="true"></i>
                &nbsp;&nbsp;User Inquiries
              </p>
            </a>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
