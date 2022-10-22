import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home } from './views';
import ClubProposal from './views/ClubProposal/ClubProposal';

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
            <Route path="/proposal" element={<ClubProposal />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
