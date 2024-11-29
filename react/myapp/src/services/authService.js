export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
  
    const data = await response.json();
    return data.jwtToken; // Return the token
  };
  