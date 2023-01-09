import React, { useEffect } from 'react';
import './form.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import validateApplication from './validations';
import { useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

/**
 * @description This component is used to display the job application form to a logged in job seeker.
 *          - The company and vacancy details will be get from the url.
 *          - The job seeker's contact details will be get from the userToken.
 *          - If the job seeker has already applied for the vacancy, the form will be disabled. -------------------------------------------
 *          - If the job seeker maintains a resume in the system, the application form will be pre-filled with the resume details.
 * 
 *          - Email and mobile number will be validated using validateApplication function.
 */

const Form = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setLoading] = React.useState(true);
    const [vacancyNo, setVacancyNo] = React.useState(''); //should get from the selected vacancy 
    const [companyId, setCompanyId] = React.useState(''); //should get from the selected vacancy 
    const [companyName, setCompanyName] = React.useState(''); //should get from the selected vacancy 
    const [applicantId, setapplicantId] = React.useState(''); //should get from the current session
    const [jobTitle, setJobTitle] = React.useState(''); //should get from the selected vacancy 
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [educationalQualifications, setEducationalQualifications] = React.useState([{}]);
    const [experience, setExperience] = React.useState([{}]);
    const [skills, setSkills] = React.useState([{}]);
    const [languages, setLanguages] = React.useState([{}]);
    const [referees, setReferees] = React.useState([{}]);
    const [coverLetter, setCoverLetter] = React.useState('');
    const [additionalInformation, setAdditionalInformation] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [req, setReq] = React.useState('');

    useEffect(() => {
        document.title = "Application";
        const usertoken = localStorage.userToken;
        const decoded = jwt_decode(usertoken);
        setapplicantId(decoded._id);

        // get vacancy details
        axios.get(`http://localhost:5000/vacancy/get/${id}`)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.exsitingVacancy;
                    setVacancyNo(data.jobId);
                    setJobTitle(data.jobTitle);
                    setCompanyName(data.company);
                    setCompanyId(data.companyId);

                    setReq(applicantId + '/' + vacancyNo);
                }
            })
            .catch(error => {
                console.log('Error while fetching the vacancy details from DB. Error: ', error);
            });

        // retrieve application if the job seeker has already applied for the vacancy and redirect to all applications page
        axios.get(`http://localhost:5000/applications/submittedfor/${req}`)
            .then(res => {
                if (res.data.success && res.data.exsitingApplication !== null) {
                    setMessage("You have already applied for this vacancy on " + new Date(res.data.exsitingApplication.appliedDate).toLocaleDateString().toString());
                    swal(message, "", "info")
                        .then((value) => {
                            if (value) {
                                navigate('/all_applications');
                            }
                        });
                }
                else {
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log('Error while checking the submitted applications for the vacancy. Error: ', err);
            })

        // retrieve resume if the job seeker has already maintained a resume in the system
        axios.get(`http://localhost:5000/resumes/${applicantId}`)
            .then(response => {
                if (response.data.exsitingResume) {
                    setFirstName(response.data.exsitingResume.firstName);
                    setLastName(response.data.exsitingResume.lastName);
                    setEmail(response.data.exsitingResume.email);
                    setPhone(response.data.exsitingResume.phone);
                    setEducationalQualifications(response.data.exsitingResume.educationalQualifications);
                    setExperience(response.data.exsitingResume.experience);
                    setSkills(response.data.exsitingResume.skills);
                    setLanguages(response.data.exsitingResume.languages);
                    setReferees(response.data.exsitingResume.referees);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.log('Error while fetching the resume details from DB. Error: ', error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicantId, id, message, req, vacancyNo]);

    // handleArrayAdd, handleArrayRemove, handleArrayChange methods are used to add, remove and change elements in arrays
    const handleArrayAdd = (array, setArray) => {
        setArray([...array, {}]);
    }

    const handleArrayRemove = (array, setArray, index) => {
        const list = [...array];
        list.splice(index, 1);
        setArray(list);
    }

    const handleArrayChange = (array, setArray, e, index) => {
        const { name, value } = e.target;
        const list = [...array];
        list[index][name] = value;
        setArray(list);
    }


    const saveData = async (e) => {
        e.preventDefault();
        let application = {
            vacancyNo: vacancyNo,
            companyId: companyId,
            companyName: companyName,
            applicantId: applicantId,
            jobTitle: jobTitle,
            applicantFirstName: firstName,
            applicantLastName: lastName,
            applicantEmail: email,
            applicantPhone: phone,
            appliedDate: new Date().toString(),
            educationalQualifications: educationalQualifications,
            experience: experience,
            skills: skills,
            languages: languages,
            referees: referees,
            coverLetter: coverLetter,
            additionalInformation: additionalInformation,
            status: 'Pending',
            comments: ''
        }

        //validate and save the application
        if (validateApplication(application)) {
            await axios.post('http://localhost:5000/applications/apply', application).then(res => {
                swal("Application submitted successfully!", "", "success")
                    .then((value) => {
                        if (value) {
                            navigate('/all_applications');
                        }
                    });
            }).catch(error => {
                if (error.response.status === 400) {
                    swal('Please fill all the marked fields')
                }
            }).finally(() => {
            }
            );
        }
    }

    // notify the user when the fetching records from the database is not completed
    if (isLoading) {
        return <div style={{ textAlign: 'çenter' }}> <h3>Loading...</h3></div>;
    }

    return (
        <div className="container-fluid" style={{ maxWidth: 800 }}>
            <form>
                <br />
                <hr />
                <h6> All the fields marked with the (<span className="required_label" /> ) should be filled. </h6>
                <br />
                {/* First three fields should be filled automatically when click the apply button in vacancy */}
                <div className="form-group">
                    {/* vacancy no */}
                    <label htmlFor="vacancyNo"><h6>Vacancy No.</h6></label>
                    <input type="text" className="form-control" id="vacancyNo" aria-describedby="vacancyNoHelp" placeholder={vacancyNo} readOnly />
                    <small id="vacancyNoHelp" className="form-text text-muted"></small>
                </div>
                <br />
                <div className="form-group">
                    {/* company  */}
                    <label htmlFor="company"><h6>Company</h6></label>
                    <input type="text" className="form-control" id="company" aria-describedby="companyHelp" placeholder={companyName} readOnly />
                    <small id="companyHelp" className="form-text text-muted"></small>
                </div>
                <br />
                <div className="form-group">
                    {/* job title */}
                    <label htmlFor="jobTitle"><h6>Job title</h6></label>
                    <input type="text" className="form-control" id="jobTitle" aria-describedby="jobTitleHelp" placeholder={jobTitle} readOnly />
                    <small id="jobTitleHelp" className="form-text text-muted"></small>
                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            {/* applict's first name */}
                            <label htmlFor="firstNameInput"><h6>First name <span className="required_label" /></h6> </label>
                            <input type="text" name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="firstNameInput" aria-describedby="firstNameHelp" placeholder="Enter first name" required />
                            <small id="firstNameHelp" className="form-text text-muted"></small>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            {/* applicant's last name */}
                            <label htmlFor="lastNameInput"><h6>Last name <span className="required_label" /></h6> </label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" id="lastNameInput" aria-describedby="lastNameHelp" placeholder="Enter last name" required />
                            <small id="lastNameHelp" className="form-text text-muted"></small>
                        </div>
                    </div>
                </div>
                <br />
                <div className="form-group">
                    {/* applicant's email */}
                    <label htmlFor="EmailInput"><h6>Email address <span className="required_label" /></h6> </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="EmailInput" aria-describedby="emailHelp" placeholder="Enter email" required />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <br />
                <div className="form-group">
                    {/* applicant's phone number */}
                    <label htmlFor="mobileNumber"><h6>Mobile number <span className="required_label" /></h6> </label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="mobileNumber" aria-describedby="mobileHelp" placeholder="Enter mobile number" required />
                    <small id="mobileHelp" className="form-text text-muted">We'll never share your mobile number with anyone else.</small>
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="educationalQualifications"><h6>Education <span className="required_label" /></h6> </label>
                    {educationalQualifications.map((oneQualification, index) => (
                        <div key={index}>
                            <div className="form-group">
                                {/* educational qualifications */}
                                <textarea className="form-control" id="educationalQualifications" rows="3" required
                                    name='qualification'
                                    value={oneQualification.qualification}
                                    onChange={(e) => handleArrayChange(educationalQualifications, setEducationalQualifications, e, index)}
                                />
                            </div>
                            <br />
                            <div>
                                {educationalQualifications.length > 1 &&
                                    <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayRemove(educationalQualifications, setEducationalQualifications, index)}>
                                        <span>Remove</span>
                                    </button>
                                }
                            </div>
                            <br />
                            {educationalQualifications.length - 1 === index &&
                                <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayAdd(educationalQualifications, setEducationalQualifications)}>
                                    <span>Add education</span>
                                </button>
                            }
                        </div>
                    ))}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1"><h6>Experience</h6></label>
                    {experience.map((oneExperience, index) => (
                        <div key={index}>
                            <div className="form-group">
                                {/* experience */}
                                <textarea className="form-control" id="experience" rows="3"
                                    name='experience'
                                    value={oneExperience.experience}
                                    onChange={(e) => handleArrayChange(experience, setExperience, e, index)}
                                />
                            </div>
                            <br />
                            <div>
                                {experience.length > 1 &&
                                    <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayRemove(experience, setExperience, index)}>
                                        <span>Remove</span>
                                    </button>
                                }
                            </div>
                            <br />
                            {experience.length - 1 === index &&
                                <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayAdd(experience, setExperience)}>
                                    <span>Add experience</span>
                                </button>
                            }
                        </div>
                    ))}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="skills"><h6>Skills <span className="required_label" /></h6></label>
                    {skills.map((oneSkill, index) => (
                        <div key={index}>
                            <div className="form-group">
                                {/* skills */}
                                <input type='text' className="form-control" id="skills" rows="3"
                                    name='skill'
                                    value={oneSkill.skill}
                                    onChange={(e) => handleArrayChange(skills, setSkills, e, index)}
                                />
                            </div>
                            <br />
                            <div>
                                {skills.length > 1 &&
                                    <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayRemove(skills, setSkills, index)}>
                                        <span>Remove</span>
                                    </button>
                                }
                            </div>
                            <br />
                            {skills.length - 1 === index &&
                                <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayAdd(skills, setSkills)}>
                                    <span>Add skill</span>
                                </button>
                            }
                        </div>
                    ))}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="languages"><h6>Languages <span className="required_label" /></h6></label>
                    {languages.map((oneLanguage, index) => (
                        <div key={index}>
                            <div className="form-group">
                                {/* languages */}
                                <input type='text' className="form-control" id="languages" rows="2"
                                    name='language'
                                    value={oneLanguage.language}
                                    onChange={(e) => handleArrayChange(languages, setLanguages, e, index)}
                                />
                            </div>
                            <br />
                            <div>
                                {languages.length > 1 &&
                                    <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayRemove(languages, setLanguages, index)}>
                                        <span>Remove</span>
                                    </button>
                                }
                            </div>
                            <br />
                            {languages.length - 1 === index &&
                                <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayAdd(languages, setLanguages)}>
                                    <span>Add language</span>
                                </button>
                            }
                        </div>
                    ))}
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="referees"><h6>Referees</h6></label>
                    {referees.map((oneReferee, index) => (
                        <div key={index}>
                            <div className="form-group">
                                {/* referees */}
                                <textarea className="form-control" id="referees" rows="3"
                                    name='referee'
                                    value={oneReferee.referee}
                                    onChange={(e) => handleArrayChange(referees, setReferees, e, index)}
                                />
                            </div>
                            <br />
                            <div>
                                {referees.length > 1 &&
                                    <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayRemove(referees, setReferees, index)}>
                                        <span>Remove</span>
                                    </button>
                                }
                            </div>
                            <br />
                            {referees.length - 1 === index &&
                                <button type='button' className="btn btn-outline-dark" onClick={() => handleArrayAdd(referees, setReferees)}>
                                    <span>Add referee</span>
                                </button>
                            }
                        </div>
                    ))}
                </div>
                <br />
                <div className="form-group">
                    {/* cover letter */}
                    <label htmlFor="coverLetter"><h6>Cover Letter <span className="required_label" /></h6> </label>
                    <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="form-control" id="coverLetter" rows="5" required ></textarea>
                </div>
                <br />
                <div className="form-group">
                    {/* additional information */}
                    <label htmlFor="additionalInfo"><h6>Additional information</h6></label>
                    <textarea value={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} className="form-control" id="additionalInfo" rows="3"></textarea>
                </div>
                <br />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <button type="button" className="btn btn-outline-success" onClick={(e) => saveData(e)}> <h5>Submit</h5></button>
                </div>
                <br />
                <br />
            </form>
        </div>
    )
}

export default Form;