import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import logo from './images/logo.png';

import Navbar from 'react-bootstrap/Navbar'



class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
    return (
    <nav className = "navbar navbar-expand-md bg-grad navbar-dark sticky-top">
    <div className="container">
      <a className="navbar-brand" href="/">
    	<img src={logo} alt="logo" width="40px" height="40px"/>
	  </a>
      <button  onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${classOne}`} id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            
            <li className="nav-item active">
              <a className="collapsed nav-link" href="/">Home </a>
            </li>
            
            <li className="nav-item active">
              <a className="nav-link" href="/about">About </a>
            </li>
            
            <li className="nav-item active">
              <a className="nav-link" href="/contact">Contact </a>
            </li>

          </ul>
        </div>
    </div>
  </nav>
    );
  }
}
export default NavBar;

