import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
function App() {

  const props = [];

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' {...props} element={<Login/>}></Route>
          <Route path='/home' {...props} element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;