import React, { useState } from "react";
import SelectCountry from "./SelectCountry";
import {
  SignUp,
  FormSection,
  SectionHeader,
  SectionBody,
  SectionFooter,
  InputRow,
  ButtonRow,
  Link
} from "aws-amplify-react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NiceInputPassword from "react-nice-input-password";
import "react-nice-input-password/dist/react-nice-input-password.css";
import { defaultSignUpFields, geoArr, securityLevels } from "./data";
import { createAccount } from "./containers/BASE";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUpForm = (props) => {
  const {} = props;

  const [requestPending, setRequestPending] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [hasMessage, setHasMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");
  const [goToSignIn, setGoToSignIn] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    given_name: "",
    family_name: ""
  });

  const validate = () => {
    const invalids = [];
    defaultSignUpFields.map((el) => {
      if (el.key !== "phone_number") {
        if (el.required && !inputs[el.key]) {
          el.invalid = true;
          invalids.push(el.label);
        } else {
          el.invalid = false;
        }
      } else {
        if (el.required && phone_number) {
          el.invalid = true;
          invalids.push(el.label);
        } else {
          el.invalid = false;
        }
      }
      return true;
    });
    return invalids;
  };

  const handleGoToSignIn = () => {
    console.log("Go To sign in = " + goToSignIn);
  };

  const onSetMessage = (type, message) => {
    setHasMessage(true);
    setMessageType(type);
    setMessage(message);
  };

  const signUp = () => {
    const validation = validate();
    if (validation && validation.length > 0) {
      setRequestPending(false);
      return setMessage(
        "error",
        `The following fields need to be filled out: ${validation.join(", ")}`
      );
    }
    const param = {
      password: inputs.password,
      email: inputs.email,
      first_name: inputs.given_name,
      last_name: inputs.family_name
    };
    createAccount(param)
      .then((d) => {
        setRequestPending(false);
        onSetMessage(
          "success",
          "Account Created. Please check your email for verification code."
        );
      })
      .catch((err) => {
        console.log({ err: err });
        let msg = `${err.message}`;
        if (err.response && err.response.data && err.response.data.message) {
          msg = `${err.message}: ${err.response.data.message}`;
        }
        setMessage("error", msg);
        setRequestPending(false);
      });
  };
  const handleInputChange = (event) => {};
  const handleChange = (event) => {
    const evt = {
      target: {
        name: event.name,
        value: event.value,
        type: "password",
        checked: false
      }
    };
    setInputs({ ...inputs, password: event.value });
    setValidPassword(event.isValid);
    handleInputChange(evt);
    console.log(event);
  };

  const handleClose = (event, reason) => {
    setHasMessage(false);
    setInputs({ ...inputs, username: inputs.email });
  };
  return (
    <FormSection>
      {hasMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={hasMessage}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={messageType}>
            {message}
          </Alert>
        </Snackbar>
      )}
      <SectionHeader>{"Sign Up Account"}</SectionHeader>
      <SectionBody>
        <Grid
          container
          direction="row"
          spacing={2}
          justify="space-around"
          alignContent="center"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            xs={6}
            direction="row"
            spacing={2}
            justify="space-around"
            alignContent="center"
            alignItems="flex-start"
          >
            <Grid container item direction="column" xs={12} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">User Details</Typography>

                <Divider orientation="horizontal" />
              </Grid>
              <InputRow
                placeholder={"First Name"}
                key="given_name"
                name="given_name"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Last Name"}
                key="family_name"
                name="family_name"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Job Title"}
                key="job_title"
                name="job_title"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Country"}
                key="employee_country"
                name="employee_country"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Phone Number"}
                key="employee_phone"
                name="employee_phone"
                onChange={handleInputChange}
              />
            </Grid>

            <Grid container item direction="column" xs={12} spacing={2}>
              <Grid item xs>
                <Typography variant="h5">Company Details</Typography>

                <Divider orientation="horizontal" />
              </Grid>
              <InputRow
                placeholder={"Company Name"}
                key="company"
                name="company"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Company Phone #"}
                key="company_phone"
                name="company_phone"
                onChange={handleInputChange}
              />
              <SelectCountry />
              <InputRow
                placeholder={"Company Country"}
                key="company_country"
                name="company_country"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Company ZIP Code"}
                key="employee_country"
                name="employee_country"
                onChange={handleInputChange}
              />
              <InputRow
                placeholder={"Company Street Address"}
                key="company_address"
                name="company_address"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            direction="row"
            spacing={2}
            justify="space-around"
            alignContent="center"
            alignItems="flex-start"
          >
            <Grid container item direction="column" xs={12} spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Account</Typography>

                <Divider orientation="horizontal" />
              </Grid>
              <InputRow
                placeholder={"Email"}
                key="email"
                name="email"
                onChange={handleInputChange}
              />
              <NiceInputPassword
                className={"niceinput-amplify"}
                placeholder="Password"
                name="password"
                key={"password"}
                label={""}
                value={inputs.password}
                showSecurityLevelBar
                showSecurityLevelDescription
                securityLevels={securityLevels}
                onChange={(evt) => {
                  handleChange(evt);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* Test in footer
					{this.state.validPassword && (
						<ButtonRow onClick={this.signUp} >
							{'Sign Up'}
						</ButtonRow>
					)}
					{this.state.requestPending ? (
						<CircularProgress size={20} color='secondary' />
					) : (
						<div />
					)}
                    */}
      </SectionBody>
      <SectionFooter>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                setInputs({ ...inputs, password: "" });
                setGoToSignIn(true);
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item xs={3}>
            {validPassword && (
              <Button variant="contained" color="primary" onClick={signUp}>
                Sign Up
              </Button>
            )}
            {requestPending ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </SectionFooter>
    </FormSection>
  );
};

export default SignUpForm;
