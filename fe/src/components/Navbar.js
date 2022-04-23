import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import GoogleLogin from 'react-google-login';

async function createUser(profileobj) {
  let query = `mutation {
    createUser(user: {
      uid: "${profileobj.googleId}",
      name: "${profileobj.givenName}",
      games: "",
    }) {
      uid
    }
  }`;

  console.log(query)

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ query })
  });

  const body = await response.text();
  const result = JSON.parse(body);
  return result.data.createUser.uid
}

async function getUser(profileObj) {
  const query = `query {
    user(uid:"${profileObj.googleId.toString()}") {
      uid
    }
  }`;

  console.log(query)

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( {query} )
  });

  const body = await response.text();
  const result = JSON.parse(body);

  return result.data.user ? result.data.user.uid : await createUser(profileObj);
}

function Navbar() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
    ? localStorage.getItem('loginData')
    : null
  )
  const handleFailure = (result) => {
    alert(result);
  }
  const handleLogin = (googleData) => {
    console.log(googleData.googleId)
    console.log(googleData.profileObj.givenName)
    setLoginData(googleData.googleId)
    const userId = getUser(googleData.profileObj);
    localStorage.setItem('loginData', userId);
  }
  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLoginData(null)
  }
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            GAME STREAM
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Game Library
              </Link>
            </li>
            <li className='nav-item'>
              <div className='nav-links'>
              {
                loginData ? (
                  <Button buttonStyle='btn--outline' onClick={handleLogout}>Logout</Button>
                ) : (
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                  ></GoogleLogin>
                )
              }
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
