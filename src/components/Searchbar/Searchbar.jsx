import { useState } from 'react';
import { SearchHeader, SearchForm, SearchBtn } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handlerInput = evt => {
    setRequest(evt.target.value);
  };

  return (
    <>
      <SearchHeader className="searchbar" onSubmit={onSubmit}>
        <SearchForm className="form">
          <SearchBtn type="submit" className="button">
            <span className="button-label">Search</span>
          </SearchBtn>

          <input
            name="request"
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handlerInput}
            value={request}
          />
        </SearchForm>
      </SearchHeader>
    </>
  );
};
