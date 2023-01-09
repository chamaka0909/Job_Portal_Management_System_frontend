import React, { useEffect } from "react";
import NavBar from "../../IT20128036/NavBar";
import image from "../../../images/back1.jpg";
import Form from "./Form";
import ExistingResume from "./ExistingResume";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

/**
 * @description This is main component of the resume which will display the relevant components according to the availability of the resume
 */

export default function Resume() {
  let navigate = useNavigate();
  const [resumeExists, setResumeExists] = React.useState(false);

  useEffect(() => {
    // redirect to the login page if the user is not logged in
    if (!localStorage.userToken) {
      swal("Please login first", "", "warning")
        .then((value) => {
          if (value) {
            navigate(`/user/login`);
            window.location.reload(false);
          }
        });
    }
    document.title = "Resume";
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);
    axios.get(`http://localhost:5000/resumes/${decoded._id}`)
      .then(response => {
        if (response.data.exsitingResume) {
          setResumeExists(true);
        }
      })
      .catch(error => {
        console.log('Error while retrieving the resume details. Error: ', error);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeExists]);

  return (
    <div>
      <NavBar />
      <div className='jumbotron' style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px', paddingTop: '10px', backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '0px 0px 0px 0px', overflowY: 'scroll', height: '100vh', borderTop: '5px solid black' }}>
        <div className='jumbotron' style={{ background: 'white', minHeight: '100vh', padding: '30px 30px 30px 30px' }}>
          <br /><br />
          <h1 style={{ textAlign: "center" }}> Resume </h1>
          {resumeExists &&
            <ExistingResume />
          }
          {!resumeExists &&
            <Form />
          }
        </div>
      </div>
    </div>
  );
}