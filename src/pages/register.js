/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { useState } from "react";
import * as React from "react";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";

import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Layout from "src/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import { fetchJson } from "../../lib/api";
import { set } from "nprogress";
import { API_URI } from "lib/contant";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import PropagateLoader from "react-spinners/PropagateLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "1px solid rgba(105, 110, 255, 0.2)",
  boxShadow: "0px 7px 20px rgba(145, 156, 212, 0.15)",
  borderRadius: "7px",
  p: 4,
};

const smallerStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Register = ({ value }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  let [spinner, setSpinner] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [password, setPassword] = useState("12345678");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 5000);
    const getEmail = localStorage.getItem("email");
    setEmail(getEmail || "tolu@yahoo.com");
    // if (email.includes("@")) {
    //   localStorage.removeItem("email");
    // }
  }, []);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function register(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await fetchJson(`${API_URI}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (user.status) {
        setOpen(true);
        setLoading(false);
        toast.success("User has Successful Signed Up");
        setTimeout(() => {
          setOpen(false);
          localStorage.removeItem("email");
          router.push("/login");
        }, 3000);
      } else {
        throw new Error(user.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
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
      // router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Register | Staybusy.io</title>
      </Head>
      <Layout>
        {spinner ? (
          <div className="container1">
            {" "}
            <PropagateLoader
              color={"#FFCC00"}
              spinner={spinner}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <ToastContainer />
            <div className="container ">
              <div className="login_wrapper">
                <div className="login">
                  <h4>Create a new account</h4>
                  <div className="login_inputs">
                    <form onSubmit={register}>
                      <div className="login_input">
                        <label htmlFor="student_email">Your student Email:</label> <br />
                        <div className="input_wrap">
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="login_input">
                        <label htmlFor="student_email">Choose a password:</label> <br />
                        <div className="input_wrap">
                          <input
                            type={passwordShown ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span onClick={togglePassword}>{passwordShown ? "Hide" : "Show"}</span>
                        </div>
                      </div>
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        size="large"
                        variant="contained"
                        loadingPosition="end"
                        className="default__button"
                        fullWidth
                      >
                        Sign Up
                      </LoadingButton>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style} className="modalss">
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
                              <p className="verification">Verification Link</p>
                              <small>A verification link has been sent to:</small>
                              <small className="red">{email}</small>
                              <small>Please check your email </small>
                            </div>
                          </div>
                        </Box>
                      </Modal>
                    </form>
                  </div>
                  <div className="already">
                    <p>
                      Already have an account?{" "}
                      <Button className="logins" href="/login">
                        {" "}
                        Login
                      </Button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Register;

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
