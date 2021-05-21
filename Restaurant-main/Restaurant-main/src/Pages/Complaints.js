import React, { Component } from "react";
import "./Complaints.scss";
import axios from "axios";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: "",
    };
  }

  updateOrder(e) {
    e.preventDefault();

    fetch("http://localhost:8020/order/setdiscount/" + this.props._id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        discount: this.state.discount,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDiscount(e) {
    let discount = e.target.value;
    this.setState({ discount: discount });
  }

  render() {
    return (
      <div className="popup_complaints">
        <div className="popup_inner-complaints">
          <label className="label-discount">Set Discount</label>

          <div className="dtl">
            <div className="edv">Enter Discount Value</div>
            <div className="edv1">
              <input
                className="edv2"
                type="text"
                name="name"
                onChange={(e) => this.handleDiscount(e)}
              />
            </div>

            <div className="popbtn-update">
              <button
                className="popbtn1-update"
                onClick={(e) => this.updateOrder(e)}
              >
                Update
              </button>
            </div>

            <div className="popbtn2-complaints">
              <button className="pop-complaint" onClick={this.props.closePopup}>
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Popup1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  handleMessage(e) {
    let message = e.target.value;
    this.setState({ message: message });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8020/reply/reply/" + this.props._id, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        message: this.state.message,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="popup_complaints">
        <div className="popup_inner-complaints">
          <label className="label-discount">Set Discount</label>

          <div className="dtl">
            <div className="edv">Enter The Message</div>
            <div className="edv1">
              <input
                className="edv2"
                type="text"
                name="name"
                onChange={(e) => this.handleMessage(e)}
              />
            </div>

            <div className="popbtn-update">
              <button
                className="popbtn1-update"
                onClick={(e) => this.handleSubmit(e)}
              >
                Submit
              </button>
            </div>

            <div className="popbtn2-complaints">
              <button className="pop-complaint" onClick={this.props.closePopup1}>
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Complaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      complaints: [],
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
    this.togglePopup1 = this.togglePopup1.bind(this);

  }

  togglePopup(complaint) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: complaint.orderId._id,
    });
  }

  togglePopup1(complaint) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: complaint._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/complaint/complaints";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ complaints: data.complaints, loading: false });
  }

  render() {
    const url = "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";

    if (this.state.loading) {
      return (
        <div>
          <div className="logo">
            <img height="100px" width="100px" src={url} />
          </div>
          <div className="state">loading...</div>
        </div>
      );
    }

    if (!this.state.complaints.length) {
      return <div className="state">You not have any Complaints</div>;
    }

    return (
      <div>
        <h1>All Complaints</h1>
        <div>
          <table className="cpt">
            <td>Title</td>
            <td>Complaint</td>
            <td>Date</td>
            <td>Action</td>
          </table>
          {this.state.complaints.map((complaint) => (
            <div key={complaint._id}>
              <div>
                <div>
                  <table className="cpt1">
                    <tr>
                      <td> {complaint.title}</td>
                      <td> {complaint.message}</td>
                      <td>{complaint.created_At}</td>
                      <td>
                        <button
                          className="cmb cmb1"
                          onClick={() => this.togglePopup(complaint)}
                        >
                          Discount
                        </button>

                        <button
                          className="cmb cmb1"
                          onClick={() => this.togglePopup1(complaint)}
                        >
                          Reply
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>

                {this.state.showPopup ? (
                  <Popup
                    _id={this.state.id}
                    closePopup={() => this.togglePopup(complaint)}
                  />
                ) : null}
                 {this.state.showPopup ? (
            <Popup1
              _id={this.state.id}
              closePopup1={() => this.togglePopup1(complaint)}
            />
          ) : null}
              </div>
            </div>
          ))}

         
        </div>
      </div>
    );
  }
}
export default Complaints;
