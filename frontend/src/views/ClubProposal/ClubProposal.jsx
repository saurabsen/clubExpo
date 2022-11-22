/* eslint-disable no-unused-vars */
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
  Card,
  CardMedia
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './clubproposal.css';
import { BackButton } from '../../components';
import { Base } from '../../assets';

const steps = ['General info', 'Club info'];

export default function ClubProposal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [proposalCreationComplete, setProposalCreationComplete] = React.useState(false);

  const { submitProposal } = useActions();
  const { data } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();

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
    const data = await submitProposal(formValue);
    if (data) {
      setProposalCreationComplete(true);
    }
  };

  return (
    <>
      <Card sx={{ background: 'transparent' }}>
        <Box sx={{ position: 'relative' }} className="card-img">
          <CardMedia component="img" height={{ xs: '194px', md: '462px' }} image={Base} />
          <div
            className="base-title"
            style={{
              position: 'absolute',
              color: 'white',
              top: '40%',
              left: '20%',
              transform: 'translateX(-50%)'
            }}
          >
            {' '}
            <h1>Build your Own club</h1>
            <div>Tell us a bit more about yourself so we can help create the perfect club </div>
          </div>
          <Box
            onClick={() => navigate(-1)}
            sx={{ position: 'absolute', top: '30px', left: '30px' }}
          >
            <BackButton />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center',
            pt: '40px',
            background: '#FBFCFF'
          }}
        >
          <Box className="proposal-container" sx={{ width: '70%' }}>
            {!proposalCreationComplete ? (
              <>
                <Stepper className="stepper" activeStep={activeStep} sx={{ padding: '0 0 1rem' }}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>
                          <h4>{label}</h4>
                        </StepLabel>
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
                    <h2>
                      Please answer a few questions for the admin to approve your club request
                    </h2>
                    <form noValidate onSubmit={handleFromData}>
                      {activeStep === 0 ? (
                        <div>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>Have you ever managed a club before?</h4>
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
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>What is the purpose of this club?</h4>
                              <TextField
                                fullWidth
                                name="clubPurpose"
                                onChange={handleChange}
                                value={formValue.clubPurpose}
                                id="outlined-password-input"
                                type="text"
                                variant="standard"
                              />
                            </div>
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>List down a few topics that describe your group's interests</h4>
                              <TextField
                                fullWidth
                                name="clubInterest"
                                onChange={handleChange}
                                value={formValue.clubInterest}
                                id="outlined-password-input"
                                type="text"
                                variant="standard"
                              />
                            </div>
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>Give a brief about activities for this group</h4>
                              <TextField
                                fullWidth
                                name="clubActivities"
                                onChange={handleChange}
                                value={formValue.clubActivities}
                                id="outlined-password-input"
                                type="text"
                                variant="standard"
                              />
                            </div>
                          </Card>
                        </div>
                      ) : (
                        <></>
                      )}
                      {activeStep === 1 ? (
                        <div>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>Name of the club</h4>
                              <TextField
                                fullWidth
                                name="clubName"
                                onChange={handleChange}
                                value={formValue.clubName}
                                id="outlined-password-input"
                                type="text"
                                variant="standard"
                              />
                            </div>
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>Description of the club</h4>
                              <TextField
                                fullWidth
                                name="description"
                                onChange={handleChange}
                                value={formValue.description}
                                id="outlined-password-input"
                                type="text"
                                variant="standard"
                              />
                            </div>
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>How many events will this club organize per month?</h4>
                              <TextField
                                fullWidth
                                name="noOfEventsMonth"
                                onChange={handleChange}
                                value={formValue.noOfEventsMonth}
                                id="outlined-password-input"
                                type="number"
                                variant="standard"
                              />
                            </div>
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>List down the names of initial club members</h4>
                              <TextField
                                fullWidth
                                name="members"
                                onChange={handleChange}
                                value={formValue.members}
                                id="outlined-password-input"
                                type="text"
                                variant="standard"
                              />
                            </div>
                          </Card>
                          <Card sx={{ p: '0.5rem 1rem', m: '1rem 0' }}>
                            <div className="input-group">
                              <h4>Terms & Conditions and the guidelines for a group</h4>
                              <p>
                                The Club’s primary purpose is to teach students how to play chess
                                and to provide an opportunity for students to play chess against
                                each other. All members of the Club are expected to abide by the
                                rules of the school and the Club. The Club’s rules of conduct are as
                                follows: • Members must respect the rights and property of others.
                              </p>
                            </div>
                          </Card>
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
        </Box>
      </Card>
    </>
  );
}
