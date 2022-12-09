import { fetchJson } from "lib/api";
import { API_URI } from "lib/contant";
import Link from "next/link";
import { useRouter } from "next/router";

import Head from "next/head";
import { useState, useEffect } from "react";
import * as React from "react";
import { Box, Grid } from "@mui/material";
import Layout from "src/components/Layout";

// import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "next-auth/react";

function VerifyUserPage(props) {
  // async function verifyUser() {
  //   const url = `${API_URI}/auth/verify-user/${query.token}/${query.email}`;
  //   console.log(url);
  //   const isVerified = await fetchJson(url, {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       verificationToken: query.token,
  //       email: query.email,
  //     }),
  //   });

  //   if (isVerified.status) {
  //     setMessage(isVerified.message);
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   verifyUser();
  //   setLoading(true);
  // }, []);

  return (
    <>
      <Head>
        <title>Confirm Email | Staybusy.io</title>
      </Head>

      <Grid container spacing={2} className="form__container" justifyContent="center">
        <Grid item xs={12} sm={4}>
          <h5 className="form__container_heading"> Verification Status</h5>
          <br />
          <Box className="form__container_form">
            <Box sx={{ textAlign: "center" }}>
              <LockOutlinedIcon />
              <h3>{props.message}</h3>
              <br /> <br />
              <LoadingButton
                href="/login"
                size="large"
                variant="contained"
                loadingPosition="end"
                className="default__button"
                fullWidth
              >
                Proceed to Login
              </LoadingButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default VerifyUserPage;

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const session = await getSession(ctx);

  const url = `${API_URI}/auth/verify-user/${query.token}/${query.email}`;
  let message;
  try {
    const isVerified = await fetchJson(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        verificationToken: query.token,
        email: query.email,
      }),
    });
    if (isVerified.status) {
      message = "Email verified";
    } else {
      if (isVerified.message === "verification token not matched") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      message = isVerified.message;
    }
  } catch (error) {
    message = "Something went wrong";
  }
  console.log(87, query);
  console.log(88, session);

  return {
    props: {
      ...session,
      message,
    },
  };
}
