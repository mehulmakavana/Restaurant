import React, { Component } from 'react';
import './Order.css'

export class Order extends Component {

    constructor(props) {

        super(props);
        this.state = {

            people: [],

        }
    }


    async componentDidMount() {

        const url = "http://localhost:8020/order/getorders"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.orders, loading: false });
        this.searchArray = data
      }

      renderTableData() {
        return this.state.people.map((data) => {
            const { _id, paymentMethod, name, email
            } = data
            return (

                <tr key={_id}>

                    <td><div className="name">{name}</div></td>

                    <td><div className="price">{email}
                    </div></td>

                    <td><div className="description">{paymentMethod}
                    </div></td>

                </tr>
            )
        })
    }

    render() {

        return (

            <div>

                <h1>Orders</h1>

                <div className="flex">

                    <div className="content">

                        <table id="table1" >

                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Payment Method</th>
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
            </div>
        )
    }
}

export default Order

