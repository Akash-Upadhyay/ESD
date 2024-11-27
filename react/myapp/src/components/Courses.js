import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rollno = localStorage.getItem('username'); // Get roll number from local storage
    const term = 'Fall'; // Example term

    // Construct the URL with query parameters
    const url = `http://localhost:8080/courses/available?rollno=${rollno}&term=${term}`;

    // Fetch courses data from the backend API
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Use JWT token for authentication
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false); // Set loading to false if there is an error
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle checkbox change to select/unselect courses
  const handleCheckboxChange = (courseCode) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (prevSelectedCourses.includes(courseCode)) {
        // Unselect the course if already selected
        return prevSelectedCourses.filter((code) => code !== courseCode);
      } else {
        // Select the course
        return [...prevSelectedCourses, courseCode];
      }
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const rollno = localStorage.getItem('username'); // Assuming 'username' is the roll number in localStorage

    const data = {
      rollno: rollno,
      selectedCourses: selectedCourses, // This will be the list of selected course codes
    };

    fetch('http://localhost:8080/courses/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token for authentication
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Courses enrolled successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error enrolling courses:', error);
        alert('Failed to enroll in courses.');
      });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the JWT token
    localStorage.removeItem('username'); // Clear any other stored user data if necessary
    alert('You have been logged out.');
    navigate('/login'); // Redirect to the login page
  };

  // Check if the submit button should be enabled
  const isSubmitEnabled = selectedCourses.length >= 4 && selectedCourses.length <= 6;

  // Show loading message if courses are being fetched
  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Available Courses</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        {courses.map((course) => (
          <div key={course.id} style={styles.courseItem}>
            <label style={styles.courseLabel}>
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.courseCode)}
                onChange={() => handleCheckboxChange(course.courseCode)}
                style={styles.checkbox}
                disabled={!course.eligible} // Disable checkbox if course is not eligible
              />
              <span>{course.courseCode} - {course.name} - {course.professor} - {course.credits} Credits</span>
            </label>
            <p style={styles.prerequisites}>Prerequisites: {course.prerequisites.join(', ')}</p>
          </div>
        ))}

        <button type="submit" disabled={!isSubmitEnabled} style={isSubmitEnabled ? styles.submitButton : styles.submitButtonDisabled}>
          Enroll
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 1rem',
    background: 'linear-gradient(to bottom, #f0f7ff, #e3f2fd)',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '700px',
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: '2.2rem',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  logoutButton: {
    backgroundColor: '#d9534f', // Red button for logout
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '700px',
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e1e1',
  },
  courseItem: {
    marginBottom: '1.5rem',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  courseLabel: {
    fontSize: '1.1rem',
    color: '#333',
  },
  checkbox: {
    marginRight: '10px',
  },
  prerequisites: {
    fontSize: '0.95rem',
    color: '#666',
    marginTop: '0.5rem',
  },
  submitButton: {
    backgroundColor: '#66bb6a',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
};

export default Courses;
