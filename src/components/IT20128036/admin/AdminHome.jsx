import { useState, useEffect, React } from "react";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import swal from "sweetalert";
import RightSidePanel from "./slideBar";

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

export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState(0);
  const [jobseekers, setJobseekers] = useState(0);
  const [all, setAll] = useState(0);
  const [rdate, setRdate] = useState([]);

  const [rse, setRse] = useState(0);
  const [ro, setRo] = useState(0);
  const [rno, setRno] = useState(0);
  const [rde, setRde] = useState(0);

  const [jse, setJse] = useState(0);
  const [jo, setJo] = useState(0);
  const [jno, setJno] = useState(0);
  const [jde, setJde] = useState(0);

  useEffect(() => {
    document.title = "Admin Home";

    // redirect to the login page if the user is not logged in
    if (!localStorage.token) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/admin/login`);
          window.location.reload();
        }
      });
    }
  }, []);

  axios.get("http://localhost:5000/users").then((res) => {
    setUsers(res.data.existingUsers);
    console.log(users);

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

    users.forEach((user) => {
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
    });

    setAll(all);
    setJobseekers(jobseekers);
    setRecruiters(recruiters);
    setRse(rse);
    setJse(jse);
    setRo(ro);
    setJo(jo);
    setRno(rno);
    setJno(jno);
    setRde(rde);
    setJde(jde);

    console.log(recruiters);
  });

  const data = [
    {
      name: "September",
      JobRecruiters: rse,
      JobSeekers: jse,
      amt: 2,
    },
    {
      name: "Octorber",
      JobRecruiters: ro,
      JobSeekers: jo,
      amt: 2,
    },
    {
      name: "November",
      JobRecruiters: rno,
      JobSeekers: jno,
      amt: 2,
    },
    {
      name: "December",
      JobRecruiters: rde,
      JobSeekers: rde,
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
      <AdminNavBar />
      <br />

      <div className="row" style={{ marginLeft: '1px' }}>
        {/* <div className="col-sm-3">
          <RightSidePanel />
        </div> */}


<div className='col-sm-3' style={{ backgroundColor: '#DCDCDC' }}>
                    <br />
                    <RightSidePanel />
                </div>




        <div className="col-sm-9">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 ">
                <div>
                  <h5>Analysis</h5>
                  <h5 className="text-danger"><ul>
  <li>LIVE</li>

</ul></h5>

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

              <div className="col-sm-4  ">
                <h5 className="mt-5">Registered Users</h5>
                <a href="/admin/userroles" class="btn btn-dark btn mt-2">
                  All - {all}
                </a>
                <br />
                <a href="/admin/user/recruiter" class="btn btn-dark btn mt-2">
                  Job Recruiters - {recruiters}
                </a>
                <br />
                <a href="/admin/user/seeker" class="btn btn-dark btn mt-2">
                  Job Seekers - {jobseekers}
                </a>

                <br />
                <a
                  href="/admin/user/report"
                  class="btn btn-outline-dark btn-lg btn-block mt-2 mb-2"
                >
                  Generate Report
                </a>
              </div>
            </div>
          </div>


          <hr></hr>

          <div className="mt-3">
            <div className="row" style={{ height: "150px" }}>
              <div className="col p-3 mb-2 m-2 bg-light text-dark rounded border border-dark">
                <center>
                  <i class="fa fa-user" aria-hidden="true"></i>
                  <h6>User Management</h6>
                  <br />
                  <a
                    type="button"
                    className="btn btn-outline-dark"
                    href={"/admin/userroles"}
                  >
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </center>
              </div>
              <div className="col p-3 mb-2 m-2 bg-light text-dark rounded border border-dark">
                <center>
                  <i class="fa fa-users" aria-hidden="true"></i>
                  <h6>Vacancies Management</h6>
                  <br />
                  <a
                    type="button"
                    className="btn btn-outline-dark"
                    href={"/view/vacancy/admin"}
                  >
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </center>
              </div>
              <div className="col p-3 mb-2 m-2 bg-light text-dark rounded border border-dark">
                <center>
                  <i class="fa fa-book" aria-hidden="true"></i>
                  <h6>Application Management</h6>
                  <br />
                  <a
                    type="button"
                    className="btn btn-outline-dark"
                    href={"/admin/topiclist"}
                  >
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </center>
              </div>
            </div>

            <div className="row" style={{ height: "150px" }}>
              <div className="col p-3 mb-2 m-2 bg-light text-dark rounded border border-dark">
                <center>
                  <i class="fa fa-arrow-up" aria-hidden="true"></i>
                  <h6>Assesment Management</h6>
                  <br />
                  <a
                    type="button"
                    className="btn btn-outline-dark"
                    href={"/submitiontype/add"}
                  >
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </center>
              </div>
              <div className="col p-3 mb-2 m-2 bg-light text-dark rounded border border-dark">
                <center>
                  <i class="fa fa-file-text" aria-hidden="true"></i>
                  <h6>Interview Management</h6>
                  <br />
                  <a
                    type="button"
                    className="btn btn-outline-dark"
                    href={"/documentTemp"}
                  >
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </center>
              </div>
              <div className="col p-3 mb-2 m-2 bg-light text-dark rounded border border-dark">
                <center>
                  <i class="fa fa-table" aria-hidden="true"></i>
                  <h6>Generate Report</h6>
                  <br />
                  <a
                    type="button"
                    className="btn btn-outline-dark"
                    href={"/view/marking"}
                  >
                    <i
                      class="fa fa-arrow-circle-o-right"
                      aria-hidden="true"
                    ></i>
                  </a>
                </center>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
