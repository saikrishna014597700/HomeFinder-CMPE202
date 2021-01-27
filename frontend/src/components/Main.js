import React, { Component } from "../../node_modules/react";
import { Route } from "../../node_modules/react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

import PropertySearch from "./HomePage/PropertySearch";
import ApprovalPage from "./Admin/ApprovalPage";
import RemovePage from "./Admin/RemovePage";
import ApplicationForm from "./Renter/ApplicationForm"
import ManageProperty from "./Property/ManageProperty";
import ViewProperty from "./Property/ViewProperty";

import Navigation from "./Navbar/navbar";
import { BrowserRouter as Router, Switch, Link } from "../../node_modules/react-router-dom";


//Create a Main Component
class Main extends Component {


    render() {
        return (
            <div className="fillContent">
                <Route path="/propertySearch" component={PropertySearch} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/admin/approve" component={ApprovalPage} />
                <Route path="/admin/remove" component={RemovePage} />
                <Route path="/manage/property" component={ManageProperty} />
                <Route path="/property/:id" component={ViewProperty} />
                <Route path="/renter/applicationform" component={ApplicationForm} />
                {/* <Route path="/" component={Navbar} /> */}
            </div>
        );
    }
}
//Export The Main Component
export default Main;
