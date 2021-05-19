import React, { Component } from "react";
import "./OrderHistory.scss";

export class OrdersHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      id: "",
      showPopup: false,
      loading: true,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/order/getorders";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.orders, loading: false });
    this.searchArray = data;
  }

  togglePopup(order) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: order._id,
    });
  }

  render() {
    return (
      <div>
        <h1>Orders History</h1>
        <div>
          <table className="ot">
            <td>Name</td>
            <td>Payment-Method</td>
            <td>Time</td>

            <td>
              <div className="oht">Total(Rs) </div>
            </td>
            <td>Action</td>
          </table>
          {this.state.people.map((order) => (
            <div key={order._id}>
              <div>
                <div>
                  <table className="ot1">
                    <tr>
                      <td> {order.name}</td>
                      <td>{order.paymentMethod}</td>
                      <td> {order.createdAt}</td>

                      <td>
                        <div className="oht"> {order.grandTotal} </div>
                      </td>

                      <td>
                        <button
                          className="sb sb1"
                          onClick={() => this.togglePopup(order)}
                        >
                          View Order
                        </button>
                      </td>
                    </tr>
                  </table>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.id}
                      closePopup={() => this.togglePopup(order)}
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

export default OrdersHistory;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order: [],
    };
  }

  async componentDidMount() {
    try {
      const url = "http://localhost:8020/order/getorder/" + this.props._id;
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      this.setState({ order: data.order.items, loading: false });
      this.searchArray = data;
    } catch (err) {}
  }

  render() {
    
    return (
        
      <div className="ohp">

        <div className="ohp1">

          <div className="ohpb">
            <button className="ohpb1" onClick={this.props.closePopup}>X</button>
          </div>

          <label className="odn">Order Details</label>

          <table className="ot">
            <td>Name</td>
            <td>Quantity</td>
            <td><div className="oht">Price(Rs)</div></td>
            <td><div className="oht">Total(Rs)</div></td>
          </table>

          {this.state.order.map((order1) => (
            <div key={order1._id}>
              <table className="ot1">
                <tr>
                  <td>{order1.product_id.name}</td>
                  <td>{order1.qty}</td>
                  <td><div className="oht">{order1.productPrice}</div></td>
                  <td><div className="oht">{order1.total}</div> </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
