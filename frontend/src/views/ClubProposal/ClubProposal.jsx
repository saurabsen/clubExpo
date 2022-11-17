import * as React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Card
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './clubproposal.css';

const steps = ['General info', 'Club info'];

export default function ClubProposal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [proposalCreationComplete, setProposalCreationComplete] = React.useState(false);

  const { submitProposal, sendNotification } = useActions();
  const { data } = useTypedSelector((state) => state.auth);

  const [formValue, setFormValue] = React.useState({
    clubName: '',
    description: '',
    noOfEventsMonth: '',
    createdBy: data ? data._id : '',
    members: '',
    approvalStatus: '',
    approvalStatusReason: '',
    isManageClub: false,
    clubPurpose: '',
    clubInterest: '',
    clubActivities: '',
    creatorName: data ? `${data.firstName} ${data.lastName}` : ''
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (e) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleFromData = async (e) => {
    e.preventDefault();
    const submitted = await submitProposal(formValue);
    if (submitted) {
      const notification = {
        message: `Club proposal request from ${data.firstName} ${data.lastName}`,
        type: 'newProposal',
        from: data ? data._id : '',
        to: '636f40dc6edb298fb1bca49f' // Hub Admin ID
      };
      const sent = await sendNotification(notification);
      setProposalCreationComplete(true);
    }
  };

  return (
    <Box className="proposal-container" sx={{ width: '70%' }}>
      {!proposalCreationComplete ? (
        <>
          <Stepper activeStep={activeStep} sx={{ padding: '0 0 1rem' }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              <h2>Please answer a few questions for the admin to approve your club request</h2>
              <form noValidate onSubmit={handleFromData}>
                {activeStep === 0 ? (
                  <div>
                    <div className="input-group">
                      <p>Have you ever managed a club before?</p>
                      <RadioGroup
                        row
                        defaultValue="false"
                        name="isManageClub"
                        onChange={handleChange}
                        value={formValue.isManageClub}
                      >
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                      </RadioGroup>
                    </div>
                    <div className="input-group">
                      <p>What is the purpose of this club?</p>
                      <TextField
                        fullWidth
                        name="clubPurpose"
                        onChange={handleChange}
                        value={formValue.clubPurpose}
                        id="outlined-password-input"
                        type="text"
                      />
                    </div>
                    <div className="input-group">
                      <p>List down a few topics that describe your group's interests</p>
                      <TextField
                        fullWidth
                        name="clubInterest"
                        onChange={handleChange}
                        value={formValue.clubInterest}
                        id="outlined-password-input"
                        type="text"
                      />
                    </div>
                    <div className="input-group">
                      <p>Give a brief about activities for this group</p>
                      <TextField
                        fullWidth
                        name="clubActivities"
                        onChange={handleChange}
                        value={formValue.clubActivities}
                        id="outlined-password-input"
                        type="text"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {activeStep === 1 ? (
                  <div>
                    <div className="input-group">
                      <p>Name of the club</p>
                      <TextField
                        fullWidth
                        name="clubName"
                        onChange={handleChange}
                        value={formValue.clubName}
                        id="outlined-password-input"
                        type="text"
                      />
                    </div>
                    <div className="input-group">
                      <p>Description of the club</p>
                      <TextField
                        fullWidth
                        name="description"
                        onChange={handleChange}
                        value={formValue.description}
                        id="outlined-password-input"
                        type="text"
                      />
                    </div>
                    <div className="input-group">
                      <p>How many events will this club organize per month?</p>
                      <TextField
                        placeholder="2"
                        fullWidth
                        name="noOfEventsMonth"
                        onChange={handleChange}
                        value={formValue.noOfEventsMonth}
                        id="outlined-password-input"
                        type="number"
                      />
                    </div>
                    <div className="input-group">
                      <p>List down the names of initial club members</p>
                      <TextField
                        fullWidth
                        name="members"
                        onChange={handleChange}
                        value={formValue.members}
                        id="outlined-password-input"
                        type="text"
                      />
                    </div>
                    <div className="input-group">
                      <p>Terms & Conditions and the guidelines for a group</p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
                        Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis
                        ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam
                        quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna
                        interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit
                        amet.{' '}
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </form>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleFromData}>Finish</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
                {/* <Button type="submit">{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button> */}
              </Box>
            </React.Fragment>
          )}
        </>
      ) : (
        <>
          <Card sx={{ textAlign: 'center', padding: '2rem 0' }} variant="outlined">
            <h3>Thank you for submitting the proposal!</h3>
            <br />
            <p>You will get a notification once the proposal is approved.</p>
            <br />
            <Link to="/discover-clubs">
              <Button
                sx={{
                  backgroundColor: '#5D1EBF',
                  padding: '16px 36px 16px 36px',
                  '&:hover': {
                    backgroundColor: '#5D1EBF'
                  }
                }}
                variant="contained"
              >
                Back to discover clubs
              </Button>
            </Link>
          </Card>
        </>
      )}
    </Box>
  );
}
