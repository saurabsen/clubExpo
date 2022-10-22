import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home } from './views';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
  };

  return (
    <>
      <Router>
        <Header handleSearch={handleSearch} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
