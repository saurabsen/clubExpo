import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, ClubsJoined,DiscoverClubs } from './views';

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
            <Route path="/clubs-joined" element={<ClubsJoined />} />
            <Route path="/discover-clubs" element={<DiscoverClubs />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
