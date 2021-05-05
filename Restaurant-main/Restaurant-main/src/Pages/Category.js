import React, { Component } from 'react'
import axios from 'axios';
import './Category.css';
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
        }

        this.togglePopup = this.togglePopup.bind(this);

    }



    async componentDidMount() {

        const url = "http://localhost:8020/categorypost/categories";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.categoryposts, loading: false });
        this.searchArray = data
    }

    handleName(e) {
        let categoryName = e.target.value
        this.setState({ categoryName: categoryName })
    }

    handleFile(e) {
        let file = e.target.files[0]
        this.setState({ file: file })
    }

    handleUpload(e) {
        let file = this.state.file
        let categoryName = this.state.categoryName
        let formdata = new FormData()

        formdata.append('imageUrl', file)
        formdata.append('categoryName', categoryName)

        axios({
            /*  url: `http://192.168.0.61:8020/categorypost/create`, */
            url: `http://localhost:8020/categorypost/create`,
            method: "POST",
            headers: {
                authorization: `your token`
            },
            data: formdata
        }).then((res) => {
            this.componentDidMount()

        }, (err) => {
        }
        )

    }

    delete(id) {
        /* fetch('http://192.168.0.61:8020/categorypost/delete/' + id,*/
        fetch('http://localhost:8020/categorypost/delete/' + id,
            {
                method: 'DELETE',
            }).then((data) => {
                data.json().then((resp) => {
                    alert("Are You Sure Delete")
                    this.componentDidMount()
                })
            })
    }


    update(id) {

        fetch('http://localhost:8020/categorypost/update/' + id, {
            method: 'PUT',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    togglePopup(data) {
        this.setState({
            showPopup: !this.state.showPopup,
            activeId: data._id

        });
    }

    renderTableData() {
        return this.state.people.map((data) => {
            return (

                <tr key={data._id}>

                    <td><div className="category-name">{data.categoryName}</div></td>

                    <td><img height="100px" width="100px" className="img" src={data.imageUrl} /></td>

                    <td><div className="button2">
                        <button className="cart-button" onClick={() => this.togglePopup(data)}>Add Item</button>
                        {this.state.showPopup ?
                            <Popup _id={this.state.activeId}
                                text='Close Me'
                                closePopup={() => this.togglePopup(data)}
                            />
                            : null
                        }
                    </div>
                    </td>
                    <td>
                        <div className="button3">
                            <button className="btn3" onClick={() => this.delete(data._id)}> Delete </button>
                        </div></td>

                </tr>
            )
        })
    }


    render() {
        return (
            <div className="manager-additem">
                <div className="add-category">
                    <div className="container">

                        <h4>Add Category</h4>

                        <div className="file">
                            <input type="file" multiple name="file" onChange={(e) => this.handleFile(e)} />
                        </div>

                        <div className="title">Title</div>
                        <div className="text1">
                            <input type="text" className="text2" multiple name="categoryName" onChange={(e) => this.handleName(e)} />
                        </div>

                        <div className="button1">
                            <button className="btn1" onClick={(e) => this.handleUpload(e)}>Upload</button>
                        </div>
                    </div>

                    <div className="container1">

                        <div className="category-manager">Categories</div>

                        <div className="content">

                            <table id="table" >

                                <tr>
                                    <th width="130px" height="50px">Title</th>
                                    <th width="170px" height="50px">Image</th>
                                    <th width="550px" height="50px">Action</th>
                                </tr>

                            </table>

                        </div>

                        <div>

                            <table id='students'>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
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
            activeId1:null,
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
            (err) => { }
        );
    }

    toggleSecondPopup(data) {
        this.setState({
            showSecondPopup: !this.state.showSecondPopup,
            activeId1: data._id

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

    renderTableData() {
        return this.state.people.map((data) => {
            const {
                _id,
                name,
                imageUrl,
                originalPrice,
                description,
                offer,
                offerPrice,
            } = data;
            return (
                <tr key={_id}>
                    <td width="150px">
                        <div className="name">{name}</div>
                    </td>

                    <td width="150px">
                        <img className="img" src={imageUrl} />
                    </td>

                    <td width="100px">
                        <div className="price"> {originalPrice} ₹ </div>
                    </td>

                    <td width="100px">
                        <div className="offer1"> {offer} % </div>
                    </td>

                    <td width="100px">
                        <div className="offer2"> {offerPrice} ₹ </div>
                    </td>

                    <td width="200px">
                        <div className="description">{description}</div>
                    </td>

                    <td width="300px">
                        <div className="button6">
                            <button
                                className="btn6"
                                onClick={() => this.delete(data._id)}
                                variant="danger"
                            >
                                Delete
              </button>
                        </div>
                    </td >

                    <td width="300px">
                        <div className="button6">
                            <button className="btn6" onClick={() => this.toggleSecondPopup(data)}>Edit</button>
                        </div>
                    </td>

                    {this.state.showSecondPopup ? (
                        <SecondPopup
                            id1={this.state.activeId1}
                            closeSecondPopup={() => this.toggleSecondPopup(data)}
                        />
                    ) : null}
                </tr>
            );
        });
    }

    render() {
        return (
            <div className='popup-item'>
                <div className='popupItem_inner'>
                    <div className="closeItem-set">
                        <button className="closeItem-btn" onClick={this.props.closePopup}>X</button>
                    </div>

                    <div>
                        
                            <div className="container">
                                    <h4>Add Menu</h4>

                                    <div className="file">
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(e) => this.handleItemFile(e)}
                                        />
                                    </div>

                                    <div className="Itemtitle">Sub-Title</div>
                                    <div className="text1">
                                        <input
                                            className="text2"
                                            type="text"
                                            name="name"
                                            onChange={(e) => this.handleItemName(e)}
                                        />
                                    </div>

                                    <div className="price1">Price (RS)</div>
                                    <div className="price2">
                                        <input
                                            className="price3"
                                            type="number"
                                            name="originalPrice"
                                            min="1"
                                            onChange={(e) => this.handleItemPrice(e)}
                                        />
                                    </div>

                                    <div className="price1">Offer</div>
                                    <div className="price2">
                                        <input
                                            className="price3"
                                            type="number"
                                            name="offer"
                                            min="1"
                                            onChange={(e) => this.handleItemOffer(e)}
                                        />
                                    </div>

                                    <div className="dsc">Description</div>
                                    <div className="dsc1">
                                        <textarea
                                            className="dsc2"
                                            type="text"
                                            name="description"
                                            onChange={(e) => this.handleItemDescription(e)}
                                        />
                                    </div>

                                    <div className="button4">
                                        <button className="btn4" onClick={(e) => this.handleItemUpload(e)}>
                                            Upload
                                        </button>
                                    </div>

                            </div>

                        <div className="container1">
                            <div className="manager-menu"> Menu</div>

                            <div className="content1">
                                <table id="table1">
                                    <tr>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Offer</th>
                                        <th>OfferPrice</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </table>
                            </div>

                            <div>
                                <table id="students1">
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
            activeId1:null,
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
            (res) => {this.setState({showSecondPopup: !this.state.showSecondPopup})
            },
            (err) => { }
        );
    }

    toggleSecondPopup(data) {
        this.setState({
            showSecondPopup: !this.state.showSecondPopup,
            activeId1: data._id
        });
    }


    render() {
        return (
            <div className='Secondpopup-item'>
                <div className='SecondpopupItem_inner'>
                    <div className="secondcloseItem-set">
                        <button className="secondcloseItem-btn" onClick={this.props.closeSecondPopup}>X</button>
                    </div>

                    <div>
                        
                            <div className="container">
                                    <h4>Edit Menu</h4>

                                    <div className="file">
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={(e) => this.EditItemFile(e)}
                                        />
                                    </div>

                                    <div className="Itemtitle">Sub-Title</div>
                                    <div className="text1">
                                        <input
                                            className="text2"
                                            type="text"
                                            name="name"
                                            onChange={(e) => this.EditItemName(e)}
                                        />
                                    </div>

                                    <div className="price1">Price (RS)</div>
                                    <div className="price2">
                                        <input
                                            className="price3"
                                            type="number"
                                            name="originalPrice"
                                            min="1"
                                            onChange={(e) => this.EditItemPrice(e)}
                                        />
                                    </div>

                                    <div className="price1">Offer</div>
                                    <div className="price2">
                                        <input
                                            className="price3"
                                            type="number"
                                            name="offer"
                                            min="1"
                                            onChange={(e) => this.EditItemOffer(e)}
                                        />
                                    </div>

                                    <div className="dsc">Description</div>
                                    <div className="dsc1">
                                        <textarea
                                            className="dsc2"
                                            type="text"
                                            name="description"
                                            onChange={(e) => this.EditItemDescription(e)}
                                        />
                                    </div>

                                    <div className="button4">
                                        <button className="btn4" onClick={(e) => this.handleItemEdit(e)}>
                                            Submit
                                        </button>
                                    </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}