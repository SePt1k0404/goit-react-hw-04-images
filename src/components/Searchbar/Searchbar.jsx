import { Component } from 'react';
import { SearchHeader, SearchForm, SearchBtn } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    request: '',
  };

  handlerInput = evt => {
    this.setState({ request: evt.target.value });
  };
  render() {
    return (
      <>
        <SearchHeader className="searchbar" onSubmit={this.props.onSubmit}>
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
              onChange={this.handlerInput}
              value={this.state.request}
            />
          </SearchForm>
        </SearchHeader>
      </>
    );
  }
}
