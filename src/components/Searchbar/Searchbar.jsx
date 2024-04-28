// Searchbar.jsx

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';

export const Searchbar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  const onChangeInput = evt => {
    const { value } = evt.target;
    setSearch(value);
  };

  const resetForm = () => {
    setSearch('');
  };

  const onSubmitForm = evt => {
    evt.preventDefault();
    if (!search) {
      toast.error('Enter text for search.');
      return;
    }
    handleSubmit(search);
    resetForm();
  };

  return (
    <header className={css.SearchBar}>
      <form onSubmit={onSubmitForm} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <BiSearch size="20" />
        </button>
        <input
          value={search}
          onChange={onChangeInput}
          className={css.SearchFormInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
