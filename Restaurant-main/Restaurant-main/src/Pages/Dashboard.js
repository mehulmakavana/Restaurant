import React, { Component } from 'react'
import '../Pages/Dashboard.css'
import { HiShoppingCart } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export class Dashboard extends Component {

  constructor(props) {

    super(props);
    this.state = {
      category: "",
      categoryposts:0

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/categorypost/categories"
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ category: data.categoryposts.length, loading: false });
    this.searchArray = data
  }

  render() {

    return (

      <div>

        <h1>
          DashBoard
          </h1>

        <div className="flex1">

          <div className="flex2">

          <Link className="link" to="/Category">
            <h2>TOTAL CATEGORY
              <div>{this.state.category}</div>
            </h2>
            <h3> <FaClipboardList style={{ fontSize: 40 }} /> </h3>
            </Link>
          </div>
        </div>

      </div>
    );
  }
}

export class Dashboard1 extends Component {

  constructor(props) {

    super(props);
    this.state = {

      order: "",
      orders:0

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/order/getorders"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ order: data.orders.length, loading: false });
    this.searchArray = data
  }

  render() {
    return (
      <div>
        <div className="flex1">
          <div className="flex2">

            <Link className="link" to="/OrdersHistory">
            <h2>TOTAL ORDER
              <div>{this.state.order}</div>
            </h2>
            


            <h3> <HiShoppingCart style={{ fontSize: 40 }} /> </h3>
            </Link>
          </div>
        </div>
         
      </div>         
    )
  }
}

export class Dashboard2 extends Component {

  constructor(props) {

    super(props);
    this.state = {

      rating:""

    }
  }

  async componentDidMount() {

    const url = "http://localhost:8020/feedback/average"
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ rating: data.rating, loading: false });
    this.searchArray = data
  }

  render() {

    return (

      <div>

        <Dashboard />
        <Dashboard1 />
      

        <div className="flex3">
          <div className="flex4">

          <Link className="link" to="/Ratings">
            <h2>AVERAGE RATTING
              <div>{this.state.rating}</div>
            </h2>

            <h3> <FaStar style={{ fontSize: 40 }} /> </h3>
            </Link>
          </div>
        </div>
        </div>

    )
  }

}

export default Dashboard2;