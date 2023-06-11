import Popup from "./components/alert/ToastContainer";
import NavBarContainer from "./components/navbar/NavBarContainer";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import {
  LoginPage,
  MainPage,
  RegistrationPage,
  ProfilePage,
  GroupsPage,
  CoursesListPage,
  CourseDetailsPage,
  NotFound,
} from "./components/pages/pages";
import Loader from "./components/animations/Loader";

import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getRoles } from "./store/thunk/accountAPI";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const { authorized, profile } = useSelector((store) => store.account);
  const [isLight, setIsLight] = useState(localStorage.getItem("mode") !== "dark");

  const bodyLight = "d-flex align-items-center flex-column pb-5 light";
  const bodyDark = "d-flex align-items-center flex-column pb-5 dark";

  useEffect(() => {
    if (authorized) {
      dispatch(getProfile());
      dispatch(getRoles());
    }
  }, [authorized]);

  return (
    <BrowserRouter>
      <Popup/>
      <NavBarContainer isLight={isLight} />
      {authorized && !profile ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center position-absolute">
          <Loader />
        </div>
      ) : (
        <div className={isLight ? bodyLight : bodyDark}>
          <Routes>
            <Route
              path="/registration"
              element={authorized ? <Navigate to="/" /> : <RegistrationPage />}
            />
            <Route
              path="/login"
              element={authorized ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/profile"
              element={authorized ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/groups/:id"
              element={
                authorized ? (
                  <CoursesListPage type="group" key="group" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/groups"
              element={authorized ? <GroupsPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/courses/teaching"
              element={
                authorized ? (
                  <CoursesListPage type="teaching" key="teaching" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/courses/my"
              element={
                authorized ? (
                  <CoursesListPage type="my" key="my" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/courses/:id"
              element={
                authorized ? <CourseDetailsPage /> : <Navigate to="/login" />
              }
            />
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
      <ThemeButton isLight={isLight} setIsLight={setIsLight}/>
    </BrowserRouter>
  );
}

export default App;
