import Head from "next/head";
import { useState } from "react";

import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Layout from "src/components/Layout";
import "react-toastify/dist/ReactToastify.css";

import { getSession, signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("tolu@yahoo.com");
  const [password, setPassword] = useState("12345678");

  const { status, data } = useSession();
  const router = useRouter();

  if (status === "authenticated" && data) {
    router.replace("/dashboard");
  }

  useEffect(() => {
    if (status !== "unauthenticated") {
      setLoading(false);
    }
  }, []);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res.error) {
        toast.success("Login Successful");

        router.push("/dashboard");
      }

      if (res.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      toast.error(error.message);

    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Login | Staybusy.io</title>
      </Head>

      <Layout>
        {" "}
        <ToastContainer />
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

                  <LoadingButton
                    loading={loading}
                    type="submit"
                    size="large"
                    variant="contained"
                    loadingPosition="end"
                    className="default__button"
                    fullWidth
                  >
                    Login
                  </LoadingButton>
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
