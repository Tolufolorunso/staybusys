import Head from "next/head";
import React, { useState } from "react";

import Select from "react-select";

import NextLink from "next/link";
import { useRouter } from "next/router";
import  {useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import Layout from "src/components/Layout";

const Personaldetails = () => {
  const [value, setValue] = useState(0);
  const options = [

    { value: "Euro", label: "Euro" },
    { value: "Naira", label: "Naira" },
    { value: "Dollar", label: "Dollar" },
  ];
  const weekdayOptions = [

    { value: "Weekdays", label: "Weekdays" },
    { value: "Weekends", label: "Weekends" },

  ];
  const cityOptions = [

    { value: "Abuja", label: "Abuja" },
    { value: "Lagos", label: "Lagos" },

  ];
  const countryOptions = [

    { value: "Nigeria", label: "Nigeria" },
    { value: "India", label: "India" },

  ];
  const customStyles = {
    indicatorSeparator: () => ({
      // none of react-select's styles are passed to <Control />
      border: 0,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      border: "1px solid #969696",
      display: "flex",
      borderRadius: "7px",
      marginTop: "10px",
      height: "50px",
      marginTop:'0.95rem',
      background: 'rgba(255, 204, 0, 0.03)',
      border: '1px solid rgba(255, 204, 0, 0.3)',
      paddingRight: "12px",
      paddingLeft: "12px",
      fontFamily: "Euclid Circular A",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "140%",
      /* or 25px */
      width: "100%",
      letterSpacing: " 0.03em",

      color: "#2F2E40 ",
    }),
    indicatorsContainer: () => ({
      color: "#2F2E40 !important",
    }),
    dropdownIndicator: () => ({
      color: "#2F2E40 !important",
      marginTop: "13px",
    }),
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  function proceed() {
    console.log("Proceed");

    // setSelectedBtns(document.querySelectorAll(".active"))
  }
  return (
    <>
      <Head>
        <title>Enter Personal Details | Material Kit</title>
      </Head>
      <Layout>
      <div className="container " style={{marginTop:"70px", marginBottom:"100px"}}>
        <div className="login_wrapper">
          <div className="login personal_det">
            <h4>Complete your registration</h4>
            <span className="tab">1/3</span>


              <form action="">
              <div className="login_inputs">
                <div className=" personal_det_inputs">
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <div className="login_input">
                    <label htmlFor="student_email">First name:</label> <br />
                    <div className="input_wrap">
                      <input type="text" />
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <div className="login_input">
                    <label htmlFor="student_email">Last name:</label> <br />
                    <div className="input_wrap">
                      <input type="text" />
                    </div>
                  </div>
                </Grid>
                    <Grid item xs={12} sm={6}>
                  <div className="login_input">
                    <label htmlFor="student_email">City:</label> <br />
                    <Select

                        styles={customStyles}
                        options={cityOptions}
                        theme={(theme) => ({
                          ...theme,

                          colors: {
                            ...theme.colors,
                            primary25: "#f2e9c4",
                            primary: "#2f2e40",
                            neutral5: "#000",
                            primary50: "#f2e9c4",
                          },
                        })}
                      />

                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <div className="login_input">
                    <label htmlFor="student_email">Country:</label> <br />
                    <Select

                        styles={customStyles}
                        options={countryOptions}
                        theme={(theme) => ({
                          ...theme,

                          colors: {
                            ...theme.colors,
                            primary25: "#f2e9c4",
                            primary: "#2f2e40",
                            neutral5: "#000",
                            primary50: "#f2e9c4",
                          },
                        })}
                      />

                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <div className="login_input">
                    <label htmlFor="student_email">When are you more available:</label> <br />
                    <Select

                        styles={customStyles}
                        options={weekdayOptions}
                        theme={(theme) => ({
                          ...theme,

                          colors: {
                            ...theme.colors,
                            primary25: "#f2e9c4",
                            primary: "#2f2e40",
                            neutral5: "#000",
                            primary50: "#f2e9c4",
                          },
                        })}
                      />

                  </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <div className="login_input">
                    <label htmlFor="student_email">Preferred Currency</label> <br />
                    <Select

                        styles={customStyles}
                        options={options}
                        theme={(theme) => ({
                          ...theme,

                          colors: {
                            ...theme.colors,
                            primary25: "#f2e9c4",
                            primary: "#2f2e40",
                            neutral5: "#000",
                            primary50: "#f2e9c4",
                          },
                        })}
                      />

                </div>
                </Grid>
                </Grid>
                </div>
                </div>
                <div className="login_btn" style={{display:"flex",justifyContent:"center"}}>
                <button onClick={proceed}  className="actn_btn">
                    Proceed
                  </button>
                </div>

              </form>

          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default Personaldetails;
