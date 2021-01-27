import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import backend from "../webConfig";
import Navbar from "../Navbar/navbar";

//import { Redirect } from 'react-router';
class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      moveInDate: "",
      mobile: "",
      currentAddress: "",
      creditScore: "",
      leaseTerm: "",
      employer: "",
      employerAddress: "",
      emergencyContact: "",
      salary: "",
      message: "",
      success: false,
    };
    this.submitRegister = this.submitRegister.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.mobileChangeHandler = this.mobileChangeHandler.bind(this);
    this.moveInDateChangeHandler = this.moveInDateChangeHandler.bind(this);
    this.currentAddressChangeHandler = this.currentAddressChangeHandler.bind(
      this
    );
    this.employerChangeHandler = this.employerChangeHandler.bind(this);
    this.employerAddressChangeHandler = this.employerAddressChangeHandler.bind(
      this
    );
    this.salaryChangeHandler = this.salaryChangeHandler.bind(this);
    this.emergencyContactChangeHandler = this.emergencyContactChangeHandler.bind(
      this
    );
    this.leaseTermChangeHandler = this.leaseTermChangeHandler.bind(this);
  }

  firstnameChangeHandler = (e) => {
    this.setState({
      firstname: e.target.value,
    });
  };
  lastnameChangeHandler = (e) => {
    this.setState({
      lastname: e.target.value,
    });
  };
  mobileChangeHandler = (e) => {
    this.setState({
      mobile: e.target.value,
    });
  };
  moveInDateChangeHandler = (e) => {
    this.setState({
      moveInDate: e.target.value,
    });
  };
  currentAddressChangeHandler = (e) => {
    this.setState({
      currentAddress: e.target.value,
    });
  };

  creditScoreChangeHandler = (e) => {
    this.setState({
      creditScore: e.target.value,
    });
  };

  leaseTermChangeHandler = (e) => {
    this.setState({
      leaseTerm: e.target.value,
    });
  };
  employerChangeHandler = (e) => {
    this.setState({
      employer: e.target.value,
    });
  };
  employerAddressChangeHandler = (e) => {
    this.setState({
      employerAddress: e.target.value,
    });
  };
  emergencyContactChangeHandler = (e) => {
    this.setState({
      emergencyContact: e.target.value,
    });
  };
  salaryChangeHandler = (e) => {
    this.setState({
      salary: e.target.value,
    });
  };

  handleValidation() {
    let formIsValid = true;

    //Email

    //Name
    if (!this.state.firstname) {
      formIsValid = false;
      alert("Firstname is a Required field");
      console.log(" First name cannot be empty");
    }
    if (!this.state.lastname) {
      formIsValid = false;
      alert("Lastname is a Required field");
      console.log("Lastname is a Required field");
    }
    return formIsValid;
  }

  //submit register handler to send a request to the node backend
  async submitRegister(e) {
    //prevent page from refresh
    e.preventDefault();
    if (this.handleValidation()) {
      let data = {
        Firstname: this.state.firstname,
        Lastname: this.state.lastname,
        Email: localStorage.getItem("email"),
        MoveInDate: this.state.moveInDate,
        Mobile: this.state.mobile,
        CreditScore: this.state.creditScore,
        CurrentAddress: this.state.currentAddress,
        LeaseTerm: this.state.leaseTerm,
        Employer: this.state.employer,
        EmployerAddress: this.state.employerAddress,
        EmergencyContact: this.state.emergencyContact,
        Salary: this.state.salary,
        PropertyID: localStorage.getItem("propertId"),
        PropertyName: localStorage.getItem("propertyName"),
        ApplicantType: localStorage.getItem("role"),
        propertyType: localStorage.getItem("propertyType"),
        SellerEmail:  localStorage.getItem("sellerEmailId"),
        offerAmount: this.state.offerAmount,
      };

      //make a post request with the user data
      await axios
        .post(`${backend}/renter/application`, data)
        .then((response) => {
          this.setState({
            success: true,
          });
          swal.fire({
            title: "Success!",
            text: "Applied Successfully",
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
        <Navbar></Navbar>
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel mb-5" align="center">
                <br />{" "}
                {localStorage.getItem("propertyType") === "Rentable" ? (
                  <h2> Lease Application Form </h2>
                ) : (
                  <h2> Application Form </h2>
                )}
              </div>
              <form className="" onSubmit={this.submitRegister}>
                <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                <div className="form-group">
                  <input
                    onChange={this.firstnameChangeHandler}
                    type="text"
                    className="form-control"
                    required
                    name="firstname"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.lastnameChangeHandler}
                    type="text"
                    className="form-control"
                    required
                    name="lastname"
                    placeholder="Last Name"
                  />
                </div>
                {localStorage.getItem("propertyType") === "Rentable" ? (
                  <div>
                    <small id="emailHelp" class="form-text text-muted">
                      Move-In Date
                    </small>
                    <div className="form-group">
                      <input
                        onChange={this.moveInDateChangeHandler}
                        type="date"
                        className="form-control"
                        required
                        name="moveInDate"
                        placeholder="Desired Move-in Date"
                      />
                    </div>
                    <select
                      onChange={this.leaseTermChangeHandler}
                      value={this.state.leaseTerm}
                      className="form-control"
                    >
                      <option> Lease Term </option>
                      <option value="6"> 6 Months</option>
                      <option value="7"> 7 Months</option>
                      <option value="8"> 8 Months</option>
                      <option value="9"> 9 Months</option>
                      <option value="10"> 10 Months</option>
                      <option value="11"> 11 Months </option>
                      <option value="12"> 12 Months </option>
                    </select>
                    <br />
                    <div className="form-group">
                      <input
                        onChange={this.mobileChangeHandler}
                        type="text"
                        className="form-control"
                        required
                        name="mobile"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.currentAddressChangeHandler}
                        type="text"
                        className="form-control"
                        required
                        name="currentAddress"
                        placeholder="Current Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.creditScoreChangeHandler}
                        type="number"
                        className="form-control"
                        required
                        name="creditScore"
                        placeholder="Credit Score"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.employerChangeHandler}
                        type="text"
                        className="form-control"
                        required
                        name="employer"
                        placeholder="Employer Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.employerAddressChangeHandler}
                        type="text"
                        className="form-control"
                        required
                        name="employerAddress"
                        placeholder="Employer Address"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.salaryChangeHandler}
                        type="text"
                        className="form-control"
                        required
                        name="salary"
                        placeholder="Salary"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={this.emergencyContactChangeHandler}
                        type="number"
                        className="form-control"
                        required
                        name="emergencyContact"
                        placeholder="Emergency Contact Number"
                      />
                    </div>

                    <br />
                  </div>
                ) : (
                  <div className="form-group">
                    <input
                      onChange={(e) =>
                        this.setState({ offerAmount: e.target.value })
                      }
                      type="number"
                      className="form-control"
                      required
                      name="offeramount"
                      placeholder="Enter offer amount"
                    />
                  </div>
                )}
                <div align="center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block mb-5  col-4"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//export register component
export default ApplicationForm;
