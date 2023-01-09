import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

/**
 * @description This component is used to display all the submitted applications of a logged in job seeker .
 */

export default function JobSeekerView() {

    let navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(true);
    const [applicantId, setApplicantId] = React.useState('');
    const [applications, setApplications] = React.useState([]);
    const [allApplications, setAllApplications] = React.useState([]);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        document.title = "All Application";
        const usertoken = localStorage.userToken;
        const decoded = jwt_decode(usertoken);
        setApplicantId(decoded._id);
        axios.get(`http://localhost:5000/applications/submitted/${applicantId}`).then(res => {
            if (res.data.success) {
                setApplications(res.data.exsitingApplications);
                setAllApplications(res.data.exsitingApplications);
                setLoading(false);
            }
        }).catch((error) => {
            console.log('Error while fetching the records from db. Error: ', error);
        })
    }, [applicantId]);

    // for searching
    const handleSearchArea = (e) => {
        setSearch(e.target.value)
        setApplications(allApplications);
        if (search !== '') {
            setApplications(allApplications);
            filterData(search);
        }
    }

    const filterData = (searchKey) => {
        const searchResult = applications.filter((application) =>
            application.companyName.toLowerCase().includes(searchKey) ||
            application.jobTitle.toLowerCase().includes(searchKey) ||
            application.status.toLowerCase().includes(searchKey) ||

            application.companyName.toUpperCase().includes(searchKey) ||
            application.jobTitle.toUpperCase().includes(searchKey) ||
            application.status.toUpperCase().includes(searchKey) ||

            application.companyName.includes(searchKey) ||
            application.jobTitle.includes(searchKey) ||
            application.status.includes(searchKey)
        )
        setApplications(searchResult);
    }

    // notify the user when the fetching records from the database is not completed
    if (isLoading) {
        return <div style={{ textAlign: 'çenter' }}> <h3>Loading...</h3></div>;
    }

    return (
        <div>
            <br />
            <h1 style={{ textAlign: "center" }}> All Submitted Applications </h1>
            <div className='col-lg-3 mt-2 mb-2'>
                <input
                    className='form-control'
                    type="search"
                    value={search}
                    name="searchQuery"
                    placeholder='Search...'
                    onChange={handleSearchArea}>
                </input>
            </div>
            <hr />
            {allApplications.length === 0 &&
                <div style={{ textAlign: 'center' }}><h3> No Results Found </h3></div>
            }
            <table className="table table-hover" style={{ border: '1px solid lightgray' }}>
                {allApplications.length > 0 &&
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Vacancy No.</th>
                            <th scope="col">Company</th>
                            <th scope="col">Job Title</th>
                            <th scope="col">Applied Date</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                }
                {search.length > 0 && applications.length > 0 &&
                    <tbody>
                        {applications.map((application, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{application.vacancyNo}</td>
                                <td>{application.companyName}</td>
                                <td>{application.jobTitle}</td>
                                <td>{application.appliedDate}</td>
                                <td>
                                    {application.status === "Pending" && <span style={{ color: 'black' }}>{application.status}</span>}
                                    {application.status === "Accepted" && <span style={{ color: 'green' }}>{application.status}</span>}
                                    {application.status === "Rejected" && <span style={{ color: 'red' }}>{application.status}</span>}
                                </td>
                                <td> <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/application_details/${application._id}`)}><i className="fa fa-eye" />&nbsp;View</button> </td>
                            </tr>
                        ))}
                    </tbody>
                }
                {search.length > 0 && applications.length === 0 &&
                    <tbody> <tr> <td colSpan="7" style={{ textAlign: "center" }}> <h3> No Results Found </h3> </td> </tr> </tbody>
                }
                {search.length === 0 && allApplications.length > 0 &&
                    <tbody>
                        {allApplications.map((application, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{application.vacancyNo}</td>
                                <td>{application.companyName}</td>
                                <td>{application.jobTitle}</td>
                                <td>{new Date(application.appliedDate).toString()}</td>
                                <td>
                                    {application.status === "Pending" && <span style={{ color: 'black' }}>{application.status}</span>}
                                    {application.status === "Accepted" && <span style={{ color: 'green' }}>{application.status}</span>}
                                    {application.status === "Rejected" && <span style={{ color: 'red' }}>{application.status}</span>}
                                </td>
                                <td> <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/application_details/${application._id}`)}><i className="fa fa-eye" />&nbsp;View</button> </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </table>
        </div>
    )
}
