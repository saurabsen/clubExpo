import { useEffect, useState } from 'react';
import axios from 'axios';
import './clubrequests.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '../../components/Button/Button';

const ClubRequests = () => {
  const [allProposals, setAllProposals] = useState([]);
  useEffect(() => {
    getProposals('getproposals');
  }, []);
  const tokenStr =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMmRiMzRhMjcwYmY0ZDFhMjc5MWIiLCJpYXQiOjE2NjYxOTg5NjMsImV4cCI6MTY2ODc5MDk2M30.lPOmtB9fdmlIhDIj_R4yAvnt04ZWmuReNPNESVAak_8';

  const status = {
    statusArray: 'Pending'
  };

  const getProposals = async (queryString) => {
    const data = await axios.post(`http://localhost:3001/api/proposals/${queryString}`, status, {
      headers: { Authorization: `Bearer ${tokenStr}` }
    });
    const temp = data.data;
    console.log(temp, 'data');
    setAllProposals(temp);
  };

  const viewProposal = (e) => {
    console.log(e);
  };

  return (
    <div>
      <h2>All Clubs</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Clubname</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell align="center">No. of Members</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProposals.map((row) => (
              <TableRow
                className="table-row"
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.clubName}
                </TableCell>
                <TableCell>{row.createrName}</TableCell>
                <TableCell align="center">{row.members.length}</TableCell>
                <TableCell>{row.approvalStatus}</TableCell>
                <TableCell onClick={() => viewProposal(row._id)} align="right">
                  <Button variant="contained" innerText="View Detail">
                    View Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClubRequests;
