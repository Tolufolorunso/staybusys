import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';

import { DashboardLayout } from '../components/dashboard-layout';
import Supportlayout from 'src/components/support';
// import { Supportlayout } from '../components/support';
const Support = () => (
  <>
    <Head>
      <title>
        Support | Stay busy
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >

      <Container maxWidth={false}>
      <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
           Support
          </Typography>

          <Supportlayout/>
          </Container>
          </Box>
  </>
);

Support.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Support;
