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
import { toast,ToastContainer } from 'react-toastify';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { LoadingButton } from '@mui/lab';
import 'react-toastify/dist/ReactToastify.css';

function VerifyUserPage() {
  const { query } = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)


  async function verifyUser() {
    const url = `${API_URI}/auth/verify-user/${query.token}/${query.email}`;

    const isVerified = await fetchJson(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        verificationToken: query.token,
        email: query.email,
      }),
    });

    if (isVerified.status) {
      router.push("/login")
      setLoading(false);
    } else {

      setLoading(false);
    }

    setLoading(false);
    setMessage(isVerified.message);
  }

  useEffect(() => {
    verifyUser();
    setLoading(true);
  });
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
                {message !== "" && <h3>{message}</h3>}
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
