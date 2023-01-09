import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * @description This component is used to display the details of a selected submitted application to the logged in job seeker
 */

const JobSeekerView = () => {
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
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.log('Error white retrieving submitted applications from DB. Error: ', error);
            })
    }, [id]);

    // notify the user when the fetching records from the database is not completed
    if (isLoading) {
        return <div style={{ textAlign: 'çenter' }}> <h3>Loading...</h3></div>;
    }

    return (
        <div className="container-fluid" style={{ maxWidth: 800 }}>
            <form>
                <br />
                <hr />
                <br />
                <div className="form-group">
                    {/* vacancy no */}
                    <label htmlFor="vacancyNo"><h6>Vacancy No.</h6></label>
                    <input type="text" className="form-control" id="vacancyNo" aria-describedby="vacancyNoHelp" value={applicationDet.vacancyNo} readOnly />
                    <small id="vacancyNoHelp" className="form-text text-muted"></small>
                </div>
                <br />
                <div className="form-group">
                    {/* company name */}
                    <label htmlFor="companyName"><h6>Company Name</h6></label>
                    <input type="text" className="form-control" id="vacancyNo" aria-describedby="companyNameHelp" value={applicationDet.companyName} readOnly />
                    <small id="companyNameHelp" className="form-text text-muted"></small>
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
                    <label htmlFor="coverLetter"><h6> Applied Date </h6> </label>
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
                    <label htmlFor="additionalInfo"><h6>Status</h6></label>
                    <input value={applicationDet.status} className="form-control" id="additionalInfo" rows="3" readOnly />
                </div>
                <br />
                <div className="form-group">
                    {/* comments */}
                    <label htmlFor="additionalInfo"><h6>Comments</h6></label>
                    <textarea value={applicationDet.comments} className="form-control" id="additionalInfo" rows="3" readOnly></textarea>
                </div>
                <br />
                <br />
                <div className='row'>
                    <div className='col'>
                        <div style={{ textAlign: 'center' }}>
                            <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/all_applications')}> <h5>Back</h5></button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default JobSeekerView;