import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationPage from "./components/IT20125202/application/ApplicationPage";
import AllApplications from "./components/IT20125202/allApplications/AllApplications";
import ApplicationDetails from "./components/IT20125202/applicationDetails/ApplicationDetails";
import ViewInterviews from "./components/IT20127046/Interview/ViewInterviews";
import RecruiterView from "./components/IT20127046/Interview/Recruiter/RecruiterView";
import JobSeekerView from "./components/IT20127046/Interview/JobSeeker/JobSeekerView";
import ScheduleInterview from "./components/IT20127046/Interview/Recruiter/ScheduleInterview";
import CreateUser from "./components/IT20128036/UserRegistration";
import UserLogin from "./components/IT20128036/UserLogin";
import LandingPage from "./components/IT20128036/LandingPage";
import AdminHome from "./components/IT20128036/admin/AdminHome";
import AdminLogin from "./components/IT20128036/admin/AdminLogin";
import UserRoles from "./components/IT20128036/userManagement/userRoles";
import EditUser from "./components/IT20128036/userManagement/editUsers";
import UserRoles_JonRecruiter from "./components/IT20128036/userManagement/userRole_JobRecruiter";
import UserRoles_JobSeeker from "./components/IT20128036/userManagement/userRole_JobSeeker";
import ContactUs from "./components/IT20128036/ContactUs";
import UserInquiries from "./components/IT20128036/userManagement/userInquiries";
import ReplyToUser from "./components/IT20128036/userManagement/replyInquiries";
import ViewInquiries from "./components/IT20128036/ViewInquiries";
import UpdateVacancy from "./components/IT20131456/Company/UpdateVacancy";
import ViewVacancy from "./components/IT20131456/Company/ViewVacancy";
import Example from "./components/IT20128036/userManagement/barChart";
import BChart from "./components/IT20128036/userManagement/bChart";
import ViewVacancyAdmin from "./components/IT20131456/Admin/ViewVacancyAdmin";
import ViewPostedVacancies from "./components/IT20131456/Jobseeker/ViewPostedVacancies";
import GenarateVacancyReport from "./components/IT20131456/Company/GenarateVacancyReport";
import EditInterview from "./components/IT20127046/Interview/Recruiter/EditInterview";
import ViewInterview from "./components/IT20127046/Interview/Recruiter/ViewInterview";
import AddAssessment from "./components/IT20127046/Assessment/Recruiter/AddAssessment";
import ViewAssessment from "./components/IT20127046/Assessment/Recruiter/ViewAssessment";
import EditAssessment from "./components/IT20127046/Assessment/Recruiter/EditAssessment";
import UpdateProfile from "./components/IT20128036/userProfile";
import ViewUserProfile from "./components/IT20128036/ViewUserProfile";
import { ExportPDF } from "./components/IT20128036/userManagement/exportPDF";
import ChangePassword from "./components/IT20128036/ChangePassword";
import UpdateProfilePhoto from "./components/IT20128036/EditProfilePhoto";
import Resume from "./components/IT20125202/resume/Resume";
import MyNotifications from "./components/IT20127046/Interview/JobSeeker/MyNotifications";
import Report from "./components/IT20125202/reportGeneration/report";
import { Home } from "./components/IT20125202/Home";
import SendAssessment from "./components/IT20127046/Assessment/Recruiter/SendAssessment";
import ViewSentAssessment from "./components/IT20127046/Assessment/Recruiter/ViewSentAssessment";
import ViewAssessmentJobSeeker from "./components/IT20127046/Assessment/JobSeeker/ViewAssessmentJobSeeker";
import GenerateReportIT46 from "./components/IT20127046/ReportGeneration/GenerateReport";

function App() {
  
  return (
    <BrowserRouter>
 
    {/* <NavBar/> */}

      <Routes>
        {/* ---------------Admin--------------- */}
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/userroles" element={<UserRoles />} />
        <Route path="/admin/edituser/:id" element={<EditUser />} />
        <Route path="/admin/user/recruiter"element={<UserRoles_JonRecruiter />}/>
        <Route path="/admin/user/seeker" element={<UserRoles_JobSeeker />} />
        <Route path="/admin/inquiries" element={<UserInquiries />} />
        <Route path="/admin/inquiries/reply/:id" element={<ReplyToUser />} />
        <Route path="/view/vacancy/admin" element={<ViewVacancyAdmin />} />
        <Route path="/admin/barchart/view" element={<Example/>} />
        <Route path="/admin/bchart" element={<BChart/>} />
        <Route path="/admin/applicationreports" element={<Report/>} />
        <Route path="/admin/user/report" element={<ExportPDF/>} />
        
        
        {/* ---------------Job Recruters / Job Seekers --------------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/application/:id" element={<ApplicationPage />} />
        <Route path="/all_applications" element={<AllApplications />} />
        <Route path="/application_details/:id" element={<ApplicationDetails />}/>     
        <Route path="/interview" element={<ViewInterviews />} />
        <Route path="/interview/recruiter" element={<RecruiterView />} />
        <Route path="/interview/jobseeker" element={<JobSeekerView />} />
        <Route path="/interview/schdule" element={<ScheduleInterview />} />
        <Route path="/interview/schdule/:id/:role/:name" element={<ScheduleInterview />} />
        <Route path="/interview/update/:id" element={<EditInterview />} />
        <Route path="/interview/view/:id" element={<ViewInterview />} />
        <Route path="/user/registration" element={<CreateUser />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/inq" element={<ContactUs />} />
        <Route path="/user/view/inq" element={<ViewInquiries />} />        
        <Route path="/view/vacancy" element={<ViewVacancy />} />
        <Route path="/update/vacancy/:id" element={<UpdateVacancy />} />
        <Route path="/view/vacancy/jobseeker" element={<ViewPostedVacancies/>} />
        <Route path="/genarate/vacancy/report" element={<GenarateVacancyReport/>} />
        <Route path="/userprofile" element={<UpdateProfile/>} />
        <Route path="/userprofile/view" element={<ViewUserProfile/>} />
        <Route path="/userprofile/update/photo" element={<UpdateProfilePhoto/>} />
        <Route path="/user/change/password" element={<ChangePassword/>} />
        <Route path="/assessment/add" element={<AddAssessment />} />
        <Route path="/assessment/recruiter" element={<ViewAssessment />} />
        <Route path="/assessment/update/:id" element={<EditAssessment />} />
        <Route path="/resume" element={<Resume/>} />
        <Route path="/interview/jobseeker/notification" element={<MyNotifications />} />
        <Route path="/assessment/send/:id" element={<SendAssessment />} />
        <Route path="/sendAssessment/recruiter/view" element={<ViewSentAssessment />} />

        <Route path="/sendAssessment/jobseeker" element={<ViewAssessmentJobSeeker />} />
        <Route path="/generateReport/interview" element={<GenerateReportIT46 />} />


        <Route path="/home" element={<Home/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
