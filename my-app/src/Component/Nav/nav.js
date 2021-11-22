import React from "react";
import './nav.scss'
import {NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="topnav">
      <NavLink to="/" activeClassName="active" exact ={true}>
        Home
      </NavLink>
      <NavLink to="/button" activeClassName="active">BUTTON HOVER CSS</NavLink>
      <NavLink to="/todo" activeClassName="active">Todo List</NavLink>
      <NavLink to="/post" activeClassName="active">POST</NavLink>
    </div>
  );
}


