import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import useConnectionStatus from "check-connection";
import Router from './Router/Router'
export const InternetContext = React.createContext()
function App() {

  const [internet, setInternet] = useState(useConnectionStatus())

  return (
    <InternetContext.Provider value={[internet, setInternet]} >
      <div className='app' data-testid="app">
        <Router />
      </div>
    </InternetContext.Provider>
  )
}

export default App