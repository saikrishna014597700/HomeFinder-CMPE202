import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import "./propertySearch.css";
import bckImage from "../images/logo.png";
import home from "../images/background.jpg";
import axios from "axios";
import backend from "../webConfig";
import Navbar from "../Navbar/navbar";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      propertySearch: [],
      properties: [],
      addressInput: "0",
      maxPrice: "0",
      minPrice: "0",
      beds: "0",
      baths: "0",
      flooringType: "0",
      parkingType: "0",
      yearBuilt: "0",
      area: "0",
      searchSaveName: "0",
      saveSearchText: "",
      savedSearches: [],
      savedSearchType: "",
      redirect: "false",
      homeType: "",
      propertyType: "",
      favProperties: [],
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.saveSearchHandler = this.saveSearchHandler.bind(this);
    this.state = { property: null };
    this.props = this.initialState;
    this.myDivToFocus = React.createRef();
  }

  handleOnClick = (event) => {
    if (this.myDivToFocus.current) {
      this.myDivToFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  async componentWillMount() {
    // event.preventDefault();
    const data = {
      userId: localStorage.getItem("user_id"),
    };
    await axios
      .post(`${backend}/search/getsaveSearch`, data)
      .then((response) => {
        this.setState({
          savedSearches: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          message: error,
        });
      });
  }

  async handlefavPropChange(e, name) {
    if (e.target.value === "Favourites") {
      var userId = localStorage.getItem("user_id");
      if (userId) {
        await axios
          .get(`${backend}/search/favouriteProperties/` + userId)
          .then((response) => {
            this.setState({
              favProperties: response.data,
            });
            this.setState({
              properties: this.state.favProperties,
            });
            this.handleOnClick();
          })
          .catch((error) => {
            this.setState({
              message: error,
            });
          });
      }
    } else if (e.target.value === "All Properties") {
      this.searchHandler(e);
    }
  }

  async getFavProp() {
    var userId = localStorage.getItem("user_id");
    if (userId) {
      await axios
        .get(`${backend}/search/favouriteProperties/` + userId)
        .then((response) => {
          this.setState({
            favProperties: response.data,
          });
        })
        .catch((error) => {
          this.setState({
            message: error,
          });
        });
    }
  }

  async handleSearchDropdownChange(event) {
    event.preventDefault();
    let id = event.target.value;
    let data = {};
    this.state.savedSearches.map((search) => {
      if (search._id === id) {
        data = {
          addressInput: search.addressInput,
          maxPrice: search.maxPrice,
          minPrice: search.minPrice,
          beds: search.noOfBathrooms,
          baths: search.noOfBedrooms,
          homeType: search.homeType,
          flooringType: search.flooring,
          parkingType: search.parkingType,
          yearBuilt: search.yearBuilt,
          area: search.area,
          propertyType: search.propertyType,
        };
      }
    });
    await axios
      .post(`${backend}/search/home`, data)
      .then((response) => {
        this.setState({
          properties: response.data,
        });
        this.handleOnClick();
      })
      .catch((error) => {
        this.setState({
          message: error.response.data,
        });
        alert("Error fetching results..");
      });
  }

  async searchHandler(event) {
    event.preventDefault();
    const data = {
      addressInput: this.state.addressInput,
      maxPrice: this.state.maxPrice,
      minPrice: this.state.minPrice,
      beds: this.state.beds,
      baths: this.state.baths,
      homeType: this.state.homeType,
      flooringType: this.state.flooringType,
      parkingType: this.state.parkingType,
      yearBuilt: this.state.yearBuilt,
      area: this.state.area,
      propertyType: this.state.propertyType,
      otherAmenities: this.state.otherAmenities,
    };
    await axios
      .post(`${backend}/search/home`, data)
      .then((response) => {
        this.setState({
          properties: response.data,
        });
        this.handleOnClick();
        // alert("successfully fetched results..");
      })
      .catch((error) => {
        this.setState({
          message: error.response.data,
        });
        alert("Failed to fetch results..");
      });
  }

  async addFavourite(event, id) {
    event.preventDefault();
    const data = {
      user: localStorage.getItem("user_id"),
      _id: id,
    };
    await axios
      .post(`${backend}/search/favourite`, data)
      .then((response) => {
        this.getFavProp();
        alert("successfully saved as a favourite..");
      })
      .catch((error) => {
        this.setState({
          message: error.response.data,
        });
        alert("Failed to save..");
      });
  }

  async saveSearchHandler(event) {
    event.preventDefault();
    if (!this.state.saveSearchText) {
      alert(`Give a name to the search`);
    } else {
      const data = {
        userId: localStorage.getItem("user_id"),
        saveSearchText: this.state.saveSearchText,
        addressInput: this.state.addressInput,
        maxPrice: this.state.maxPrice,
        minPrice: this.state.minPrice,
        beds: this.state.beds,
        baths: this.state.baths,
        homeType: this.state.homeType,
        flooringType: this.state.flooringType,
        parkingType: this.state.parkingType,
        yearBuilt: this.state.yearBuilt,
        area: this.state.area,
        propertyType: this.state.propertyType,
      };
      await axios
        .post(`${backend}/search/saveSearch`, data)
        .then(async (response) => {
          const data = {
            userId: localStorage.getItem("user_id"),
          };
          await axios
            .post(`${backend}/search/getsaveSearch`, data)
            .then((response) => {
              this.setState({
                savedSearches: response.data,
              });
              alert("successfully Saved");
            })
            .catch((error) => {
              this.setState({
                message: error,
              });
              alert("Error Saving..");
            });
        })
        .catch((error) => {
          alert("Error Saving..");
        });
    }
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      localStorage.setItem("propertId", this.state.propertyId);
      localStorage.setItem("propertyName", this.state.propertyName);
      localStorage.setItem("propertyType", this.state.propertyType);
      localStorage.setItem("sellerEmailId", this.state.sellerEmailId);

      return <Redirect to={`/property/${this.state.propertyId}}`} />;
    }
  };

  render() {
    let propertyDetails;
    if (this.state.properties) {
      propertyDetails = this.state.properties.map((propertyDetail) => {
        var realtorShow = true;
        if (localStorage.getItem("role") === "Realtor") {
          if (propertyDetail.sellerId === localStorage.getItem("user_id")) {
            realtorShow = false;
          }
        }
        if (propertyDetail.propertyStatus === "Available" && realtorShow) {
          var Favbutton;
          if (localStorage.getItem("user_id")) {
            Favbutton = (
              <div class="col-auto">
                <span
                  onClick={(e) => this.addFavourite(e, propertyDetail._id)}
                  class="btn btn-sm btn-primary"
                >
                  Favourite
                </span>
              </div>
            );
          }

          return (
            <div class="col-sm-4 o" style={{ marginTop: "20px" }}>
              {/* <div class="card-columns"> */}
              <div
                class="card"
                style={{
                  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
                  width: "450px",
                }}
              >
                <img
                  class="card-img-top"
                  style={{ width: "450px", height: "300px" }}
                  src={
                    !propertyDetail.imageUrl
                      ? backend + "/default.png"
                      : propertyDetail.imageUrl
                  }
                  // src={backend + "/default.png"}
                  alt="Card image cap"
                ></img>
                <div class="card-body">
                  <h5 class="text-primary mb-0">
                    {propertyDetail.propertyName}
                  </h5>

                  <h6 style={{ marginTop: "10px" }} class="card-text">
                    Address: {propertyDetail.addressLine1}{" "}
                    {propertyDetail.addressLine2}
                  </h6>
                  <h6 class="card-text">
                    {propertyDetail.city} {propertyDetail.state}{" "}
                    {propertyDetail.zipcode}
                  </h6>
                  <h6 class="card-text">
                    Price : {propertyDetail.price} {" |   "}Area :{" "}
                    {propertyDetail.area}
                    {" | "}
                    Year Built : {propertyDetail.yearBuilt}
                  </h6>
                  <h6>
                    {" "}
                    {propertyDetail.noOfBedrooms} bed{" | "}
                    {propertyDetail.noOfBathrooms} bath
                  </h6>
                  <h6> Property Type : {propertyDetail.propertyType} </h6>
                  <span class="icon-wrapper">
                    <i class="icon-heart text-accent h3 m-0 p-0"></i>
                  </span>
                  <footer
                    style={{ float: "right" }}
                    class="row align-items-end no-gutters small text-muted"
                  >
                    <div class="col-auto">
                      <span
                        // onClick={(e) => this.addFavourite(e, propertyDetail._id)}
                        class="btn btn-sm btn-primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                          this.setRedirect();
                          this.setState({
                            propertyId: propertyDetail._id,
                            propertyName: propertyDetail.propertyName,
                            propertyType: propertyDetail.propertyType,
                            sellerEmailId: propertyDetail.sellerEmailId,
                          });
                        }}
                      >
                        View Details
                      </span>
                    </div>
                    {Favbutton}
                  </footer>
                </div>{" "}
              </div>
            </div>
            // </div>
          );
        }
      });
    }

    let dropDown;
    if (this.state.savedSearches) {
      dropDown = this.state.savedSearches.map((e, saveSearchh) => {
        return (
          <option key={e._id} value={e._id}>
            {e.searchName}
          </option>
        );
      });
    }

    let savedSearchesSelect;
    if (localStorage.getItem("user_id")) {
      savedSearchesSelect = (
        <select
          name="savedSearchType"
          onChange={(e) => this.handleSearchDropdownChange(e)}
          class="custom-select custom-select-sm"
          id="__BVID__36"
        >
          <option key="Saved Searches" value="Saved Searches">
            Saved Searches
          </option>
          {dropDown}
        </select>
      );
    } else {
      savedSearchesSelect = (
        <select
          name="savedSearchType"
          class="custom-select custom-select-sm"
          id="__BVID__36"
        >
          <option key="Saved Searches" value="Saved Searches">
            Login to check Saved searches
          </option>
        </select>
      );
    }

    let SaveSearchText;
    if (localStorage.getItem("user_id")) {
      SaveSearchText = (
        <div class="input-group" data-v-0bf4be34="">
          <input
            onChange={(e) => this.handleChange(e, "saveSearchText")}
            type="saveSearchText"
            name="saveSearch"
            placeholder="Give a name to save the search"
            class="form-control form-control-lg"
          ></input>
          <div class="input-group-btn" data-v-0bf4be34="">
            <button
              onClick={(e) => this.saveSearchHandler(e)}
              aria-label="HomeFinder Search"
              class="btn btn-primary btn-lg"
              data-v-0bf4be34=""
            >
              <i
                class="icon d-inline d-md-none icon-search"
                data-v-0bf4be34=""
              ></i>{" "}
              <span class="label d-none d-md-inline" data-v-0bf4be34="">
                save{" "}
              </span>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div style={{ backgroundColor: "#007bff" }}>
        <header>
          <Navbar />
        </header>
        <div className="background">
          {this.renderRedirect()}
          <section class="search-hero dusk">
            <div class="search">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <header
                class="container"
                style={{
                  opacity: "0.8",
                  marginLeft: "25%",
                  width: "50%",
                  marginTop: "4%",
                }}
              >
                <h1 class="search-title mb-3 mb-md-0">
                  <img
                    style={{ marginLeft: "18%" }}
                    src={bckImage}
                    class="logo-door d-none d-md-inline"
                  ></img>{" "}
                  <span
                    class="d-inline-block"
                    style={{
                      minWidth: "288px;",
                      marginLeft: "10%",
                      fontSize: "32px",
                    }}
                  >
                    Find Your New Home!
                  </span>{" "}
                  <span class="semi-border d-none d-md-inline-block"></span>
                </h1>
                <br></br>

                <br></br>
                <div class="container text-center p-0">
                  <div class="full-sear   ch">
                    <div class="search-box" data-v-0bf4be34="">
                      <form>
                        <div>
                          <div class="row">
                            <div class="col-sm-6">
                              <div class="form-group  d-none d-md-block field-select">
                                <select
                                  onChange={(e) =>
                                    this.handleChange(e, "propertyType")
                                  }
                                  name="propertyType"
                                  class="custom-select custom-select-sm"
                                  id="__BVID__20"
                                >
                                  <option value="">All</option>
                                  <option value="rentable">Rental</option>
                                  <option value="sellable">For Sale</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div class="form-group  d-none d-md-block field-select">
                                <select
                                  onChange={(e) =>
                                    this.handlefavPropChange(
                                      e,
                                      "favouriteProperyList"
                                    )
                                  }
                                  name="favouriteProperyList"
                                  class="custom-select custom-select-sm"
                                  id="__BVID__20"
                                >
                                  <option value="All Properties">
                                    All Properties
                                  </option>
                                  <option value="Favourites">Favourites</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <br></br>
                          <div class="form-row" data-v-0bf4be34="">
                            <div
                              class="form-group col-12 field-search-term"
                              data-v-0bf4be34=""
                            >
                              <div class="input-group" data-v-0bf4be34="">
                                <div
                                  class="input-group-prepend d-none d-md-flex"
                                  data-v-0bf4be34=""
                                >
                                  <span
                                    class="input-group-text icon-search"
                                    data-v-0bf4be34=""
                                  ></span>
                                </div>
                                <input
                                  onChange={(e) =>
                                    this.handleChange(e, "addressInput")
                                  }
                                  type="addressInput"
                                  name="term"
                                  placeholder="Property name, Address, City, State or Zip"
                                  aria-label="Address, City or Zip"
                                  class="form-control form-control-lg"
                                ></input>
                                <div class="input-group-btn" data-v-0bf4be34="">
                                  <button
                                    onClick={(e) => this.searchHandler(e)}
                                    aria-label="HomeFinder Search"
                                    class="btn btn-primary btn-lg"
                                  >
                                    <i class="icon d-inline d-md-none icon-search"></i>{" "}
                                    <span class="label d-none d-md-inline">
                                      Search
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="filters-row form-row" data-v-0bf4be34="">
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) =>
                                  this.handleChange(e, "minPrice")
                                }
                                name="minPrice"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__32"
                              >
                                <option value="0">Min Price</option>
                                <option value="500">$500</option>
                                <option value="1000">$1,000</option>
                                <option value="1500">$1,500</option>
                                <option value="2000">$2,000</option>
                                <option value="2500">$2,500</option>
                                <option value="3000">$3,000</option>
                                <option value="3500">$3,500</option>
                                <option value="4000">$4,000</option>
                                <option value="4500">$4,500</option>
                                <option value="5000">$5,000</option>
                                <option value="10000">$10,000</option>
                                <option value="20000">$20,000</option>
                                <option value="30000">$30,000</option>
                                <option value="40000">$40,000</option>
                                <option value="50000">$50,000</option>
                                <option value="60000">$60,000</option>
                                <option value="70000">$70,000</option>
                                <option value="80000">$80,000</option>
                                <option value="90000">$90,000</option>
                                <option value="100000">$100,000</option>
                                <option value="125000">1995</option>
                                <option value="150000">$150,000</option>
                                <option value="175000">$175,000</option>
                                <option value="200000">$200,000</option>
                                <option value="225000">$225,000</option>
                                <option value="250000">$250,000</option>
                                <option value="275000">$275,000</option>
                                <option value="300000">$300,000</option>
                                <option value="350000">$350,000</option>
                                <option value="400000">$400,000</option>
                                <option value="450000">$450,000</option>
                                <option value="500000">$500,000</option>
                                <option value="550000">$550,000</option>
                                <option value="600000">$600,000</option>
                                <option value="650000">$650,000</option>
                                <option value="700000">$700,000</option>
                                <option value="750000">$750,000</option>
                                <option value="800000">$800,000</option>
                                <option value="850000">$850,000</option>
                                <option value="900000">$900,000</option>
                                <option value="950000">$950,000</option>
                                <option value="1000000">$1,000,000</option>
                                <option value="1250000">$1,250,000</option>
                                <option value="1500000">$1,500,000</option>
                                <option value="1750000">$1,750,000</option>
                                <option value="2500000">$2,500,000</option>
                                <option value="3000000">$3,000,000</option>
                                <option value="3500000">$3,500,000</option>
                                <option value="4000000">$4,000,000</option>
                                <option value="4500000">$4,500,000</option>
                                <option value="5000000">$5,000,000</option>
                                <option value="6000000">$6,000,000</option>
                                <option value="8000000">$8,000,000</option>
                                <option value="10000000">$10,000,000</option>
                              </select>
                            </div>
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) =>
                                  this.handleChange(e, "maxPrice")
                                }
                                name="maxPrice"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__33"
                              >
                                <option value="0">Max Price</option>
                                <option value="500">$500</option>
                                <option value="1000">$1,000</option>
                                <option value="1500">$1,500</option>
                                <option value="2000">$2,000</option>
                                <option value="2500">$2,500</option>
                                <option value="3000">$3,000</option>
                                <option value="3500">$3,500</option>
                                <option value="4000">$4,000</option>
                                <option value="4500">$4,500</option>
                                <option value="5000">$5,000</option>
                                <option value="10000">$10,000</option>
                                <option value="20000">$20,000</option>
                                <option value="30000">$30,000</option>
                                <option value="40000">$40,000</option>
                                <option value="50000">$50,000</option>
                                <option value="60000">$60,000</option>
                                <option value="70000">$70,000</option>
                                <option value="80000">$80,000</option>
                                <option value="90000">$90,000</option>
                                <option value="100000">$100,000</option>
                                <option value="125000">1995</option>
                                <option value="150000">$150,000</option>
                                <option value="175000">$175,000</option>
                                <option value="200000">$200,000</option>
                                <option value="225000">$225,000</option>
                                <option value="250000">$250,000</option>
                                <option value="275000">$275,000</option>
                                <option value="300000">$300,000</option>
                                <option value="350000">$350,000</option>
                                <option value="400000">$400,000</option>
                                <option value="450000">$450,000</option>
                                <option value="500000">$500,000</option>
                                <option value="550000">$550,000</option>
                                <option value="600000">$600,000</option>
                                <option value="650000">$650,000</option>
                                <option value="700000">$700,000</option>
                                <option value="750000">$750,000</option>
                                <option value="800000">$800,000</option>
                                <option value="850000">$850,000</option>
                                <option value="900000">$900,000</option>
                                <option value="950000">$950,000</option>
                                <option value="1000000">$1,000,000</option>
                                <option value="1250000">$1,250,000</option>
                                <option value="1500000">$1,500,000</option>
                                <option value="1750000">$1,750,000</option>
                                <option value="2500000">$2,500,000</option>
                                <option value="3000000">$3,000,000</option>
                                <option value="3500000">$3,500,000</option>
                                <option value="4000000">$4,000,000</option>
                                <option value="4500000">$4,500,000</option>
                                <option value="5000000">$5,000,000</option>
                                <option value="6000000">$6,000,000</option>
                                <option value="8000000">$8,000,000</option>
                                <option value="10000000">$10,000,000</option>
                              </select>
                            </div>
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) => this.handleChange(e, "beds")}
                                name="beds"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__34"
                              >
                                <option value="0">Beds</option>
                                <option value="1">1+ Beds</option>
                                <option value="2">2+ Beds</option>
                                <option value="3">3+ Beds</option>
                                <option value="4">4+ Beds</option>
                                <option value="5">5+ Beds</option>
                                <option value="6">6+ Beds</option>
                                <option value="7">7+ Beds</option>
                              </select>
                            </div>
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) => this.handleChange(e, "baths")}
                                name="baths"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__35"
                              >
                                <option value="0">Baths</option>
                                <option value="1">1+ Baths</option>
                                <option value="2">2+ Baths</option>
                                <option value="3">3+ Baths</option>
                                <option value="4">4+ Baths</option>
                                <option value="5">5+ Baths</option>
                              </select>
                            </div>
                            <div
                              class="col d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) =>
                                  this.handleChange(e, "homeType")
                                }
                                name="homeType"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__36"
                              >
                                <option value="0">Home Type</option>
                                <option value="Single Family Home">
                                  Single Family Home
                                </option>
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
                                <option value="Building Lot">
                                  Building Lot
                                </option>
                                <option value="Raw Land">Raw Land</option>
                              </select>
                            </div>
                          </div>

                          <div class="filters-row form-row" data-v-0bf4be34="">
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) =>
                                  this.handleChange(e, "flooring")
                                }
                                name="flooring"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__32"
                              >
                                <option value="0">Flooring Type</option>
                                <option value="Carpet">Carpet</option>
                                <option value="Wooden Flooring">
                                  Wooden Flooring
                                </option>
                              </select>
                            </div>
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) =>
                                  this.handleChange(e, "parkingType")
                                }
                                name="parkingType"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__33"
                              >
                                <option value="0">Parking Type</option>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) =>
                                  this.handleChange(e, "yearBuilt")
                                }
                                name="yearBuilt"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__34"
                              >
                                <option value="0">Year Built</option>
                                <option value="1995">1995</option>
                                <option value="1996">1996</option>
                                <option value="1997">1997</option>
                                <option value="1998">1998</option>
                                <option value="1999">1999</option>
                                <option value="2000">2000</option>
                                <option value="2001">2001</option>
                                <option value="2002">2002</option>
                                <option value="2003">2003</option>
                                <option value="2004">2004</option>
                                <option value="2005">2005</option>
                                <option value="2006">2006</option>
                                <option value="2007">2007</option>
                                <option value="2008">2008</option>
                                <option value="2009">2009</option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                              </select>
                            </div>
                            <div
                              class="form-group col-auto d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              <select
                                onChange={(e) => this.handleChange(e, "area")}
                                name="area"
                                class="custom-select custom-select-sm"
                                data-v-0bf4be34=""
                                id="__BVID__34"
                              >
                                <option value="0">Atmost Area(sqft)</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                                <option value="2500">2500</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                              </select>
                            </div>
                            <div
                              class="col d-none d-md-block field-select"
                              data-v-0bf4be34=""
                            >
                              {savedSearchesSelect}
                            </div>
                          </div>
                          <div class="form-row" data-v-0bf4be34="">
                            <div
                              class="form-group col-12 field-search-term"
                              data-v-0bf4be34=""
                            >
                              {SaveSearchText}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </header>
            </div>
          </section>
          <div>
            <div
              className="row"
              ref={this.myDivToFocus}
              style={{
                marginLeft: "8px",
                marginRight: "8px",
                marginTop: "22%",
                backgroundColor: "white",
                borderColor: "blue",
                borderRadius: "2px",
              }}
            >
              {propertyDetails}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertySearch;
