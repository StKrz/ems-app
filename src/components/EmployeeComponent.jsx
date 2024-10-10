// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if (id) {
            getEmployee(id).then((response) => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setEmail(response.data.email)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstname, lastname, email };
            console.log(employee);

            if (id) {
                // Update employee if id exists
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                // Create new employee if no id
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);  // Corrected this line
                });
            }
        }
    };


    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    const validateForm = () => {
        let valid = true;

        const errorsCopy = { ...errors }

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'Firstname is required';
            valid = false;
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Lastname is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Employee First Name:</label>
                                <input type="text"
                                    placeholder='Enter Employee First Name'
                                    name='firstname'
                                    value={firstname}
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstname(e.target.value)}
                                >
                                </input>
                                {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Employee First Name:</label>
                                <input type="text"
                                    placeholder='Enter Employee Last Name'
                                    name='lastname'
                                    value={lastname}
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastname(e.target.value)}
                                >
                                </input>
                                {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Employee Email:</label>
                                <input type="email"
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EmployeeComponent