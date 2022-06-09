import React, { useState } from "react";
import { AppBar, Backdrop, Button, Container, Divider, Fade, MenuItem, Modal, TextField, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import { theme } from "./theme";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// For Packeg Table
function createData(packageNo: string, insuranceName: string, description: string, price: number) {
  return { packageNo, insuranceName, description, price };
}

const rows = [
  createData('Package#1', "Proteco Insurance", "Our most affordable package. Your personal belongings will be covered up to 15k$. This is perfect if you own a few belongings.", 12.50),
  createData('Package#2', "Umbrella Insurance", "Our most popular package. Your personal belongings will be covered up to 30k$. This package also includes a free water sensor to detect a water leak in your home.", 35.73),
  createData('Package#3', "Thor Insurance", "Nothing but the best. Your personal belongings will be covered up to 100k$. It even includes a protection against an alien invasion.", 79.30),
];
// For Packeg Table END

export const App: React.FunctionComponent = () => {
  const classes = useStyles();

  // For Modal
  const [open, setOpen] = useState(false);

  // For Form
  const [formValues, setFormValues] = useState({
    package: '',
    email: '',
    age: 0,
    gender: '0'
  });

  const [errorCheck, setErrorCheck] = useState({
    email: false,
    age: false,
    gender: false
  });

  const genderOptions = [
    {
      value: '0',
      label: '-- Select Gender --',
    },
    {
      value: 'M',
      label: 'Male',
    },
    {
      value: 'F',
      label: 'Female',
    },
    {
      value: 'O',
      label: 'Other',
    },
  ];
  // For Form

  // For Modal
  const handleOpen = (packageNo: string) => {
    setOpen(true);
    setFormValues({ ...formValues, package: packageNo });
  };

  const handleClose = () => {
    setOpen(false);
    setErrorCheck({
      email: false,
      age: false,
      gender: false
    });
    setFormValues({
      package: '',
      email: '',
      age: 0,
      gender: '0'
    })
  };
  // For Modal END

  const handleSubmit = () => {
    if (validateEmail(formValues.email) && validateAge(formValues.age) && formValues.gender != "0") {
      console.log("This can be sent to www.example.com", formValues)
      setOpen(false);
      alert(`${formValues.package} bought successfully \nEmail: ${formValues.email} \nAge: ${formValues.age} \nGender: ${formValues.gender} `);
    } else {
      setErrorCheck({
        email: validateEmail(formValues.email) ? false : true,
        age: validateAge(formValues.age) ? false : true,
        gender: !(formValues.gender != "0"),
      })
    }
  }

  const onChange = (e: any, type: string) => {
    setFormValues({
      package: formValues.package,
      email: type === "email" ? e.target.value : formValues.email,
      age: type === "age" ? e.target.value : formValues.age,
      gender: type === "gender" ? e.target.value : formValues.gender,
    });

    const hasValue = e.target.value ? true : false;

    setErrorCheck({
      email: type === "email" ? !validateEmail(e.target.value) : errorCheck.email,
      age: type === "age" ? !validateAge(+e.target.value) : errorCheck.age,
      gender: type === "gender" ? !hasValue : errorCheck.gender,
    })
  }

  const validateEmail = (email: string) => {
    return email && String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateAge = (age: number) => {
    return age && age >= 21 && age <100;
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography>Technical Assignment</Typography>
          </Toolbar>
        </AppBar>

        {/* TODO: Add components here */}
        <Container maxWidth="md" className={classes.container}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Insurance Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Price / month</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.packageNo}>
                    <TableCell component="th" scope="row">
                      {row.packageNo}
                    </TableCell>
                    <TableCell align="left">{row.insuranceName}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">${row.price}</TableCell>
                    <TableCell align="left">
                      <Button variant="contained" color="primary" onClick={() => handleOpen(row.packageNo)}>
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              <AppBar position="static">
                <Toolbar className={classes.modalToolBar}>
                  <Typography>Buy {formValues.package}</Typography>
                  <a style={{ cursor: 'pointer' }} onClick={handleClose}>x</a>
                </Toolbar>
              </AppBar>
              <div className={classes.paper}>
                <p>Please answer the following questions to buy the package.</p>

                <form noValidate autoComplete="off">
                  <div>
                    <TextField
                      id="email"
                      label="What's your email?"
                      placeholder="email@example.com"
                      fullWidth
                      value={formValues.email}
                      onChange={(e) => onChange(e, "email")}
                      error={errorCheck.email}
                      helperText={errorCheck.email ? "Please enter a valid email." : ""}
                    />
                  </div>
                  <div>
                    <TextField
                      id="age"
                      label="How old are you?"
                      placeholder="24"
                      fullWidth
                      margin="normal"
                      type='number'
                      value={formValues.age}
                      onChange={(e) => onChange(e, "age")}
                      error={errorCheck.age}
                      helperText={errorCheck.age ? "You must be 21 or older." : ""}
                    />
                  </div>
                  <div>
                    <TextField
                      id="gender"
                      select
                      label="Select"
                      value={formValues.gender}
                      onChange={(e) => onChange(e, "gender")}
                      fullWidth
                      error={errorCheck.gender}
                    >
                      {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value} disabled={option.value == "0"}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <Divider className={classes.divider} />

                  <div className={classes.formBtnWrapper} >
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>

                </form>
              </div>
            </div>

          </Fade>
        </Modal>

      </div>
    </ThemeProvider>
  );
};

//Stylesheet
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 30,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderEndEndRadius: 10,
    borderEndStartRadius: 10,
  },
  modalToolBar: {
    justifyContent: "space-between"
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  formBtnWrapper: {
    display: "flex",
    justifyContent: "center"
  }
});