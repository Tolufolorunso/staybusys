/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { useState } from "react";
import * as React from "react";
import Modal from "@mui/material/Modal";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchJson } from "lib/api";
import { API_URI } from "lib/contant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: "0px 7px 20px rgba(145, 156, 212, 0.15)",
  borderRadius: "7px",
  p: 4,
};
const Passwordreset = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const router = useRouter();

  async function passwordreset(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password not matched");
      return;
    }
    try {
      const response = await fetchJson(`${API_URI}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ password, token: router.query.token, email: router.query.email }),
      });
      if (response.status) {
        toast.success(response.message);
        handleOpen();
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      password: Yup.string().max(255).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Password Reset | Material Kit</title>
      </Head>

      <div className="container ">
        <ToastContainer />
        <div className="login_wrapper">
          <div className="login">
            <h4>Password Reset</h4>

            <div className="login_inputs">
              <form onSubmit={passwordreset}>
                <div className="login_input">
                  <label htmlFor="student_email">Password</label> <br />
                  <div className="input_wrap">
                    <input
                      type={passwordShown ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={togglePassword}>Show</span>
                  </div>
                </div>
                <div className="login_input">
                  <label htmlFor="student_email">Confirm Password</label> <br />
                  <div className="input_wrap">
                    <input
                      type={passwordShown ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span onClick={togglePassword}>Show</span>
                  </div>
                </div>

                <div className="login_btn">
                  <button type="submit">Reset Password</button>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="registration_modal">
                      <div className="registration_modal_desc">
                        <div
                          style={{
                            border: "2px solid groove",
                            background: "#FFCC00",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="top"
                        >
                          <MailOutlineIcon
                            style={{
                              background: "#FFCC00",
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        </div>
                        <p className="verification">Reset Link Sent</p>
                        <small>A reset link has been sent to:</small>
                        <small className="red">Seyi@yahoo.com</small>
                        <small>Please check your email for the next steps </small>
                      </div>
                    </div>
                  </Box>
                </Modal>
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
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
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
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box> */}
    </>
  );
};

export default Passwordreset;
