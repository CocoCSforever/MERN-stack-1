// install react router dom package so we can add diff pages to this application
// npm install react-router-dom

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// BrowserRouter wraps everywhere we want to use the router basically
// Routes wraps all of our individual routes
// Route creates a single route

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

// we want to put navbar above all of the pages(sits at the top of every page) thus outside the "pages"
// everything to do with the router should be inside browserrouter, ow cannot use the link component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
