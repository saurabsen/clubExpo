import { useState } from 'react';
import { TextField } from '@mui/material';
import { Search } from '../../assets';
import './searchbar.css';

const SearchBar = ({ handleSearch }) => {
  const [searchString, setSearchString] = useState('');

  const handleOnChange = (e) => {
    setSearchString(e.target.value);
  };

  // user presses enter key - make the search
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      // API call to get search results
      // const searchResult = await getSearchResults(searchString);
      const searchResult = ['Club 1', 'Club 2', 'Club 3'];

      // send search results back to parent component
      handleSearch(searchResult);
    }
  };

  return (
    <div className="searchbar">
      <div>
        <img src={Search} alt="Search Icon" />
      </div>

      <div>
        <TextField
          id="standard-search"
          label="Search"
          type="search"
          variant="standard"
          fullWidth
          InputProps={{
            disableUnderline: true
          }}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SearchBar;