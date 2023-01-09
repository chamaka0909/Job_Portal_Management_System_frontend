import { useState, useEffect, React } from "react";
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

import axios from "axios";

export default function BChart() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState(0);
  const [jobseekers, setJobseekers] = useState(0);
  const [all, setAll] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data.existingUsers);

      let all = 0;
      let recruiters = 0;
      let jobseekers = 0;
      users.forEach((user) => {
        if (
          user.type === "Job Recruiter" &&
          user.dateRegistered === "2022-08-31T08:04:59.118Z"
        ) {
          recruiters = recruiters + 1;
        } else if (user.type === "Job Seeker") {
          jobseekers = jobseekers + 1;
        }

        all = all + 1;
      });

      setAll(all);
      setJobseekers(jobseekers);
      setRecruiters(recruiters);

      console.log(all);
    });
  }, []);

  const data = [
    {
      name: "September",
      JobRecruiters: recruiters,
      JobSeekers: jobseekers,
      amt: 2,
    },
    {
      name: "Octorber",
      JobRecruiters: 5,
      JobSeekers: 7,
      amt: 2,
    },
    {
      name: "November",
      JobRecruiters: 0,
      JobSeekers: 0,
      amt: 2,
    },
    {
      name: "December",
      JobRecruiters: 0,
      JobSeekers: 0,
      amt: 2,
    },
  ];

  return (
    <div>
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
  );
}
