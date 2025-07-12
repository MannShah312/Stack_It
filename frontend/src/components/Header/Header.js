import React from 'react';
import './CSS/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className='header-container'>
        <div className="header-left ">
          <Link to="/">
            {/* <img src="..\..\..\public\Assets\stack-overflow.png" alt="logo"/> */}
            StackIt
          </Link>
          <h3>Products</h3>
        </div>
        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search..."/>
          </div>
        </div>
        <div className="header-right">
            <div className="header-right-container">
              <Avatar />
              <InboxIcon />
            </div>
        </div>
      </div>


    </header>
  )
}
