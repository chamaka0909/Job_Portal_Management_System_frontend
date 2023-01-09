import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

/**
 * @description This component is used to display the details of a selected received application to the recruiter.
 */

const RecruiterView = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [applicationDet, setApplicationDet] = React.useState({
        vacancyNo: '',
        companyId: '',
        companyName: '',
        applicantId: '',
        jobTitle: '',
        applicantFirstName: '',
        applicantLastName: '',
        applicantEmail: '',
        applicantPhone: '',
        appliedDate: '',
        educationalQualifications: [],
        experience: [],
        skills: [],
        languages: [],
        referees: [],
        coverLetter: '',
        additionalInformation: '',
        status: '',
        comments: ''
    });

    let [comments, setComments] = React.useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/applications/${id}`)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.exsitingApplication;
                    setApplicationDet({
                        vacancyNo: data.vacancyNo,
                        companyId: data.companyId,
                        companyName: data.companyName,
                        applicantId: data.applicantId,
                        jobTitle: data.jobTitle,
                        applicantFirstName: data.applicantFirstName,
                        applicantLastName: data.applicantLastName,
                        applicantEmail: data.applicantEmail,
                        applicantPhone: data.applicantPhone,
                        appliedDate: data.appliedDate,
                        educationalQualifications: data.educationalQualifications,
                        experience: data.experience,
                        skills: data.skills,
                        languages: data.languages,
                        referees: data.referees,
                        coverLetter: data.coverLetter,
                        additionalInformation: data.additionalInformation,
                        status: data.status,
                        comments: data.comments
                    });
                    setComments(data.comments);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log('Error white retrieving received applications from DB. Error: ', error);
            })
    }, [id]);

    const acceptHandler = () => {
        if (applicationDet.status === 'Pending') {
            axios.patch(`http://localhost:5000/applications/update/${id}`, {
                status: 'Accepted',
                comments: comments
            })
                .then(response => {
                    if (response.data.success) {
                        swal("Application is accepted");
                        window.location.reload(false);
                    }
                })
                .catch(error => {
                    console.log('Error while accepting the application. Error: ', error);
                }
                );
        }
        else {
            swal("Application already " + applicationDet.status + ". Cannot be changed again.");
        }
    }

    const rejectHandler = () => {
        //should get an confirmation alert
        if (applicationDet.status === 'Pending') {
            axios.patch(`http://localhost:5000/applications/update/${id}`, {
                status: 'Rejected',
                comments: comments
            })
                .then(response => {
                    if (response.data.success) {
                        swal("Application is rejected");
                    }
                }
                )
                .catch(error => {
                    console.log('Error while rejecting the application. Error: ', error);
                }
                );
        }
        else {
            swal("Application already " + applicationDet.status + ". Cannot be changed again.");
        }
    }

    // notify the user when the fetching records from the database is not completed
    if (isLoading) {
        return <div style={{ textAlign: 'çenter' }}> <h3>Loading...</h3></div>;
    }

    const onclickNext = () => {
        // to navigate to the interview and assigment page
        console.log(applicationDet.applicantId);
        console.log(applicationDet.jobTitle);

        window.location = `/interview/schdule/${applicationDet.applicantId}/${applicationDet.jobTitle}/${applicationDet.applicantFirstName}`;
    }

    return (
        <div className="container-fluid" style={{ maxWidth: 800 }}>
            <form>
                <br />
                <hr />
                <br />
                {/* First three fields should be filled automatically when click the apply button in vacancy */}
                <div className="form-group">
                    {/* vacancy no */}
                    <label htmlFor="vacancyNo"><h6>Vacancy No.</h6></label>
                    <input type="text" className="form-control" id="vacancyNo" aria-describedby="vacancyNoHelp" value={applicationDet.vacancyNo} readOnly />
                    <small id="vacancyNoHelp" className="form-text text-muted"></small>
                </div>
                <br />
                <div className="form-group">
                    {/* job title */}
                    <label htmlFor="jobTitle"><h6>Job title</h6></label>
                    <input type="text" className="form-control" id="jobTitle" aria-describedby="jobTitleHelp" value={applicationDet.jobTitle} readOnly />
                    <small id="jobTitleHelp" className="form-text text-muted"></small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            {/* applict's first name */}
                            <label htmlFor="firstNameInput"><h6>First name </h6> </label>
                            <input type="text" name='firstName' value={applicationDet.applicantFirstName} className="form-control" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="Enter first name" readOnly />
                            <small id="firstNameHelp" className="form-text text-muted"></small>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            {/* applicant's last name */}
                            <label htmlFor="lastNameInput"><h6>Last name </h6> </label>
                            <input type="text" value={applicationDet.applicantLastName} className="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Enter last name" readOnly />
                            <small id="lastNameHelp" className="form-text text-muted"></small>
                        </div>
                    </div>
                </div>
                <br />
                <div className="form-group">
                    {/* applicant's email */}
                    <label htmlFor="EmailInput"><h6>Email address </h6> </label>
                    <input type="email" value={applicationDet.applicantEmail} className="form-control" id="EmailInput" aria-describedby="emailHelp" placeholder="Enter email" readOnly />
                </div>
                <br />
                <div className="form-group">
                    {/* applicant's phone number */}
                    <label htmlFor="mobileNumber"><h6>Mobile number </h6> </label>
                    <input type="text" value={applicationDet.applicantPhone} className="form-control" id="mobileNumber" aria-describedby="mobileHelp" placeholder="Enter mobile number" readOnly />

                </div>
                <br />
                <div className="form-group">
                    {/* applied date */}
                    <label htmlFor="coverLetter"><h6> Received Date </h6> </label>
                    <input type='text' value={new Date(applicationDet.appliedDate).toString()} className="form-control" id="coverLetter" readOnly />
                </div>
                <br />
                <div>
                    <div className="form-group">
                        {/* educational qualifications */}
                        <label htmlFor="educationalQualifications"><h6> Educational Qualifications </h6> </label>
                        {applicationDet.educationalQualifications.map((item, index) => (
                            <div key={index}>
                                <textarea value={item.qualification} className="form-control" id="educationalQualifications" rows="3" readOnly />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div>
                    <div className="form-group">
                        {/* experience */}
                        <label htmlFor="experience"><h6> Experience </h6> </label>
                        {applicationDet.experience.map((item, index) => (
                            <div key={index}>

                                <textarea value={item.experience} className="form-control" id="experience" rows="3" readOnly />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div>
                    <div className="form-group">
                        {/* skills */}
                        <label htmlFor="skills"><h6> Skills </h6> </label>
                        {applicationDet.skills.map((item, index) => (
                            <div key={index}>

                                <textarea value={item.skill} className="form-control" id="skills" rows="3" readOnly />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div>
                    <div className="form-group">
                        {/* languages */}
                        <label htmlFor="languages"><h6> Languages </h6> </label>
                        {applicationDet.languages.map((item, index) => (
                            <div key={index}>

                                <textarea value={item.language} className="form-control" id="languages" rows="3" readOnly />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div>
                    <div className="form-group">
                        {/* referees */}
                        <label htmlFor="referees"><h6> Referees </h6> </label>
                        {applicationDet.referees.map((item, index) => (
                            <div key={index}>

                                <textarea value={item.referee} className="form-control" id="referees" rows="3" readOnly />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <div className="form-group">
                    {/* cover letter */}
                    <label htmlFor="coverLetter"><h6>Cover Letter </h6> </label>
                    <textarea value={applicationDet.coverLetter} className="form-control" id="coverLetter" rows="5" readOnly ></textarea>
                </div>
                <br />
                <div className="form-group">
                    {/* additional information */}
                    <label htmlFor="additionalInfo"><h6>Additional information</h6></label>
                    <textarea value={applicationDet.additionalInformation} className="form-control" id="additionalInfo" rows="3" readOnly></textarea>
                </div>
                <br />
                <div className="form-group">
                    {/* status */}
                    <label htmlFor="status"><h6>Status</h6></label>
                    <input value={applicationDet.status} className="form-control" id="status" readOnly />
                </div>
                <br />
                <div className="form-group">
                    {/* comments */}
                    <label htmlFor="comments"><h6>Comments</h6></label>
                    <textarea value={comments} className="form-control" id="comments" rows="3" onChange={(e) => setComments(e.target.value)} aria-describedby="mobileHelp"></textarea>
                    <small id="commentsHelp" className="form-text text-muted">Please give a comment when accepting or rejecting an application </small>
                </div>
                <br />
                <br />
                <div className='row'>
                    <div className='col'>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/all_applications')}> <h5>Back</h5></button>
                        </div>
                    </div>
                    <div className='col'>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button" className="btn btn-outline-dark" onClick={() => acceptHandler()}> <h5>Accept</h5></button>
                        </div>
                    </div>
                    <div className='col'>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button" className="btn btn-outline-dark" onClick={() => rejectHandler()}> <h5>Reject</h5></button>
                        </div>
                    </div>
                    {applicationDet.status === 'Accepted' &&
                        <div className='col'>
                            <div style={{ textAlign: 'center' }}>
                                <button type="button" className="btn btn-outline-dark" onClick={() => onclickNext()}> <h5>Interview</h5></button>
                            </div>
                        </div>
                    }
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default RecruiterView;