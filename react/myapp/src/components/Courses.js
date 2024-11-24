import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const history = useNavigate();
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
  
    // Get the roll number from localStorage
    const rollno = localStorage.getItem('username'); // Assuming 'username' is the roll number in localStorage
  
    // Prepare the data to send to the backend
    const data = {
      rollno: rollno,
      selectedCourses: selectedCourses, // This will be the list of selected course codes
    };
  
    // Send the POST request to the backend
    fetch('http://localhost:8080/courses/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token for authentication
      },
      body: JSON.stringify(data), // Convert data to JSON format
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        // Handle success response
        console.log('Courses enrolled successfully:', data);
        // You can show a success message or redirect the user if needed
        alert('Courses enrolled successfully!');
        history("/");
      })
      .catch((error) => {
        // Handle error response
        console.error('Error enrolling courses:', error);
        alert('Failed to enroll in courses.');
      });
  };
  

  // Check if the submit button should be enabled
  const isSubmitEnabled = selectedCourses.length >= 4 && selectedCourses.length <= 6;

  // Show loading message if courses are being fetched
  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div>
      <h2>Available Courses</h2>
      <form onSubmit={handleSubmit}>
        {courses.map((course) => (
          <div key={course.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.courseCode)} // Check if the course is selected
                onChange={() => handleCheckboxChange(course.courseCode)} // Handle checkbox change
              />
              {course.name} - {course.professor} - {course.credits} Credits
            </label>
            <p>Prerequisites: {course.prerequisites.join(', ')}</p>
          </div>
        ))}

        {/* Submit button */}
        <button type="submit" disabled={!isSubmitEnabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Courses;
