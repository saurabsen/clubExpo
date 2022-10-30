import { useEffect, useState } from 'react';
import axios from 'axios';
import './proposalManagement.css';

const ProposalManagement = () => {
  const [allProposals, setAllProposals] = useState([]);
  let proposals = [];
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

  return (
    <div>
      test
      {allProposals.map((element) => {
        return <div>{element.clubName}test</div>;
      })}
    </div>
  );
};

export default ProposalManagement;
