import { useState, useEffect } from 'react';
import { fetchAvailableCourses, enrollCourses } from '../services/courseService';
import { useNavigate } from 'react-router-dom';

export const useCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const rollno = localStorage.getItem('username');
      const term = 'Fall';
      const token = localStorage.getItem('token');

      try {
        const data = await fetchAvailableCourses(rollno, term, token);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseCode) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseCode)
        ? prevSelectedCourses.filter((code) => code !== courseCode)
        : [...prevSelectedCourses, courseCode]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rollno = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    try {
      await enrollCourses({ rollno, selectedCourses }, token);
      alert('Courses enrolled successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error enrolling courses:', error);
      alert('Failed to enroll in courses.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const isSubmitEnabled = selectedCourses.length >= 4 && selectedCourses.length <= 6;

  return {
    courses,
    selectedCourses,
    loading,
    handleCheckboxChange,
    handleSubmit,
    handleLogout,
    isSubmitEnabled,
  };
};
