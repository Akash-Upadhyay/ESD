import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import './styles/custom_css.css'
import './styles/signin.css'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Enroll from './pages/Enroll';
// import Products from './pages/Products';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EnrolledCourses from './pages/EnrolledCourses';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/enroll",
    element: <Enroll />,
  },
  {
    path: "/enrolled_courses",
    element: <EnrolledCourses />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
