/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';

const RegisterComplete = ({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and Password is required');
      return;
    }
    if (password.length < 6) {
      toast.error('Password length must be more than 6 digit');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
          email,
          window.location.href,
      );

      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration');
        // get user id token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log('user', user, 'idTokenResult', idTokenResult);
        // redirect
        history.push('/');
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegisterForm = () => <form onSubmit={handleSubmit}>
    <input
      type='email'
      className='form-control'
      value={email}
      disabled/>
    <input
      type='password'
      className='form-control'
      value={password}
      onChange={(e) => setPassword(e.target.value) }
      placeholder="Password"
      autoFocus/>
    <br/>
    <button type="submit" className='btn btn-raised'>
    Complete Registration </button>
  </form>;
  return (
    <div className='container p-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4>Register</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
