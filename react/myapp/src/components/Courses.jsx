// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Courses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const rollno = localStorage.getItem('username');
//     const term = 'Fall';

//     const url = `http://localhost:8080/courses/available?rollno=${rollno}&term=${term}`;

//     fetch(url, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setCourses(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching courses:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleCheckboxChange = (courseCode) => {
//     setSelectedCourses((prevSelectedCourses) => {
//       if (prevSelectedCourses.includes(courseCode)) {
//         return prevSelectedCourses.filter((code) => code !== courseCode);
//       } else {
//         return [...prevSelectedCourses, courseCode];
//       }
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const rollno = localStorage.getItem('username');

//     const data = {
//       rollno: rollno,
//       selectedCourses: selectedCourses,
//     };

//     fetch('http://localhost:8080/courses/enroll', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         alert('Courses enrolled successfully!');
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error('Error enrolling courses:', error);
//         alert('Failed to enroll in courses.');
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     //alert('You have been logged out.');
//     navigate('/login');
//   };

//   const isSubmitEnabled = selectedCourses.length >= 4 && selectedCourses.length <= 6;

//   if (loading) {
//     return <div style={styles.loader}>Fetching available courses...</div>;
//   }

//   return (
//     <div style={styles.page}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>Course Enrollment</h1>
//         <button onClick={handleLogout} style={styles.logoutButton}>
//           Logout
//         </button>
//       </header>
//       <main style={styles.main}>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.courseList}>
//             {courses.map((course) => (
//               <div key={course.id} style={styles.courseCard}>
//                 <div style={styles.courseHeader}>
//                   <h2 style={styles.courseTitle}>{course.name}</h2>
//                   <span style={styles.courseCode}>{course.courseCode}</span>
//                 </div>
//                 <p style={styles.professor}>Instructor: {course.professor}</p>
//                 <p style={styles.credits}>Credits: {course.credits}</p>
//                 <p style={styles.prerequisites}>
//                   Prerequisites: {course.prerequisites.length > 0 ? course.prerequisites.join(', ') : 'None'}
//                 </p>
//                 <label style={styles.checkboxLabel}>
//                   <input
//                     type="checkbox"
//                     checked={selectedCourses.includes(course.courseCode)}
//                     onChange={() => handleCheckboxChange(course.courseCode)}
//                     style={styles.checkbox}
//                     disabled={!course.eligible}
//                   />
//                   {course.eligible ? 'Eligible' : 'Not Eligible'}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <button
//             type="submit"
//             disabled={!isSubmitEnabled}
//             style={isSubmitEnabled ? styles.submitButton : styles.submitButtonDisabled}
//           >
//             Enroll
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     backgroundColor: '#dfefff', // Updated to a soft light blue
//     fontFamily: 'Arial, sans-serif',
//     minHeight: '100vh',
//     padding: '20px',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px',
//   },
//   title: {
//     fontSize: '2.5rem',
//     color: '#2c3e50',
//   },
//   logoutButton: {
//     backgroundColor: '#e74c3c',
//     color: 'white',
//     padding: '10px 15px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//   },
//   main: {
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   form: {
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//     maxWidth: '900px',
//     width: '100%',
//   },
//   courseList: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//     gap: '20px',
//   },
//   courseCard: {
//     backgroundColor: '#ecf0f1',
//     padding: '15px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s, box-shadow 0.3s',
//     border: '1px solid #bdc3c7',
//   },
//   courseCardHover: {
//     transform: 'scale(1.05)',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   courseHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   courseTitle: {
//     fontSize: '1.25rem',
//     fontWeight: 'bold',
//     color: '#34495e',
//   },
//   courseCode: {
//     fontSize: '0.9rem',
//     fontWeight: 'bold',
//     color: '#7f8c8d',
//   },
//   professor: {
//     fontSize: '0.9rem',
//     margin: '5px 0',
//     color: '#2c3e50',
//   },
//   credits: {
//     fontSize: '0.9rem',
//     margin: '5px 0',
//     color: '#27ae60',
//   },
//   prerequisites: {
//     fontSize: '0.85rem',
//     color: '#8e44ad',
//   },
//   checkboxLabel: {
//     display: 'flex',
//     alignItems: 'center',
//     marginTop: '10px',
//     fontSize: '0.9rem',
//     fontWeight: 'bold',
//   },
//   checkbox: {
//     marginRight: '10px',
//     transform: 'scale(1.2)',
//   },
//   submitButton: {
//     marginTop: '20px',
//     backgroundColor: '#3498db',
//     color: 'white',
//     padding: '12px 18px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s',
//     display: 'block',
//     marginLeft: 'auto', // Center align
//     marginRight: 'auto',
//   },
//   submitButtonDisabled: {
//     marginTop: '20px',
//     backgroundColor: '#95a5a6',
//     color: 'white',
//     padding: '12px 18px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'not-allowed',
//     fontSize: '1rem',
//     display: 'block',
//     marginLeft: 'auto', // Center align
//     marginRight: 'auto',
//   },
//   loader: {
//     fontSize: '1.5rem',
//     textAlign: 'center',
//     color: '#34495e',
//   },
// };

// export default Courses;


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
