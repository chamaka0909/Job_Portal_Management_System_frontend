import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import JobSeekerView from './JobSeekerView';
import RecruiterView from './RecruiterView';
import NavBar from '../../IT20128036/NavBar';
import image from "../../../images/back1.jpg";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

/**
 * @description This component is used to display all the applications of a job seeker or recruiter based on the currently logged in user.
 */

export default function AllApplications() {
    let navigate = useNavigate();
    const [userType, setUserType] = React.useState('');

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
        document.title = "All Application";             // set the title of the page
        const usertoken = localStorage.userToken;       // get the user token from the local storage
        const decoded = jwt_decode(usertoken);          // decode the user token
        setUserType(decoded.type);                      // set the user type
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBar />
            <div className='jumbotron' style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px', paddingTop: '10px', backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '0px 0px 0px 0px', overflowY: 'scroll', height: '100vh', borderTop: '5px solid black' }}>
                <div className='jumbotron' style={{ background: 'white', minHeight: '100vh', padding: '30px 30px 30px 30px' }}>
                    <br />
                    {userType === 'Job Recruiter' && (
                        <RecruiterView />
                    )}
                    {userType === 'Job Seeker' && (
                        <JobSeekerView />
                    )}
                </div>
            </div>
        </div>
    )
}
