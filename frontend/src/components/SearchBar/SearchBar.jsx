import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { Search } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import './searchbar.css';

const SearchBar = ({ handleSearch }) => {
  const [searchString, setSearchString] = useState('');
  const { getSearchByClubs, getSearchByEvents } = useActions();

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  // user presses enter key - make the search
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      getSearchByClubs(searchString);
      getSearchByEvents(searchString);
      navigate(`/search/`);
    }
  };

  return (
    <>
      <Grid container alignItems="end" gap="0.6rem">
        <Grid item>
          <img src={Search} alt="Search Icon" />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="standard-search"
            placeholder="Search"
            type="search"
            variant="standard"
            fullWidth
            InputProps={{
              disableUnderline: true
            }}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SearchBar;
