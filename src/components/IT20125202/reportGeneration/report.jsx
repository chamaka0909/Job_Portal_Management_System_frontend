import React, { useEffect } from 'react';
import AdminNavBar from '../../IT20128036/admin/AdminNavBar';
import axios from 'axios';
import jsPDF from 'jspdf';
import logo from '../../../images/reportLogo.PNG';
import { PieChart } from 'react-minimal-pie-chart';
import RightSidePanel from '../../IT20128036/admin/slideBar';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

/**
 * @description This component is used to generate the report related to applications and download it as a pdf file
 *                          - This component is used by the admin
 *                          - Admin can view a pie chart which shows the overall status of the submitted applications
 */

function Report() {
    let navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(true);
    const [Applications, setApplications] = React.useState([]);
    const [Pending, setPending] = React.useState([{}]);
    const [Accepted, setAccepted] = React.useState([{}]);
    const [Rejected, setRejected] = React.useState([{}]);

    useEffect(() => {
        // redirect to the login page if the user is not logged in
        if (!localStorage.token) {
            swal("Please login first", "", "warning")
                .then((value) => {
                    if (value) {
                        navigate(`/admin/login`);
                    }
                });
        }
        document.title = "Application Reports";
        axios.get('http://localhost:5000/applications').then(res => {
            if (res.data.success) {
                setApplications(res.data.exsitingApplications);
                setLoading(false);
            }
        })
            .catch((error) => {
                console.log('Error while fetching all the applications. Error: ', error);
            })

        setPending(Applications.filter((application) => application.status === "Pending"));
        setAccepted(Applications.filter((application) => application.status === "Accepted"));
        setRejected(Applications.filter((application) => application.status === "Rejected"));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Applications]);

    const pdfGenerate = () => {
        let doc = new jsPDF('portrait', 'px', 'a4', false);

        doc.addImage(logo, 'PNG', 20, 10, 70, 70);
        doc.setFont("times");
        doc.setFontSize(25);
        doc.text(225, 50, "Application Report", { renderingMode: 'fillThenStroke', align: 'center', baseline: 'middle' });
        doc.line(0, 90, 450, 90);
        doc.setFontSize(12);
        doc.text(420, 100, `Generatd Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.setFontSize(15);
        doc.text(20, 150, `      This report is based on the applications that was submitted through the portal from ${new Date(Applications[0].appliedDate).toString()} to ${new Date()}. \n \n(NOTE: This report is based on the overall application submissions and not related to any company.)`, { align: 'left', maxWidth: 400 });
        doc.setFont("times", "bold");
        doc.text(20, 240, 'Summary:', { align: 'left' });
        doc.setFont("times", "normal");
        doc.setFontSize(13);
        doc.text(30, 260, `- Total applications submitted through the portal :           ${Applications.length}`);
        doc.text(30, 280, `- Total accepted applications through the portal  :            ${Accepted.length}`);
        doc.text(30, 300, `- Total rejected applications through the portal   :            ${Rejected.length}`);
        doc.text(30, 320, `- Total pending applications through the portal   :            ${Pending.length}`);
        doc.setFontSize(20);
        doc.setFont("times", "bold");
        doc.text(225, 400, `Response percentage`, { baseline: 'middle', align: 'center' });
        doc.setTextColor(0, 0, 255);
        doc.text(225, 420, `${(((Accepted.length + Rejected.length) / Applications.length) * 100).toFixed(2)}%`, { baseline: 'middle', align: 'center' });
        doc.setTextColor(0, 0, 0);
        doc.text(225, 460, `Accepted rate`, { baseline: 'middle', align: 'center' });
        doc.setTextColor(0, 204, 0);
        doc.text(225, 480, `${((Accepted.length / Applications.length) * 100).toFixed(2)}%`, { baseline: 'middle', align: 'center' });
        doc.save('report.pdf');
    }

    if (isLoading) {
        return <div style={{ textAlign: 'çenter' }}> <h3>Loading...</h3></div>;
    }

    return (
        <div className='jumbotron' style={{ textAlign: 'center', margin: '10px 80px 10px 80px' }}>
            <br />
            <AdminNavBar />
            <hr />
            <div className='row' style={{ marginLeft: '1px' }}>
                <div className='col-sm-3' style={{ backgroundColor: '#DCDCDC' }}>
                    <br />
                    <RightSidePanel />
                </div>
                <div className='col-sm-9'>
                    <div className='row'>
                        <div>
                            <br /><h1>Applciation Reports</h1>
                            <br /><br /><br />
                            <button
                                className='btn btn-dark'
                                onClick={pdfGenerate}>
                                Generate Report
                            </button>
                            <br /><br />
                            <div className='container' style={{ backgroundColor: '#F5F5F5', maxWidth: '1000px', textAlign: 'left' }}>
                                <div style={{ textAlign: 'center', opacity: '0.3' }}>
                                    <br /><h3><i>Overall status of submitted applications</i></h3>
                                </div>
                                <PieChart
                                    radius={PieChart.defaultProps.radius - 20}
                                    viewBoxSize={[100, 100]}
                                    segmentsShift={(index) => (index === 0 ? 1 : 1.2)}
                                    label={({ dataEntry }) => dataEntry.title}
                                    labelPosition={60}
                                    labelStyle={{ fontSize: '3px', fill: '#000', opacity: 0.75 }}
                                    data={[
                                        { title: 'Rejected', value: Rejected.length, color: '#E55451' },
                                        { title: 'Pending', value: Pending.length, color: '#F3E5AB' },
                                        { title: 'Accepted', value: Accepted.length, color: '#90EE90' },
                                    ]}
                                />
                                <label style={{ background: '#90EE90', width: '100px', height: '15px' }} /> <b>Accepted Applications</b><br />
                                <label style={{ background: '#F3E5AB', width: '100px', height: '15px' }} /> <b>Pending Applications</b><br />
                                <label style={{ background: '#E55451', width: '100px', height: '15px' }} /> <b>Rejected Applciations</b><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br />
        </div>
    )
}

export default Report