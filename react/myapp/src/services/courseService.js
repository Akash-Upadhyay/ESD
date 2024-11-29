import { useNavigate } from 'react-router-dom';
const BASE_URL = 'http://localhost:8080/courses';

// Fetch available courses for a student
export const fetchAvailableCourses = async (rollno, term, token) => {
  const url = `${BASE_URL}/available?rollno=${rollno}&term=${term}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('Token expired or invalid');
    } else {
      throw new Error('Failed to enroll in courses');
    }
  }
  return await response.json();
};


export const enrollCourses = async (data, token) => {
  const response = await fetch(`${BASE_URL}/enroll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Check if the status is 401 (Unauthorized) for token expiration
    if (response.status === 403) {
      throw new Error('Token expired or invalid');
    } else {
      throw new Error('Failed to enroll in courses');
    }
  }

  // If the response is okay, return the JSON response
  return await response.json();
};



