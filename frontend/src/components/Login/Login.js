import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import jwt_decode from 'jwt-decode';
import swal from "sweetalert2";
import backend from "../webConfig"
import Navbar from "../Navbar/navbar";
import { Button } from 'react-bootstrap'


//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constructor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      token: "",
      message: "",
      role: "",
    };
    //Bind the handlers to this class
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //username change handler to update state variable with the text entered by the user
  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
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
      alert("Email ID is a Required field");
      console.log("Email ID cannot be empty");
    }
    //Role
    if (!this.state.role) {
      formIsValid = false;
      alert("Role is a Required field");
      console.log("restaurant name cannot be empty");
    }

    return formIsValid;
  }

  //submit Login handler to send a request to the node backend

  async submitLogin(e) {

    //prevent page from refresh
    e.preventDefault();
    if (this.handleValidation()) {
      const data = {
        Email: this.state.email,
        Password: this.state.password,
        Role: this.state.role,
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      await axios
        .post(`${backend}/user/login`, data)
        .then((response) => {
          console.log(response);
          this.setState({
            token: response.data,
            authFlag: true,
          });
          swal.fire({
            title: "Success!",
            text: "Successfully Logged In ",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log("ERROR", error.response.data.message)
          this.setState({
            message: error.response.data.message,
          });
          swal.fire({
            title: "Error!",
            text: "Invalid Credentials",
            icon: "error",
          });
        });
    }
    await axios.get(`${backend}`)
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.state.token.length > 0) {
      localStorage.setItem("token", this.state.token);
      var decoded = jwt_decode(this.state.token.split(' ')[1]);
      console.log("decoded", decoded)
      localStorage.setItem("user_id", decoded._id);
      localStorage.setItem("email", decoded.email);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("approvedStatus", decoded.approvedStatus);
      localStorage.setItem("role", decoded.role);

      redirectVar = <Redirect to="/propertySearch" />;
    }
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <div>
          {redirectVar}
          <div align="center" className="container col-6">
            <div className="p-5" style={{ borderStyle: "solid", borderRadius: "20px", marginTop: "16%" }}>

              <div className="login-form">
                <div className="main-div">
                  <div className="panel">
                    <h2> Login</h2>
                    <p>Please enter your Email and password</p>
                  </div>
                  <form onSubmit={this.submitLogin}>
                    <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                    <div className="form-group">
                      <input
                        onChange={this.emailChangeHandler}
                        type="email"
                        className="form-control"
                        required
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.passwordChangeHandler}
                        type="password"
                        class="form-control"
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
                      <option> Login As </option>
                      <option value="Admin"> Admin </option>
                      <option value="Renter"> Renter </option>
                      <option value="Buyer"> Buyer </option>
                      <option value="Seller"> Seller </option>
                      <option value="Realtor"> Realtor </option>
                      <option value="Landlord"> Landlord </option>
                    </select>
                    <br />
                    {/* <button type="submit" class="btn btn-primary">
                      Login
                </button> */}
                    <div align="center" className="m-3">                  <Button type="submit" className="btn btn-primary px-5   ">
                      Login
                </Button></div>

                    <p className="text-center">
                      Don't Have an account? <Link to="/register">Sign up</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div></div>
    );
  }
}
//export Login Component
export default Login;
