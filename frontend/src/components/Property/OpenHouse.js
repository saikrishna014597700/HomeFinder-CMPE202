import React, { Component } from 'react';
import {
    Container,
    Card
} from "react-bootstrap";

class OpenHouse extends Component {
    state = { data: {} }
    render() {
        return (
            <Card className={this.props.openHouseModal + " modal"}>

                <div className="modal-content col-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>Scedule Open House</h4>
                        </div>
                        <div
                            className="close"
                            onClick={() => {
                                this.props.closeOpenHouseHandle();
                            }}
                        >
                            &times;
                        </div>
                    </div>
                    <hr />
                    <Container>

                        <form id="new-form">
                            <div className="form-group">
                                <label style={{ fontWeight: "bold" }}>Pick Date and Time</label>
                                <input
                                    required
                                    name="openHouseDateTime"
                                    onChange={e => {
                                        let data = this.state.data;
                                        data.openHouseDateTime = e.target.value;
                                        this.setState({ data })
                                    }}
                                    type="datetime-local"
                                    className="form-control"
                                />
                            </div>
                            <div className="m-3" align="center">
                                <button
                                    type="submit"
                                    onClick={e => {
                                        this.props.updateProperty(e, this.props.propertyToEdit._id, this.state.data);
                                        document.getElementById("new-form").reset();
                                        this.props.closeOpenHouseHandle();
                                    }}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </Container>
                </div>
            </Card>);
    }
}

export default OpenHouse;