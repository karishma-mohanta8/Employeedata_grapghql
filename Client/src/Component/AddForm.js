import React, { useEffect, useState } from "react";
import './AddForm.css'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import { CREATE_USER_MUTATION } from '../Graphql/Mutation';
import { useMutation } from "@apollo/client";

function AddForm() {

    const aEmployeeDetails = useSelector(state => state.aEmployee);

    const popupOpen = useSelector((state) => state.popupOpen);

    const dispatch = useDispatch();

    const [employee, setEmployee] = useState({ "id": "", "name": "", "email": "", "designation": "", "experience": "" });

    const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

    const fnChangeFormValues = (oEvent) => {
        if (oEvent.target.id === "formName") {
            var firstName = oEvent.target.value;
            setEmployee({
                ...employee,
                "name": oEvent.target.value
            });
        } else if (oEvent.target.id === "formEmail") {
            var secondName = oEvent.target.value;
            setEmployee({
                ...employee,
                "email": oEvent.target.value
            });
        } else if (oEvent.target.id === "formDesignation") {
            var email = oEvent.target.value;
            setEmployee({
                ...employee,
                "designation": oEvent.target.value
            });
        } else {
            var password = oEvent.target.value;
            setEmployee({
                ...employee,
                "experience": oEvent.target.value
            });
        }


    }
    const fnAddEmployee = () => {
        if (employee.name && employee.email && employee.designation && employee.experience) {
            createUser({
                variables: {
                    Name: employee.name,
                    email: employee.email,
                    designation: employee.designation,
                    experience: employee.experience
                },
            });
            setEmployee({ "id": "", "name": "", "email": "", "designation": "", "experience": "" })
            dispatch({ type: "CLOSE_POPUP" });
            dispatch({ type: "ADD_EMPLOYEE", value: true });

        } else {
            alert("Enter all fields")
        }
    }

    return (
        <div >
            <Dialog open={popupOpen} onClose={() => dispatch({ type: "CLOSE_POPUP" })}>
                <DialogTitle>Enter Employee Details</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="formName" label="Name" type="text" fullWidth variant="standard" onChange={(e) => fnChangeFormValues(e)} value={employee.name} />
                    <TextField autoFocus margin="dense" id="formEmail" label="Email" type="text" fullWidth variant="standard" onChange={(e) => fnChangeFormValues(e)} value={employee.email} />
                    <TextField autoFocus margin="dense" id="formDesignation" label="Designation" type="email" fullWidth variant="standard" onChange={(e) => fnChangeFormValues(e)} value={employee.designation} />
                    <TextField autoFocus margin="dense" id="formExperience" label="Experience" type="text" fullWidth variant="standard" onChange={(e) => fnChangeFormValues(e)} value={employee.experience} />
                </DialogContent>
                <DialogActions onClick={() => fnAddEmployee()}>
                    <Button >Add</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default AddForm;
