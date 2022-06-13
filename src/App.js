import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router/Router'
import { useNetworkStatus } from "use-network-status";
export const InternetContext = React.createContext()
function App() {
  const [internet, setInternet] = useState(useNetworkStatus())

  return (
    <InternetContext.Provider value={[internet, setInternet]} >
      <div className='app' data-testid="app">
        <Router />
      </div>
    </InternetContext.Provider>
  )
}

export default App