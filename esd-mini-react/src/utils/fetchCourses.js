import axios from 'axios';
import config from '../config';

// Function to fetch courses with JWT token
export const fetchCourses = async (token, studentId, whichCourses) => {
    console.log(`Fetching courses from: ${config}/api/v1/student/${whichCourses}`);

  try {
    const response = await axios.get(`${config}/api/v1/student/${whichCourses}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        studentId : studentId,
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      console.log('Token expired or unauthorized');
      return { error: 'Token expired or unauthorized' }; // Return error for handling in the component
    } else {
      console.error('Error fetching courses:', error);
      return { error: 'Error fetching courses' }; // Return general error message
    }
  }
};
