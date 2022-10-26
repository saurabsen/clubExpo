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
import './clubproposal.css';

const steps = ['General info', 'Club info'];

export default function ClubProposal() {
  const { getAllProposalData } = useActions();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [formValue, setFormValue] = React.useState({
    isManageClub: '',
    clubPurpose: '',
    clubInterest: '',
    clubActivities: '',
    clubName: '',
    eventsPerMonth: '',
    clubMembers: ''
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
  };

  return (
    <Box className="proposal-container" sx={{ width: '70%' }}>
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
                  <TextField
                    fullWidth
                    name="isManageClub"
                    onChange={handleChange}
                    value={formValue.isManageClub}
                    id="outlined-password-input"
                    type="text"
                    autoComplete="current-password"
                  />
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
                    autoComplete="current-password"
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
                    autoComplete="current-password"
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
                    autoComplete="current-password"
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
                    autoComplete="current-password"
                  />
                </div>
                <div>
                  <p>How many events will this club organize per month?</p>
                  <TextField
                    fullWidth
                    name="eventsPerMonth"
                    onChange={handleChange}
                    value={formValue.eventsPerMonth}
                    id="outlined-password-input"
                    type="text"
                    autoComplete="current-password"
                  />
                </div>
                <div>
                  <p>List down the names of initial club members</p>
                  <TextField
                    fullWidth
                    name="clubMembers"
                    onChange={handleChange}
                    value={formValue.clubMembers}
                    id="outlined-password-input"
                    type="text"
                    autoComplete="current-password"
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
