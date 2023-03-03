import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { username: username, password: password };
    axios.post('http://localhost/crm/login.php', data)
      .then(response => {
        console.log(response.data)
        setMessage(response.data.message);
        if (response.data.status === 200) { 
          // Redirect to CRM page using window.location
          window.location.href = '/Crm';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again later.');
      });  
  };

  return (
    <>
      <div className={styles.parent}>
        <div className={styles.login_container}>
          <h2>User Login</h2>
          <form onSubmit={handleSubmit}> 
            <input type="text" name="username" value={username} onChange={handleUsernameChange} placeholder='Username' className={styles.form_input} /> 
            <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder='Password' className={styles.form_input} />
            <button type="submit" className={styles.form_button}>Login</button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
