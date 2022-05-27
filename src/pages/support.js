import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';

import { DashboardLayout } from '../components/dashboard-layout';

const Support = () => (
  <>
    <Head>
      <title>
        Support | Material Kit
      </title>
    </Head>
    <h1 style={{marginTop:"20px"}}>
     Support page
    </h1>
  </>
);

Support.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Support;
