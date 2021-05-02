import React, { Component } from 'react';
import './Rating.css'

export class Ratings extends Component {

    constructor(props) {

        super(props);
        this.state = {

            people: [],

        }
    }

    
    async componentDidMount() {

        const url = "http://localhost:8020/feedback/feedbacks"
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ people: data.feedbacks, loading: false });
        this.searchArray = data
      }

      renderTableData() {
        return this.state.people.map((data) => {
            const { _id, title, message, rating } = data
            return (

                <tr key={_id}>

                    <td><div className="name">{title}</div></td>

                    <td><div className="price">{message}
                    </div></td>

                    <td><div className="description">{rating}
                    </div></td>

                </tr>
            )
        })
    }


    render() {

        return (

            <div>

                <h1>Ratings</h1>

                <div className="flex">

                    <div className="content">

                        <table id="table1" >

                            <tr>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Ratings</th>
                           
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

export default Ratings;

