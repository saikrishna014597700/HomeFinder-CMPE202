import React, { Component } from 'react';
import {
    Container,
    Card
} from "react-bootstrap";
import { PROPERTYSELL, AVAILABLE } from "../constant/constants";

class NewProperty extends Component {
    state =
        {
            data:
            {
                sellerEmailId: localStorage.getItem("email"),
                propertyType: PROPERTYSELL,
                propertyStatus: AVAILABLE,
                parkingType: "Open",
                flooring: "Carpet",
                homeType: "Single Family Home",
                propertyName: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                zipcode: "",
                price: 0,
                area: 0,
                noOfBathrooms: 0,
                noOfBedrooms: 0,
                otherAmenities: "",
                yearBuilt: 1995

            }
        }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.propertyToEdit) {
            let data = { ...this.state.data, ...nextProps.propertyToEdit };
            if (data._id) delete data._id;
            if (data.__v) delete data.__v;
            this.setState({ data })
        }
    }
    render() {
        return (<div>
            <Card className={this.props.newPropertyModal + " modal"}>
                <div className="modal-content col-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            {this.props.isEdit ? <h4>Update Property</h4> : <h4>Add New Property</h4>}
                        </div>
                        <div
                            className="close"
                            onClick={() => {
                                this.setState({ data: { propertyType: PROPERTYSELL, propertyStatus: AVAILABLE } });
                                document.getElementById("new-form").reset();
                                this.props.closeNewPropertyHandle();
                            }}
                        >
                            &times;
                        </div>
                    </div>
                    <hr />
                    <Container>
                        <form id="new-form">
                            <div className="form-group">
                                <label style={{ fontWeight: "bold" }}>Property Name</label>
                                <input
                                    required
                                    name="propertyName"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.propertyName = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="Your property name"
                                    className="form-control"
                                    value={this.state.data.propertyName}
                                />
                                <label style={{ fontWeight: "bold" }}>Status</label>
                                <select
                                    name="propertyStatus"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.propertyStatus = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    className="form-control"
                                    value={this.state.data.propertyStatus}
                                >
                                    <option defaultValue value="Available">Available</option>
                                    <option value="Sold">Sold</option>
                                </select>
                                <label style={{ fontWeight: "bold" }}>Upload image</label>
                                <input
                                    type="file"
                                    name="propertyImage"
                                    id="propertyImage"
                                    accept="image/*"
                                    className="form-control"
                                    onChange={e => {
                                        const fd = new FormData();
                                        fd.append("id", localStorage.getItem("user_id"));
                                        fd.append("file", e.target.files[0]);
                                        this.setState({ propertyImage: fd });
                                    }}
                                />

                                <label style={{ fontWeight: "bold" }}>Address Line 1</label>
                                <input
                                    name="addressLine1"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.addressLine1 = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="Enter Street, Apt/Suit/Unit No."
                                    className="form-control"
                                    value={this.state.data.addressLine1}
                                />
                                <label style={{ fontWeight: "bold" }}>Address Line 2</label>
                                <input
                                    name="addressLine2"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.addressLine2 = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    className="form-control"
                                    value={this.state.data.addressLine2}
                                />
                                <label style={{ fontWeight: "bold" }}>City</label>
                                <input
                                    name="city"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.city = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="City"
                                    className="form-control"
                                    value={this.state.data.city}
                                />
                                <label style={{ fontWeight: "bold" }}>State</label>
                                <input
                                    name="state"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.state = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="State"
                                    className="form-control"
                                    value={this.state.data.state}
                                />
                                <label style={{ fontWeight: "bold" }}>ZipCode</label>
                                <input
                                    name="zipcode"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.zipcode = e.target.value
                                        this.setState({ data })
                                    }}
                                    required
                                    type="text"
                                    placeholder="ZipCode"
                                    className="form-control"
                                    value={this.state.data.zipcode}
                                />

                                <label style={{ fontWeight: "bold" }}>Price</label>
                                <input
                                    name="price"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.price = e.target.value
                                        this.setState({ data })
                                    }}
                                    required
                                    type="number"
                                    placeholder="price"
                                    className="form-control"
                                    value={this.state.data.price}
                                />
                                <label style={{ fontWeight: "bold" }}>Area</label>
                                <input
                                    name="area"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.area = e.target.value
                                        this.setState({ data })
                                    }}
                                    required
                                    type="number"
                                    placeholder="Area"
                                    className="form-control"
                                    value={this.state.data.area}
                                />
                                <label style={{ fontWeight: "bold" }}>No. of Bedrooms</label>
                                <input
                                    name="noOfBedrooms"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.noOfBedrooms = e.target.value
                                        this.setState({ data })
                                    }}
                                    required
                                    type="number"
                                    placeholder="No. Of Bedrooms"
                                    className="form-control"
                                    value={this.state.data.noOfBedrooms}
                                />
                                <label style={{ fontWeight: "bold" }}>No. of Bathrooms</label>
                                <input
                                    name="noOfBathrooms"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.noOfBathrooms = e.target.value
                                        this.setState({ data })
                                    }}
                                    required
                                    type="number"
                                    placeholder="No. Of Bathrooms"
                                    className="form-control"
                                    value={this.state.data.noOfBathrooms}
                                />
                                <label style={{ fontWeight: "bold" }}>Flooring</label>
                                <select
                                    name="flooring"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.flooring = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="Flooring"
                                    className="form-control"
                                    value={this.state.data.flooring}
                                >
                                    <option defaultValue value="Carpet">Carpet</option>
                                    <option value="Wooden Flooring">Wooden Flooring</option>
                                </select>

                                <label style={{ fontWeight: "bold" }}>Home Type</label>
                                <select
                                    name="homeType"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.homeType = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="Home Type"
                                    className="form-control"
                                    value={this.state.data.homeType}
                                >
                                    <option defaultValue value="Single Family Home">Single Family Home</option>
                                    <option value="Condominium/Apartment">
                                        Condominium/Apartment
                                    </option>
                                    <option value="Townhouse/Townhome">
                                        Townhouse/Townhome
                                    </option>
                                    <option value="Duplex">Duplex</option>
                                    <option value="Mobile/Manufactured Home">
                                        Mobile/Manufactured Home
                                    </option>
                                    <option value="Building Lot">Building Lot</option>
                                    <option value="Raw Land">Raw Land</option>
                                </select>
                                <label style={{ fontWeight: "bold" }}>Parking Type</label>
                                <select
                                    name="parkingType"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.parkingType = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="Parking Type"
                                    className="form-control"
                                    value={this.state.data.parkingType}
                                >
                                    <option defaultValue value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <label style={{ fontWeight: "bold" }}>Year Built</label>
                                <input
                                    name="yearBuilt"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.yearBuilt = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="number"
                                    placeholder="Year Built"
                                    className="form-control"
                                    value={this.state.data.yearBuilt}
                                />
                                <label style={{ fontWeight: "bold" }}>Other Amenities</label>
                                <input
                                    name="otherAmenities"
                                    onChange={e => {
                                        var data = { ...this.state.data };
                                        data.otherAmenities = e.target.value
                                        this.setState({ data })
                                    }}
                                    type="text"
                                    placeholder="Other Amenities"
                                    className="form-control"
                                    value={this.state.data.otherAmenities}
                                />
                                <div className="m-3" align="center">
                                    {this.props.isEdit ? (<button
                                        type="submit"
                                        onClick={e => {
                                            console.log(this.state.data)
                                            this.props.updateProperty(e, this.props.propertyToEdit._id, this.state.data);
                                            this.setState({ data: { propertyType: PROPERTYSELL, propertyStatus: AVAILABLE } });
                                            document.getElementById("new-form").reset();
                                            this.props.closeNewPropertyHandle();
                                        }}
                                    >Update</button>) : (<button
                                        type="submit"
                                        onClick={e => {

                                            this.props.addProperty(e, this.state.data, this.state.propertyImage);
                                            this.setState({ data: { propertyType: PROPERTYSELL, propertyStatus: AVAILABLE } });
                                            document.getElementById("new-form").reset();
                                            this.props.closeNewPropertyHandle();
                                        }}
                                    >Submit</button>)}
                                </div>
                            </div>
                        </form>
                    </Container>
                </div>
            </Card></div>
        );
    }
}

export default NewProperty;