import React from 'react';
import { Link, withRouter } from 'react-router-dom';

var style = {
  backgroundColor: '#487eb0',
  borderTop: '1px solid #E7E7E7',
  textAlign: 'center',
  padding: '20px',
  position: 'fixed',
  left: '0',
  bottom: '0',
  height: '60px',
  width: '100%',
};

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
};

function Footer() {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        <div className="container text-center">
          <small>Copyright &#169; 2021</small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
