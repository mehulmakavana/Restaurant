import React, { Component } from "react";
import "./Category.scss";

import axios from "axios";

export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      categoryName: null,
      people: [],
      id: null,
      showPopup: false,
      activeOrderId: null,
      loading: true,
      imageUrl: "",
    };

    this.togglePopup = this.togglePopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.categoryposts, loading: false });
    this.searchArray = data;
  }

  handleName(e) {
    let categoryName = e.target.value;
    this.setState({ categoryName: categoryName });
  }

  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  handleUpload(e) {
    let file = this.state.file;
    let categoryName = this.state.categoryName;
    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("categoryName", categoryName);

    axios({
      url: `http://localhost:8020/categorypost/create`,
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
    fetch("http://localhost:8020/categorypost/delete/" + id, {
      method: "DELETE",
    }).then((data) => {
      data.json().then((resp) => {
        alert("Are You Sure Delete");
        this.componentDidMount();
      });
    });
  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      activeId: data._id,
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Add Category</h1>

          <div className="ac">
            <div className="ac1">
              <div className="ac2">
                <div className="title">Image</div>
                <div className="text1">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => this.handleFile(e)}
                  />
                </div>

                <div className="title">Category-Name</div>
                <div className="text1">
                  <input
                    type="text"
                    className="text2"
                    name="categoryName"
                    onChange={(e) => this.handleName(e)}
                  />
                </div>

                <div className="button1">
                  <button
                    className="btn1"
                    onClick={(e) => this.handleUpload(e)}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="tn">Categories</label>
          <div>
            <table className="act">
              <td>Category-Name</td>
              <td>Image</td>
              <td>Time</td>
              <td>Action</td>
            </table>
            {this.state.people.map((data) => (
              <div key={data._id}>
                <div>
                  <div>
                    <table className="act1">
                      <tr>
                        <td> {data.categoryName}</td>
                        <td>
                          <img
                            height="100px"
                            width="100px"
                            className="img"
                            src={data.imageUrl}
                          />
                        </td>
                        <td>{data.createdAt}</td>
                        <td>
                          <button
                            className="teb teb1"
                            onClick={() => this.togglePopup(data)}
                          >
                            Add Menu
                          </button>

                          <button
                            className="teb teb1"
                            onClick={() => this.delete(data._id)}
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
                      _id={this.state.activeId}
                      text="Close Me"
                      closePopup={() => this.togglePopup(data)}
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

export default AddCategory;

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      people: [],
      showSecondPopup: false,
      loading: true,
      imageUrl: "",
      originalPrice: "",
      description: "",
      offer: "",
      activeId1: null,
    };
    this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:8020/menu/menu/" + this.props._id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
    this.searchArray = data;
  }

  handleItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  handleItemPrice(e) {
    let originalPrice = e.target.value;
    this.setState({ originalPrice: originalPrice });
  }

  handleItemOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  handleItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemUpload(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let originalPrice = this.state.originalPrice;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("name", name);
    formdata.append("originalPrice", originalPrice);
    formdata.append("description", description);

    axios({
      url: `http://localhost:8020/menu/create/` + this.props._id,
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

  toggleSecondPopup(data) {
    this.setState({
      showSecondPopup: !this.state.showSecondPopup,
      activeId1: data._id,
    });
  }

  delete(_id) {
    fetch("http://localhost:8020/menu/delete/" + _id, {
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
      <div className="acp">
        <div className="acp1">
          <div className="closeItem-set">
            <button className="closeItem-btn" onClick={this.props.closePopup}>
              X
            </button>
          </div>

          <div>
            <label className="mn">Add Menu</label>
            <div>
              <div className="ac">
                <div className="ac1">
                  <div className="ac2">
                    <div className="text1">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => this.handleItemFile(e)}
                      />
                    </div>

                    <div className="title">Sub-Title</div>
                    <div className="text1">
                      <input
                        className="text2"
                        type="text"
                        name="name"
                        onChange={(e) => this.handleItemName(e)}
                      />
                    </div>

                    <div className="title">Price (RS)</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="originalPrice"
                        min="1"
                        onChange={(e) => this.handleItemPrice(e)}
                      />
                    </div>

                    <div className="title">Offer</div>
                    <div className="price2">
                      <input
                        className="price3"
                        type="number"
                        name="offer"
                        min="1"
                        onChange={(e) => this.handleItemOffer(e)}
                      />
                    </div>

                    <div className="title">Description</div>
                    <div className="dsc1">
                      <textarea
                        className="dsc2"
                        type="text"
                        name="description"
                        onChange={(e) => this.handleItemDescription(e)}
                      />
                    </div>

                    <div className="button1">
                      <button
                        className="btn1"
                        onClick={(e) => this.handleItemUpload(e)}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="ctn"> Menu</label>

            <div>
              <table className="am">
                <td>Title</td>
                <td>Image</td>
                <td>Price</td>
                <td>Offer</td>
                <td>OfferPrice</td>
                <td>Description</td>
                <td>Action</td>
              </table>

              {this.state.people.map((data) => (
                <div key={data._id}>
                  <div>
                    <div>
                      <table className="am1">
                        <tr>
                          <td> {data.name}</td>
                          <td>
                            <img
                              height="80px"
                              width="80px"
                              className="img"
                              src={data.imageUrl}
                            />
                          </td>

                          <td>{data.originalPrice}</td>
                          <td>{data.offer}</td>
                          <td>{data.offerPrice}</td>
                          <td>{data.description}</td>

                          <td>
                            <button
                              className="ectb ectb1"
                              onClick={() => this.toggleSecondPopup(data)}
                            >
                              Edit Item
                            </button>

                            <button
                              className="ectb ectb1"
                              onClick={() => this.delete(data._id)}
                              variant="danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {this.state.showSecondPopup ? (
                      <SecondPopup
                        id1={this.state.activeId1}
                        closeSecondPopup={() => this.toggleSecondPopup(data)}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SecondPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: null,
      showSecondPopup: false,
      loading: true,
      imageUrl: "",
      originalPrice: "",
      description: "",
      offer: "",
      activeId1: null,
    };
    this.toggleSecondPopup = this.toggleSecondPopup.bind(this);
  }

  EditItemName(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  EditItemFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  EditItemPrice(e) {
    let originalPrice = e.target.value;
    this.setState({ originalPrice: originalPrice });
  }

  EditItemOffer(e) {
    let offer = e.target.value;
    this.setState({ offer: offer });
  }

  EditItemDescription(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  async handleItemEdit(e) {
    e.preventDefault();

    let file = this.state.file;
    let name = this.state.name;
    let offer = this.state.offer;
    let description = this.state.description;

    let formdata = new FormData();

    formdata.append("imageUrl", file);
    formdata.append("name", name);
    formdata.append("offer", offer);
    formdata.append("description", description);

    axios({
      url: `http://localhost:8020/menu/update/` + this.props.id1,
      method: "PUT",
      headers: {
        authorization: `your token`,
      },
      data: formdata,
    }).then(
      (res) => {
        this.setState({ showSecondPopup: !this.state.showSecondPopup });
       

      },
      (err) => {}
    );
  }

  toggleSecondPopup(data) {
    this.setState({
      showSecondPopup: !this.state.showSecondPopup,
      activeId1: data._id,
    });
  }

  render() {
    return (
      <div className="acp">
        <div className="acp1">
          <div className="secondcloseItem-set">
            <button
              className="secondcloseItem-btn"
              onClick={this.props.closeSecondPopup}
            >
              X
            </button>
          </div>



          <div>
    <label className="mn">Edit Item</label>
    <div>
      <div className="ac">
        <div className="ac1">
          <div className="ac2">
            <div className="text1">
              <input
                type="file"
                name="file"
                onChange={(e) => this.EditItemFile(e)}
                />
            </div>

            <div className="title">Sub-Title</div>
            <div className="text1">
              <input
                className="text2"
                type="text"
                name="name"
                onChange={(e) => this.EditItemName(e)}
                />
            </div>

            <div className="title">Price (RS)</div>
            <div className="price2">
              <input
                className="price3"
                type="number"
                name="originalPrice"
                min="1"
                onChange={(e) => this.EditItemPrice(e)}
                />
            </div>

            <div className="title">Offer</div>
            <div className="price2">
              <input
                className="price3"
                type="number"
                name="offer"
                min="1"
                onChange={(e) => this.EditItemOffer(e)}
                />
            </div>

            <div className="title">Description</div>
            <div className="dsc1">
              <textarea
                className="dsc2"
                type="text"
                name="description"
                onChange={(e) => this.EditItemDescription(e)}
                />
            </div>

            <div className="button1">
              <button
                className="btn1"
                onClick={(e) => this.handleItemEdit(e)}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 
</div>
</div>
);
}
}