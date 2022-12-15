/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import NextLink from "next/link";
import * as React from "react";
import Modal from "@mui/material/Modal";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
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
import Layout from "src/components/Layout";
import { fetchJson } from "lib/api";
import { API_URI } from "lib/contant";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react";

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

const Resetpassword = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function resetpassword(e) {
    e.preventDefault();
    try {
      const response = await fetchJson(`${API_URI}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.status) {
        handleOpen();
        toast.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const router = useRouter();
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
        <title>Reset Password | Material Kit</title>
      </Head>
      <Layout>
        <ToastContainer />
        <div className="container ">
          <div className="login_wrapper">
            <div className="login">
              <h4>Reset Password</h4>

              <div className="login_inputs">
                <form onSubmit={resetpassword}>
                  <div className="login_input">
                    <label htmlFor="student_email">Email:</label> <br />
                    <div className="input_wrap">
                      <input type="text" onChange={(e) => setEmail(e.target.value)} />
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
                          <p className="verification">Reset Successful</p>
                          <small>
                            Your password has been reset successfully. <br /> Login to your account
                            with your new password
                          </small>
                          <button className="modal_btn">Go to Login</button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
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
                          <p className="verification">Email sent Successfully</p>
                          <small>A reset link has been sent to:</small>
                          <small className="red">{email}</small>
                          <small>Please check your email for the next steps </small>
                          <button className="modal_btn">Go to Login</button>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                </form>
              </div>
              <div className="already">
                <p>
                  Remember your password?{" "}
                  <Button className="logins" href="/login">
                    {" "}
                    Login
                  </Button>
                </p>
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

export default Resetpassword;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...session,
    },
  };
}
