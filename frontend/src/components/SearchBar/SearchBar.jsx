import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { Search } from '../../assets';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './searchbar.css';

const SearchBar = ({ handleSearch }) => {
  const [searchString, setSearchString] = useState('');
  const { getSearchByClubs } = useActions();
  const { data } = useTypedSelector((state) => state.auth);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  // user presses enter key - make the search
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      console.log(searchString);
      // API call to get search results
      const searchResult = await getSearchByClubs(searchString);
      // const searchResult = ['Club 1', 'Club 2', 'Club 3'];

      // send search results back to parent component
      // handleSearch(searchResult);
      console.log(searchResult, 'search data');
    }
  };

  return (
    <>
      <Grid container alignItems="end" gap="0.6rem">
        <Grid item>
          <img src={Search} alt="Search Icon" />
        </Grid>
        <Grid item xs={11}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default SearchBar;
