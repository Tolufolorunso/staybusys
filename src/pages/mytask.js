import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';

import { DashboardLayout } from '../components/dashboard-layout';

const Task = () => (
  <>
    <Head>
      <title>
        Task | Material Kit
      </title>
    </Head>
    <h1 style={{marginTop:"20px"}}>
      My task page
    </h1>
  </>
);

Task.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Task;
