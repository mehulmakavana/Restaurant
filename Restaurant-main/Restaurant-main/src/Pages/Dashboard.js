import React, { Component } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categoryposts: 0,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/categorypost/categories";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ category: data.categoryposts.length, loading: false });
    this.searchArray = data;
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">
            <Link className="link" to="/Category">
              <h2>
                TOTAL CATEGORY
                <div>{this.state.category}</div>
              </h2>
              <h3>
            
                <FaClipboardList style={{ fontSize: 40 }} />
              </h3>
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
      orders: 0,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/order/getorders";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ order: data.orders.length, loading: false });
    this.searchArray = data;
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">
            <Link className="link" to="/OrdersHistory">
              <h2>
                TOTAL ORDER
                <div>{this.state.order}</div>
              </h2>

              <h3>
             
                <HiShoppingCart style={{ fontSize: 40 }} />
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export class Dashboard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: "",
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/complaint/complaints";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ complaints: data.totalItems });
    this.searchArray = data;
  }

  render() {
    return (
      <div>
        <div className="flex-category1">
          <div className="flex-category2">
            <Link className="link" to="/Complaints">
              <h2>
                TOTAL COMPLAINT
                <div>{this.state.complaints}</div>
              </h2>

              <h3>
             
                <FaClipboardList style={{ fontSize: 40 }} />
              </h3>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export class Dashboard3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8020/feedback/average";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ rating: data.rating, loading: false,  });
    this.searchArray = data;
  }

  render() {
    return (
      <div>

        <h1>Dashboard</h1>

        <div className="DashView-Manager">
          <Dashboard />
          <Dashboard1 />
          <Dashboard2 />

          <div className="flex-category3">
            <div className="flex-category4">
              <Link className="link" to="/Ratings">
                <h2>
                  AVERAGE RATTING
                  <div>{this.state.rating}</div>
                </h2>

                <h3>
               
                  <FaStar style={{ fontSize: 40 }} />
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard3;
