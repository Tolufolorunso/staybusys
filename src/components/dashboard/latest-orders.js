import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
 
} from '@mui/material';

import { SeverityPill } from '../severity-pill';

const orders = [
  {
    id: uuid(),
    earning: '1890.19',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1890.19',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1890.19',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1286.90',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1287.19',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    earning: '1390.09',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1390.09',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1390.09',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1390.09',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1390.09',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1390.09',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '12434.90',
    amount: 96.43,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    earning: '1298.90',
    amount: 32.54,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    earning: '1244.89',
    amount: 16.76,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
  ,
  {
    id: uuid(),
    earning: '1244.89',
    amount: 16.76,
    customer: {
      name: 'Auditing information architechture'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
  
];

  
export const LatestOrders = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  return (
    <>
<Card style={{borderRadius:"22px",boxShadow: '-5px 5px 20px rgba(51, 60, 193, 0.16)'}} {...props}>
    <CardHeader title="Your Earnings" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Task
              </TableCell>
              <TableCell>
                Earnings
              </TableCell>
              <TableCell >
                
                    Date
                 
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order) => (
              <TableRow
                hover
                
               
                key={order.id}
              >
                
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell >
                  {order.earning}
                </TableCell>
                <TableCell>
                  {format(order.createdAt, 'dd - MM - yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(order.status === 'delivered' && 'success')
                    || (order.status === 'refunded' && 'error')
                    || 'warning'}
                  >
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
   
  </Card>
  <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 3
      }}
      style={{paddingTop:"70px"}}
    >
      <Pagination 
        boundaryCount={2}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        variant="outlined" shape="rounded"
        onChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        style={{marginTop:"10px !important"}}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  </>
  );
}
  

