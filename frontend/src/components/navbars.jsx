import React from 'react';
import { Link } from "react-router-dom";

export function Navbar1() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Главная</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/" className='btn btn-lg btn-outline-primary m-1'>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className='btn btn-lg btn-outline-primary m-1'>Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/chat" className='btn btn-lg btn-outline-primary m-1'>Chat</Link>
        </li>
      </ul>
      <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="найти" aria-label="Search"/>
        <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Найти</button>
      </form>
    </div>
  </nav>
  )
}

