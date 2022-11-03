import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Proposal = () => {
  const [proposal, setProposal] = useState({});
  const { proposalId } = useParams();

  const { data } = useTypedSelector((state) => state.proposals);

  useEffect(() => {
    if (data) {
      const proposal = data.filter((proposal) => proposal._id === proposalId);

      if (proposal[0]) {
        setProposal(proposal[0]);
      }
    }
  }, [data]);

  return (
    <div>
      <h3>{JSON.stringify(proposal)}</h3>
    </div>
  );
};

export default Proposal;
