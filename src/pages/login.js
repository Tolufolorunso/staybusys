import Head from 'next/head';
import { useState } from "react";

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import Layout from 'src/components/Layout';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Layout>
      <div className="container ">
        <div className="login_wrapper">
          <div className="login">
            <h4>Login</h4>

            <div className="login_inputs">
              <form action="">
                <div className="login_input">
                  <label htmlFor="student_email">Your student Email:</label> <br />
                  <div className="input_wrap">
                  <input type="text" />

                  </div>
                </div>
                <div className="login_input">
                  <label htmlFor="student_email">Choose a password:</label> <br />
                  <div className="input_wrap">
                    <input type={passwordShown ? "text" : "password"} />
                    <span onClick={togglePassword}>{passwordShown ? "Hide" : "Show"} </span>
                  </div>
                  <a href="resetpassword" className='forgot_pass'>Forgot your password?</a>
                </div>

                <div className="login_btn">
                  <button type="submit">Login</button>
                </div>
              </form>
            </div>
            <div className="already">
              <p>
                Don't have an account? <Button className="logins" href="/register"> Sign Up</Button>
              </p>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default Login;
