import React, { Component } from 'react';
import './Menu.css';
import axios from 'axios';


class Popup extends React.Component {

  constructor(props) {

    super(props);
    this.state = {

      imageUrl: null,
      name: null,
      description: "",
      offer: "",

    }
    //this.update = this.update.bind(this);

  }

/*update() {
  let file = this.state.file
  let name = this.state.name
  let offer = this.state.offer
  let description = this.state.description
  let formdata = new FormData()

  formdata.append('imageUrl', file)

  fetch("http://localhost:8020/menu/update/" + this.props._id, {
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    },
    "body": JSON.stringify({
      imageUrl: formdata,
      name: name,
      offer: offer,
      description: description,
    })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => { console.log(err); });
}*/

update(e) {
  e.preventDefault();

  fetch("http://localhost:8020/menu/update/" + this.props._id ,{
    "method": "PUT",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json"
    },
    "body": JSON.stringify({
      imageUrl: this.state.imageUrl,
      name: this.state.name,
      offer: this.state.offer,
      description: this.state.description,
    })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    })
    .catch(err => { console.log(err); });
}


handleName1(e) {
  let name = e.target.value
  this.setState({ name: name })
}

fileChangedHandler = event => {
  this.setState({ imageUrl: event.target.files[0] })
}

uploadHandler = () => {
  const formData = new FormData()
  formData.append(
    'myFile',
    this.state.imageUrl,
  )
}

handleOffer1(e) {
  let offer = e.target.value
  this.setState({ offer: offer })
}

handleDescription1(e) {
  let description = e.target.value
  this.setState({ description: description })
}

render() {

  return (

    <div className='popup'>
      <div className='popup_inner'>
        <h1>{this.props.text}</h1>
        <div className="container2">


          <div className="file">
            <input type="file" name="imageUrl" onChange={this.fileChangedHandler} />
            <button onClick={this.uploadHandler}>Upload!</button>

          </div>

          <div className="title">Sub-Title</div>
          <div className="text1">
            <input className="text2" type="text" name="name" onChange={(e) => this.handleName1(e)} />
          </div>

          <div className="price1">Offer</div>
          <div className="price2">
            <input className="price3" type="number" name="offer" min="1" onChange={(e) => this.handleOffer1(e)} />
          </div>

          <div className="dsc">Description</div>
          <div className="dsc1">
            <textarea className="dsc2" type="text" name="description" onChange={(e) => this.handleDescription1(e)} />
          </div>

          <div className="button4">
            <button className="btn4" onClick={(e) => this.update(e)}>Update</button>
          </div>

          <button onClick={this.props.closePopup}>close</button>
        </div>
      </div>
    </div>
  );
}
}


class Menu extends Component {

  constructor(props) {

    super(props);
    this.state = {

      file: null,
      name: null,
      people: [],
      loading: true,
      imageUrl: "",
      id: null,
      originalPrice: "",
      description: "",
      offer: "",
      isOpen: false,
      error: null,
      showPopup: false


    }
    this.togglePopup = this.togglePopup.bind(this)
  }

  togglePopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      id: data._id
    });
  }

  async componentDidMount() {

    const url = "http://localhost:8020/menu/menues"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data.products, loading: false });
    this.searchArray = data
  }


  handleName(e) {
    let name = e.target.value
    this.setState({ name: name })
  }

  handleFile(e) {
    let file = e.target.files[0]
    this.setState({ file: file })
  }

  handlePrice(e) {
    let originalPrice = e.target.value
    this.setState({ originalPrice: originalPrice })
  }

  handleOffer(e) {
    let offer = e.target.value
    this.setState({ offer: offer })
  }

  handleDescription(e) {
    let description = e.target.value
    this.setState({ description: description })
  }

  async handleUpload(e) {
    e.preventDefault();


    let file = this.state.file
    let name = this.state.name
    let originalPrice = this.state.originalPrice
    let description = this.state.description

    let formdata = new FormData()

    formdata.append('imageUrl', file)
    formdata.append('name', name)
    formdata.append('originalPrice', originalPrice)
    formdata.append('description', description)

    axios({
      url: `http://localhost:8020/menu/create/` + this.props._id,
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
 

  delete(_id) {
    fetch('http://localhost:8020/menu/delete/' + _id,
      {
        method: 'DELETE',
      }).then((data) => {
        data.json().then((resp) => {
          alert("Are You Sure Delete")
          this.componentDidMount()
        })
      })
  }

  renderTableData() {
    return this.state.people.map((data) => {
      const { _id, name, imageUrl, originalPrice, description, offer, offerPrice } = data
      return (

        <tr key={_id}>

          <td><div className="name">{name}</div></td>

          <td><img className="img" src={imageUrl} /></td>

          <td><div className="price"> {originalPrice}
          </div></td>

          <td><div className="offer1"> {offer}
          </div></td>

          <td><div className="offer2"> {offerPrice}
          </div></td>

          <td><div className="description">{description}
          </div></td>

          <td><div className="button6">
            <button className="btn6"
              onClick={() => this.delete(data._id)}
              variant="danger">Delete</button>
          </div>
          </td>


         <td><div className="button6">
            <button onClick={() => this.togglePopup(data)}>Edit item</button>
          </div></td>

          {this.state.showPopup ?
            <Popup _id={this.state.id}
              closePopup={() => this.togglePopup(data)}
            />
            : null
          } 

         

        </tr>

      )
    })
  }

  render() {

    //if (this.state.loading) {
    //return <div>loading...</div>;
    //}

    const {people}=this.state;

    return (

          <div>

            <h1>Category</h1>

            <div className="container2">
              <h4>Add Menu</h4>

              <div className="file">
                <input type="file" name="file" onChange={(e) => this.handleFile(e)} />
              </div>

              <div className="title">Sub-Title</div>
              <div className="text1">
                <input className="text2" type="text" name="name" onChange={(e) => this.handleName(e)} />
              </div>

              <div className="price1">Price (RS)</div>
              <div className="price2">
                <input className="price3" type="number" name="originalPrice" min="1" onChange={(e) => this.handlePrice(e)} />
              </div>

              <div className="price1">Offer</div>
              <div className="price2">
                <input className="price3" type="number" name="offer" min="1" onChange={(e) => this.handleOffer(e)} />
              </div>

              <div className="dsc">Description</div>
              <div className="dsc1">
                <textarea className="dsc2" type="text" name="description" onChange={(e) => this.handleDescription(e)} />
              </div>

              <div className="button4">
                <button className="btn4" onClick={(e) => this.handleUpload(e)}>Upload</button>
              </div>

            </div>

            <div className="container3">

              <h5> Menu</h5>

              <div className="content1">

                <table id="table1" >

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

                <table id='students1'>
                  <tbody>
                    {this.renderTableData()}
                  </tbody>
                </table>
              </div>

              
            </div>

          </div >
    )
  }
}

export default Menu;