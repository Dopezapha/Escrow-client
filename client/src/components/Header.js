import React from 'react';

function Header({ userData, handleSignIn, handleSignOut }) {
  return (
    <header className="header">
      <h1>Secure Escrow DApp</h1>
      <nav>
        <ul>
          {userData ? (
            <>
              <li><a href="#create">Create Escrow</a></li>
              <li><a href="#list">My Escrows</a></li>
              <li>
                <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleSignIn} className="sign-in-btn">Sign In</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
