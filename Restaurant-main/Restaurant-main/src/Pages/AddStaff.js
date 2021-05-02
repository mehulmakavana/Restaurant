import React, { useState } from 'react';
import loginImg from "./Image/login.svg";
import './AddStaff.scss';

function Register() {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [activerole, setValue] = useState();


  async function signup() {
    let data = { email, name, password, phone,activerole }
    console.warn(data)

    let result = await fetch("http://localhost:8020/all/register", {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
    })

    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result))
  }

  return (
    <div>

      <div className="base-container" >

        <div className="header">Create Staff</div>
        <div className="content">

          <div className="image">
*
            <img src={loginImg} alt={1} />
          </div>

          <div className="form">

            <div className="radio">

              <input type="radio" className="radio1" name="select" value="manager" onChange={e => setValue(e.target.value)} />
              <label for="manager">Manager</label>

              <input type="radio" className="radio1" name="select" value="waiter" onChange={e => setValue(e.target.value)} />
              <label for="waiter">Waiter</label>

              <input type="radio" className="radio1" name="select" value="cook" onChange={e => setValue(e.target.value)} />
              <label for="cook">Cook</label>

            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="name" placeholder="username" onChange={e => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input maxLength="10" type="text" name="phone" placeholder="Phone no." onChange={e => setPhone(e.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </div>

          </div>
        </div>

        <div className="footer">
          <button type="button" onClick={signup} className="btns">
            Register
          </button>
        </div>


      </div>
    </div>
  );
}

export default Register;