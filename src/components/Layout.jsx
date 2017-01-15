import React from 'react';
import { Link } from 'react-router';

const Layout = (props) => {
  return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">PhotoStack</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
        </div>
        </div>
      </nav>
      <div className="jumbotron">
        <div className="container text-center">
          <h1>PhotoStack Editor</h1>
          <p>Resize, add borders and crops your favorite picture with Filestack API.</p>
          {props.location.pathname === '/' ?
            <p><Link className="btn btn-filestack btn-lg btn-main" to="/add" role="button">Start Now</Link></p>
            : null
          }
        </div>
      </div>
      <div className="container">
        <div className="row">
        {props.children}
        </div>
        <hr />
        <footer>
          <p>© 2017 Samuele Zaza, Filestack Tech Evangelist.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
