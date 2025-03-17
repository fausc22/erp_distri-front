// Layout.jsx
import React from 'react';
import BlueNavbar from '../Navbar/Navbar.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <BlueNavbar />
      {children}
    </>
  );
};

export default Layout;
