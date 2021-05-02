import React, { Component } from "react";
import axios from "axios";

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
      (res) => {
      },
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
        <div className="popup_inner">
          <h1>{this.props.text}</h1>
          <div className="container2">
            <div className="price1">Table No </div>
            <div className="price2">
              <input
                className="price3"
                type="number"
                name="table"
                min="1"
                onChange={(e) => this.handleTable1(e)}
              />
            </div>

            <div className="price1">Size</div>
            <div className="price2">
              <input
                className="price3"
                type="number"
                name="size"
                min="1"
                onChange={(e) => this.handleSize1(e)}
              />
            </div>

            <div className="button4">
              <button className="btn4" onClick={(e) => this.update(e)}>
                Update
              </button>
            </div>

            <button onClick={this.props.closePopup}>close</button>
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

  renderTableData() {
    return this.state.people.map((data) => {
      return (
        <tr key={data._id}>
          <td>
            <div className="category-name">{data.table}</div>
          </td>

          <td>
            <div className="category-name">{data.size}</div>
          </td>

          <td>
            <div className="category-name">{data.Status}</div>
          </td>

          <td>
            <div className="button3">
              <button className="btn3" onClick={() => this.delete(data._id)}>
                {" "}
                Delete{" "}
              </button>
            </div>
          </td>

          <td>
            <div className="button6">
              <button onClick={() => this.togglePopup(data)}>Edit Table</button>
            </div>
          </td>

          {this.state.showPopup ? (
            <Popup
              _id={this.state.id}
              closePopup={() => this.togglePopup(data)}
            />
          ) : null}
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="manager-additem">
          <div className="add-category">
            <div className="container">
              <h4>Add Table</h4>

              <div className="title">Table</div>
              <div className="text1">
                <input
                  type="number"
                  className="text2"
                  name="table"
                  onChange={(e) => this.handleTable(e)}
                />
              </div>

              <div className="title">Size</div>
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

            <div className="container1">
              <div className="category-manager">Tables</div>

              <div className="content">
                <table id="table">
                  <tr>
                    <th>Table</th>
                    <th>Size</th>
                    <th>Status</th>
                  </tr>
                </table>
              </div>

              <div>
                <table id="students">
                  <tbody>{this.renderTableData()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTable;
