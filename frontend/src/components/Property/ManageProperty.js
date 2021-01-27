import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import backend from "../webConfig";
import "../../App.css";
import NewProperty from "./NewProperty";
import RentProperty from "./RentProperty";
// import OpenHouse from "./OpenHouse";
// import ViewApplicants from "./ViewApplicants";
import { SOLD, PROPERTYRENT, AVAILABLE } from "../constant/constants";
import Navbar from "../Navbar/navbar";
import { Redirect } from "react-router";

import {
  Row,
  Card,
  Button
} from "react-bootstrap";

class Rentout extends Component {
  state = {
    newPropertyModal: "hideModal",
    rentPropertyModal: "hideModal",
    openHouseModal: "hideModal",
    viewApplicantsModal: "hideModal",
    properties: [],
    propertyCount: 0,
    role: "",
    propertyId: null,
    isEdit: false,
    propertyToEdit: {},
    applicants: []
  };

  componentWillMount() {
    let sellerId = localStorage.getItem("user_id");
    let propertyCount = 0;
    let properties = [];
    let role = localStorage.getItem('role');
    axios
      .get(`${backend}/manageProperty/property/${sellerId}`)
      .then(res => {
        properties = res.data.payload.properties;
        propertyCount = properties.length;
        this.setState({ role, propertyCount, properties });

      })
    // console.log("componentDidMount", role, propertyCount);

  }
  addNewPropertyHandle = () => {
    this.setState({ isEdit: false, newPropertyModal: "showModal" });
  }
  addRentPropertyHandle = () => {
    this.setState({ isEdit: false, rentPropertyModal: "showModal" });
  }
  openHouseHandle = () => {
    this.setState({ openHouseModal: "showModal" });
  }
  viewApplicantsHandle = () => {
    this.setState({ viewApplicantsModal: "showModal" })
  }
  closeNewPropertyHandle = () => {
    this.setState({ newPropertyModal: "hideModal" });
  }
  closeRentPropertyHandle = () => {
    this.setState({ rentPropertyModal: "hideModal" });
  }
  closeOpenHouseHandle = () => {
    this.setState({ openHouseModal: "hideModal" });
  }
  closeViewApplicantsHandle = () => {
    this.setState({ viewApplicantsModal: "hideModal" });
  }
  addProperty = async (e, data, propertyImage) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // let propertyId = null;
    if (propertyImage != null) {
      await axios
        .post(`${backend}/manageProperty/propertyImage`, propertyImage, config)
        .then(res => {
          if (res.status === 200) {
            this.setState({ propertyId: res.data.payload.propertyId });
          }
        })
    }

    let sellerId = localStorage.getItem("user_id");
    data = { ...data, sellerId }
    await axios
      .post(`${backend}/manageProperty/property/${this.state.propertyId}`, data)
      .then(res => {
        if (res.data.status === 200) {
          this.setState({ properties: res.data.payload.properties, propertyCount: res.data.payload.properties.length })
        }
      })
  }

  updateProperty = async (e, propertyId, data) => {
    e.preventDefault();
    await axios
      .put(`${backend}/manageProperty/property/${propertyId}`, data)
      .then(res => {
        if (res.status === 200) {
          this.setState({ properties: res.data.payload.properties });
        }
      })
  }
  deleteProperty = async (e, propertyId) => {
    e.preventDefault();
    let sellerId = localStorage.getItem("user_id");
    await axios
      .delete(`${backend}/manageProperty/property/${sellerId}/${propertyId}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ properties: res.data.payload.properties, propertyCount: res.data.payload.properties.length });
        }
      })
  }
  getApplicants = async () => {
    let propertyId = this.state.propertyToEdit._id;
    await axios
      .get(`${backend}/manageProperty/applicants/${propertyId}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ applicants: res.data.payload.applicants });
        }
      })
  }
  rejectApplicant = async (applicantId) => {
    let propertyId = this.state.propertyToEdit._id;
    await axios
      .delete(`${backend}/manageProperty/applicants/${propertyId}/${applicantId}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ applicants: res.data.payload.applicants });
        }
      })
  }
  approveApplicant = async (applicantId) => {
    let propertyId = this.state.propertyToEdit._id;
    let sellerId = localStorage.getItem("user_id");
    await axios
      .put(`${backend}/manageProperty/applicants/${sellerId}/a${propertyId}/${applicantId}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ properties: res.data.payload.applicants, applicants: res.data.payload.applicants });
        }
      })
    this.closeViewApplicantsHandle();
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    console.log("in redirecting");
    if (this.state.redirect) {
      localStorage.setItem("propertId", this.state.propertyId);
      return <Redirect to={`/property/${this.state.propertyId}}`} />;
    }
  };

  render() {
    let newPropertyButton = null;
    let rentPropertyButton = null;
    let role = this.state.role;
    let propertyCount = this.state.propertyCount;
    console.log(role, propertyCount)
    if ((role === "Seller" && propertyCount === 0) || (role === "Realtor")) {
      newPropertyButton = (
        <button className="btn btn-outline-success mx-5 mt-3" onClick={this.addNewPropertyHandle}>
          <AddIcon />Add new property
        </button>
      );
    }
    if ((role === "Landlord") || (role === "Realtor")) {
      if (role === "Realtor") {
        rentPropertyButton = (
          <span>
            <span>
              <hr width="1" className="nav-hr"></hr>
            </span>
            <button className="btn btn-outline-success mx-5 mt-3" onClick={this.addRentPropertyHandle}>
              <AddIcon />Add new rent place
            </button>
          </span>
        );
      } else {
        rentPropertyButton = (
          <button className="btn btn-outline-success mx-5 mt-3" onClick={this.addRentPropertyHandle}>
            <AddIcon />Add new rent place
          </button>
        );
      }

    }
    return (
      <div>
        <Navbar></Navbar>
        {this.renderRedirect()}
        <h4 align="center" className="mt-5">Your listed properties</h4>
        <div className="container secondary-nav-approve">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="btn" id="navbarTogglerDemo01">
              <ul className="navbar-nav mr-auto">
                {newPropertyButton}
                {rentPropertyButton}
              </ul>
            </div>
          </nav>

          {this.state.properties.map(property => (
            <Card key={property._id}
              className="property-card-style mb-2"

            >
              <Row>
                <div className="col-3">
                  <img
                    alt=""
                    height="auto"
                    width="150px"
                    variant="top"
                    src={!property.imageUrl ? backend + '/default.png' : property.imageUrl}
                    // src={backend + "/default.png"}
                    style={{ width: "150px" }}
                  />
                </div>
                <div className="col-7">
                  <h4>{property.propertyName}</h4>
                  <div className="propertyDetails">
                    <div>
                      {property.addressLine1 ? property.addressLine1 : ""}
                      {property.addressLine2 ? ", " + property.addressLine1 : ""}
                      {property.city ? ", " + property.city : ""}
                      {property.state ? ", " + property.state : ""}
                      {property.zipcode ? "-" + property.zipcode : ""}
                    </div>
                    <div>
                      {"$" + property.price + " | " + property.area + " sq. ft. | " + property.noOfBedrooms + " Bedrooms | " + property.noOfBathrooms + " Bathrooms"}


                    </div>
                    <div>
                      {property.flooring + " flooring | " + property.homeType + " | " + property.parkingType + " parking | Built in " + property.yearBuilt}
                    </div>
                    <div>
                      {property.otherAmenities + " | " + property.propertyType}
                    </div>
                    {property.propertyType === PROPERTYRENT ? (
                      <div>
                        {"Lease Term: " + property.leaseTerm + " from " + property.leaseStartDate + " to " + property.leaseEndDate}
                        <div>{"Security Deposit: $" + property.securityDeposit}</div>
                      </div>
                    ) : ""}

                  </div>
                  <div className="mt-2 d-flex justify-content-between">
                    <div>{property.openHouseDateTime ? "Open House: " + property.openHouseDateTime.split("T")[0] + " " + property.openHouseDateTime.split("T")[1] + " PST" : ""}</div>

                  </div>
                </div>

                <div className="col-2">
                  {property.propertyStatus === SOLD ? <div style={{ color: "red", fontWeight: "bold" }}>Sold</div> : <div style={{ color: "green", fontWeight: "bold" }}>Available</div>}
                  {/* <div>
                    {property.propertyType === PROPERTYRENT ? (<Button
                      className="btn btn-success mt-3"
                      size="sm"
                      onClick={() => {
                        this.setState({ isEdit: true, rentPropertyModal: "showModal", propertyToEdit: property })
                      }}
                    >
                      Edit Property Details
                    </Button>) : (<Button
                      className="btn btn-success mt-3"
                      size="sm"
                      onClick={() => {
                        this.setState({ isEdit: true, newPropertyModal: "showModal", propertyToEdit: property })
                      }}
                    >
                      Edit Property Details
                    </Button>)}

                  </div>
                  <div>
                    <Button
                      className="btn btn-success mt-2"
                      size="sm"
                      onClick={() => {
                        this.setState({ openHouseModal: "showModal", propertyToEdit: property })
                      }}
                    >Schedule Open House</Button>
                  </div>*/}
                  {property && property.propertyStatus === AVAILABLE ? (
                    <div>
                      <div>
                        <Button
                          className="btn btn-success mt-2"
                          size="sm"
                          onClick={() => {
                            this.setRedirect();
                            this.setState({ propertyId: property._id });
                          }}
                        >
                          View this Property
                        </Button>
                      </div>
                      <div>
                        <Button
                          className="btn btn-danger mt-2"
                          size="sm"
                          onClick={(e) => this.deleteProperty(e, property._id)}
                        >
                          Remove Property
                        </Button>
                      </div>
                    </div>
                  ) : ""}


                </div>
              </Row>
            </Card>

          ))}
        </div>

        <NewProperty
          isEdit={this.state.isEdit}
          propertyToEdit={this.state.propertyToEdit}
          newPropertyModal={this.state.newPropertyModal}
          addProperty={this.addProperty}
          updateProperty={this.updateProperty}
          closeNewPropertyHandle={this.closeNewPropertyHandle}
        />
        <RentProperty
          isEdit={this.state.isEdit}
          rentPropertyModal={this.state.rentPropertyModal}
          propertyToEdit={this.state.propertyToEdit}
          addProperty={this.addProperty}
          updateProperty={this.updateProperty}
          closeRentPropertyHandle={this.closeRentPropertyHandle}
        />
        {/* <OpenHouse
          openHouseModal={this.state.openHouseModal}
          propertyToEdit={this.state.propertyToEdit}
          closeOpenHouseHandle={this.closeOpenHouseHandle}
          updateProperty={this.updateProperty}
        />
        <ViewApplicants
          viewApplicantsModal={this.state.viewApplicantsModal}
          propertyToEdit={this.state.propertyToEdit}
          getApplicants={this.getApplicants}
          applicants={this.state.applicants}
          approveApplicant={this.state.approveApplicant}
          rejectApplicant={this.state.rejectApplicant}
          closeViewApplicantsHandle={this.closeViewApplicantsHandle}
        /> */}
      </div>
    );
  }
}

export default Rentout;
