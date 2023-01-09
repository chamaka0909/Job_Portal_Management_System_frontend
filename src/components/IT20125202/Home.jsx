import React from 'react';
import image from '../../images/land.png';
import NavBar from '../IT20128036/NavBar';
import comLogo from '../../../src/images/comLogo.jpg';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

/**
 * @description This is the Home page for users who are logged in
 */

export const Home = () => {
    let navigate = useNavigate();

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
        document.title = "Home";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBar />
            <div className="" style={{ minHeight: '100vh' }}>
                <div className='mx-1 my-1' style={{ position: 'relative', textAlign: 'center' }}>
                    <img src={image} class="img-fluid" alt="JOB4ME" style={{ minWidth: '100%', minHeight: '100vh', opacity: '0.7' }}></img>
                    {/*<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    </div>*/}
                </div>
                <hr />
                <br /><br /><br /><br /><br />
                <div className="container" style={{ textAlign: 'center', fontFamily: 'MV Boli' }}>
                    <h2><b> "An Oppotunity for Everyone" </b></h2>
                    <p style={{ fontSize: '20px' }}>
                        You don't have to worry anymore, you can track the process of your application and you can get the best job for you. <br />
                        This is a place for job seekers to find their dream job and recruiters can find the best candidates.
                    </p>
                </div>
                <br /><br /><br /><br /><br />
                <hr />
                <br /><br /><br />
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2><b> Trusted by Best Companies </b></h2>
                </div>
                <br />
                <div className="card-group" style={{ paddingLeft: '70px', paddingRight: '70px' }}>
                    <div className="card" style={{ padding: '40px 40px 40px 40px', maxWidth: '300px' }}>
                        <img src={comLogo} className="card-img-top" alt="..." />
                    </div>
                    <div className="card" style={{ padding: '40px 40px 40px 40px', maxWidth: '300px' }}>
                        <img src={comLogo} Name="card-img-top" alt="..." />
                    </div>
                    <div className="card" style={{ padding: '40px 40px 40px 40px', maxWidth: '300px' }}>
                        <img src={comLogo} className="card-img-top" alt="..." />
                    </div>
                    <div className="card" style={{ padding: '40px 40px 40px 40px', maxWidth: '300px' }}>
                        <img src={comLogo} className="card-img-top" alt="..." />
                    </div>
                    <div className="card" style={{ padding: '40px 40px 40px 40px', maxWidth: '300px' }}>
                        <img src={comLogo} className="card-img-top" alt="..." />
                    </div>
                    <div className="card" style={{ padding: '40px 40px 40px 40px', maxWidth: '300px' }}>
                        <img src={comLogo} className="card-img-top" alt="..." />
                    </div>
                </div>
                <br /><br /><br /><br /><br />
            </div>
        </div>
    )
}
