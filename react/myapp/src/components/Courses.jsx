import React from 'react';
import { useCourses } from '../hooks/useCourses';
import '../styles/Courses_module.css';

const Courses = () => {
  const {
    courses,
    selectedCourses,
    loading,
    handleCheckboxChange,
    handleSubmit,
    handleLogout,
    isSubmitEnabled,
  } = useCourses();

  if (loading) {
    return <div className="loader">Fetching available courses...</div>;
  }

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Course Enrollment</h1>
        <button onClick={handleLogout} className="logoutButton">
          Logout
        </button>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit} className="form">
          <div className="courseList">
            {courses.map((course) => (
              <div key={course.id} className="courseCard">
                <div className="courseHeader">
                  <h2 className="courseTitle">{course.name}</h2>
                  <span className="courseCode">{course.courseCode}</span>
                </div>
                <p className="professor">Instructor: {course.professor}</p>
                <p className="credits">Credits: {course.credits}</p>
                <p className="prerequisites">
                  Prerequisites: {course.prerequisites.length > 0 ? course.prerequisites.join(', ') : 'None'}
                </p>
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.courseCode)}
                    onChange={() => handleCheckboxChange(course.courseCode)}
                    className="checkbox"
                    disabled={!course.eligible}
                  />
                  {course.eligible ? 'Eligible' : 'Not Eligible'}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={!isSubmitEnabled}
            className={isSubmitEnabled ? 'submitButton' : 'submitButtonDisabled'}
          >
            Enroll
          </button>
        </form>
      </main>
    </div>
  );
};

export default Courses;
