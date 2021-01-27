import React, { Component } from "react";
import ApprovalPageHeader from "./ApprovalPageHeader";
import dummyuser from "../images/dummyuser.jpg";
import axios from "axios";
import backend from "../webConfig";
import Navbar from "../Navbar/navbar";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
} from "@material-ui/core/";
class RemovePage extends Component {
  state = {
    navarr: ["black", "rgb(0, 106, 255)"],
  };
  componentDidMount() {
    this.getUsers();
  }
  getUsers = async () => {
    console.log("here");
    const users = await axios.get(`${backend}/admin/users`);
    console.log(users);
    const tempuser = users.data.data.filter((user) => user.IsApproved === 1);
    console.log(tempuser);
    this.setState({
      users: tempuser,
    });
  };
  removeUser = async (id) => {
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
          {this.state.users
            ? this.state.users.map((user, key) => (
                <Card className="card-style1 p-1 mb-1" variant="outlined ">
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
                      <div>
                        <div className="p-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.removeUser(user);
                            }}
                          >
                            Remove
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

export default RemovePage;
