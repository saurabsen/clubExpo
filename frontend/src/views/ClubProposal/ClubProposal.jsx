import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import './clubproposal.css';

const steps = ['General info', 'Club info'];

export default function ClubProposal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const userID = '63544dfee21900bbca2866c7';
  const [formValue, setFormValue] = React.useState({
    clubName: '',
    description: '',
    noOfEventsMonth: '',
    createdBy: userID,
    members: '',
    approvalStatus: '',
    approvalStatusReason: '',
    isManageClub: false,
    clubPurpose: '',
    clubInterest: '',
    clubActivities: ''
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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
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

  const handleFromData = (e) => {
    e.preventDefault();
    console.log(formValue);
    const response = saveProposal(formValue);
    console.log(response);
  };

  // functions

  const tokenStr =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzUwMmRiMzRhMjcwYmY0ZDFhMjc5MWIiLCJpYXQiOjE2NjYxOTg5NjMsImV4cCI6MTY2ODc5MDk2M30.lPOmtB9fdmlIhDIj_R4yAvnt04ZWmuReNPNESVAak_8';

  const status = {
    statusArray: 'Pending'
  };

  const saveProposal = async (formValue) => {
    const data = await axios.post(`http://localhost:3001/api/proposals/`, formValue, {
      headers: { Authorization: `Bearer ${tokenStr}` }
    });
    return data;
  };

  return (
    <Box className="proposal-container" sx={{ width: '70%' }}>
      {/* <button onClick={getProposals('getproposals')}>get proposal</button> */}
      <Stepper activeStep={activeStep}>
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
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
                  <p>How many events will this club organize per month?</p>
                  <TextField
                    fullWidth
                    name="noOfEventsMonth"
                    onChange={handleChange}
                    value={formValue.noOfEventsMonth}
                    id="outlined-password-input"
                    type="number"
                  />
                </div>
                <div>
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
                <div>
                  <p>Terms & Conditions and the guidelines for a group</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam
                    in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula
                    consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis
                    imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                    Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet.{' '}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </form>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
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
    </Box>
  );
}
