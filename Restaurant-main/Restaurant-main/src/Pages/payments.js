import React, { Component } from "react";
import "./RDetails.scss";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      daysleft: "",
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/restaurant/validity/" + this.props._id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ daysleft: data.daysleft.toFixed(), loading: false ,  });
    this.searchArray = data;
   
  }

  render() {
    return (
      <div className="rdp">
        <div className="rdp1">
          <div className="rdpb">
            <button className="rdpb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <div >Days Left This Restaurant :-  {this.state.daysleft}</div>
        </div>
      </div>
    );
  }
}

export class RDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(detail) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: detail._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/restaurant/totalrestaurants";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.list, loading: false });
    this.searchArray = data;
  }

  render() {
    return (
      <div>
        <h1>Restaurants Details</h1>
        <div>
          <table className="rd">
            <td>RestaurantName</td>
            <td>Payments</td>
            <td>StartTime</td>
            <td>EndTime</td>
            <td>Action</td>
          </table>

          {this.state.people.map((detail) => (
            <div key={detail._id}>
              <div>
                <div>
                  <table className="rd1">
                    <tr>
                      <td> {detail.RestaurantName}</td>

                      <td> {detail.Payments}</td>
                      <td>{detail.created_At}</td>
                      <td>{detail.expireAt}</td>

                      <td>
                      <button
                          className="rdb rdb1"
                          onClick={() => this.togglePopup(detail)}
                        >
                          Validity
                        </button>
                      </td>
                    </tr>
                  </table>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.id}
                      closePopup={() => this.togglePopup(detail)}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RDetail;



