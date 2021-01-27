import React, { Component } from "react";
import ApprovalPageHeader from "./ApprovalPageHeader";
import dummyuser from "../images/dummyuser.jpg";
import axios from "axios";
import backend from "../webConfig";
import { Card, CardContent, Typography } from "@material-ui/core/";
import Navbar from "../Navbar/navbar";

class ApprovalPage extends Component {
  state = {
    navarr: ["rgb(0, 106, 255)", "black"],
    users: [],
  };

  componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    const users = await axios.get(`${backend}/admin/users`);
    console.log(users.data.data);
    const tempuser = users.data.data.filter((user) => user.IsApproved === 2);
    console.log(tempuser);
    this.setState({
      users: tempuser,
    });
  };

  approveUser = async (id) => {
    console.log(id._id);
    const user = await axios.post(`${backend}/authorise/approve/${id._id}`);
    console.log(user);
    this.getUsers();
  };
  rejectUser = async (id) => {
    console.log(id._id);
    const user = await axios.post(`${backend}/authorise/reject/${id._id}`);
    console.log(user);
    this.getUsers();
  };

  render() {
    return (
      <div>
        {" "}
        <Navbar></Navbar>
        <ApprovalPageHeader navarr={this.state.navarr}></ApprovalPageHeader>
        <div className="container">
          {this.state.users.length > 0
            ? this.state.users.map((user, key) => (
                <Card
                  className="card-style1 p-1 mb-1"
                  variant="outlined "
                  key={key}
                >
                  <CardContent>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="pr-2" style={{ textAlign: "left" }}>
                          <img
                            className="card-logo"
                            style={{ height: "70px", opacity: "0.9" }}
                            src={dummyuser}
                            alt="image"
                          ></img>
                        </div>
                        <div className="pl-5">
                          <Typography
                            variant="h6"
                            style={{ textAlign: "left" }}
                            gutterBottom
                          >
                            {user.Role}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{ textAlign: "left" }}
                            gutterBottom
                          >
                            {user.Name}
                          </Typography>
                          <Typography
                            variant="body1"
                            style={{
                              textAlign: "left",
                              color: "rgb(0, 0, 0, 0.4)",
                            }}
                            className="mt-4"
                            gutterBottom
                          >
                            email: {user.Email}
                          </Typography>
                        </div>
                      </div>
                      <div className="d-flex  mt-2">
                        <div className="p-2">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              this.approveUser(user);
                            }}
                          >
                            Approve
                          </button>
                        </div>
                        <div className="p-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.rejectUser(user);
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default ApprovalPage;
