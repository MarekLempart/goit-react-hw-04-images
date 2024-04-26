// Searchbar.jsx
// import { Component } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-hot-toast'; // dla pokazywania powiadomień
// import { BiSearch } from 'react-icons/bi'; // ikona wyszukiwania
import { ButtonClear } from 'components/ButtonClear/ButtonClear';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit, onChange, onClickClear, inputValue }) => (
  <header className={css.SearchBar}>
    <form className={css.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={css.SearchFormButton}>
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>
      <input
        className={css.SearchFormInput}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={onChange}
        value={inputValue}
      />
      {inputValue && <ButtonClear onClickClear={onClickClear} />}
    </form>
  </header>
);

Searchbar.protoTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onClickClear: PropTypes.func,
  query: PropTypes.string,
};
