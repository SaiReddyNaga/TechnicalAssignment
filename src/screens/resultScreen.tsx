import React from "react";
import { Button, Container, makeStyles } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";

export const ResultScreen: React.FunctionComponent = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state as any;

    return (

        <Container maxWidth="md" className={classes.container}>
            <div>
                <h2>Your Package has been purchased successfully.</h2>
                <p>Package Number: {state.package}</p>
                <p>Email: {state.email}</p>
                <p>Age: {state.age}</p>
                <p>Gender: {state.gender.toLowerCase() === "f" ? "Female" : "Male"}</p>
            </div>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Buy Again
            </Button>
        </Container>

    );
};

const useStyles = makeStyles({
    container: {
        marginTop: 30,
    },
});