import React from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import red from "@material-ui/core/colors/red";

import CategorySelect from "./CategorySelect";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(5),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  myForm: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(5),
  },
  projectGoals: {
    display: "flex",
    justifyContent: "center",
  },
  projectEndDate: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  dateError: {
    marginTop: theme.spacing(2),
    color: red[500],
  },
}));

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const validationSchema = Yup.object().shape({
  projectDescription: Yup.string().required("Required"),
  projectGoal: Yup.number().min(1, "Please enter a valid amount"),
  projectEndDate: Yup.date().min(
    tomorrow,
    "The earliest it could be is tomorrow"
  ),
});

function StepContent(props) {
  const { step } = props;
  const { errors } = useFormikContext();
  const classes = useStyles();

  const allSteps = [
    { cmp: <CategorySelect />, id: "category" },
    {
      cmp: (
        <Field
          component={TextField}
          name="projectDescription"
          label="Project Description"
          multiline
          variant="outlined"
          fullWidth
        />
      ),
      id: "projectDescription",
    },
    {
      cmp: (
        <>
          <div className={classes.projectGoals}>
            <Field
              component={TextField}
              name="projectGoal"
              label="Project Target Goal (in ALGO)"
              type="number"
              variant="outlined"
            />
          </div>
          <div className={classes.projectEndDate}>
            <Field
              component={KeyboardDatePicker}
              label="Project End Date"
              name="projectEndDate"
            />
          </div>
          {errors.projectEndDate && (
            <Typography
              variant="body2"
              align="center"
              className={classes.dateError}
            >
              {errors.projectEndDate}
            </Typography>
          )}
        </>
      ),
      id: "projectGoal",
    },
  ];
  return (
    <>
      {allSteps.map((stepCmp, index) => {
        return (
          <div hidden={index !== step} key={stepCmp.id}>
            {stepCmp.cmp}
          </div>
        );
      })}
    </>
  );
}

function getSteps() {
  return [
    "Select your project category",
    "Describe your project idea",
    "Outline out your goal",
    "You are done!",
  ];
}

function MyForm(props) {
  const { step } = props;
  return (
    <Form style={{ flexGrow: 1 }}>
      <StepContent step={step} />
    </Form>
  );
}

export default function CreateProjectStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDisabled = (activeStep, values, errors) => {
    // maybe can check with errors directly?
    switch (activeStep) {
      case 0:
        if (values.category === "") return true;
        break;
      case 1:
        if (values.projectDescription === "") return true;
        break;
      case 2:
        if (errors.projectEndDate || errors.projectGoal) return true;
        return false;
      default:
        return false;
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Formik
        initialValues={{
          category: "",
          projectDescription: "",
          projectGoal: 1,
          projectEndDate: tomorrow,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values, errors }) => (
          <>
            <div className={classes.myForm}>
              <MyForm step={activeStep} />
            </div>
            <div className={classes.buttonsContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={handleDisabled(activeStep, values, errors)}
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}
