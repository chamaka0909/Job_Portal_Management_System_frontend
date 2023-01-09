import React, { Component } from "react";
import axios from "axios";

import swal from "sweetalert";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      all: 0,
      recruiters: 0,
      jobseekers: 0,
      users: [],

      rse: 0,
      ro: 0,
      rno: 0,
      rde: 0,
      jse: 0,
      jo: 0,
      jno: 0,
      jde: 0,

      tse: 0,
      to: 0,
      tno: 0,
      tde: 0,
    };
  }

  componentDidMount() {
    document.title = "User Roles";

    // redirect to the login page if the user is not logged in
    if (!localStorage.token) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/admin/login`);
          window.location.reload();
        }
      });
    }
    this.retrieveUsers();
  }

  retrieveUsers() {
    let all = 0;
    let recruiters = 0;
    let jobseekers = 0;

    let rse = 0;
    let ro = 0;
    let rno = 0;
    let rde = 0;
    let jse = 0;
    let jo = 0;
    let jno = 0;
    let jde = 0;

    let tse = 0;
    let to = 0;
    let tno = 0;
    let tde = 0;

    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.success) {
        this.setState({
          users: res.data.existingUsers,
        });

        this.state.users.forEach((user) => {
          if (
            user.type === "Job Recruiter" &&
            user.dateRegistered.includes("2022-09")
          ) {
            rse = rse + 1;
          } else if (
            user.type === "Job Recruiter" &&
            user.dateRegistered.includes("2022-10")
          ) {
            ro = ro + 1;
          } else if (
            user.type === "Job Recruiter" &&
            user.dateRegistered.includes("2022-11")
          ) {
            rno = rno + 1;
          } else if (
            user.type === "Job Recruiter" &&
            user.dateRegistered.includes("2022-12")
          ) {
            rde = rde + 1;
          } else if (
            user.type === "Job Seeker" &&
            user.dateRegistered.includes("2022-09")
          ) {
            jse = jse + 1;
          } else if (
            user.type === "Job Seeker" &&
            user.dateRegistered.includes("2022-10")
          ) {
            jo = jo + 1;
          } else if (
            user.type === "Job Seeker" &&
            user.dateRegistered.includes("2022-11")
          ) {
            jno = jno + 1;
          } else if (
            user.type === "Job Seeker" &&
            user.dateRegistered.includes("2022-12")
          ) {
            jde = jde + 1;
          }

          // all = all + 1;
          jobseekers = jse + jo + jno + jde;
          recruiters = rse + ro + rno + rde;

          all = jobseekers + recruiters;

          tse = jse + rse;
          to = jo + ro;
          tno = jno + rno;
          tde = jde + rde;
        });

        this.setState({
          all: all,
          recruiters: recruiters,
          jobseekers: jobseekers,

          rse: rse,
          ro: ro,
          rno: rno,
          rde: rde,
          jse: jse,
          jo: jo,
          jno: jno,
          jde: jde,

          tse: tse,
          to: to,
          tno: tno,
          tde: tde,
        });

        // console.log(this.state.users);
      }
    });
  }

  render() {
    const data = [
      {
        name: "September",
        JobRecruiters: this.state.rse,
        JobSeekers: this.state.jse,
        amt: 2,
      },
      {
        name: "Octorber",
        JobRecruiters: this.state.ro,
        JobSeekers: this.state.jo,
        amt: 2,
      },
      {
        name: "November",
        JobRecruiters: this.state.rno,
        JobSeekers: this.state.jno,
        amt: 2,
      },
      {
        name: "December",
        JobRecruiters: this.state.rde,
        JobSeekers: this.state.jde,
        amt: 2,
      },
    ];

    const data2 = [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 200 },
      { name: "Group E", value: 278 },
      { name: "Group F", value: 189 },
    ];

    return (
      <div className="container">
        <br />

        <br />
        <h4 className="text-center">Monthly User Report</h4>
        <div className="container border border-dark">
          <div className="col-12">
            <div className="container">
              <div className="row">
                <div className="col-8 mt-4 mb-4">
                  <div>
                    <h5>Analysis</h5>

                    <BarChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="JobRecruiters" fill="#8884d8" />
                      <Bar dataKey="JobSeekers" fill="#82ca9d" />
                    </BarChart>
                  </div>
                </div>

                <div className="col-4 mt-4 mb-4">
                  <h5 className="mt-5">Registered Users</h5>
                  <a href="/admin/userroles" class="btn btn-dark btn mt-2">
                    All - {this.state.all}
                  </a>
                  <br />
                  <a href="/admin/user/recruiter" class="btn btn-dark btn mt-2">
                    Job Recruiters - {this.state.recruiters}
                  </a>
                  <br />
                  <a href="/admin/user/seeker" class="btn btn-dark btn mt-2">
                    Job Seekers - {this.state.jobseekers}
                  </a>
                </div>
              </div>

              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">September</th>
                    <th scope="col">October</th>
                    <th scope="col">November</th>
                    <th scope="col">December</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">JobRecruiters</th>
                    <td>{this.state.rse}</td>
                    <td>{this.state.ro}</td>
                    <td>{this.state.rno}</td>
                    <td>{this.state.rde}</td>
                  </tr>
                  <tr>
                    <th scope="row">JobSeekers</th>
                    <td>{this.state.jse}</td>
                    <td>{this.state.jo}</td>
                    <td>{this.state.jno}</td>
                    <td>{this.state.jde}</td>
                  </tr>
                  <tr>
                    <th scope="row">All</th>
                    <td>{this.state.tse}</td>
                    <td>{this.state.to}</td>
                    <td>{this.state.tno}</td>
                    <td>{this.state.tde}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
