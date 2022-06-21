import React, { useEffect, useState } from "react";
import './EmployeeList.css'
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from '../Graphql/Queries'
import Button from 'react-bootstrap/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import logo from '../Assets/Images/profileIcon.png'
import Form from 'react-bootstrap/Form';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddForm from "./AddForm";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { DELETE_USER_MUTATION } from '../Graphql/Mutation';
import { useMutation } from "@apollo/client";

function EmployeeList() {
    const { error, loading, data, refetch } = useQuery(LOAD_USERS);
    const [users, setUsers] = useState([]);
    const loadSetting = useSelector((state) => state.load);
    const [load, setLoad] = useState(loadSetting);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);
    const dispatch = useDispatch();
    const fnDeleteUser = (id) => {
        deleteUser({ variables: { id: id } });
    }

    useEffect(() => {
        if (data) {
            var aUser = data.getAllUsers
            setUsers(data.getAllUsers);
        }
        refetch();
    });

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} className="divSectioCss">
                <Grid container spacing={2}>
                    <Grid item xs={3} className="searchSecionCss">
                        <h3>Search</h3>
                        <Form.Group className="mb-3" controlId="searchName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="searchMail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="searchDesignation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="searchExperience">
                            <Form.Label>Experience</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btnCss">
                            Search
                        </Button>
                        <Button variant="primary" type="submit" className="btnCss">
                            Reset
                        </Button>
                    </Grid>

                    <Grid item xs={9}>
                        <div className="addEmployeeCss">
                            <PersonAddAlt1Icon onClick={() => dispatch({ type: "OPEN_POPUP" })} />
                        </div>
                        <AddForm />
                        <div className="employeeListDivCss">
                            {users.map((item, index) => (
                                <div className="employeeListCss">
                                    <div style={{ "display": "flex" }}>
                                        <img src={logo} className="profileIcon" />
                                        <div>
                                            <h4>{item.Name}</h4>
                                            <p>Email id: {item.email}</p>
                                            <p>Deignation: {item.designation}</p>
                                            <p>Experience: {item.experience}</p>
                                        </div>
                                    </div>
                                    <DeleteIcon onClick={() => fnDeleteUser(index)} />
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>

            </Box>

        </div>
    );
}

export default EmployeeList;
