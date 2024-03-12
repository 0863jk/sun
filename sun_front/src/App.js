import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setLoginState } from './redux/reducers/LoginStateReducer';
import { useCookies } from 'react-cookie';
import { isAccessTokenExpired, refreshAccessToken } from './apis/api/User';
import { setToken } from './redux/reducers/AuthReducer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Component/Nav/Header';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/login/SignUp';
import Main from './pages/main/Main';
import NewCenter from './pages/main/NewCenter';
import Footer from './Component/Footer';
import NewPass from './pages/center/pass/NewPass';
import PassList from './pages/center/pass/PassList';
import ModifyProfile from './pages/login/ModifyProfile';
import PassManage from './pages/center/pass/PassManage';
import Timetable from './pages/center/timetable/Timetable';
import Instroctor from './pages/center/admin/Instroctor';
import Member from './pages/center/admin/Member';
import Revenue from './pages/center/admin/Revenue';
import Program from './pages/center/admin/Program';
import TimeTableRegister from './pages/center/admin/TimeTableRegister';
import SearchCenter from './pages/main/SearchCenter';
import CenterRegister from './pages/main/CenterRegister';
import PassModify from './pages/center/admin/PassModify';
import ProgramInfo from './pages/center/program/ProgramInfo';
import Template from './pages/center/admin/Template';
import MyPageGeneral from './pages/center/mypage/MyPageGeneral';
import MyPageProgram from './pages/center/mypage/MyPageProgram';
import MyPageTemplate from './pages/center/mypage/MyPageTemplate';
import CenterInfoModify from './pages/center/admin/CenterInfoModify';
import { antdTheme } from './antdTheme';
import TemplateInfo from './pages/center/program/TemplateInfo';
import MyWeekly from './pages/main/MyWeekly';
//import Footer from './Component/Footer';

function App() {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const loginState = useSelector((state) => state.LoginState.login_state)
  const authToken = useSelector((state) => state.Auth);
  const userInfo = useSelector((state) => state.UserInfo);
  const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);
  const refreshToken = cookies.refresh_token;

  useEffect(() => {
    if (authToken) {
      // 일반 토큰 검사
      isAccessTokenExpired(authToken.access_token)
        .then(response => {
          if (response === 401) {
            // 일반 토큰이 만료 됐다면 리프레쉬 토큰 검사
            isAccessTokenExpired(refreshToken)
              .then(response => {
                // 리프레쉬 토큰이 만료되지 않았다면 새 토큰 발행
                if (response === 200) {
                  refreshAccessToken(refreshToken)
                    .then(data => {
                      const { access, refresh, access_token_expiration } = data;
                      dispatch(setToken(access));
                      dispatch(setLoginState(true));
                      setCookie("refresh_token", refresh, { access_token_expiration });
                      window.location.reload();
                    });
                  } else {
                    // 리프레쉬 토큰이 만료되었다면 세션 및 쿠키 비우기
                    dispatch(setLoginState(false));
                }
              })
              .catch(
                response => console.log("catch!")
              ); 
          } else if (response === 200) {
          } else {
            dispatch(setLoginState(false));
            setLoginState(false);
          }
        });
    }
  }, []);

  const LoginSuccess = (name) => {
    messageApi.open({
      type: 'success',
      content: `${name} 님, 환영해요. 😎`,
    });
    dispatch(setLoginState(true));
  };

  return (
    <div className='clearfix'>
      <ConfigProvider theme={antdTheme}>
        {contextHolder}
        <BrowserRouter>
          <div className="header">
            {
              loginState ? <Header loginState={true} /> : <Header loginState={false} />
            }
          </div>
          <div>
            <Routes>
              <Route path="/login" element={<LogIn LoginSuccess={LoginSuccess} />}></Route>
              <Route path="/signup" element={<SignUp LoginSuccess={LoginSuccess} />}></Route>
              <Route path="/account/profile" element={<ModifyProfile />}></Route>
              <Route path="/" element={<Main />}></Route>
              <Route path="/timetable" element={<MyWeekly />}></Route>
              <Route path="/register/:pCenterId" element={<CenterRegister />}></Route>
              <Route path="/center/search" element={<SearchCenter />}></Route>
              <Route path="/center/register" element={<NewCenter />}></Route>

              <Route path="/main/:pCenterId" element={<Timetable />}></Route>
              <Route path="/timetable/:pCenterId" element={<Timetable />}></Route>
              <Route path="/pass/list/:pCenterId" element={<PassList />}></Route>
              <Route path="/pass/register/:pCenterId" element={<NewPass />}></Route>

              <Route path="/program/:pCenterId/:pProgramId" element={<ProgramInfo />}></Route>
              <Route path="/template/:pCenterId/:pTemplateId" element={<TemplateInfo />}></Route>

              <Route path="/admin/info/:pCenterId" element={<CenterInfoModify />}></Route>
              <Route path="/admin/revenue/:pCenterId" element={<Revenue />}></Route>
              <Route path="/admin/timetable/:pCenterId" element={<TimeTableRegister />}></Route>
              <Route path="/admin/pass/:pCenterId" element={<PassModify />}></Route>
              <Route path="/admin/instroctor/:pCenterId" element={<Instroctor />}></Route>
              <Route path="/admin/member/:pCenterId" element={<Member />}></Route>
              <Route path="/admin/template/:pCenterId" element={<Template />}></Route>
              <Route path="/admin/program/:pCenterId" element={<Program />}></Route>

              <Route path="/mypage/general/:pCenterId" element={<MyPageGeneral />}></Route>
              <Route path="/mypage/instroctor/program/:pCenterId" element={<MyPageProgram />}></Route>
              <Route path="/mypage/instroctor/template/:pCenterId" element={<MyPageTemplate />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        <div className='wrap'>
          <Footer />
        </div>
      </ConfigProvider>

    </div>
  );
}

export default App;
