import axios from 'axios';
import React, { Component } from 'react';
import './Category.css'

class Revenue extends Component {

  constructor(props) {

    super(props);
    this.state = {

      startdate: null,
      enddate: null,
      people: [],
      loading: true,

    }
  }

  handleStartDate(e) {
    let startdate = e.target.value
    this.setState({ startdate: startdate })
  }

  handleEndDate(e) {
    let enddate = e.target.value
    this.setState({ enddate: enddate })
  }

  handleUpload(e) {
    let startdate = this.state.startdate
    let enddate = this.state.enddate
    let formdata = new FormData()

    formdata.append('startdate', startdate)
    formdata.append('enddate', enddate)

    axios({
      url: `http://localhost:8020/revenue/revenuedates`,
      method: "POST",
      headers: {
        authorization: `your token`
      },
      data: formdata
    })
      .then(res => {
        const people = res.data;
        this.setState({ people });
      })

  }

  render() {

    const { id } = this.state;

    return (

      <div>

        <h1>Revenue</h1>

        <div className="container">

          <div className="title">startdate</div>
          <div className="text1">
            <input type="text" className="text2" name="startdate" onChange={(e) => this.handleStartDate(e)} />
          </div>

          <div className="title">enddate</div>
          <div className="text1">
            <input type="text" className="text2" name="enddate" onChange={(e) => this.handleEndDate(e)} />
          </div>

          <div className="button1">
            <button className="btn1" onClick={(e) => this.handleUpload(e)}>Upload</button>
          </div>
        </div>

        {
          this.state.people.map(item => <div>
            <div>SUM :- {item.SUM}</div>
            <div>COUNT :- {item.COUNT}</div>
          </div>

          )
        }

      </div>

    )
  }
}

export default Revenue;
