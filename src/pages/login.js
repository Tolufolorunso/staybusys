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
import Layout from "src/components/Layout";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("tolu@yahoo.com");
  const [password, setPassword] = useState("12345678");

  const [loginLoading, setLoginLoading] = useState(false);
  const { status, data } = useSession();
  const router = useRouter();

  // if (status === "loading") {
  //   return <p>Loading.....</p>;
  // }

  if (status === "authenticated" && data) {
    router.replace("/dashboard");
  }

  console.log(status, data);

  useEffect(() => {
    if (status !== "unauthenticated") {
      setLoading(false);
    }
  }, []);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     email: "demo@devias.io",
  //     password: "Password123",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
  //     password: Yup.string().max(255).required("Password is required"),
  //   }),
  //   onSubmit: () => {
  //     router.push("/");
  //   },
  // });

  async function login(e) {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res.error) {
        router.push("/dashboard");
      }

      if (res.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoginLoading(false);
  }

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>

      <Layout>
        {" "}
        <div className="container ">
          <div className="login_wrapper">
            <div className="login">
              <h4>Login</h4>

              <div className="login_inputs">
                <form onSubmit={login}>
                  <div className="login_input">
                    <label htmlFor="student_email">Your student Email:</label> <br />
                    <div className="input_wrap">
                      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                      <span onClick={togglePassword}>{passwordShown ? "Hide" : "Show"} </span>
                    </div>
                    <a href="resetpassword" className="forgot_pass">
                      Forgot your password?
                    </a>
                  </div>

                  <div className="login_btn">
                    <button type="submit">{loginLoading ? "Login..." : "Login"}</button>
                  </div>
                </form>
              </div>
              <div className="already">
                <p>
                  {" Don't "} have an account?{" "}
                  <Button className="logins" href="/register">
                    {" "}
                    Sign Up
                  </Button>
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
