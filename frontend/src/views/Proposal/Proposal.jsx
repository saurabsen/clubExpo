import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProposalDetailCard } from '../../components';
import { Button, Modal, Box } from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Proposal = () => {
  const [proposal, setProposal] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const { proposalId } = useParams();
  const navigate = useNavigate();

  const { data } = useTypedSelector((state) => state.proposals);

  useEffect(() => {
    if (data) {
      const proposal = data.filter((proposal) => proposal._id === proposalId);

      if (proposal[0]) {
        console.log(proposal[0]);
        setProposal(proposal[0]);
      }
    }
  }, [data]);

  // Making API call here, this should be included in redux proposals actions
  const handleReject = async () => {
    if (proposal) {
      let newProposal = proposal;
      newProposal.approvalStatus = 'Rejected';
      newProposal.approvalStatusReason = rejectionReason;

      const token = JSON.parse(localStorage.getItem('userToken'));

      // update approval status to Rejected
      const data = await axios.put(
        `http://localhost:3001/api/proposals/${newProposal._id}`,
        newProposal,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (data) {
        setRejectModalOpen(false);
        navigate('/admin-dashboard');
        window.location.reload();
      } else {
        alert('Error');
      }
    }
  };

  const openRejectModal = () => {
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
  };

  const handleApprove = async () => {
    if (proposal) {
      let newProposal = proposal;
      newProposal.approvalStatus = 'Approved';

      const token = JSON.parse(localStorage.getItem('userToken'));

      // update approval status to Approved
      const data1 = await axios.put(
        `http://localhost:3001/api/proposals/${newProposal._id}`,
        newProposal,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const club = {
        name: proposal.clubName,
        description: proposal.description,
        createdBy: proposal.createdBy,
        admins: [`${proposal.creatorName}`]
      };

      // create a new club
      const data2 = await axios.post(`http://localhost:3001/api/clubs`, club, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data1 && data2) {
        setApproveModalOpen(true);
      } else {
        alert('Error');
      }
    }
  };

  const closeApproveModal = () => {
    setApproveModalOpen(false);
    window.location.reload();
  };

  const handleRejectionMessageOnChange = (e) => {
    setRejectionReason(e.target.value);
  };

  return (
    <div style={{ padding: '1rem 0', maxWidth: '800px' }}>
      <h3>Club Proposal Details</h3>
      <br />
      {proposal ? (
        <>
          <ProposalDetailCard question="Enter your employee ID number" answer={proposal._id} />
          <br />
          <ProposalDetailCard
            question="Have you ever managed a club before?"
            answer={proposal.isManageClub ? 'Yes' : 'No'}
          />
          <br />
          <ProposalDetailCard
            question="What is the purpose of this club?"
            answer={proposal.clubPurpose}
          />
          <br />
          <ProposalDetailCard
            question="List down a few topics that describe your clubs's interests"
            answer={proposal.clubInterest}
          />
          <br />
          <ProposalDetailCard
            question="Give a brief about activities for this group"
            answer={proposal.clubActivities}
          />
          <br />
          <ProposalDetailCard question="Name of the club" answer={proposal.clubName} />
          <br />
          <ProposalDetailCard
            question="How many events will this club organize per month?"
            answer={proposal.noOfEventsMonth}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '2rem',
              padding: '2rem 0'
            }}
          >
            {proposal.approvalStatus === 'Rejected' || proposal.approvalStatus === 'Approved' ? (
              <Button
                sx={{
                  backgroundColor: '#fff',
                  padding: '12px 36px 12px 36px',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#fff'
                  }
                }}
                disabled
                variant="contained"
                type="submit"
                onClick={openRejectModal}
              >
                Reject
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: '#fff',
                  padding: '12px 36px 12px 36px',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#fff'
                  }
                }}
                variant="contained"
                type="submit"
                onClick={openRejectModal}
              >
                Reject
              </Button>
            )}
            <Modal
              open={rejectModalOpen}
              onClose={closeRejectModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '800px',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  padding: '2rem'
                }}
              >
                <h3>Mention the reason for rejection</h3>
                <br />
                <textarea
                  onChange={handleRejectionMessageOnChange}
                  style={{ width: '100%', height: '200px', padding: '1rem', outline: 'none' }}
                ></textarea>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '2rem',
                    padding: '2rem 0 0'
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: '#fff',
                      padding: '12px 36px 12px 36px',
                      color: '#000',
                      '&:hover': {
                        backgroundColor: '#fff'
                      }
                    }}
                    variant="contained"
                    type="submit"
                    onClick={closeRejectModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: '#5D1EBF',
                      padding: '12px 36px 12px 36px',
                      '&:hover': {
                        backgroundColor: '#5D1EBF'
                      }
                    }}
                    variant="contained"
                    type="submit"
                    onClick={handleReject}
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </Modal>
            {proposal.approvalStatus === 'Rejected' || proposal.approvalStatus === 'Approved' ? (
              <Button
                sx={{
                  backgroundColor: '#5D1EBF',
                  padding: '12px 36px 12px 36px',
                  '&:hover': {
                    backgroundColor: '#5D1EBF'
                  }
                }}
                variant="contained"
                disabled
                onClick={handleApprove}
              >
                Approve
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: '#5D1EBF',
                  padding: '12px 36px 12px 36px',
                  '&:hover': {
                    backgroundColor: '#5D1EBF'
                  }
                }}
                variant="contained"
                type="submit"
                onClick={handleApprove}
              >
                Approve
              </Button>
            )}

            <Modal
              open={approveModalOpen}
              onClose={closeApproveModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '800px',
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  padding: '2rem'
                }}
              >
                <h3>Approved</h3>
                <br />
                <p>The club request is successfully approved. The admin will be notified.</p>
              </Box>
            </Modal>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Proposal;
