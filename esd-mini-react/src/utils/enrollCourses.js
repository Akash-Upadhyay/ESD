// enrollCourses function in utils/enrollCourses.js
import axios from 'axios';
import config from '../config';

// Function to enroll in courses
export const enrollCourses = async (token, studentId, courseIds) => {
  console.log(`Enrolling courses for studentId: ${studentId} at: ${config}/api/v1/student/enroll ${courseIds}`);
  
  try {
    const response = await axios.post(
      `${config}/api/v1/student/enroll`,
      {
        studentId,
        courses: courseIds, // Pass the array of course IDs
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Token expired or unauthorized');
      return { error: 'Token expired or unauthorized' };
    } else {
      console.error('Error enrolling in courses:', error);
      return { error: 'Error enrolling in courses' };
    }
  }
};
