import Head from "next/head";
import { useState } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";

const personaldetails = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Enter Personal Details | Material Kit</title>
      </Head>
      <div className="container ">
        <div className="login_wrapper">
          <div className="login personal_det">
            <h4>Complete your registration</h4>
            <span className="tab">1/3</span>


            <div className="login_inputs">
              <form action="">
                <div className=" personal_det_inputs">
                  <div className="login_input">
                    <label htmlFor="student_email">First name:</label> <br />
                    <div className="input_wrap">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="login_input">
                    <label htmlFor="student_email">Last name:</label> <br />
                    <div className="input_wrap">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="login_input">
                    <label htmlFor="student_email">City:</label> <br />
                    <div className="input_wrap">
                      <select name="" id="">
                        <option value="Naira"></option>
                        <option value="Naira">Lagos</option>
                        <option value="Naira">Abuja</option>
                      </select>
                    </div>
                  </div>
                  <div className="login_input">
                    <label htmlFor="student_email">Country:</label> <br />
                    <div className="input_wrap">
                      <select name="" id="">
                        <option value="Naira"></option>
                        <option value="Naira">Nigeria</option>
                        <option value="Naira">Japan</option>
                      </select>
                    </div>
                  </div>
                  <div className="login_input">
                    <label htmlFor="student_email">When are you more available:</label> <br />
                    <div className="input_wrap">
                      <select name="" id="">
                        <option value="Naira"></option>
                        <option value="Naira">Weekdays</option>
                        <option value="Naira">Weekends</option>
                      </select>
                    </div>
                  </div>
                  <div className="login_input">
                    <label htmlFor="student_email">Preferred Currency</label> <br />
                    <div className="input_wrap">
                      <select name="" id="">
                        <option value="Naira"></option>
                        <option value="Naira">Naira</option>
                        <option value="Naira">Euro</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="login_btn">
                  <button type="submit">Proceed</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box> */}
    </>
  );
};

export default personaldetails;
