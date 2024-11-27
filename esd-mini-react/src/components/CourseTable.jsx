import React, { useState, useEffect } from "react";
import { fetchCourses } from "../utils/fetchCourses"; // Import the fetchCourses function
import { enrollCourses } from "../utils/enrollCourses";

function CourseTable({ whichCourses }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const token = localStorage.getItem("token"); // Get JWT token from localStorage
  const studentId = localStorage.getItem("studentId");

  // Fetch courses on component mount
  useEffect(() => {
    const getCourses = async () => {
      if (token && studentId) {
        try {
          const response = await fetchCourses(token, studentId, whichCourses); // Call the API function to fetch courses
          if (Array.isArray(response)) {
            setCourses(response); // Set the received courses to state
          } else {
            console.error("Unexpected response format:", response);
            setCourses([]); // Fallback to empty array
          }
        } catch (error) {
          console.error("Error during fetchCourses execution:", error.message);
          setCourses([]); // Fallback to empty array
        }
      } else {
        console.error("Missing token or studentId");
      }
    };

    getCourses();
  }, [token, studentId]); // Dependencies for re-fetching

  // Handle course selection
  const handleSelect = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  // && courses[courses.length - 1].count + selectedCourses.length >= 4 ) ||
  //        ( (courses[courses.length - 1].count>6 && courses[courses.length - 1].count + selectedCourses.length <= 6)  ))
  // Handle enrollment
  const handleEnroll = async () => {
    if (
      courses[courses.length - 1].count === 0 &&
      courses[courses.length - 1].count + selectedCourses < 4
    ) {
      alert(
        "You must select atleast 4 courses and You can select atmost 6 courses."
      );
      return;
    } else if (
      (courses[courses.length - 1].count === 4 ||
        courses[courses.length - 1].count < 6) &&
      courses[courses.length - 1].count + selectedCourses.length > 6
    ) {
      alert("You cannot select more than 6 courses.");
      return;
    }

    try {
      const response = await enrollCourses(token, studentId, selectedCourses); // Call enrollCourses API
      if (response.error) {
        console.error(response.error);
        alert("Error enrolling in courses.");
      } else {
        console.log("Courses enrolled successfully:", response);
        alert("Enrollment successful!");
      }
    } catch (error) {
      console.error("Unexpected error during enrollment:", error.message);
    }
  };

  return (
    <>
      {whichCourses !== "enrolled_courses" && (
        <h2 className="text-center container-header">Select Courses</h2>
      )}
      {whichCourses === "enrolled_courses" && (
        <h2 className="text-center container-header">Selected Courses</h2>
      )}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Course Description</th>
            <th>Credits</th>
            <th>Course ID</th>
            <th>Faculty</th>
            <th>Prerequisite</th>
            {whichCourses !== "enrolled_courses" && <td>Select</td>}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course, index) => {
              // Exclude the last course if whichCourses is 'enrolled_courses'
              if (
                whichCourses !== "enrolled_courses" &&
                index === courses.length - 1
              ) {
                return null; // Skip the last course
              }

              return (
                <tr key={course.course_id || course.courseId}>
                  <td>{index + 1}</td>
                  <td>{course.courseName}</td>
                  <td>{course.description}</td>
                  <td>{course.credits}</td>
                  <td>{course.course_id || course.courseId}</td>
                  <td>{course.faculty}</td>
                  <td>
                    {course.prerequisites && course.prerequisites.length > 0
                      ? course.prerequisites.map((prerequisite, i) => (
                          <span key={prerequisite.id}>
                            {prerequisite.name}
                            {i !== course.prerequisites.length - 1 && ", "}
                          </span>
                        ))
                      : "None"}
                  </td>
                  {whichCourses !== "enrolled_courses" && (
                    <td>
                      {whichCourses !== "enrolled_courses" &&
                      course.disabled ? (
                        "-"
                      ) : (
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.course_id)}
                          onChange={() => handleSelect(course.course_id)}
                        />
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Courses Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {whichCourses !== "enrolled_courses" && (
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={handleEnroll}
            disabled={
              // selectedCourses.length < 4 ||
              selectedCourses.length >= 6 ||
              (courses[courses.length - 1]?.count)===6 || 
              (courses.length > 0 && (courses[courses.length - 1]?.count + selectedCourses.length > 6))
            }
          >
            Submit
          </button>
          <p className="text-muted">
            {selectedCourses.length < 4 &&
            courses.length > 0 &&
            courses[courses.length - 1].count < 6
              ? "Please select at least 4 courses."
              : selectedCourses.length > 6
              ? "You can select a maximum of 6 courses."
              : ""}
            {courses.length > 0 && courses[courses.length - 1].count >= 6 && (
              <span>
                You have already taken 6 courses, Now you cannot enroll in more
                than 6 courses.
              </span>
            )}
          </p>
        </div>
      )}
    </>
  );
}

export default CourseTable;
