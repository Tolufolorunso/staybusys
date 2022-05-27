import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';


const Task = () => (
  <>
    <Head>
      <title>
        Task | Material Kit
      </title>
    </Head>
    <h1 style={{marginTop:"20px"}}>
      Task page
    </h1>
  </>
);
Task.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Task;
