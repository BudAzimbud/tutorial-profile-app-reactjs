import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './Router/Router'
function App() {
  return (
    <div className='app' data-testid="app">
      <Router />
    </div>
  )
}

export default App