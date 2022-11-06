import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './clubrequests.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
// import { Button } from '../../components';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const ClubRequests = () => {
  const [allProposals, setAllProposals] = useState([]);
  const navigate = useNavigate();

  const { getProposalByStatus } = useActions();
  const { data } = useTypedSelector((state) => state.proposals);

  useEffect(() => {
    getProposalByStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setAllProposals(data);
    }
  }, [data]);

  const viewProposal = (id) => {
    const proposal = allProposals.filter((proposal) => proposal._id === id);
    if (proposal[0]) {
      navigate(`/proposals/${id}`);
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <h3>Club Requests</h3>
      <br />
      <TableContainer component={Paper} sx={{ maxWidth: 'fit-content' }}>
        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell align="center">Clubname</TableCell>
              <TableCell align="center">Admin</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allProposals.map((row) => (
              <TableRow
                className="table-row"
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.clubName}
                </TableCell>
                <TableCell align="center">{row.creatorName}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color:
                      row.approvalStatus === 'Pending'
                        ? 'blue'
                        : row.approvalStatus === 'Rejected'
                        ? 'red'
                        : row.approvalStatus === 'Approved'
                        ? 'green'
                        : ''
                  }}
                >
                  {row.approvalStatus}
                </TableCell>
                <TableCell align="center">
                  {row.description.length > 80 ? (
                    <>
                      {row.description.substring(0, 80)}...
                      <b>
                        <Link to="#" onClick={() => viewProposal(row._id)}>
                          {' '}
                          Read more
                        </Link>
                      </b>
                    </>
                  ) : (
                    row.description
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    sx={{
                      backgroundColor: '#5D1EBF',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#5D1EBF'
                      }
                    }}
                    variant="contained"
                    onClick={() => viewProposal(row._id)}
                  >
                    View Details
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
