import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import backend from "../webConfig";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import ApartmentIcon from "@material-ui/icons/Apartment";
import LayersIcon from "@material-ui/icons/Layers";
import RoomIcon from "@material-ui/icons/Room";
import PoolIcon from "@material-ui/icons/Pool";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import BathtubIcon from "@material-ui/icons/Bathtub";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import bckImage from "../images/logo.png";
import home from "../images/background.jpg";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import { APPROVEUSER, PROPERTYRENT } from "../constant/constants";
import { Row, Card, Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NewProperty from "./NewProperty";
import RentProperty from "./RentProperty";
import OpenHouse from "./OpenHouse";
import ViewApplicants from "./ViewApplicants";
import EmailIcon from "@material-ui/icons/Email";

class ViewProperty extends Component {
  state = {
    open: false,
    isEdit: false,
    newPropertyModal: "hideModal",
    rentPropertyModal: "hideModal",
    openHouseModal: "hideModal",
    viewApplicantsModal: "hideModal",
    applicants: []
  };

  async componentWillMount() {
    console.log(localStorage.getItem("propertId"));
    const property = await axios.get(
      `${backend}/manageProperty/sell/property/${localStorage.getItem(
        "propertId"
      )}`
    );
    console.log(property);
    this.setState({ property: property.data.payload.property });
    this.setState({ approvedStatus: localStorage.getItem("approvedStatus") });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  addNewPropertyHandle = () => {
    this.setState({ isEdit: false, newPropertyModal: "showModal" });
  };
  addRentPropertyHandle = () => {
    this.setState({ isEdit: false, rentPropertyModal: "showModal" });
  };
  openHouseHandle = () => {
    this.setState({ openHouseModal: "showModal" });
  };
  viewApplicantsHandle = () => {
    this.setState({ viewApplicantsModal: "showModal" });
  };
  closeNewPropertyHandle = () => {
    this.setState({ newPropertyModal: "hideModal" });
  };
  closeRentPropertyHandle = () => {
    this.setState({ rentPropertyModal: "hideModal" });
  };
  closeOpenHouseHandle = () => {
    this.setState({ openHouseModal: "hideModal" });
  };
  closeViewApplicantsHandle = () => {
    this.setState({ viewApplicantsModal: "hideModal" });
  };
  addProperty = async (e, data, propertyImage) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // let propertyId = null;
    if (propertyImage != null) {
      await axios
        .post(`${backend}/manageProperty/propertyImage`, propertyImage, config)
        .then((res) => {
          if (res.status === 200) {
            this.setState({ propertyId: res.data.payload.propertyId });
          }
        });
    }

    let sellerId = localStorage.getItem("user_id");
    data = { ...data, sellerId };
    await axios
      .post(`${backend}/manageProperty/property/${this.state.propertyId}`, data)
      .then((res) => {
        if (res.data.status === 200) {
          this.setState({
            properties: res.data.payload.properties,
            propertyCount: res.data.payload.properties.length,
          });
        }
      });
  };

  updateProperty = async (e, propertyId, data) => {
    e.preventDefault();
    await axios
      .put(`${backend}/manageProperty/property/${propertyId}`, data)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            properties: res.data.payload.properties,
            property: res.data.payload.property,
          });
        }
      });
  };
  deleteProperty = async (e, propertyId) => {
    e.preventDefault();
    let sellerId = localStorage.getItem("user_id");
    await axios
      .delete(`${backend}/manageProperty/property/${sellerId}/${propertyId}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            properties: res.data.payload.properties,
            propertyCount: res.data.payload.properties.length,
          });
        }
      });
  };
  getApplicants = async () => {
    let propertyId = localStorage.getItem("propertId");
    await axios
      .get(`${backend}/applicants/${propertyId}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ applicants: res.data.payload.applicants });
        }
      });
  };
  rejectApplicant = async (applicantId) => {
    let propertyId = this.state.propertyToEdit._id;
    await axios
      .put(
        `${backend}/applicants/reject/${applicantId}`
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({ applicants: res.data.payload.applicants });
        }
      });
  };
  approveApplicant = async (applicantId) => {
    let propertyId = this.state.property._id;
    let sellerId = localStorage.getItem("user_id");
    await axios
      .put(
        `${backend}/applicants/accept/${applicantId}`
      )
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            properties: res.data.payload.properties,
            applicants: res.data.payload.applicants,
            propertyToEdit: res.data.payload.propertyToEdit
          });
        }
      });
    // this.closeViewApplicantsHandle();
  };
  render() {
    if (this.state.property != null) {
      var { property } = this.state;
      console.log("here", property.area);
    }

    return (
      <div>
        {" "}
        {this.state.property ? (
          <div>
            <Navbar></Navbar>

            <div className="container">
              <div className="d-flex">
                <div>
                  <div class="card d-flex mt-3 p-3">
                    <div>
                      {/* <img class="card-img-top" src={this.state.property.imageUrl} alt="Card image cap" /> */}
                      <img
                        class="card-img-top"
                        src={property.imageUrl ? property.imageUrl : backend + "/default.png"}
                        // src={backend + "/default.png"}
                        alt="Card image cap"
                      />
                    </div>

                    <div className="card-body">
                      {this.state.property.propertyType === "Sellable" ? (
                        <div>
                          <h3>
                            {this.state.property.homeType} For <i>Sale!</i>
                          </h3>
                        </div>
                      ) : (
                        <div>
                          <h3>
                            {this.state.property.homeType} For <i>Rent!</i>
                          </h3>
                        </div>
                      )}
                      <div className="pb-3">
                        <h2>{this.state.property.propertyName}</h2>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h4>
                            {" "}
                            <HomeIcon />
                            <span className="mt-4">Address:</span>
                            <h4 style={{ color: "rgb(0,0,0,0.4)" }}>
                              {" "}
                              {this.state.property.addressLine1},{" "}
                              {this.state.property.city},{" "}
                              {this.state.property.state},{" "}
                              {this.state.property.zipcode}{" "}
                            </h4>
                          </h4>
                        </div>
                        <div>
                          <h4>
                            {" "}
                            <HomeIcon />
                            Price:
                            <h4
                              classname="mt-2"
                              style={{ color: "rgb(0,0,0,0.4)" }}
                            >
                              ${this.state.property.price}{" "}
                            </h4>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card col-4 mt-3 p-3">
                  <div align="center">
                    <h4 style={{ color: "rgb(0,0,0,0.4)" }}>
                      <span className="mt-1 mr-2">
                        <ApartmentIcon />
                      </span>
                      Property Details
                    </h4>
                  </div>
                  <div className="mt-4">
                    <h6 className="ml-2">
                      <ApartmentIcon />
                      <span className="ml-2">
                        {" "}
                        {this.state.property.addressLine1},{" "}
                        {this.state.property.addressLine2}
                      </span>
                    </h6>
                    <h6 className="ml-2 mt-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 18 18"
                      >
                        <path d="M12 8V3.5L9.5 1 7 3.5V5H2v11h15V8h-5zm-7 6H4v-1h1v1zm0-3H4v-1h1v1zm0-3H4V7h1v1zm5 6H9v-1h1v1zm0-3H9v-1h1v1zm0-3H9V7h1v1zm0-3H9V4h1v1zm5 9h-1v-1h1v1zm0-3h-1v-1h1v1z" />
                      </svg>
                      <span className="ml-3">
                        {this.state.property.city}, {this.state.property.state},{" "}
                        {this.state.property.zipcode}
                      </span>
                    </h6>
                    <h6 className="ml-2 mt-3">
                      <MeetingRoomIcon />
                      <span className="ml-2">
                        {" "}
                        {this.state.property.noOfBedrooms} Bedrooms
                      </span>
                    </h6>
                    <h6 className="ml-2 mt-3">
                      <BathtubIcon />
                      <span className="ml-2">
                        {" "}
                        {this.state.property.noOfBathrooms} Bathrooms
                      </span>
                    </h6>
                    <h6 className="ml-2 mt-3">
                      <FitnessCenterIcon />
                      <span className="ml-2">
                        Amenities: {this.state.property.otherAmenities}
                      </span>
                    </h6>
                    {/* <h6 className="ml-2 mt-3">
                  <PoolIcon />
                  <span className="ml-2"> Pool and Spa Available</span>
                </h6> */}
                    <h6 className="ml-2 mt-3">
                      <HomeIcon />
                      <span className="ml-2" style={{ marginLeft: "30px" }}>
                        Year Built: {this.state.property.yearBuilt}
                      </span>
                    </h6>
                    <h6 className="ml-2 mt-3">
                      <LocalParkingIcon />
                      <span className="ml-2">
                        Parking: {this.state.property.parkingType}
                      </span>
                    </h6>
                    <h6 className="ml-2 mt-3">
                      <CheckBoxOutlineBlankIcon />
                      <span className="ml-2">
                        Area: {this.state.property.area} (Sq. ft)
                      </span>
                    </h6>
                    {this.state.property.propertyType === "Rentable" ? (
                      <span>
                        <h6 className="ml-2 mt-3">
                          <ApartmentIcon />
                          <span className="ml-2">
                            Lease Term: {this.state.property.leaseTerm}
                          </span>
                        </h6>

                        <h6 className="ml-2 mt-3">
                          <ApartmentIcon />
                          <span className="ml-2">
                            Lease Dates:{" "}
                            <span style={{ fontSize: "14px" }}>
                              {this.state.property.leaseStartDate} To{" "}
                              {this.state.property.leaseEndDate}
                            </span>
                          </span>
                        </h6>
                        <h6 className="ml-2 mt-3">
                          <EmailIcon />
                          <span className="ml-2">
                            Seller Email:{" "}
                            {localStorage.getItem("sellerEmailId")}
                          </span>
                        </h6>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div></div>
              </div>
              {/* if (localStorage.getItem("user_id") && localStorage.getItem("role") === "Renter" && propertyDetail.propertyType === "Rentable") { */}
              {this.state.approvedStatus == APPROVEUSER &&
              localStorage.getItem("user_id") !== property.sellerId &&
              localStorage.getItem("user_id") &&
              localStorage.getItem("role") === "Renter" &&
              this.state.property.propertyType === "Rentable" ? (
                <div className="d-flex mt-5 p-3 justify-content-center">
                  <button
                    className="btn btn-primary mx-3"
                    onClick={this.handleClickOpen}
                  >
                    Register for Open House
                  </button>
                  <Link to="/renter/applicationform">
                    <button className="btn btn-success mx-3">
                      Application for Lease
                    </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
              {this.state.approvedStatus == APPROVEUSER &&
              localStorage.getItem("user_id") !== property.sellerId &&
              localStorage.getItem("user_id") &&
              (localStorage.getItem("role") === "Buyer" ||
                localStorage.getItem("role") === "Realtor") &&
              this.state.property.propertyType === "Sellable" ? (
                <div className="d-flex mt-5 p-3 justify-content-center">
                  <button
                    className="btn btn-primary mx-3"
                    onClick={this.handleClickOpen}
                  >
                    Register for Open House
                  </button>
                  <Link to="/renter/applicationform">
                    <button className="btn btn-success mx-3">Buy Now</button>
                  </Link>
                </div>
              ) : (
                ""
              )}
              {this.state.approvedStatus == APPROVEUSER &&
              localStorage.getItem("user_id") &&
              localStorage.getItem("user_id") === property.sellerId &&
              (localStorage.getItem("role") === "Seller" ||
                localStorage.getItem("role") === "Landlord" ||
                localStorage.getItem("role") === "Realtor") ? (
                <div className="d-flex mt-3 justify-content-center">
                  <div>
                    {property.propertyType === PROPERTYRENT ? (
                      <Button
                        className="btn btn-success m-1"
                        size="sm"
                        onClick={() => {
                          this.setState({
                            isEdit: true,
                            rentPropertyModal: "showModal",
                            propertyToEdit: property,
                          });
                        }}
                      >
                        Edit Property Details
                      </Button>
                    ) : (
                      <Button
                        className="btn btn-success m-1"
                        size="sm"
                        onClick={() => {
                          this.setState({
                            isEdit: true,
                            newPropertyModal: "showModal",
                            propertyToEdit: property,
                          });
                        }}
                      >
                        Edit Property Details
                      </Button>
                    )}
                  </div>
                  <div>
                    <Button
                      className="btn btn-success m-1"
                      size="sm"
                      onClick={() => {
                        this.setState({
                          openHouseModal: "showModal",
                          propertyToEdit: property,
                        });
                      }}
                    >
                      Schedule Open House
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="btn btn-success m-1"
                      size="sm"
                      onClick={() => {
                        this.setState({
                          viewApplicantsModal: "showModal",
                          propertyToEdit: property,
                        });
                      }}
                    >
                      View Applications
                    </Button>
                  </div>
                  {/* <div>
                      <Button
                        className="btn btn-danger m-1"
                        size="sm"
                        onClick={(e) => this.deleteProperty(e, property._id)}
                      >
                        Remove Property
                    </Button>
                    </div> */}
                </div>
              ) : (
                ""
              )}
            </div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Want to schedule an open house?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.property.openHouseDateTime
                    ? "Open House is scheduled for Date" +
                      this.state.property.openHouseDateTime.split("T")[0] +
                      " Time " +
                      this.state.property.openHouseDateTime.split("T")[1]
                    : ""}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  To get your spot reserved. Call at 921-234-8765
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
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
            <OpenHouse
              openHouseModal={this.state.openHouseModal}
              propertyToEdit={this.state.propertyToEdit}
              closeOpenHouseHandle={this.closeOpenHouseHandle}
              updateProperty={this.updateProperty}
            />
            <ViewApplicants
              viewApplicantsModal={this.state.viewApplicantsModal}
              propertyToEdit={this.state.propertyToEdit || {}}
              getApplicants={this.getApplicants}
              applicants={this.state.applicants || []}
              approveApplicant={this.approveApplicant}
              rejectApplicant={this.rejectApplicant}
              closeViewApplicantsHandle={this.closeViewApplicantsHandle}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ViewProperty;
