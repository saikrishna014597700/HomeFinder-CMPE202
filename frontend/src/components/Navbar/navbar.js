import { Redirect } from "react-router";
import React, { Component } from "../../../node_modules/react";
import "./navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      redirectVar: null,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async componentDidMount() { }
  handleLogin(e) {
    e.preventDefault();
    this.setState({ redirectVar: `/login` });
  }

  handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    this.setState({ redirectVar: `/propertySearch` });
  }
  handleManageProperty(e) {
    e.preventDefault();
    this.setState({ redirectVar: `/manage/property` });
    // localStorage.clear();
    //this.setState({ redirectVar: `/propertySearch` });
  }
  handleAdminProperty(e) {
    e.preventDefault();
    this.setState({ redirectVar: `/admin/approve` });
    // localStorage.clear();
    //this.setState({ redirectVar: `/propertySearch` });
  }

  render() {
    if (this.state.redirectVar) {
      return <Redirect to={this.state.redirectVar} />;
    }
    let loginb = null;
    let role = null;
    if (localStorage.getItem("role")) {
      role = (
        <p style={{ color: "white", fontWeight: "bold" }} className="m-2"> Hello {localStorage.getItem("role")}</p>
      );
    }
    if (localStorage.getItem("token")) {
      loginb = (
        <form className="form-inline my-2 my-lg-0">
          <button
            onClick={(e) => this.handleLogout(e)}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Sign out
          </button>
        </form>
      );
    } else {
      loginb = (
        <form className="form-inline my-2 my-lg-0">
          <button
            onClick={(e) => this.handleLogin(e)}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Sign In
          </button>
        </form>
      );
    }
    let sellerManage = null;
    if (
      localStorage.getItem("role") === "Seller" ||
      localStorage.getItem("role") === "Realtor" ||
      localStorage.getItem("role") === "Landlord"
    ) {
      sellerManage = (
        <form
          className="form-inline my-2 my-lg-0"
          style={{ marginRight: "20px" }}
        >
          <button
            onClick={(e) => this.handleManageProperty(e)}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            Manage Property
          </button>
        </form>
      );
    }
    let adminapproval = null;
    if (localStorage.getItem("role") === "Admin") {
      adminapproval = (
        <form
          className="form-inline my-2 my-lg-0"
          style={{ marginRight: "20px" }}
        >
          <button
            onClick={(e) => this.handleAdminProperty(e)}
            className="btn btn-outline-success my-2 my-sm-0"
          >
            View User
          </button>
        </form>
      );
    }
    let navBar = null;
    navBar = (
      <div class="fill-page">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a
            className="navbar-brand"
            style={{ color: "white" }}
            href="/propertySearch"
          >
            HomeFinder{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item active">
                                <a className="nav-link" style={{ color: "white" }} href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" style={{ color: "white" }} href="/">Link</a>
                            </li> */}
            </ul>
            {role}
            {sellerManage}
            {adminapproval}
            {loginb}
          </div>
        </nav>
      </div>
    );
    return <div>{navBar}</div>;
  }
}
export default Navbar;
