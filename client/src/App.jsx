import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Candidate from "./pages/Candidate"
import Vote from "./pages/Vote";
import Result from "./pages/Result";
import Profile from "./pages/Profile"
import Mainheader from "./pages/Mainheader";

function App() {


  return (
    <>
      <Router>
      <Routes>
    <Route path="/" element={<Register />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Mainheader />}>
        <Route path="/home" element={<Home />} /> {/* Example of a protected route */}
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/result" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
    </Route>
</Routes>

      </Router>
    </>
  )
}

export default App
