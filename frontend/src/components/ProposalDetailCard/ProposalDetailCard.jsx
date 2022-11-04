import { Box, Card, TextField } from '@mui/material';
import './proposalDetailCard.css';

const ProposalDetailCard = ({ question, answer }) => {
  return (
    <Box>
      <Card sx={{ padding: '1rem 1rem 1rem' }} variant="outlined">
        <h4>{question}</h4>
        <br />
        <TextField
          disabled
          id="standard-disabled"
          defaultValue={answer}
          variant="standard"
          fullWidth
        />
      </Card>
    </Box>
  );
};

export default ProposalDetailCard;
