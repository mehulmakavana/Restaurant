import axios from "axios";
import React, { Component } from "react";
import { NavItem } from "reactstrap";
import "./Revenue.css";

class Revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: "",
      enddate: "",
      result: [],
      loading: true,
    };
  }

  handleStartDate(e) {
    let startdate = e.target.value;
    this.setState({ startdate: startdate });
  }

  handleEndDate(e) {
    let enddate = e.target.value;
    this.setState({ enddate: enddate });
  }

  handleUpload(e) {
    let startdate = this.state.startdate;
    let enddate = this.state.enddate;
    let formdata = new FormData();

    formdata.append("startdate", startdate);
    formdata.append("enddate", enddate);

    axios({
      url: `http://localhost:8020/revenue/revenuedates`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      data: formdata,
    })
      .then((res) => res.data)
      .then((data) => {
        const { result } = data;
        this.setState({ result });
      });
  }

  render() {
    const { id } = this.state;

    return (
      <div>
        <h1>Revenue</h1>

        <div className="rn">
          <div className="rn1">
            <div className="rn2">
              <div className="sd">Start-Date</div>
              <div className="sd1">
                <input
                  type="text"
                  className="sd2"
                  name="startdate"
                  onChange={(e) => this.handleStartDate(e)}
                />
              </div>

              <div className="ed">End-Date</div>
              <div className="ed1">
                <input
                  type="text"
                  className="ed2"
                  name="enddate"
                  onChange={(e) => this.handleEndDate(e)}
                />
              </div>

              <div className="rb">
                <button className="rb1" onClick={(e) => this.handleUpload(e)}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.result.map((item) => (
          <div key={item._id}>
            <div className="rnv">
              <div className="rnv1">
                <div className="rnv2">
                  <table className="rnt">
                    <td>Id</td>
                    <td>Count</td>
                    <td><div className="rns">Sum(Rs)</div></td>
                  </table>
                  <div>
                  <table className="rnt1">
                    <tr>
                    <td>{item._id}</td>

                    <td>{item.COUNT}</td>
                    <td><div className="rns">{item.SUM}</div></td>
                    </tr>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Revenue;
