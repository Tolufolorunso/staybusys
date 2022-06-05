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

    </>
  );
};

export default personaldetails;
