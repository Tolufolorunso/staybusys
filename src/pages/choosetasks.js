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
import { number } from "yup";
import Layout from "src/components/Layout";

const Choosetasks = () => {
  //   const [selectedBtns, setSelectedBtns] = useState([]);

  const selectedBtns = [];

  function proceed() {
    console.log("Proceed");

    // setSelectedBtns(document.querySelectorAll(".active"))
  }
  function chooseTask(btnNumber) {
    const allTasks = document.querySelectorAll(".choose_btn");
    allTasks.forEach((btn, index) => {
      if (btnNumber === index) {
        // btn.classList.remove("active");

        btn.classList.toggle("active");
        if (btn.classList.contains("active")) {
          selectedBtns.push(btn);
          console.log(selectedBtns);
        }
        selectedBtns.forEach((arrBtn) => {
          if (!arrBtn.classList.contains("active")) {
            selectedBtns.pop(arrBtn);
          }
        });
      }
    });
  }

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
        <title>Choose Tasks | Material Kit</title>
      </Head>
      <Layout>
      <div className="my_container ">
        <div className="choose_tasks">
          <div className="choose">
            <h4>
              Choose the types of tasks You’re comfortable with from the list below
            </h4>
            <span className="tabss">3/3</span>
            <div className="">
              <div className="choose_task">
                <div className="buttons">
                <Grid container spacing={3}>
                        <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(0)} className="choose_btn 0">
                    Tag 1
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(1)} className="choose_btn 1">
                    Tag 2
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(2)} className="choose_btn 2">
                    Tag 3
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>

                  <button onClick={() => chooseTask(3)} className="choose_btn 3">
                    Tag 4
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(4)} className="choose_btn 4">
                    Tag 5
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(5)} className="choose_btn 5">
                    Tag 6
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(6)} className="choose_btn 6">
                    Tag 7
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(7)} className="choose_btn 7">
                    Tag 8
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(8)} className="choose_btn 8">
                    Tag 9
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(9)} className="choose_btn 9">
                    Tag 10
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(10)} className="choose_btn 10">
                    Tag 11
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(11)} className="choose_btn 11">
                    Tag 12
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(12)} className="choose_btn 12">
                    Tag 13
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(13)} className="choose_btn 13">
                    Tag 14
                  </button>
                  </Grid>
                  <Grid item xs={6} sm={4} md={3} lg={2.4}>
                  <button onClick={() => chooseTask(14)} className="choose_btn 14">
                    Tag 15
                  </button>
                  </Grid>
                  </Grid>
                </div>
                <div className="proceed">
                  <button onClick={proceed} className="actn_btn">
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
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

export default Choosetasks;
