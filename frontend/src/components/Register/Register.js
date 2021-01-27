import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import backend from "../webConfig";
import { Button } from 'react-bootstrap';
import Navbar from "../Navbar/navbar";

//import { Redirect } from 'react-router';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "",
      message: "",
      success: false,
    };
    this.submitRegister = this.submitRegister.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
  }
  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  roleChangeHandler = (e) => {
    this.setState({
      role: e.target.value,
    });
  };
  emailChangeHandler(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleValidation() {
    let formIsValid = true;


    //Password
    if (!this.state.password) {
      formIsValid = false;
      alert("Password is a Required field");
      console.log("Password cannot be empty");
    }
    //Email
    if (!this.state.email) {
      formIsValid = false;
      alert("Login ID is a Required field");
      console.log("Login ID cannot be empty");
    }
    //Name
    if (!this.state.name) {
      formIsValid = false;
      alert("Restaurant name is a Required field");
    }
    //Role
    if (!this.state.role) {
      formIsValid = false;
      alert("Role is a Required field");
    }

    return formIsValid;
  }


  //submit register handler to send a request to the node backend
  async submitRegister(e) {
    //prevent page from refresh
    e.preventDefault();
    if (this.handleValidation()) {
      let data = {
        Name: this.state.name,
        Email: this.state.email,
        Password: this.state.password,
        Role: this.state.role,
      };

      //make a post request with the user data
      await axios
        .post(`${backend}/user/register`, data)
        .then((response) => {
          this.setState({
            success: true,
          });
          swal.fire({
            title: "Success!",
            text: "Successfully Registered",
            icon: "success",
          });
        })
        .catch((error) => {
          this.setState({
            message: error.response.data.message,
          });
          swal.fire({
            title: "Error!",
            text: "Failed Registeration",
            icon: "error",
          });
        });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <div align="center" className="container col-6">
          <div className="p-5" style={{ borderStyle: "solid", borderRadius: "20px", marginTop: "16%" }}>
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2> Register</h2>
                  <br></br>
                </div>
                <form onSubmit={this.submitRegister}>
                  <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                  <div className="form-group">
                    <input
                      onChange={this.nameChangeHandler}
                      type="text"
                      className="form-control"
                      required
                      name="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.emailChangeHandler}
                      type="email"
                      className="form-control"
                      required
                      name="email"
                      placeholder="UserEmail"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.passwordChangeHandler}
                      type="password"
                      className="form-control"
                      required
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <select
                    onChange={this.roleChangeHandler}
                    value={this.state.role}
                    className="form-control"

                  >
                    <option> Register As </option>
                    <option value="Renter"> Renter </option>
                    <option value="Buyer"> Buyer </option>
                    <option value="Seller"> Seller </option>
                    <option value="Realtor"> Realtor </option>
                    <option value="Landlord"> Landlord </option>
                  </select>
                  <br />
                  <div align="center" className="m-3">
                    <Button type="submit" className="btn btn-primary px-5   ">
                      Register
                    </Button>
                  </div>


                  <p className="text-center">
                    Already Have an account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export register component
export default Register;
