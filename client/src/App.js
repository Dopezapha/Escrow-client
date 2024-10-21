import React, { useState, useEffect } from 'react';
import { Connect } from '@stacks/connect-react';
import { UserSession, AppConfig } from '@stacks/auth';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateEscrow from './components/CreateEscrow';
import EscrowList from './components/EscrowList';
import EscrowDetails from './components/EscrowDetails';
import './styles.css';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

function App() {
  const [selectedEscrow, setSelectedEscrow] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const handleSignIn = () => {
    userSession.redirectToSignIn();
  };

  const handleSignOut = () => {
    userSession.signUserOut();
    setUserData(null);
  };

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'Secure Escrow DApp',
          icon: window.location.origin + '/favicon.ico',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession: userSession,
      }}
    >
      <div className="app">
        <Header
          userData={userData}
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
        />
        <main>
          {userData ? (
            <>
              <CreateEscrow />
              <div className="escrow-container">
                <EscrowList setSelectedEscrow={setSelectedEscrow} />
                {selectedEscrow && <EscrowDetails escrow={selectedEscrow} />}
              </div>
            </>
          ) : (
            <div className="login-message">
              <h2>Welcome to Secure Escrow DApp</h2>
              <p>Please sign in with your Stacks wallet to use the application.</p>
              <button onClick={handleSignIn}>Sign In</button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </Connect>
  );
}

export default App;
