//import React from "react";
import ExpenseForm from "./ExpenseForm";
import { Container } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function CustomizedSnackbars() {
  //SNACK BAR , need to create a small slice/reducer for triggering and closing snack, with a payload containing message and severity, could be cool
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button variant='outlined' onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert severity='error'>This is an error message!</Alert>
      <Alert severity='warning'>This is a warning message!</Alert>
      <Alert severity='info'>This is an information message!</Alert>
      <Alert severity='success'>This is a success message!</Alert>
    </Stack>
  );
}

const Home = () => {
  return (
    <Container maxWidth='sm'>
      <ExpenseForm />
      {/*<CustomizedSnackbars />*/}
    </Container>
  );
};

export default Home;
