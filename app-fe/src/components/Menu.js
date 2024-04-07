import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <ul className="menu-list">
        <li>Register Donor</li>
        <li>
          <Link to="/check-eligibility">Check Eligibility</Link>
        </li>
        <li>Request to Donate</li>
        <li>Approve/Reject Request</li>
      </ul>
    </div>
  );
};

export default Menu;
