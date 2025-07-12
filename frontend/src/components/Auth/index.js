import React, { useState, useContext } from 'react';
import './index.css';
import { API } from '../../service/api.js';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider.js';

const loginInitialValues = {
  email: '',
  password: '',
};

const signupInitialValues = {
  email: '',
  username: '',
  password: '',
};

export default function Index({ isUserAuthenticated }) {
  const [account, toggleAccount] = useState('login');
  const [register, setRegister] = useState(false);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState('');

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response;
    try {
      response = await API.userLogin(login);
      if (!response.isError) {
        setError('');

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

        setAccount({ username: response.data.username, name: response.data.name });
        isUserAuthenticated(true);
        setLogin(loginInitialValues);
        navigate('/');
      } else {
        setError(response.msg || 'Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const signupUser = async () => {
    let response;
    try {
      response = await API.userSignup(signup);
      if (response.success) {
        setError('');
        setSignup(signupInitialValues);
        toggleAccount('login');
      } else {
        setError('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <p>Add another way to log in</p>
        <div className="sign-options">
          <div className="single-option">
            <img src="/Assets/google-logo.jpg" alt="google" />
            <p>Login with Google</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input type="text" name="username" onChange={onInputChange} />
                  <p>Email</p>
                  <input type="text" name="email" onChange={onInputChange} />
                  <p>Password</p>
                  <input type="password" name="password" onChange={onInputChange} />
                </div>
                { error && <p>{error}</p> }
                <button style={{ marginTop: '20px', fontSize: '15px' }} onClick={signupUser}>
                  Register
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input type="text" name="email" onChange={onValueChange} />
                  <p>Password</p>
                  <input type="password" name="password" onChange={onValueChange} />
                </div>
                { error && <p>{error}</p> }
                <button style={{ marginTop: '20px', fontSize: '15px' }} onClick={loginUser}>Login</button>
              </>
            )}
            <p
              style={{ cursor: 'pointer', color: '#000', marginTop: '10px', display: 'flex', justifyContent: 'center' }}
              onClick={() => setRegister(!register)}
            >
              {register ? 'Login' : 'Register'}?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
