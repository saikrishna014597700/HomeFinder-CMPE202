import React, { Component } from 'react';
import {
    Container,
    Card,
    Button
} from "react-bootstrap";

class ViewApplicants extends Component {
    state = { applicants: [] }
    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            console.log(nextProps)
            this.setState({ applicants: nextProps.applicants || [], propertyToEdit: nextProps.propertyToEdit });
        }
    }
    componentDidMount() {
        this.props.getApplicants();
    }
    //if this.props.propertyToEdit.propertyStatus=Available show approve reject button
    //Card array to show applicants once done by puneet and shiva

    render() {
        return (
            <Card className={this.props.viewApplicantsModal + " modal"}>

                <div className="modal-content col-8">
                    <div className="d-flex justify-content-between mb-3">
                        <div>
                            <h4>View Applicants</h4>
                        </div>
                        <div
                            className="close"
                            onClick={() => {
                                this.props.closeViewApplicantsHandle();
                            }}
                        >
                            &times;
                        </div>
                    </div>
                    {console.log("applicants ", this.state.applicants)}
                    {this.state.applicants.map(app => (
                        <Card className="mb-2">
                            <Card.Header>{app.Firstname} {app.Lastname} ({app.ApplicantType})</Card.Header>
                            <Card.Body>
                                <div className="col-12 d-flex justify-content-between">
                                    <div className="col-9">
                                        {app.ApplicantType == "Renter" ? (
                                            <div>
                                                <div>
                                                    <b>{app.Email} | {app.Mobile} | {app.CurrentAddress}</b>
                                                </div>
                                                <div>
                                                    <b>Credit score:</b> {app.CreditScore}
                                                </div>
                                                <div>
                                                    <b>Move in date:</b> {app.MoveInDate}
                                                </div>
                                                <div>
                                                    <b>Lease term:</b> {app.LeaseTerm}
                                                </div>
                                                <div>
                                                    <b>Employer:</b> {app.Employer}
                                                </div>
                                                <div>
                                                    <b>Employer Address:</b> {app.EmployerAddress}
                                                </div>
                                                <div>
                                                    <b>Salary:</b> {app.Salary}
                                                </div>
                                            </div>
                                        ) : (
                                                <div>
                                                    <div>
                                                        <b>Email ID:</b> {app.Email}
                                                    </div>
                                                    <div>
                                                        <b>Offer Amount:</b> ${app.offerAmount}
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                    <div className="col-3">
                                        {this.state.propertyToEdit.propertyStatus == "Available" ? (
                                            app.ApplicantStatus == "New" ? (
                                                <div>
                                                    <Button
                                                        className="btn btn-success m-1"
                                                        size="sm"
                                                        onClick={(e) => { e.preventDefault(); this.props.approveApplicant(app._id); }}
                                                    >
                                                        Approve
                                                </Button>
                                                    <Button
                                                        className="btn btn-danger m-1"
                                                        size="sm"
                                                        onClick={(e) => { e.preventDefault(); this.props.rejectApplicant(app._id); }}
                                                    >
                                                        Reject
                                                </Button>
                                                </div>
                                            ) : (
                                                    <b style={{ color: "red" }}>{app.ApplicantStatus}</b>
                                                )
                                        ) : (
                                                app.ApplicantStatus == "Approved" ? (<b style={{ color: "green" }}>{app.ApplicantStatus}</b>) : ("")
                                            )}


                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}

                    <hr />
                    <Container>
                    </Container>
                </div>
            </Card>);
    }
}

export default ViewApplicants;