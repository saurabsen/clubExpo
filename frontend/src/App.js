import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { Home, Register, Login } from './pages';
import './styles/app.css';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
