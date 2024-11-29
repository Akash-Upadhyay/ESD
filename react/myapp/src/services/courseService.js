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
    throw new Error('Failed to fetch courses');
  }
  return await response.json();
};

// Enroll student in selected courses
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
    throw new Error('Failed to enroll in courses');
  }
  return await response.json();
};
