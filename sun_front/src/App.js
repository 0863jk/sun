import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Component/Nav/Header';
import CenterList from './Container/Center/CenterList';
import CenterSearch from './Container/Center/CenterSearch';
import CenterMain from './Container/Center/CenterMain';
import PlanList from './Container/Plan/PlanList';
import CenterRegister from './Container/NewCenter/CenterRegister';
import PlanRegister from './Container/NewCenter/PlanRegister';
import LessonRegister from './Container/Lesson/LessonRegister';
import MemberManage from './Container/Admin/MemberManage';
import TeacherManage from './Container/Admin/TeacherManage';
import TeacherRegister from './Container/NewCenter/TeacherRegister';
import MyPlan from './Container/Plan/MyPlan';
import LessonHistory from './Container/MyLesson/LessonHistory';
import Weekly from './Container/TimeTable/Weekly';
import Stats from './Container/Admin/Stats';
import LessonList from './Container/Admin/LessonList';
import PlanModify from './Container/Plan/PlanModify';
import TimeTableRegister from './Container/TimeTable/TimeTableRegister';
import WriteLessonReview from './Container/MyLesson/WriteLessonReview';
import LessonReview from './Container/Admin/LessonReview';
import LessonInfo from './Container/Lesson/LessonInfo';
import PlanManage from './Container/Plan/PlanManage';
import LoginForm from './Container/LoginForm/LoginForm';
import SignUpForm from './Container/LoginForm/SignUpForm';
//import Footer from './Component/Footer';

function App() {

  return (
    <div>
      <BrowserRouter>
        <div className="header">
          <Header  />
        </div>
        <div className="clearfix">
          <Routes>
            <Route path="/login" element={<LoginForm/>}></Route>
            <Route path="/signup/*" element={<SignUpForm />}></Route>
            <Route path="/signup/:pUserRole" element={<SignUpForm />}></Route>
            <Route path="/" element={<CenterList  />}></Route>
            <Route path="/center/list" element={<CenterList />}></Route>
            <Route path="/center/search" element={<CenterSearch  />}></Route>
            <Route path="/center/register" element={<CenterRegister />}></Route>
            {/* <Route path="/center/register/:pPage" element={<CenterRegister />}></Route>
            <Route path="/center/register/info" element={<CenterRegister  />}></Route>
            <Route path="/center/register/plan" element={<PlanRegister  />}></Route>
            <Route path="/center/register/teacher" element={<TeacherRegister  />}></Route> */}

            <Route path="/main/:pCenterId" element={<Weekly/>}></Route>
            <Route path="/weekly/:pCenterId" element={<Weekly  />}></Route>
            {/* <Route path="/montly/:pCenterId" element={<Montly />}></Route>
            <Route path="/daily/:pCenterId" element={<Daily />}></Route> */}
            <Route path="/plan/:pCenterId" element={<PlanList  />}></Route>
            <Route path="/plan/:pCenterId/:pUserId" element={<MyPlan  />}></Route>
            <Route path="/plan/info/:pPlanId" element={<PlanModify  />}></Route>
            <Route path="/plan/modify/:pPlanId" element={<PlanManage  />}></Route>
            <Route path="/plan/modify/:pCenterid/:pPlanId" element={<PlanModify  />}></Route>
            <Route path="/plan/list/:pCenterId" element={<PlanList  />}></Route>
            <Route path="/lesson/:pCenterId/:pUserId" element={<LessonHistory  />}></Route>
            <Route path="/lesson/:pLessonId" element={<LessonInfo  />}></Route>
            <Route path="/lesson/rate/:pLessonId" element={<WriteLessonReview  />}></Route>
            <Route path="/lesson/review/:pLessonId" element={<LessonReview  />}></Route>
            <Route path="/lesson/register/:pCenterId" element={<LessonRegister  />}></Route>
            <Route path="/timetable/:pCenterId" element={<TimeTableRegister  />}></Route>
            <Route path="/timetable/register/:pCenterId" element={<LessonRegister  />}></Route>
            <Route path="/plan/register/:pCenterId" element={<PlanRegister  />}></Route>
            <Route path="/admin/:pCenterId" element={<TeacherManage  />}></Route>
            <Route path="/admin/teacher/:pCenterId" element={<TeacherManage  />}></Route>
            <Route path="/admin/member/:pCenterId" element={<MemberManage  />}></Route>
            <Route path="/admin/stats/:pCenterId" element={<Stats  />}></Route>
            <Route path="/admin/lesson/:pCenterId" element={<LessonList  />}></Route>
          </Routes>
        </div>
        <Routes>
          
        </Routes>
      </BrowserRouter>
      <div className='wrap'>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
