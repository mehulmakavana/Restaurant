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
    this.togglePopup1 = this.togglePopup1.bind(this);
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

  togglePopup1(order) {
    this.setState({
      showPopup1: !this.state.showPopup1,
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
            <td>Performance</td>
          </table>
          {this.state.people.map((order) => (
            <div key={order._id}>
              <div>
                <div>
                  <table className="ot1">
                    <tr>
                      <td onClick={() => this.togglePopup(order)}>
                    
                        {order.name}
                      </td>
                      <td onClick={() => this.togglePopup(order)}>
                        {order.paymentMethod}
                      </td>
                      <td onClick={() => this.togglePopup(order)}>
                 
                        {order.createdAt}
                      </td>

                      <td onClick={() => this.togglePopup(order)}>
                        <div className="oht">{order.grandTotal.toFixed()}</div>
                      </td>

                      <td>
                        <button
                          className="sb sb1"
                          onClick={() => this.togglePopup1(order)}
                        >
                          Performance
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

                  {this.state.showPopup1 ? (
                    <Popup1
                      _id={this.state.id}
                      closePopup={() => this.togglePopup1(order)}
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

class Popup1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/order/howlong/" + this.props._id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ message: data.message, loading: false });
    this.searchArray = data;
  }

  render() {
    return (
      <div className="popup">
        <div className="tp">
          <div className="ohpb">
            <button className="ohpb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <div className="ohgt"> {this.state.message}</div>
        </div>
      </div>
    );
  }
}

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order: [],
      total: "",
      time: "",
    };
  }

  async componentDidMount() {
    try {
      const url = "http://localhost:8020/order/getorder/" + this.props._id;
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      this.setState({
        order: data.order.items,
        loading: false,
        total: data.order.grandTotal,
      });
      this.searchArray = data;
    } catch (err) {}
  }

  render() {
    return (
      <div className="ohp">
        <div className="ohp1">
          <div className="ohpb">
            <button className="ohpb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <label className="odn">Order Details</label>

          <table className="ot">
            <td>Name</td>
            <td>Quantity</td>
            <td>
              <div className="oht">Price(Rs)</div>
            </td>
            <td>
              <div className="oht">Discount(Rs)</div>
            </td>

            <td>
              <div className="oht">Total(Rs)</div>
            </td>
          </table>

          {this.state.order.map((order1) => (
            <div key={order1._id}>
              <table className="ot1">
                <tr>
                  <td>{order1.product_id.name}</td>
                  <td>{order1.qty}</td>
                  <td>
                    <div className="oht">{order1.productPrice}</div>
                  </td>
                  <td>
                    <div className="oht">{order1.product_id.offerPrice}</div>
                  </td>

                  <td>
                    <div className="oht">{order1.total}</div>
                  </td>
                </tr>
              </table>
            </div>
          ))}
          <div className="ohgt">Grand Total :- {this.state.total}</div>             
        </div>
      </div>
    );
  }
}


// import axios from "axios";
// import React, { Component } from "react";

// class Payment extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       phone: "",
//       table: "",
//       message: "",
//       loading: true,
//     };
//   }

//   handlePhone(e) {
//     let phone = e.target.value;
//     this.setState({ phone: phone });
//   }

//   handleTable(e) {
//     let table = e.target.value;
//     this.setState({ table: table });
//   }

//   handleUpload(e) {
//       let phone = this.state.phone;
//       let table = this.state.table;
//       let formdata = new FormData();

//       formdata.append("phone", phone);
//       formdata.append("table", table);

//       axios({
//         url: `http://localhost:8020/book/checkout`,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         data: formdata,
//       })
//       .then(response => response.json())
//       .then(data => this.setState({form:data.message}));
//     }

//   render() {
//     return (
//       <div>
//         <h1>Payment</h1>

//         <div className="rn">
//           <div className="rn1">
//             <div className="rn2">
//               <div className="sd">Phone Number</div>
//               <div className="sd1">
//                 <input
//                   type="number"
//                   className="sd2"
//                   name="phone"
//                   onChange={(e) => this.handlePhone(e)}
//                 />
//               </div>

//               <div className="ed">Table Number</div>
//               <div className="ed1">
//                 <input
//                   type="text"
//                   className="ed2"
//                   name="table"
//                   onChange={(e) => this.handleTable(e)}
//                 />
//               </div>

//               <div className="rb">
//                 <button className="rb1" onClick={(e) => this.handleUpload(e)}>
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {this.state.form}
//       </div>
//     );
//   }
// }

// export default Payment;

