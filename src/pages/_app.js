/* eslint-disable react/jsx-max-props-per-line */
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import "./global.css";
import "./Home.css";
import "./font.css";

const clientSideEmotionCache = createEmotionCache();
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "src/context/appContext";

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProvider>
      <SessionProvider session={pageProps.session}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Staybusy.io</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
      </SessionProvider>
    </AppProvider>
  );
};

export default App;
