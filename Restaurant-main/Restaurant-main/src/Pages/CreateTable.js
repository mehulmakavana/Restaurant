import React, { Component } from "react";
import axios from "axios";
import "./Table.scss";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "",
      size: "",
    };
  }

  update(e) {
    let table = this.state.table;
    let size = this.state.size;

    let formdata = new FormData();

    formdata.append("table", table);
    formdata.append("size", size);

    axios({
      url: `http://localhost:8020/book/update/` + this.props._id,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {},
      (err) => {}
    );
  }

  handleTable1(e) {
    let table = e.target.value;
    this.setState({ table: table });
  }

  handleSize1(e) {
    let size = e.target.value;
    this.setState({ size: size });
  }

  render() {
    return (
      <div className="popup">
        <div className="tp">
          <label className="label">Edit Details</label>

          <div className="tnu">Table-Number</div>
          <div className="tnu1">
            <input
              className="tnu2"
              type="number"
              name="table"
              onChange={(e) => this.handleTable1(e)}
            />
          </div>

          <div className="ts">Table-Size</div>
          <div className="ts1">
            <input
              className="ts2"
              type="number"
              name="size"
              onChange={(e) => this.handleSize1(e)}
            />
          </div>

          <div className="tub">
            <button className="tub1" onClick={(e) => this.update(e)}>
              Update
            </button>
          </div>

          <div className="tcb">
            <button className="tcb1" onClick={this.props.closePopup}>
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class CreateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: "",
      size: "",
      people: [],
      loading: true,
      showPopup: false,
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: data._id,
    });
  }

  async componentDidMount() {
    const url = "http://localhost:8020/book/tables";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.tables, loading: false });
    this.searchArray = data;
  }

  handleTable(e) {
    let table = e.target.value;
    this.setState({ table: table });
  }

  handleSize(e) {
    let size = e.target.value;
    this.setState({ size: size });
  }

  handleUpload(e) {
    let table = this.state.table;
    let size = this.state.size;

    let formdata = new FormData();

    formdata.append("table", table);
    formdata.append("size", size);

    axios({
      url: `http://localhost:8020/book/table`,
      method: "POST",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.componentDidMount();
      },
      (err) => {}
    );
  }

  delete(id) {
    fetch("http://localhost:8020/book/delete/" + id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Are You Sure Delete");
        this.componentDidMount();
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Add Table</h1>

          <div className="title">Table-Number</div>
          <div className="text1">
            <input
              type="number"
              className="text2"
              name="table"
              onChange={(e) => this.handleTable(e)}
            />
          </div>

          <div className="title">Table-Size</div>
          <div className="text1">
            <input
              type="number"
              className="text2"
              name="size"
              onChange={(e) => this.handleSize(e)}
            />
          </div>

          <div className="button1">
            <button className="btn1" onClick={(e) => this.handleUpload(e)}>
              Upload
            </button>
          </div>
        </div>





        <div>
          <label className="tn">Tables-Details</label>
          <div>
            <table className="tb">
              <td>Table-Number</td>
              <td>Table-Size</td>
              <td>Table-Status</td>
              <td>Action</td>
            </table>
            {this.state.people.map((table) => (
              <div key={table._id}>
                <div>
                  <div>
                    <table className="tb1">
                      <tr>
                        <td> {table.table}</td>
                        <td> {table.size}</td>
                        <td>{table.Status}</td>
                        <td>
                          <button
                            className="teb teb1"
                            onClick={() => this.togglePopup(table)}
                          >
                            Edit item
                          </button>

                          <button
                            className="teb teb1"
                            onClick={() => this.delete(table._id)}
                            variant="danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>

                  {this.state.showPopup ? (
                    <Popup
                      _id={this.state.id}
                      closePopup={() => this.togglePopup(table)}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTable;
