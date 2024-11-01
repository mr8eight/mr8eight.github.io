import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import React from 'react';

function App() {

    const {user} = useAuth();

    return (
      <div className="App">
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </div>
    );
}

export default App;
