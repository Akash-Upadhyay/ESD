import axios from 'axios';
import config from '../config';

export const fetchLogin = async (email, password) => {
    try {
        const response = await axios.post(`${config}/api/v1/login`, {
            email,
            password,
        });
        console.log("==================");
        console.log(response.data);

        // If the API call is successful, store the necessary information
        if (response.data && response.data.token) {
            localStorage.setItem('isLoggedIn', 'true'); // Store login status
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
            localStorage.setItem('token', response.data.token); // Store token
            localStorage.setItem('studentId', response.data.student_id);
        }

        // Return the response data
        return response.data; 
    } catch (error) {
        // Log error to console (optional)
        console.error('Error fetching login:', error.message);

        // Throw error to handle it elsewhere in your application
        throw new Error('Error fetching data: ' + error.message); 
    }
};
