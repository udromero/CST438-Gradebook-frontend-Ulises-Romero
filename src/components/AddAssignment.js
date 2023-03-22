import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Assignment from './Assignment.js';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { valueToPercent } from '@mui/base';

class AddAssignment extends Component {

  constructor() {
    super()
    this.state = {
      courseId: null,
      assignmentName: null,
      dueDate: null
    }
  }

  courseIdChangeHandler = (event) => {
    this.setState({courseId: event.target.value});
  }

  assignmentNameChangeHandler = (event) => {
    this.setState({assignmentName: event.target.value});
  }

  dueDateChangeHandler = (event) => {
    this.setState({dueDate: event.target.value});
  }

  setReturn = (event) => {
    this.setState({courseId: null, assignmentName: null, dueDate: null });
  }

  onSubmit = (event) => {
    this.addAssignment({courseId: this.state.courseId, assignmentName: this.state.assignmentName, dueDate: this.state.dueDate });
  }

  addAssignment = (assignment) => {
    const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/assignment`,
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token
      },
      body: JSON.stringify(assignment)
    })
  .then(res => {
      if (res.ok) {
        toast.success("A new Assignment has been added", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.log("A new Assignment has been added");
      } else {
        toast.error("Error, assignment not added", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error('Error Status =' + res.status);
      }})
    .catch(err => {
      toast.error("Error, assignment not added", {
            position: toast.POSITION.BOTTOM_LEFT
      });
      console.error(err);
    })
  }

  render() {   
    return (
      <div>
          <h2>Fill New Assignment Fields</h2>
            <p>Enter the Assignment Name </p>
            <input name='assignmentName' onChange={this.assignmentNameChangeHandler} />
            <p>Enter the Due Date</p>
            <input type="date" name='dueDate' onChange={this.dueDateChangeHandler}  />
            <p>Enter the Course ID</p>
            <input variant="outlined" type="number" name='courseId' onChange={this.courseIdChangeHandler}/>
      <br></br>
        
          
        <Button component={Link} to={{pathname:'/'}} 
                    variant="outlined" color="primary"  style={{margin: 50}} onClick={this.setReturn}>
              Return 
            </Button>

            <Button
          component={Link} to={{pathname:'/'}}
          variant="outlined" color="primary" style={{margin: 50}} onClick={this.onSubmit}>
          Add
          </Button>
          <ToastContainer autoClose={1500} /> 
      </div>  
    );
  }
 }

export default AddAssignment;