import { Route,Routes,BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Editor from './components/Editor.jsx'
import Navbar from './components/Navbar.jsx'
import LoginPage from './components/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/write" element={
          <PrivateRoute>
            <Editor />
          </PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
