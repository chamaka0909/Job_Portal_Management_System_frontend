import React from "react";
import NavBar from "../../IT20128036/NavBar";
import Form from "./Form";
import image from "../../../images/back1.jpg";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

/**
 * @description This is the main page of the application
 */

export default function ApplicationPage() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <div className='jumbotron' style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '50px', paddingTop: '10px', backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: '0px 0px 0px 0px', overflowY: 'scroll', height: '100vh', borderTop: '5px solid black' }}>
        <div className='jumbotron' style={{ background: 'white', minHeight: '100vh', padding: '30px 30px 30px 30px' }}>
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}> Application </h1>
          <Form />
        </div>
      </div>
    </div>
  );
}
