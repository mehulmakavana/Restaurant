import axios from "axios";
import React, { Component } from "react";
import "./TableOrder.scss";

class TableOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableorder: "",
      list: [],
      loading: true,
    };
  }

  handleTable(e) {
    let table = e.target.value;
    this.setState({ table: table });
  }

  handleUpload(e) {
    let table = this.state.table;
    let formdata = new FormData();

    formdata.append("table", table);

    axios({
      url: `http://localhost:8020/order/getorders/table`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { list } = data;
        this.setState({ list });
      });
  }

  render() {
    return (
      <div>
        <h1>Table Wise Order</h1>

        <div className="to">
          <div className="to1">
            <div className="to2">
              <div className="ton">Table Number</div>
              <div className="ton1">
                <input
                  type="number"
                  className="ton2"
                  name="table"
                  min="1"
                  onChange={(e) => this.handleTable(e)}
                />
              </div>

              <div className="tob">
                <button className="tob1" onClick={(e) => this.handleUpload(e)}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        {this.state.list.map((order) => (
          <div key={order._id}>
            <div className="pon">
              <div> Name :- {order.name}</div>
              <div> Time :- {order.createdAt}</div>
            </div>

            <table className="pot">
              <td>Product</td>
              <td>Qty</td>
              <td>Priority</td>
              <td>
                <div className="pp">Price(RS)</div>
              </td>
            </table>

            {order.items.map((item) => (
              <div key={item._id}>
                <table className="pot1">
                  <tr>
                    <td>
                      <div>{item.product_id.name}</div>
                    </td>

                    <td>
                      <div>{item.qty}</div>
                    </td>
                    <td>
                      <div>{item.priority}</div>
                    </td>

                    <td>
                      <div className="pp">{item.productPrice}</div>
                    </td>
                  </tr>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default TableOrder;
