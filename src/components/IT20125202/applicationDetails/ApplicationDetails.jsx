import React from 'react';
import jwt_decode from 'jwt-decode';
import RecruiterView from './RecruiterView';
import JobSeekerView from './JobSeekerView';
import NavBar from '../../IT20128036/NavBar';
import image from "../../../images/back1.jpg";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

/**
 * @description This is the main component of the application details page which is used to display the details of the application to the recruiter or job seeker according to the user role.
 */

export default function ApplicationDetails() {
  let navigate = useNavigate();
  const [userType, setUserType] = React.useState('');

  React.useEffect(() => {
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
    document.title = "Application Details";
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);
    setUserType(decoded.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <div className='jumbotron' style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px', paddingTop: '10px', backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '0px 0px 0px 0px', overflowY: 'scroll', height: '100vh', borderTop: '5px solid black' }}>
        <div className='jumbotron' style={{ background: 'white', minHeight: '100vh', padding: '30px 30px 30px 30px' }}>
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}> Application Details </h1>
          {
            userType === 'Job Recruiter' && (
              <RecruiterView />
            )
          }
          {
            userType === 'Job Seeker' && (
              <JobSeekerView />
            )
          }
        </div>
      </div>
    </div>
  )
}
